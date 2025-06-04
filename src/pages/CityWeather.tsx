/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet';
// import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getWeatherByName } from '../controllers/daily.weather.api';
import '../styles/CityWeather.scss';
import Form from 'react-bootstrap/Form';

const DEFAULT_POSITION: [number, number] = [50.005833, 36.229167];

const CityWeather = () => {
    // const { city } = useParams();
    const [inputValue, setInputValue] = useState('');
    const [cityName, setCityName] = useState(localStorage.getItem("city") || '');
    const [weather, setWeather] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [markerPos, setMarkerPos] = useState<[number, number]>(DEFAULT_POSITION);

    useEffect(() => {
        if (!cityName) return;

        getWeatherByName(cityName)
            .then(data => {
                if ('status' in data && data.status !== 200) {
                    setError(data.message);
                    setWeather(null);
                } else {
                    console.log('Weather =', data);

                    setError(null);
                    setWeather(data);
                    if (data.coord) {
                        setMarkerPos([data.coord.lat, data.coord.lon]);
                    }

                    localStorage.setItem("city", cityName);
                }
            })
            .catch(err => {
                console.log(err)
                setError("Помилка при завантаженні погоди");
                setWeather(null);
            });

        setInputValue(cityName);

    }, [cityName]);

    const handleSearch = () => {
        if (inputValue.trim()) {
            setError(null);
            setCityName(inputValue.trim());
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleBlur = () => {
        handleSearch();
    };

    const LocationMarker = () => {
        useMapEvents({
            click: async (event) => {
                const { lat, lng } = event.latlng;
                setMarkerPos([lat, lng]);
                try {
                    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
                    const data = await res.json();
                    const newCity = data.address?.city || data.address?.town || data.address?.village;
                    if (newCity) {
                        setError(null);
                        setCityName(newCity);
                    } else {
                        setError("Не вдалося визначити місто з координат");
                    }
                } catch (err) {
                    console.error(err);
                    setError("Помилка при зворотному геокодуванні");
                }
            }
        });

        return markerPos ? <Marker position={markerPos} /> : null;
    };

    return (
        <div className="CityWeather">
            <h1> Погода у місті </h1>

            <Form.Control
                type="text"
                className="InputCityName"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                placeholder="Введіть назву міста"
            />

            {error && <div className="ErrorMsg">❌ {error} ❌</div>}

            {weather && (
                <div className="DataContainer">
                    <h3>Дані:</h3>
                    <p><b>Температура:</b> {weather.main.temp}°C</p>
                    <p><b>Відчувається як:</b> {weather.main.feels_like}°C</p>
                    <p><b>Вітер:</b> {weather.wind.speed}м/с</p>
                    <p><b>Вологість:</b> {weather.main.humidity}%</p>
                    <p className="Descr">
                        <b>Опис:</b> {weather.weather[0].description}
                        <img
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt={weather.weather[0].description}
                        />
                    </p>
                    {/* <p className="Descr">Опис: {weather.weather[0].description}</p>
                    <img
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt={weather.weather[0].description}
                    /> */}
                </div>
            )}

            <div className="MapWrapper">
                <MapContainer center={markerPos} zoom={8} >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; OpenStreetMap contributors'
                    />
                    <LocationMarker />
                </MapContainer>
            </div>
        </div>
    );
};

export default CityWeather;
