import { useState } from "react";
import axios from "axios";
import SearchBox from "./assets/components/SearchBox";
import ForecastList from "./assets/components/ForecastList";
import WeatherCard from "./assets/components/WeatherCard";

function App() {
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [loading] = useState(false);

    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

    const fetchWeather = async (city) => {
        try {
            const res = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=vi`
            );

            const data = res.data;
            const today = data.list[0];

            setWeather({
                city: data.city.name,
                temp: today.main.temp,
                desc: today.weather[0].description,
                humidity: today.main.humidity,
                wind: today.wind.speed,
            });

            // Filter forecast for the next 5 days (one per day)
            const daily = data.list
                .filter((item) => item.dt_txt.includes("12:00:00"))
                .map((day) => ({
                    date: new Date(day.dt_txt).toLocaleDateString("vi", {
                        weekday: "long",
                    }),
                    temp: Math.round(day.main.temp),
                    desc: day.weather[0].description,
                    icon: day.weather[0].icon,
                }));

            setForecast(daily);
        } catch (error) {
            alert("City not found!");
        }
    };

    return (
        <div className="min-h-screen bg-blue-200 flex flex-col items-center px-5 ">
            <div className="flex flex-col md:flex-row gap-4 w-full items-center justify-between">
                <h1 className="text-blue-500 text-2xl font-bold mt-10">
                    🌦️ Weather Forecast
                </h1>
                <SearchBox onSearch={fetchWeather} />
            </div>
            {loading ? (
                <p className="text-gray-600 mt-14">Loading...</p>
            ) : (
                <>
                    <WeatherCard weather={weather} />
                    <ForecastList forecast={forecast} />
                </>
            )}
        </div>
    );
}

export default App;
