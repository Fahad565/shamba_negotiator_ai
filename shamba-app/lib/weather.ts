export interface WeatherData {
    temp: number;
    condition: string;
    forecast: string;
    rainfallProbability: number;
}

export async function getWeatherData(lat: number, lon: number): Promise<WeatherData> {
    // In a real app, you would fetch from OpenWeatherMap or similar:
    // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}`);
    
    // For the hackathon demonstration, we simulate data for the Kitale/Kenya region
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                temp: 24,
                condition: "Overcast",
                forecast: "Heavy rains expected in the next 48 hours in the North Rift region.",
                rainfallProbability: 85,
            });
        }, 500);
    });
}

export function getWeatherInsight(weather: WeatherData) {
    if (weather.rainfallProbability > 70) {
        return "Heavy rains are coming. Transport might be slow, which usually makes local supply drop and prices rise slightly at retail hubs, but brokers might offer less due to logistics risks.";
    }
    return "Weather is clear. Normal harvest conditions apply.";
}
