"use client"

import { useState } from "react"

const TravelPlanner = () => {
  const [tripName, setTripName] = useState("")
  const [destination, setDestination] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [itinerary, setItinerary] = useState([
    {
      id: "1",
      title: "Check into Hotel",
      location: "Downtown Prague",
      time: "15:00",
      type: "hotel",
      day: 1,
    },
    {
      id: "2",
      title: "Prague Castle Tour",
      location: "Prague Castle",
      time: "10:00",
      type: "attraction",
      day: 2,
    },
    {
      id: "3",
      title: "Traditional Czech Dinner",
      location: "Old Town Square",
      time: "19:00",
      type: "restaurant",
      day: 2,
    },
  ])

  const [newItem, setNewItem] = useState({
    title: "",
    location: "",
    time: "",
    type: "attraction",
    day: 1,
  })

  const addItineraryItem = () => {
    if (newItem.title && newItem.location && newItem.time) {
      setItinerary([
        ...itinerary,
        {
          ...newItem,
          id: Date.now().toString(),
        },
      ])
      setNewItem({
        title: "",
        location: "",
        time: "",
        type: "attraction",
        day: 1,
      })
    }
  }

  const removeItineraryItem = (id) => {
    setItinerary(itinerary.filter((item) => item.id !== id))
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case "attraction":
        return "🏛️"
      case "restaurant":
        return "🍽️"
      case "hotel":
        return "🏨"
      case "activity":
        return "🎯"
      default:
        return "📍"
    }
  }

  const groupedItinerary = itinerary.reduce((acc, item) => {
    if (!acc[item.day]) acc[item.day] = []
    acc[item.day].push(item)
    return acc
  }, {})

  const days = Math.max(...Object.keys(groupedItinerary).map(Number), 3)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Plan Your Trip</h1>

        {/* Trip Details */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Trip Details</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              placeholder="Trip Name"
              value={tripName}
              onChange={(e) => setTripName(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <input
              placeholder="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>
        </div>

        {/* Add Activity */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Add Activity</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            <input
              placeholder="Activity title"
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              className="border p-2 rounded w-full"
            />
            <input
              placeholder="Location"
              value={newItem.location}
              onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
              className="border p-2 rounded w-full"
            />
            <input
              type="time"
              value={newItem.time}
              onChange={(e) => setNewItem({ ...newItem, time: e.target.value })}
              className="border p-2 rounded w-full"
            />
            <select
              value={newItem.type}
              onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
              className="border p-2 rounded w-full"
            >
              <option value="attraction">Attraction</option>
              <option value="restaurant">Restaurant</option>
              <option value="hotel">Hotel</option>
              <option value="activity">Activity</option>
            </select>
            <select
              value={newItem.day}
              onChange={(e) => setNewItem({ ...newItem, day: Number(e.target.value) })}
              className="border p-2 rounded w-full"
            >
              {Array.from({ length: days }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Day {i + 1}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={addItineraryItem}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Add to Itinerary
          </button>
        </div>

        {/* Itinerary */}
        {Array.from({ length: days }, (_, i) => i + 1).map((day) => (
          <div key={day} className="bg-white p-6 rounded-lg shadow mb-6">
            <h3 className="text-lg font-semibold mb-4">Day {day}</h3>
            {groupedItinerary[day]?.length > 0 ? (
              groupedItinerary[day]
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getTypeIcon(item.type)}</span>
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-gray-600">
                          {item.time} — {item.location}
                        </p>
                      </div>
                    </div>
                    <button onClick={() => removeItineraryItem(item.id)} className="text-red-600 hover:underline">
                      Remove
                    </button>
                  </div>
                ))
            ) : (
              <p className="text-gray-500">No activities planned yet.</p>
            )}
          </div>
        ))}

        {/* Save button */}
        <div className="text-center mt-8">
          <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Save Itinerary</button>
        </div>
      </div>
    </div>
  )
}

export default TravelPlanner
