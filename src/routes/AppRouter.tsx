import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Weather from "../pages/Weather";
import Forecast from "../pages/Forecast";
import WeatherMap from "../pages/WeatherMap";
import CityWeather from "../pages/CityWeather"; // новий компонент

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Weather />} />
                <Route path="/forecast" element={<Forecast />} />
                <Route path="/weathermap" element={<WeatherMap />} />
                <Route path="/weather/:city" element={<CityWeather />} /> {/* динамічний */}
            </Routes>
        </Router>
    );
};

export default AppRouter;