import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Forecast from "../pages/Forecast";
import WeatherMap from "../pages/WeatherMap";
import CityWeather from "../pages/CityWeather";
import Navbar from "../components/Navbar";

const AppRouter = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/weather/:city" element={<CityWeather />} /> {/* динамічний */}
                <Route path="/forecast" element={<Forecast />} />
                <Route path="/weathermap" element={<WeatherMap />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;