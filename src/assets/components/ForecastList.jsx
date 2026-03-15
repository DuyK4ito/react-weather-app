function ForecastList({ forecast }) {
    if (!forecast.length) return null;

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
            {forecast.map((day, index) => (
                <div
                    key={index}
                    className="bg-white/40 backdrop-blur-sm border border-white/50 hover:bg-white/60 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md py-5 px-3 rounded-2xl text-center flex flex-col items-center justify-between"
                >
                    <p className="font-bold text-slate-700 uppercase tracking-wide text-sm">
                        {day.date}
                    </p>
                    <img
                        src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                        alt="icon"
                        className="w-16 h-16 my-2 drop-shadow-md"
                    />
                    <p className="text-2xl font-bold text-slate-800">
                        {day.temp}°
                    </p>
                    <p className="text-xs font-semibold text-slate-500 mt-1 capitalize">
                        {day.desc}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default ForecastList;
