import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { getUserTrips, deleteTrip } from "../utils/saveTrip";

import { Eye, Pencil, Trash2, Calendar, Plane } from "lucide-react"; // added Plane icon

import cityImage from "../assets/europeancity.jpg";
import mountainImage from "../assets/mountain-lake.jpg";
import templeImage from "../assets/japanese-temple.jpg";

const fallbackImages = [cityImage, mountainImage, templeImage];

const MyItineraries = () => {
  const { user, loading: authLoading } = useAuth();
  const [itineraries, setItineraries] = useState([]);
  const navigate = useNavigate();

  // Fetch trips
  useEffect(() => {
    if (!user) return;
    const fetchTrips = async () => {
      try {
        const trips = await getUserTrips(user.uid);
        setItineraries(trips);
      } catch (err) {
        console.error("Failed to fetch trips:", err);
      }
    };
    fetchTrips();
  }, [user]);

  // Delete trip
  const handleDeleteTrip = async (tripId) => {
    if (!user) return;
    if (!window.confirm("Are you sure you want to delete this trip?")) return;
    try {
      await deleteTrip(user.uid, tripId);
      setItineraries(itineraries.filter((t) => t.id !== tripId));
    } catch (err) {
      console.error("Failed to delete trip:", err);
    }
  };

  if (authLoading) return <p className="text-center py-6">Loading....</p>;
  if (!user)
    return <p className="text-center py-6">Please log in to see your trips.</p>;

  // ✅ Show message if no itineraries exist
  if (itineraries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Plane className="w-12 h-12 text-gray-400 mb-3" />
        <h2 className="text-xl font-semibold text-gray-700">
          No itineraries yet
        </h2>
        <p className="text-gray-500 mt-1">
          Start planning your first adventure today!
        </p>
        <button
          onClick={() => navigate("/planner")}
          className="mt-4 px-4 py-2 bg-[#03547c] text-white rounded-lg shadow hover:bg-[#024061]"
        >
          Plan a Trip
        </button>
      </div>
    );
  }

  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {itineraries.map((trip, idx) => (
        <div
          key={trip.id}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
        >
          {/* Image */}
          <div className="relative">
            <img
              src={trip.imageUrl || fallbackImages[idx % fallbackImages.length]}
              alt={trip.destination}
              className="h-48 w-full object-cover"
            />
            <span className="absolute top-2 left-2 bg-white/80 px-3 py-1 rounded-full text-sm text-gray-800 font-medium">
              {trip.destination}
            </span>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="text-lg font-bold text-gray-800">{trip.tripName}</h3>
            <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
              <Calendar className="w-4 h-4 text-gray-500" />
              {trip.startDate} → {trip.endDate}
            </p>

            {/* Actions */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => navigate(`/itineraries/${trip.id}`)}
                className="flex items-center gap-1 px-3 py-1 bg-[#03547c] text-white rounded-lg text-sm shadow hover:bg-[#024061]"
              >
                <Eye size={16} /> View
              </button>
              <button
                onClick={() => navigate(`/planner/${trip.id}`)}
                className="flex items-center gap-1 px-3 py-1 bg-yellow-500 text-white rounded-lg text-sm shadow hover:bg-yellow-600"
              >
                <Pencil size={16} /> Edit
              </button>
              <button
                onClick={() => handleDeleteTrip(trip.id)}
                className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-lg text-sm shadow hover:bg-red-700"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default MyItineraries;
