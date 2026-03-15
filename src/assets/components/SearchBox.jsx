import { useState } from "react";

function SearchBox({ onSearch }) {
    const [city, setCity] = useState("");

    const handleSearch = () => {
        const normalizedCityInput = city.replace(/\s+/g, " ").trim();
        onSearch(normalizedCityInput);
    };

    return (
        <div className="flex gap-2 mt-6">
            <input
                type="text"
                placeholder="Enter city name..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                }}
                className="border-2 p-2 border-gray-400 w-60 outline-none "
            />
            <button
                onClick={handleSearch}
                className="bg-blue-500 text-white px-5 py-1 rounded-lg hover:bg-blue-600"
            >
                Search
            </button>
        </div>
    );
}

export default SearchBox;
