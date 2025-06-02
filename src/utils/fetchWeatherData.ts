/* eslint-disable @typescript-eslint/no-explicit-any */
interface TypeError {
    status: number;
    message: string;
}

export type WeatherResponse = any | TypeError;

export const fetchWeatherData = async (url: string, method: string): Promise<WeatherResponse> => {

    try {
        const response = await fetch(url);

        if (!response.ok) {
            return {
                status: response.status,
                message: `${method}: Помилка під час отримання погоди...`,
            }
        }

        const json = await response.json();

        return json;

    } catch (err) {
        console.log(`${method}: Fetch error: `, err);
        return {
            status: 500,
            message: `${method}: Невідома помилка при зверненні до API...`,
        }
    }
}