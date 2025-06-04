/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchWeatherData } from "../utils/fetchWeatherData";
import { OPENWEATHER_API_KEY } from "../config/config";
import { geoCoding } from "./geocoding";

export const getWeatherByCoord = async (latitude: number, longtitude: number): Promise<any | TypeError> => {
    console.log('latitude =', latitude, ' longtitude =', longtitude);
    
    if (!latitude || !longtitude) {
        return {
            status: 407,
            message: 'Не всі дані заповнені...',
        }
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&appid=${OPENWEATHER_API_KEY}&lang=ua&units=metric`;

    return fetchWeatherData(url, 'getWeatherByCoord');
}


export const getWeatherByName = async (city_name: string) => {
    console.log('city_name =', city_name);
    if (!city_name.trim()) {
        return {
            status: 407,
            message: 'Не всі дані заповнені...',
        }
    }

    try {
        const [city_obj] = await geoCoding(city_name);//    .then((data) => {console.log('data =', data); return data;});

        if (!city_obj || !city_obj.lat || !city_obj.lon) {
            return {
                status: 404,
                message: `Місто "${city_name}" не знайдено`,
            };
        }

        const output = await getWeatherByCoord(city_obj.lat, city_obj.lon)

        // const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${OPENWEATHER_API_KEY}`;
        // return fetchWeatherData(url, 'getWeatherByName');

        console.log('output = ', output);
        return output;
        // return {
        //     output.weather.main,
        //     output.weather.description,

        // }
    } catch (err) {
        console.error('Помилка при отриманні погоди по назві міста:', err);

        return {
            status: 500,
            message: 'Помилка при запиті погоди. Спробуйте ще раз пізніше.',
        };

    }
}