import { fetchData, type WeatherResponse } from "../utils/fetchData";
import { OPENWEATHER_API_KEY } from "../config/config";

type GeoCityCoord = {
    name: string;
    lat: number;
    lon: number;
    country: string;
    state: string;
}

export const geoCoding = async (city_name: string): Promise<GeoCityCoord | WeatherResponse> => {
    if (!city_name) {
        return {
            status: 407,
            message: 'Не всі дані заповнені...',
        }
    }

    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city_name}&appid=${OPENWEATHER_API_KEY}`;

    return fetchData(url, 'geoCoding');
}