import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
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

        // ✅ Hotels (only if cityCode looks valid)
        if (cityCode && cityCode.length === 3) {
          const hotelResults = await searchHotelsByCity(
            cityCode,
            "2025-09-01",
            "2025-09-05",
            1
          );
          setHotels(hotelResults);
        } else {
          setHotels([]); // fallback for demo destinations
        }

        // ✅ Flights (same idea – only if cityCode is valid)
        if (cityCode && cityCode.length === 3) {
          const flightResults = await searchFlights(
            "LON",
            cityCode,
            "2025-09-01",
            "2025-09-05",
            1
          );
          setFlights(flightResults);
        } else {
          setFlights([]); // skip invalid codes
        }

        // ✅ Weather (still works even if cityCode isn’t valid)
        try {
          const query = lat && lon ? `lat=${lat}&lon=${lon}` : `q=${cityName}`;
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?${query}&appid=${apiKey}&units=metric`
          );
          if (!res.ok) throw new Error("Weather not found");
          const data = await res.json();
          setWeather(data);
        } catch (err) {
          console.warn("Weather fetch failed:", err.message);
          setWeather(null);
        }
      } catch (err) {
        console.error("Error fetching destination details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cityCode, cityName, lat, lon]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#03547c] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-medium text-gray-600">Laoding data...</p>
        </div>
      </div>
    );

  return (
    <div className="p-6 space-y-8">
      {/* City Header */}
      <div className="flex items-center space-x-3">
        <MapPin className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">{cityName}</h1>
      </div>

      {/* Weather */}
      {weather?.main && (
        <div className="flex items-center space-x-3 bg-blue-50 p-4 rounded-lg">
          <Cloud className="h-6 w-6 text-[#03547c]" />
          <p className="text-lg">
            {weather.main.temp}°C, {weather.weather[0].description}
          </p>
        </div>
      )}

      {/* Hotels */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Hotels</h2>
        {hotels.length ? (
          <ul className="grid gap-4 md:grid-cols-2">
            {hotels.map((hotel) => (
              <li
                key={hotel.id || hotel.name}
                className="p-4 border rounded-lg relative"
              >
                <h3 className="font-semibold text-lg">{hotel.name}</h3>
                <p className="text-sm text-gray-600">{hotel.address}</p>
                <p className="text-sm text-gray-600">{hotel.description}</p>
                <p className="mt-2 text-[#03547c] font-bold">
                  {hotel.price || "Pricing not available"}
                </p>

                {/* Details link */}
                <div className="mt-3 flex justify-end">
                  <Link
                    to={`/hotels/${hotel.id}`}
                    className="flex items-center text-sm text-[#03547c] hover:underline"
                  >
                    Details
                    <span className="ml-1">→</span>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          !flights.length && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">About {cityName}</h3>
              <p className="text-gray-700">
                {cityName} is one of our featured demo destinations. Explore
                beautiful sights, cultural attractions, and rich history.
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                <li>Popular for tourism and culture</li>
                <li>Great food, arts, and experiences</li>
                <li>Click search above to see available hotels</li>
              </ul>
            </div>
          )
        )}
      </section>

      {/* Flights */}
      <section>
        <h2 className="text-xl font-semibold mb-3 flex items-center space-x-2">
          <Plane className="h-5 w-5" /> <span>Flights</span>
        </h2>
        {flights.length ? (
          <ul className="space-y-3">
            {flights.map((flight) => {
              const segment = flight.itineraries?.[0]?.segments?.[0];
              return (
                <li
                  key={
                    flight.id ||
                    `${segment?.departure?.iataCode}-${segment?.arrival?.iataCode}-${flight.price?.total}`
                  }
                  className="p-4 border rounded-lg"
                >
                  {segment ? (
                    <>
                      <p className="font-medium">
                        {segment.departure.iataCode} (
                        {new Date(segment.departure.at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        ) →{segment.arrival.iataCode} (
                        {new Date(segment.arrival.at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        )
                      </p>
                      <p className="text-sm text-gray-500">
                        Airline: {segment.carrierCode} {segment.number}
                      </p>
                      <p className="text-sm text-gray-500">
                        Duration: {flight.itineraries?.[0]?.duration || "N/A"}
                      </p>
                    </>
                  ) : (
                    <p>Flight info unavailable</p>
                  )}
                  <p className="mt-2 font-bold text-[#03547c]">
                    {flight.price?.total
                      ? `${flight.price.total} ${flight.price.currency}`
                      : "No price available"}
                  </p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No flights found.</p>
        )}
      </section>
    </div>
  );
};

export default DestinationDetails;
