import { useState, useEffect, useRef } from "react"
import { Search, Filter, MapPin, Hotel, Star } from "lucide-react"
import DestinationCard from "../components/DestinationCard"
import { useTravel } from "../hooks/useTravel"
import { DESTINATIONS_DATA, DESTINATION_CATEGORIES } from "../utils/travel"

// Images
import mountainImage from "../assets/mountain-lake.jpg"
import cityImage from "../assets/europeancity.jpg"
import templeImage from "../assets/japanese-temple.jpg"
import heroImage from "../assets/heroImage.jpg"
import pragueImage from "../assets/prague-castle.png"
import santoriniImage from "../assets/santorini-white.png"

const Destinations = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("All")
  const searchTimeout = useRef(null)


  const { searchHotel, hotels, loading: hotelLoading } = useTravel()

  // Hardcoded destinations with mapped images
  const destinations = DESTINATIONS_DATA.map((destination) => {
    switch (destination.name) {
      case "Swiss Alps":
        return { ...destination, image: mountainImage }
      case "Prague":
        return { ...destination, image: pragueImage }
      case "Kyoto":
        return { ...destination, image: templeImage }
      case "Maldives":
        return { ...destination, image: cityImage }
      case "Patagonia":
        return { ...destination, image: heroImage }
      case "Santorini":
        return { ...destination, image: santoriniImage }
      default:
        return destination
    }
  })

  const filters = DESTINATION_CATEGORIES

  // Filter hardcoded destinations (only when not searching hotels)
  const filteredDestinations = destinations.filter((destination) => {
    const matchesSearch =
      destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.country.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = selectedFilter === "All" || destination.category === selectedFilter
    return matchesSearch && matchesFilter
  })

  // Debounce hotel search (only if query is 3+ chars)
  useEffect(() => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current)

     if (searchQuery.length >= 3) {
    searchTimeout.current = setTimeout(() => {
      searchHotel({
        cityCode: searchQuery,
        checkInDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
        checkOutDate: new Date(Date.now() + 2 * 86400000).toISOString().split("T")[0],
      })
    }, 1000)
  }

    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current)
    }
  }, [searchQuery, searchHotel])

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="pt-8 pb-8 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Explore Destinations</h1>
            <p className="text-xl text-gray-600">Discover amazing places around the world</p>
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
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
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
                        ? "bg-blue-600 text-white border-blue-600"
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
            // ----------------- HOTELS VIEW -----------------
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <Hotel className="h-6 w-6 text-blue-600" />
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
                      <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                        <Hotel className="h-16 w-16 text-white opacity-50" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{hotel.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{hotel.address}</p>
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
                          <span className="text-lg font-bold text-blue-600">
                            {hotel.price}
                          </span>
                          <span className="text-sm text-gray-500">per night</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-white rounded-lg">
                  <Hotel className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No hotels found for "{searchQuery}"</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Try searching for major cities like Paris, London, or New York
                  </p>
                </div>
              )}
            </div>
          ) : (
            // ----------------- DESTINATIONS VIEW -----------------
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
                {filteredDestinations.map((destination) => (
                  <DestinationCard
                    key={destination.id}
                    {...destination}
                    onClick={() => console.log("Navigate to:", destination.id)}
                  />
                ))}
              </div>

              {filteredDestinations.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No destinations found</h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filters to find what you're looking for
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  )
}

export default Destinations
