import { cacheFetch } from "./cache"

const API_KEY = import.meta.env.VITE_TRAVEL_KEY
const API_SECRET = import.meta.env.VITE_TRAVEL_SECRET_PASSWORD
const BASE_URL = "https://test.api.amadeus.com"

// Cache for access token
let accessToken = null
let tokenExpiry = null

// Get OAuth2 access token
async function getAccessToken() {
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) return accessToken

  const response = await fetch(`${BASE_URL}/v1/security/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: API_KEY,
      client_secret: API_SECRET,
    }),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Auth failed: ${response.status} - ${text}`)
  }

  const data = await response.json()
  accessToken = data.access_token
  tokenExpiry = Date.now() + 25 * 60 * 1000
  return accessToken
}

// Search for destinations (cities/airports)
export async function searchDestinations(keyword) {
  return cacheFetch(
    `destinations_${keyword}`,
    async () => {
      const token = await getAccessToken();
      const response = await fetch(
        `${BASE_URL}/v1/reference-data/locations?subType=CITY&keyword=${encodeURIComponent(
          keyword
        )}&page%5Blimit%5D=10`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(
          `Destination search failed: ${response.status} - ${text}`
        );
      }

      const data = await response.json();
      return data.data || [];
    },
    24 * 60 * 60 * 1000 // cache for 24 hours
  );
}

// Search for flights with cache
export async function searchFlights(
  origin,
  destination,
  departureDate,
  returnDate = null,
  adults = 1
) {
  const key = `flights_${origin}_${destination}_${departureDate}_${returnDate}_${adults}`;

  return cacheFetch(
    key,
    async () => {
      const token = await getAccessToken();
      let url = `${BASE_URL}/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${departureDate}&adults=${adults}&max=10`;
      if (returnDate) url += `&returnDate=${returnDate}`;

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Flight search failed: ${response.status} - ${text}`);
      }

      const data = await response.json();
      return data.data || [];
    },
    5 * 60 * 1000 // cache for 5 minutes
  );
}

export async function searchHotelsByCity(cityInput, checkInDate, checkOutDate, adults = 1) {
  // build a unique cache key (city + dates + adults)
  const key = `hotels_${cityInput}_${checkInDate}_${checkOutDate}_${adults}`

  return cacheFetch(
    key,
    async () => {
      const token = await getAccessToken();

      let cityCode = cityInput.toUpperCase();

      // Convert city name to IATA code if needed
      if (cityInput.length > 3 || cityInput.includes(" ")) {
        try {
          const destinations = await searchDestinations(cityInput);
          if (destinations && destinations.length > 0) {
            const cityDestination = destinations.find(d => d.subType === "CITY") || destinations[0];
            cityCode = cityDestination.iataCode;
          }
        // eslint-disable-next-line no-unused-vars
        } catch (_) {
          // fallback to original cityInput
        }
      }

      // Step 1: Find hotels in the city
      const hotelsResponse = await fetch(
        `${BASE_URL}/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}&radius=20&radiusUnit=KM&hotelSource=ALL`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!hotelsResponse.ok) {
        throw new Error(`Hotel search failed: ${hotelsResponse.status}`);
      }

      const hotelsData = await hotelsResponse.json();
      const hotels = hotelsData.data || [];

      if (hotels.length === 0) return [];

      // Step 2: Get offers for first few hotels
      const hotelIds = hotels.slice(0, 10).map(h => h.hotelId).join(",");
      let offersData = { data: [] };

      const offersResponse = await fetch(
        `${BASE_URL}/v3/shopping/hotel-offers?hotelIds=${hotelIds}&adults=${adults}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (offersResponse.ok) {
        offersData = await offersResponse.json();
      }

      // Map hotelId to its offer
      const offersMap = {};
      (offersData.data || []).forEach(offer => {
        if (offer.hotel && offer.offers && offer.offers.length > 0) {
          offersMap[offer.hotel.hotelId] = offer.offers[0];
        }
      });

      // Format all hotels
      return hotels.slice(0, 10).map(hotel => {
        const offer = offersMap[hotel.hotelId] || {};
        const price = offer.price || {};
        const room = offer.room || {};
        const policies = offer.policies || {};

        return {
          name: hotel.name || "Hotel Name Not Available",
          address: hotel.address
            ? `${hotel.address.lines?.[0] || ""}, ${hotel.address.cityName || ""}, ${hotel.address.countryCode || ""}`
                .trim()
                .replace(/^,\s*|,\s*$/g, "")
            : "Address Not Available",
          rating: hotel.rating || "N/A",
          price: price.total ? `${price.total} ${price.currency || ""}` : "Pricing not available in test environment",
          basePrice: price.base ? `${price.base} ${price.currency || ""}` : null,
          pricePerNight: price.variations?.average?.base
            ? `${price.variations.average.base} ${price.currency || ""}`
            : null,
          amenities: hotel.amenities || [],
          description: hotel.description || room.description?.text || "No description available",
          contact: hotel.contact || {},
          chainCode: hotel.chainCode || "Independent",
          roomType: room.type || "Standard",
          bedType: room.typeEstimated?.bedType || "Unknown",
          bedCount: room.typeEstimated?.beds || 1,
          roomDescription: room.description?.text || "Room details not available",
          maxGuests: offer.guests?.adults || adults,
          coordinates:
            hotel.latitude && hotel.longitude
              ? { lat: hotel.latitude, lng: hotel.longitude }
              : null,
          cityCode: hotel.cityCode || cityCode,
          cancellationPolicy: policies.cancellations?.[0]
            ? {
                deadline: policies.cancellations[0].deadline,
                refundable: policies.refundable?.cancellationRefund === "REFUNDABLE_UP_TO_DEADLINE",
              }
            : null,
          paymentType: policies.paymentType || "Unknown",
          checkIn: offer.checkInDate || checkInDate,
          checkOut: offer.checkOutDate || checkOutDate,
          offerId: offer.id || null,
          bookingUrl: offer.self || null,
          hasOffers: !!offer.id,
        };
      });
    },
    60 * 60 * 1000 // cache hotels for 1 hour
  );
}