/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

interface TypeError {
    status: number;
    message: string;
}

export type WeatherResponse = any | TypeError;

export const fetchWeatherData = async (url: string, method: string): Promise<WeatherResponse> => {

    try {
        const response = await axios.get(url);

        console.log('response =', response);
        
        // const response = await fetch(url);

        // if (!response.ok) {
        //     return {
        //         status: response.status,
        //         message: `${method}: Помилка під час отримання погоди...`,
        //     }
        // }

        // const json = await response.json();

        // return json;

    } catch (error) {
        console.log(`${method}: Fetch error: `, error);

        return {
            status: 500,
            message: `${method}: Помилка при зверненні до API: ${error}`,
        }
    }
}