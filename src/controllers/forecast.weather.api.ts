/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchWeatherData } from "../utils/fetchWeatherData";
import { OPENWEATHER_API_KEY } from "../config/config";

export const getHourForecastByName = async (city_name: string): Promise<any | TypeError> => {
    if (!city_name) {
        return {
            status: 407,
            message: 'Не всі дані заповнені...',
        }
    }

    const url = `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city_name}&appid=${OPENWEATHER_API_KEY}`;

    return fetchWeatherData(url, 'getHourForecastByName');
}