/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

interface TypeError {
    status: number;
    message: string;
}

export type WeatherResponse = any | TypeError;

export const fetchData = async (url: string, method: string): Promise<WeatherResponse> => {

    try {
        const response = await axios.get(url);

        console.log(`called method: ${method},  response in fetchData =`, response);
        
        return response.data;

    } catch (error) {
        console.log(`${method}: Fetch error: `, error);

        return {
            status: 500,
            message: `${method}: Помилка при зверненні до API: ${error}`,
        }
    }
}