import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { searchHotelsByCity, searchFlights } from "../services/amadeus";
import { MapPin, Cloud, Plane } from "lucide-react";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

const DestinationDetails = () => {
  const { cityCode, cityName: paramCityName } = useParams();
  const location = useLocation();
  const { lat, lon, cityName: stateCityName } = location.state || {};

  const [hotels, setHotels] = useState([]);
  const [flights, setFlights] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const cityName = stateCityName || paramCityName;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const hotelResults = await searchHotelsByCity(cityCode, "2025-09-01", "2025-09-05", 1);
        setHotels(hotelResults);

        const flightResults = await searchFlights("LON", cityCode, "2025-09-01", "2025-09-10", 1);
        setFlights(flightResults);

        // Weather
        const query = lat && lon ? `lat=${lat}&lon=${lon}` : `q=${cityName}`;
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?${query}&appid=${apiKey}&units=metric`);
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        console.error("Error fetching destination details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cityCode, cityName, lat, lon]);

  if (loading) return <p className="p-4">Loading details...</p>;

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center space-x-3">
        <MapPin className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">{cityName}</h1>
      </div>

      {weather?.main && (
        <div className="flex items-center space-x-3 bg-blue-50 p-4 rounded-lg">
          <Cloud className="h-6 w-6 text-blue-600" />
          <p className="text-lg">
            {weather.main.temp}°C, {weather.weather[0].description}
          </p>
        </div>
      )}

      {/* Hotels */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Hotels</h2>
        {hotels.length ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hotels.map((hotel) => (
              <li key={hotel.id} className="p-4 border rounded-lg">
                <h3 className="font-medium">{hotel.name}</h3>
                <p>{hotel.address}</p>
                <p className="text-sm text-gray-500">{hotel.price || "No price available"}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hotels found.</p>
        )}
      </section>

      {/* Flights */}
      <section>
        <h2 className="text-xl font-semibold mb-3 flex items-center space-x-2">
          <Plane className="h-5 w-5" /> <span>Flights</span>
        </h2>
        {flights.length ? (
          <ul className="space-y-3">
            {flights.map((flight, idx) => (
              <li key={idx} className="p-4 border rounded-lg">
                <p>
                  {flight.origin} → {flight.destination}
                </p>
                <p className="text-sm text-gray-500">{flight.price || "No price available"}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No flights found.</p>
        )}
      </section>
    </div>
  );
};

export default DestinationDetails;
