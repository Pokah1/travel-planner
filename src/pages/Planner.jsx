// Planner.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { useParams } from "react-router-dom";
import { saveTrip, getTrip, getUserTrips } from "../utils/saveTrip";
import { Plus, Trash2, Save, Plane } from "lucide-react";

const Planner = () => {
  const { tripId } = useParams();
  const { user, loading: authLoading } = useAuth();

  const [tripName, setTripName] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [itinerary, setItinerary] = useState([]);

  const [newItem, setNewItem] = useState({
    title: "",
    location: "",
    time: "",
    type: "attraction",
    day: 1,
  });

  const [userTrips, setUserTrips] = useState([]);
  const [loadingTrips, setLoadingTrips] = useState(true);

  useEffect(() => {
    const fetchTripData = async () => {
      if (!user || !tripId) return;
      const data = await getTrip(user.uid, tripId);
      if (data) {
        setTripName(data.tripName || "");
        setDestination(data.destination || "");
        setStartDate(data.startDate || "");
        setEndDate(data.endDate || "");
        setImageUrl(data.imageUrl || "");
        setItinerary(data.itinerary || []);
      }
    };
    fetchTripData();
  }, [user, tripId]);

  useEffect(() => {
    const fetchUserTrips = async () => {
      if (!user) return setLoadingTrips(false);
      const trips = await getUserTrips(user.uid);
      setUserTrips(trips);
      setLoadingTrips(false);
    };
    fetchUserTrips();
  }, [user]);

  const addItineraryItem = () => {
    if (newItem.title && newItem.location && newItem.time) {
      setItinerary([...itinerary, { ...newItem, id: Date.now().toString() }]);
      setNewItem({
        title: "",
        location: "",
        time: "",
        type: "attraction",
        day: 1,
      });
    }
  };

  const removeItineraryItem = (id) =>
    setItinerary(itinerary.filter((item) => item.id !== id));

  const handleSaveTrip = async () => {
    if (!user) return alert("Please log in to save your trip");
    if (!tripName || !destination || !startDate || !endDate)
      return alert("Please fill in all trip details.");

    try {
      const tripData = {
        tripName,
        destination,
        startDate,
        endDate,
        itinerary,
        imageUrl,
      };

      await saveTrip(user.uid, tripData, tripId || null);

      alert(
        tripId ? "Trip updated successfully!" : "New trip saved successfully!"
      );

      const trips = await getUserTrips(user.uid);
      setUserTrips(trips);

      if (!tripId) {
        setTripName("");
        setDestination("");
        setStartDate("");
        setEndDate("");
        setImageUrl("");
        setItinerary([]);
      }
    } catch (error) {
      console.error("Error saving trip:", error);
      alert("Failed to save trip. Please try again.");
    }
  };

  if (authLoading || loadingTrips)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#03547c] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-medium text-gray-600">Please wait...</p>
        </div>
      </div>
    );
  if (!user)
    return (
      <p className="text-center py-8">
        Please log in to access your travel planner.
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Plane size={28} className="text-[#03547c]" />
          {tripId ? "Edit Trip" : "Plan Your Trip"}
        </h1>

        {/* Trip Details */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <input
            placeholder="Trip Name"
            value={tripName}
            onChange={(e) => setTripName(e.target.value)}
            className="border-2 border-gray-300 focus:border-[#03547c] focus:ring-[#03547c] focus:ring-1 p-3 rounded-lg w-full shadow-sm"
          />
          <input
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="border-2 border-gray-300 focus:border-[#03547c] focus:ring-[#03547c] focus:ring-1 p-3 rounded-lg w-full shadow-sm"
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border-2 border-gray-300 focus:border-[#03547c] focus:ring-[#03547c] focus:ring-1 p-3 rounded-lg w-full shadow-sm"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border-2 border-gray-300 focus:border-[#03547c] focus:ring-[#03547c] focus:ring-1 p-3 rounded-lg w-full shadow-sm"
          />
          <input
            placeholder="Image URL (optional)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="border-2 border-gray-300 focus:border-[#03547c] focus:ring-[#03547c] focus:ring-1 p-3 rounded-lg w-full shadow-sm"
          />
        </div>

        {/* Preview Image */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Trip"
            className="w-full h-48 object-cover rounded-lg shadow mb-8"
          />
        )}

        {/* Itinerary Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Itinerary
          </h2>
          {itinerary.length === 0 ? (
            <p className="text-gray-500">
              No itinerary items yet. Add one below 👇
            </p>
          ) : (
            <div className="space-y-2">
              {itinerary.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-gray-50 border rounded-lg shadow-sm"
                >
                  <span className="text-gray-700">
                    <span className="font-semibold">Day {item.day}:</span>{" "}
                    {item.title} @ {item.location} — {item.time}
                  </span>
                  <button
                    onClick={() => removeItineraryItem(item.id)}
                    className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Activity */}
        <div className="bg-gray-50 p-4 rounded-xl border mb-8">
          <h3 className="font-semibold text-gray-700 mb-3">Add Activity</h3>
          <div className="grid md:grid-cols-5 gap-3">
            <input
              placeholder="Activity title"
              value={newItem.title}
              onChange={(e) =>
                setNewItem({ ...newItem, title: e.target.value })
              }
              className="border-2 border-gray-300 focus:border-[#03547c] focus:ring-[#03547c] focus:ring-1 p-3 rounded-lg w-full shadow-sm"
            />
            <input
              placeholder="Location"
              value={newItem.location}
              onChange={(e) =>
                setNewItem({ ...newItem, location: e.target.value })
              }
              className="border-2 border-gray-300 focus:border-[#03547c] focus:ring-[#03547c] focus:ring-1 p-3 rounded-lg w-full shadow-sm"
            />
            <input
              type="time"
              value={newItem.time}
              onChange={(e) => setNewItem({ ...newItem, time: e.target.value })}
              className="border-2 border-gray-300 focus:border-[#03547c] focus:ring-[#03547c] focus:ring-1 p-3 rounded-lg w-full shadow-sm"
            />
            <select
              value={newItem.type}
              onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
              className="border-2 border-gray-300 focus:border-[#03547c] focus:ring-[#03547c] focus:ring-1 p-3 rounded-lg w-full shadow-sm"
            >
              <option value="attraction">Attraction</option>
              <option value="restaurant">Restaurant</option>
              <option value="hotel">Hotel</option>
              <option value="activity">Activity</option>
            </select>
            <select
              value={newItem.day}
              onChange={(e) =>
                setNewItem({ ...newItem, day: Number(e.target.value) })
              }
              className="input-field"
            >
              {Array.from(
                { length: Math.max(...itinerary.map((i) => i.day), 1) + 10 }, // 10-day buffer
                (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Day {i + 1}
                  </option>
                )
              )}
            </select>
          </div>
          <button
            onClick={addItineraryItem}
            className="mt-4 flex items-center gap-2 bg-[#03547c] text-white py-2 px-6 rounded-lg shadow hover:bg-[#024061]"
          >
            <Plus size={18} />
            Add to Itinerary
          </button>
        </div>

        {/* Saved Trips */}
        {userTrips.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Your Saved Trips
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {userTrips.map((trip) => (
                <div
                  key={trip.id}
                  className="bg-white border rounded-lg shadow p-3"
                >
                  <h3 className="font-medium">{trip.tripName}</h3>
                  {trip.imageUrl && (
                    <img
                      src={trip.imageUrl}
                      alt={trip.tripName}
                      className="w-full h-28 object-cover rounded mt-2"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end">
          <div className="flex justify-end">
            <button
              onClick={handleSaveTrip}
              className="flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-lg shadow hover:bg-green-700"
            >
              <Save size={18} />
              Save Trip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planner;
