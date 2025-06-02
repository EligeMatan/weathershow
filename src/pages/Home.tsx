import { WeatherSvg } from "weather-icons-animated";
import '../styles/Home.scss';


export default function Home() {

    return (
        <div className="Home">
            <WeatherSvg state="sunny" />
            <WeatherSvg state="lightning-rainy" />
            <WeatherSvg state="partlycloudy" night />
        </div>
    )
}