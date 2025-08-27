import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, MapPin, Hotel, Star } from "lucide-react";
import DestinationCard from "../components/DestinationCard";
import { useTravel } from "../hooks/useTravel";
import { DESTINATIONS_DATA, DESTINATION_CATEGORIES } from "../utils/travel";

// Images
import mountainImage from "../assets/mountain-lake.jpg";
import cityImage from "../assets/europeancity.jpg";
import templeImage from "../assets/japanese-temple.jpg";
import heroImage from "../assets/heroImage.jpg";
import pragueImage from "../assets/prague-castle.png";
import santoriniImage from "../assets/santorini-white.png";

const Destinations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const searchTimeout = useRef(null);

  const { searchHotel, hotels, loading: hotelLoading } = useTravel();
  const navigate = useNavigate();

  // Map hardcoded destinations to images
  const destinations = DESTINATIONS_DATA.map((destination) => {
    switch (destination.name) {
      case "Swiss Alps":
        return { ...destination, image: mountainImage };
      case "Prague":
        return { ...destination, image: pragueImage };
      case "Kyoto":
        return { ...destination, image: templeImage };
      case "Santorini":
        return { ...destination, image: santoriniImage };
      case "New York City":
        return { ...destination, image: cityImage };
      case "Bali":
        return { ...destination, image: heroImage };
      default:
        return destination;
    }
  });

  const filters = DESTINATION_CATEGORIES;

  // Filter destinations
  const filteredDestinations = destinations.filter((destination) => {
    const matchesSearch =
      destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (destination.country?.toLowerCase().includes(searchQuery.toLowerCase()) ??
        false);
    const matchesFilter =
      selectedFilter === "All" || destination.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  // Debounced hotel search for 3+ chars
  useEffect(() => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    if (searchQuery.length >= 3) {
      searchTimeout.current = setTimeout(() => {
        searchHotel({
          cityCode: searchQuery,
          checkInDate: new Date(Date.now() + 86400000)
            .toISOString()
            .split("T")[0],
          checkOutDate: new Date(Date.now() + 2 * 86400000)
            .toISOString()
            .split("T")[0],
        });
      }, 1000);
    }

    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
    };
  }, [searchQuery, searchHotel]);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="pt-8 pb-8 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Explore Destinations</h1>
            <p className="text-xl text-gray-600">
              Discover amazing places around the world
            </p>
          </div>

          {/* Search + Filters */}
          <section className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search destinations or cities for hotels..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
                />
                {hotelLoading && searchQuery.length >= 3 && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#03547c]"></div>
                  </div>
                )}
              </div>
              <button className="flex items-center gap-2 border rounded-md px-4 py-2 hover:bg-gray-100">
                <Filter className="h-4 w-4" />
                Advanced Filters
              </button>
            </div>

            {/* Category Filters */}
            {searchQuery.length < 3 && (
              <nav className="flex flex-wrap gap-2 justify-center">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-4 py-1.5 rounded-full border ${
                      selectedFilter === filter
                        ? "bg-[#03547c]  text-white border-[#03547c]"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </nav>
            )}
          </section>
        </div>
      </header>

      {/* Results */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {searchQuery.length >= 3 ? (
            // HOTELS VIEW
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <Hotel className="h-6 w-6 text-" />
                <h2 className="text-2xl font-semibold">
                  Hotels in {searchQuery} ({hotels.length} found)
                </h2>
              </div>

              {hotelLoading ? (
                <p className="text-center text-gray-500">Searching hotels...</p>
              ) : hotels.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {hotels.map((hotel, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="h-48 overflow-hidden">
                        <img src={santoriniImage} 
                        alt={hotel.name} 
                        className="w-full h-full object-cover"
                        />
                      
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2">
                          {hotel.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {hotel.address}
                        </p>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(hotel.rating || 0)
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">
                            ({hotel.rating || "N/A"})
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-[#03547c]">
                            {hotel.price}
                          </span>
                          <span className="text-sm text-gray-500">
                            per night
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">
                  No hotels found for "{searchQuery}"
                </p>
              )}
            </div>
          ) : (
            // DESTINATIONS VIEW
            <>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold">
                  {filteredDestinations.length} destinations found
                </h2>
                <div className="flex items-center gap-2 text-gray-500">
                  <MapPin className="h-4 w-4" />
                  <span>Sort by popularity</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDestinations.map((destination) => {
                  const destinationId =
                    destination.iataCode || destination.id || destination.name;
                  const lat = destination.geoCode?.latitude;
                  const lon = destination.geoCode?.longitude;
                  const cityName =
                    destination.address?.cityName || destination.name;

                  return (
                    <DestinationCard
                      key={destinationId}
                      name={destination.name}
                      country={destination.address?.countryName || destination.country || "Unknown"}
                      description={destination.description}
                      image={destination.image || "/assets/europeancity.jpg"}
                      rating={destination.rating || 4.5}
                      price={destination.price || "From $200"}
                      tags={destination.tags || ["Popular"]}
                      disabled={false}
                      onClick={() =>
                        navigate(
                          `/destinations/${destinationId}/${encodeURIComponent(
                            cityName
                          )}`,
                          { state: { lat, lon, cityName } }
                        )
                      }
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default Destinations;
