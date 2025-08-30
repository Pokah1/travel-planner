import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/useAuth";

import { MapPin, Clock, CalendarDays } from "lucide-react";

const TripDetail = () => {
  const { user } = useAuth();
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const navigate = useNavigate();

  // Fetch single trip
  const fetchTrip = useCallback(async () => {
    if (!user || !tripId) return;
    const tripRef = doc(db, `users/${user.uid}/trips/${tripId}`);
    const tripSnap = await getDoc(tripRef);

    if (tripSnap.exists()) {
      setTrip(tripSnap.data());
    } else {
      navigate("/itineraries");
    }
  }, [user, tripId, navigate]);

  useEffect(() => {
    fetchTrip();
  }, [fetchTrip]);

  if (!trip) return <p className="text-center py-10">Loading trip...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Trip Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{trip.tripName}</h1>
      <p className="flex items-center gap-2 text-gray-600 mb-1">
        <MapPin size={18} className="text-blue-600" />
        {trip.destination}
      </p>
      <p className="flex items-center gap-2 text-gray-500 text-sm mb-4">
        <CalendarDays size={16} className="text-gray-500" />
        {trip.startDate} → {trip.endDate}
      </p>

      {/* Trip Image */}
      {trip.imageUrl && (
        <img
          src={trip.imageUrl}
          alt={trip.tripName}
          className="w-full h-64 object-cover rounded-xl shadow mb-6"
        />
      )}

      {/* Itinerary */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Itinerary</h2>
      {trip.itinerary?.length > 0 ? (
        <ul className="space-y-4">
          {trip.itinerary.map((item) => (
            <li
              key={item.id}
              className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition"
            >
              <p className="font-bold text-lg text-gray-800">
                Day {item.day}: {item.title}
              </p>
              <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                <Clock size={14} className="text-gray-500" />
                {item.time}
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                <MapPin size={14} className="text-gray-500" />
                {item.location}
              </div>
              <span className="inline-block mt-2 px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
                {item.type}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">No activities planned yet.</p>
      )}
    </div>
  );
};

export default TripDetail;
