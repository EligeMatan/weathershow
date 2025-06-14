import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { getWeatherMap } from "../controllers/weathermap.api";

const WeatherMap = () => {
    const [inputValue, setInputValue] = useState('');
    const [cityName, setCityName] = useState(localStorage.getItem("city") || 'Харків');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
            if (!cityName) return;
    
            getWeatherMap(cityName)
                .then(data => {
                    if ('status' in data && data.status !== 200) {
                        setError(data.message);
                    } else {
                        console.log('Weather =', data);
                        // setCityObj(data.city_obj);
    
                        setError(null);
                        // setWeather(data.output);
                        if (data.output.coord) {
                            // setMarkerPos([data.city_obj.lat, data.city_obj.lon]);
                        }
    
                        localStorage.setItem("city", cityName);
                    }
                })
                .catch(err => {
                    console.log(err)
                    setError("Помилка при завантаженні погоди");
                    // setWeather(null);
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

    return (
        <div>
            <h1>Погодна карта</h1>
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

             
        </div>
    );
};

export default WeatherMap;
