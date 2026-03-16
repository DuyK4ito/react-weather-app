import { useState } from "react";

function SearchBox({ onSearch }) {
    const [city, setCity] = useState("");

    const handleSearch = () => {
        const normalizedCityInput = city.replace(/\s+/g, " ").trim();
        onSearch(normalizedCityInput);
        setCity("");
    };

    return (
        <div className="flex w-full md:w-auto relative group">
            <input
                type="text"
                placeholder="Enter city name..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                }}
                className="w-full md:w-80 bg-white/70 backdrop-blur-sm border border-white/60 text-slate-700 px-6 py-3 rounded-full shadow-sm outline-none focus:ring-4 focus:ring-blue-300/50 transition-all placeholder-slate-500 font-medium"
            />
            <button
                onClick={handleSearch}
                className="absolute right-1 top-1 bottom-1 bg-blue-500 text-white px-6 rounded-full font-bold shadow-md hover:bg-blue-600 hover:shadow-lg transition-all active:scale-95"
            >
                Search
            </button>
        </div>
    );
}

export default SearchBox;
