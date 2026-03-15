import { useState, useEffect } from "react";
import SunWithClouds from "../../assets/sun-with-cloud.png";
import Winter from "../../assets/winter.png";
import Rain from "../../assets/rain.png";
import Summer from "../../assets/summer.png";
import humidity from "../../assets/humidity.png";
import wind from "../../assets/wind.png";

function WeatherCard({ weather }) {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [weatherImage, setWeatherImage] = useState(SunWithClouds);

    useEffect(() => {
        if (weather && weather.timezone !== undefined) {
            const now = new Date();
            const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
            const cityTime = new Date(utcTime + weather.timezone * 1000);
            setCurrentTime(cityTime);
        }
    }, [weather]);

    useEffect(() => {
        if (!weather) return;

        const desc = weather.desc.toLowerCase();

        if (desc.includes("rain")) {
            setWeatherImage(Rain);
        } else if (desc.includes("snow")) {
            setWeatherImage(Winter);
        } else if (desc.includes("clear")) {
            setWeatherImage(Summer);
        } else if (desc.includes("cloud")) {
            setWeatherImage(SunWithClouds);
        } else {
            setWeatherImage(SunWithClouds);
        }
    }, [weather]);

    if (!weather) return null;

    const formattedTime = currentTime.toLocaleTimeString("vi", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div className="flex flex-col items-center text-center mt-2">
            <h2 className="text-2xl md:text-4xl font-bold text-slate-800 tracking-wide capitalize">
                {weather.city}
            </h2>
            <p className="text-sm md:text-base mt-3 font-semibold text-slate-600 uppercase tracking-wide">
                {currentTime.toLocaleDateString("vi", {
                    weekday: "long",
                })}{" "}
                - {formattedTime}
            </p>

            <div className="flex justify-center mt-6 mb-2">
                <img
                    src={weatherImage}
                    alt={weather.desc}
                    className="w-20 md:w-36 drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                />
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tighter">
                {weather.temp}°C
            </h1>
            <p className="text-lg md:text-lg mt-3 font-medium text-slate-500 italic capitalize">
                {weather.desc}
            </p>

            <div className="flex flex-wrap gap-4 md:gap-6 mt-8 justify-center w-full">
                {/* Humidity Card */}
                <div className="bg-white/50 backdrop-blur-md border border-white/40 px-6 py-4 flex items-center justify-center gap-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow w-44">
                    <div className="w-10 opacity-80">
                        <img
                            src={humidity}
                            className="w-full drop-shadow-md"
                            alt="Humidity"
                        />
                    </div>
                    <div className="text-left">
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                            Độ ẩm
                        </p>
                        <p className="font-bold text-blue-600 text-xl">
                            {weather.humidity}%
                        </p>
                    </div>
                </div>

                {/* Wind Card */}
                <div className="bg-white/50 backdrop-blur-md border border-white/40 px-6 py-4 flex items-center justify-center gap-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow w-44">
                    <div className="w-10 opacity-80">
                        <img
                            src={wind}
                            className="w-full drop-shadow-md"
                            alt="Wind"
                        />
                    </div>
                    <div className="text-left">
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                            Gió
                        </p>
                        <p className="font-bold text-blue-600 text-xl">
                            {weather.wind}
                            <span className="text-sm font-semibold">m/s</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherCard;
