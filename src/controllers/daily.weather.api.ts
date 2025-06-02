/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchWeatherData } from "../utils/fetchWeatherData";
import { OPENWEATHER_API_KEY } from "../config/config";

export const getWeatherByCoord = async (latitude: number, longtitude: number): Promise<any | TypeError> => {
    if (!latitude || !longtitude) {
        return {
            status: 407,
            message: 'Не всі дані заповнені...',
        }
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&appid=${OPENWEATHER_API_KEY}`;

    return fetchWeatherData(url, 'getWeatherByCoord');
}


export const getWeatherByName = async(name: string) => {
    if (!name) {
        return {
            status: 407,
            message: 'Не всі дані заповнені...',
        }
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${OPENWEATHER_API_KEY}`;

    return fetchWeatherData(url, 'getWeatherByName');
}