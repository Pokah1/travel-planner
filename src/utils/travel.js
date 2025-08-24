// Travel utility functions and constants

// Date formatting helper
export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

// Time formatting helper
export function formatTime(timeString) {
  return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
}

// Duration calculation (in minutes to hours/minutes)
export function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
}

// Format destination data from Amadeus API
export function formatDestinationData(destination) {
  return {
    id: destination.id,
    name: destination.name,
    iataCode: destination.iataCode,
    type: destination.subType,
    country: destination.address?.countryName || "",
    countryCode: destination.address?.countryCode || "",
    city: destination.address?.cityName || destination.name,
    displayName: `${destination.name}, ${destination.address?.countryName || ""}`,
  }
}

// Format flight data from Amadeus API
export function formatFlightData(flightOffer) {
  const itinerary = flightOffer.itineraries[0]
  const segment = itinerary.segments[0]
  const lastSegment = itinerary.segments[itinerary.segments.length - 1]

  return {
    id: flightOffer.id,
    price: {
      total: flightOffer.price.total,
      currency: flightOffer.price.currency,
    },
    airline: segment.carrierCode,
    departure: {
      airport: segment.departure.iataCode,
      time: segment.departure.at,
      formattedTime: formatTime(segment.departure.at.split("T")[1]),
    },
    arrival: {
      airport: lastSegment.arrival.iataCode,
      time: lastSegment.arrival.at,
      formattedTime: formatTime(lastSegment.arrival.at.split("T")[1]),
    },
    duration: formatDuration(itinerary.duration.replace("PT", "").replace("H", ":").replace("M", "")),
    stops: itinerary.segments.length - 1,
    segments: itinerary.segments.length,
    bookingClass: segment.cabin || "ECONOMY",
  }
}

// Format hotel data from Amadeus API
export function formatHotelData(hotelOffer) {
  const hotel = hotelOffer.hotel
  const offer = hotelOffer.offers[0]

  return {
    id: hotel.hotelId,
    name: hotel.name,
    rating: hotel.rating || 0,
    price: {
      total: offer.price.total,
      currency: offer.price.currency,
      perNight: Math.round(offer.price.total / offer.price.variations?.changes?.length || 1),
    },
    room: {
      type: offer.room.type,
      description: offer.room.description?.text || "Standard Room",
    },
    address: hotel.address || {},
    amenities: hotel.amenities || [],
    checkIn: offer.checkInDate,
    checkOut: offer.checkOutDate,
    guests: offer.guests.adults,
  }
}

// Validation helpers
export function isValidDate(dateString) {
  const date = new Date(dateString)
  return date instanceof Date && !isNaN(date) && date >= new Date().setHours(0, 0, 0, 0)
}

export function isValidIataCode(code) {
  return /^[A-Z]{3}$/.test(code)
}

// Constants
export const AMADEUS_ENDPOINTS = {
  TOKEN: "/v1/security/oauth2/token",
  DESTINATIONS: "/v1/reference-data/locations/cities",
  FLIGHTS: "/v2/shopping/flight-offers",
  HOTELS_BY_CITY: "/v1/reference-data/locations/hotels/by-city",
  HOTEL_OFFERS: "/v3/shopping/hotel-offers",
}

export const DEFAULT_SEARCH_PARAMS = {
  adults: 1,
  maxResults: 10,
  radius: 20,
  radiusUnit: "KM",
}


export const DESTINATIONS_DATA = [
  {
    id: 1,
    name: "Swiss Alps",
    country: "Switzerland",
    category: "Adventure",
    image: "/swiss-alps-snowy-peaks.png",
    description: "Breathtaking mountain peaks and pristine alpine lakes.",
    rating: 4.9,
    price: "$299",
  },
  {
    id: 2,
    name: "Prague",
    country: "Czech Republic",
    category: "Culture",
    image: "/prague-castle-old-town.png",
    description: "Medieval architecture and rich cultural heritage.",
    rating: 4.8,
    price: "$189",
  },
  {
    id: 3,
    name: "Kyoto",
    country: "Japan",
    category: "Culture",
    image: "/kyoto-temples-gardens.png",
    description: "Ancient temples and traditional Japanese gardens.",
    rating: 4.9,
    price: "$349",
  },
  {
    id: 4,
    name: "Santorini",
    country: "Greece",
    category: "Beach",
    image: "/santorini-white-buildings-blue-sea.png",
    description: "Stunning sunsets and iconic white-washed buildings.",
    rating: 4.7,
    price: "$279",
  },
  {
    id: 5,
    name: "New York City",
    country: "USA",
    category: "City",
    image: "/placeholder-7mbjg.png",
    description: "The city that never sleeps with endless attractions.",
    rating: 4.6,
    price: "$399",
  },
  {
    id: 6,
    name: "Bali",
    country: "Indonesia",
    category: "Beach",
    image: "/bali-beach-rice.png",
    description: "Tropical paradise with beautiful beaches and culture.",
    rating: 4.8,
    price: "$229",
  },
]

export const DESTINATION_CATEGORIES = ["All", "Adventure", "Culture", "Beach", "City"]