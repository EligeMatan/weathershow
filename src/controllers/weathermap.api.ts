/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchWeatherData } from "../utils/fetchWeatherData";
import { OPENWEATHER_API_KEY } from "../config/config";

export const getWeatherMap = async (layer: string, x: number, y: number, z: number): Promise<any | TypeError> => {
    if (!layer || !x || !y || !z) {
        return {
            status: 407,
            message: 'Не всі дані заповнені...',
        }
    }

    const url = `https://tile.openweathermap.org/map/${layer}/${z}/${x}/${y}.png?appid=${OPENWEATHER_API_KEY}`;

    return fetchWeatherData(url, 'getWeatherMap');
}   