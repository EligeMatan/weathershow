/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchWeatherData } from "../utils/fetchWeatherData";
import { OPENWEATHER_API_KEY } from "../config/config";
import { geoCoding } from "./geocoding";

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


export const getWeatherByName = async(city_name: string) => {
    if (!city_name) {
        return {
            status: 407,
            message: 'Не всі дані заповнені...',
        }
    }

    const city_obj = await geoCoding(city_name);

    const output = await getWeatherByCoord(city_obj.lat, city_obj.lon)

    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${OPENWEATHER_API_KEY}`;
    // return fetchWeatherData(url, 'getWeatherByName');

    console.log('output = ', output);
    return output;
    // return {
    //     output.weather.main,
    //     output.weather.description,

    // }
}