import { useState } from "react";
import { Form } from "react-bootstrap";

const WeatherMap = () => {
    const [inputValue, setInputValue] = useState('');
    const [cityName, setCityName] = useState(localStorage.getItem("city") || 'Харків');

    
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
        </div>
    );
};

export default WeatherMap;
