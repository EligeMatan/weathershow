/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchData } from "../utils/fetchData";
import { OPENWEATHER_API_KEY } from "../config/config";

export function getWeatherMap (x: number, y: number, z: number): Promise<any>;
export function getWeatherMap (cityName: string): Promise<any>;

export async function getWeatherMap (arg1: string|number, arg2?: number, arg3?: number): Promise<any | TypeError> {
    if (typeof arg1 === 'string') {
        const cityName = arg1;
        if (!cityName) {
            return {
                status: 407,
                message: 'Не вказано назву міста...',
            };
        }

        // Тут ти можеш виконати запит до геокодера або до API, яке приймає місто
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${OPENWEATHER_API_KEY}`;
        return fetchData(url, 'getWeatherMap');
    }

    const [x, y, z] = [arg1, arg2, arg3];
    if (!x || !y || !z) {
        return {
            status: 407,
            message: 'Не всі координати заповнені...',
        };
    }

    const OP = 'TA2';
    const url = `https://maps.openweathermap.org/maps/2.0/weather/1h/${OP}/${z}/${x}/${y}?appid=${OPENWEATHER_API_KEY}`;
    return fetchData(url, 'getWeatherMap');
}