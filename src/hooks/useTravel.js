import { useState, useCallback } from "react"
import { searchDestinations, searchFlights, searchHotelsByCity } from "../services/amadeus"
import { formatFlightData, formatDestinationData } from "../utils/travel"

export function useTravel() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [destinations, setDestinations] = useState([])
  const [flights, setFlights] = useState([])
  const [hotels, setHotels] = useState([])

  // Search destinations
  const searchDestination = useCallback(async (keyword) => {
    if (!keyword.trim()) return

    setLoading(true)
    setError(null)

    try {
      const results = await searchDestinations(keyword)
      const formatted = results.map(formatDestinationData)
      setDestinations(formatted)
    } catch (err) {
      setError("Failed to search destinations. Please try again.", err)
      setDestinations([])
    } finally {
      setLoading(false)
    }
  }, [])

  // Search flights
  const searchFlight = useCallback(async (searchParams) => {
    const { origin, destination, departureDate, returnDate, adults } = searchParams

    if (!origin || !destination || !departureDate) {
      setError("Please fill in all required flight search fields.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const results = await searchFlights(origin, destination, departureDate, returnDate, adults)
      const formatted = results.map(formatFlightData)
      setFlights(formatted)
    } catch (err) {
      setError("Failed to search flights. Please try again.", err)
      setFlights([])
    } finally {
      setLoading(false)
    }
  }, [])

  // Search hotels
  const searchHotel = useCallback(async (searchParams) => {
    const { cityCode, checkInDate, checkOutDate, adults } = searchParams

    if (!cityCode || !checkInDate || !checkOutDate) {
      setError("Please fill in all required hotel search fields.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const results = await searchHotelsByCity(cityCode, checkInDate, checkOutDate, adults)
      setHotels(results)
    } catch (err) {
      setError("Failed to search hotels. Please try again.", err)
      setHotels([])
    } finally {
      setLoading(false)
    }
  }, [])

  // Clear all data
  const clearResults = useCallback(() => {
    setDestinations([])
    setFlights([])
    setHotels([])
    setError(null)
  }, [])

  return {
    // State
    loading,
    error,
    destinations,
    flights,
    hotels,

    // Actions
    searchDestination,
    searchFlight,
    searchHotel,
    clearResults,
  }
}
