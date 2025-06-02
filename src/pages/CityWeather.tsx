/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getWeatherByName } from '../controllers/daily.weather.api';

const CityWeather = () => {
    // const { city } = useParams();
    const [ cityName, setCityName ] = useState('');
    const [weather, setWeather] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (city) {
            getWeatherByName(city)
                .then(data => {
                    if ('status' in data && data.status !== 200) {
                        setError(data.message);
                    } else {
                        setWeather(data);
                    }
                })
                .catch(err => {
                    console.log(err)
                    setError("Помилка при завантаженні погоди");
                });
        }
    }, [city]);

    if (error) return <div>❌ {error}</div>;
    if (!weather) return <div>Завантаження...</div>;

    return (
        <div className="CityWeather">
            <h1> Погода у місті </h1>
            <input type="text"  />
            <h3>Дані:</h3>
            <p>Температура: {weather.main.temp}°C</p>
            <p>Опис: {weather.weather[0].description}</p>
        </div>
    );
};

export default CityWeather;
