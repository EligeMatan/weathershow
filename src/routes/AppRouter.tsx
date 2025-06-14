import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Forecast from "../pages/Forecast";
import WeatherMap from "../pages/WeatherMap";
import CityWeather from "../pages/CityWeather";
import Navbar from "../components/Navbar/Navbar";

const AppRouter = () => {
    return (
        <Router>
            <Navbar />
            <main className="content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/weather/:city" element={<CityWeather />} /> {/* динамічний */}
                    <Route path="/forecast" element={<Forecast />} />
                    <Route path="/weathermap" element={<WeatherMap />} />
                </Routes>
            </main>
        </Router>
    );
};

export default AppRouter;