import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { saveTrip as saveTripUtil } from "../utils/saveTrip";
import { useAuth } from "../context/useAuth";

const Planner = () => {
  const { user, loading: authLoading } = useAuth();

  const [tripName, setTripName] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [userTrips, setUserTrips] = useState([]);
  const [tripsLoading, setTripsLoading] = useState(true);

  const [itinerary, setItinerary] = useState([
    { id: "1", title: "Check into Hotel", location: "Downtown Prague", time: "15:00", type: "hotel", day: 1 },
    { id: "2", title: "Prague Castle Tour", location: "Prague Castle", time: "10:00", type: "attraction", day: 2 },
    { id: "3", title: "Traditional Czech Dinner", location: "Old Town Square", time: "19:00", type: "restaurant", day: 2 },
  ]);

  const [newItem, setNewItem] = useState({ title: "", location: "", time: "", type: "attraction", day: 1 });

  // New state for optional image URL
  const [imageUrl, setImageUrl] = useState("");

  // Fetch user trips
  useEffect(() => {
    const fetchTrips = async () => {
      if (!user) {
        setTripsLoading(false);
        return;
      }
      try {
        const snap = await getDocs(collection(db, "users", user.uid, "trips"));
        const trips = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setUserTrips(trips);
      } catch (error) {
        console.error("Error fetching trips:", error);
      } finally {
        setTripsLoading(false);
      }
    };
    fetchTrips();
  }, [user]);

  const addItineraryItem = () => {
    if (newItem.title && newItem.location && newItem.time) {
      setItinerary([...itinerary, { ...newItem, id: Date.now().toString() }]);
      setNewItem({ title: "", location: "", time: "", type: "attraction", day: 1 });
    }
  };

  const removeItineraryItem = (id) => setItinerary(itinerary.filter((item) => item.id !== id));

  const handleSaveTrip = async () => {
    if (!user) return alert("Please log in to save your trip.");
    if (!tripName || !destination || !startDate || !endDate)
      return alert("Please fill in all trip details.");

    try {
      const tripData = { tripName, destination, startDate, endDate, itinerary, imageUrl };
      await saveTripUtil(user.uid, tripData);
      alert("Trip saved successfully!");

      // Refresh trips
      const snap = await getDocs(collection(db, "users", user.uid, "trips"));
      const trips = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUserTrips(trips);
      setImageUrl(""); // Reset image URL input
    } catch (error) {
      console.error("Error saving trip:", error);
      alert("Failed to save trip. Please try again.");
    }
  };

  if (authLoading || tripsLoading) return <p>Loading trips...</p>;
  if (!user) return <p>Please log in to access your travel planner.</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Plan Your Trip</h1>

      {/* Trip Details */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <input placeholder="Trip Name" value={tripName} onChange={(e) => setTripName(e.target.value)} className="border p-2 rounded w-full" />
        <input placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} className="border p-2 rounded w-full" />
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border p-2 rounded w-full" />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border p-2 rounded w-full" />
        <input placeholder="Image URL (optional)" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="border p-2 rounded w-full col-span-2" />
      </div>

      {/* Itinerary Items */}
      <div className="mb-4">
        <h2 className="font-semibold mb-2">Itinerary</h2>
        {itinerary.map((item) => (
          <div key={item.id} className="flex justify-between p-2 border rounded mb-1">
            <span>{item.day}. {item.title} — {item.time}</span>
            <button onClick={() => removeItineraryItem(item.id)} className="text-red-600">Remove</button>
          </div>
        ))}
      </div>

      {/* Add Activity */}
      <div className="grid md:grid-cols-5 gap-2 mb-4">
        <input placeholder="Activity title" value={newItem.title} onChange={(e) => setNewItem({ ...newItem, title: e.target.value })} className="border p-2 rounded w-full" />
        <input placeholder="Location" value={newItem.location} onChange={(e) => setNewItem({ ...newItem, location: e.target.value })} className="border p-2 rounded w-full" />
        <input type="time" value={newItem.time} onChange={(e) => setNewItem({ ...newItem, time: e.target.value })} className="border p-2 rounded w-full" />
        <select value={newItem.type} onChange={(e) => setNewItem({ ...newItem, type: e.target.value })} className="border p-2 rounded w-full">
          <option value="attraction">Attraction</option>
          <option value="restaurant">Restaurant</option>
          <option value="hotel">Hotel</option>
          <option value="activity">Activity</option>
        </select>
        <select value={newItem.day} onChange={(e) => setNewItem({ ...newItem, day: Number(e.target.value) })} className="border p-2 rounded w-full">
          {Array.from({ length: Math.max(...itinerary.map(i => i.day), 3) }, (_, i) => <option key={i+1} value={i+1}>Day {i+1}</option>)}
        </select>
      </div>
      {userTrips.length > 0 && (
  <div>
    <h2>Your Saved Trips</h2>
    <ul>
      {userTrips.map(trip => (
        <li key={trip.id}>
          {trip.tripName}{" "}
          {trip.imageUrl && (
            <img
              src={trip.imageUrl}
              alt={trip.tripName}
              className="w-24 h-16 inline-block ml-2 rounded"
            />
          )}
        </li>
      ))}
    </ul>
  </div>
)}


      <button onClick={addItineraryItem} className="bg-[#03547c] text-white py-2 px-4 rounded mb-4">Add to Itinerary</button>

      <button onClick={handleSaveTrip} className="bg-green-600 text-white px-6 py-2 rounded">Save Trip</button>
    </div>
  );
};

export default Planner;
