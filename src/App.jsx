import { useState } from "react";
import axios from "axios";
import SearchBox from "./assets/components/SearchBox";
import ForecastList from "./assets/components/ForecastList";
import WeatherCard from "./assets/components/WeatherCard";
import LoadingSpinner from "./assets/components/LoadingSpinner";

function App() {
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(false);

    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

    const fetchWeather = async (city) => {
        setLoading(true);
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
                timezone: data.city.timezone,
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
        } finally {
            setTimeout(() => setLoading(false), 500);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-400 via-blue-300 to-indigo-400 flex flex-col items-center justify-center p-4 md:p-6 text-slate-800">
            <div className="w-full max-w-4xl bg-white/40 backdrop-blur-lg border border-white/50 rounded-3xl shadow-2xl p-6 md:p-6">
                <div className="flex flex-col md:flex-row gap-6 w-full items-center justify-between border-b border-white/40 pb-6">
                    <h1 className="text-slate-800 text-3xl font-bold tracking-tight flex items-center gap-2">
                        <span className="text-2xl">🌦️ Weather Forecast</span>
                    </h1>
                    <SearchBox onSearch={fetchWeather} />
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-80">
                        <LoadingSpinner />
                    </div>
                ) : (
                    <div className="mt-6 flex flex-col gap-4">
                        <WeatherCard weather={weather} />
                        <ForecastList forecast={forecast} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
