import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/useAuth"; // import auth
import cityImage from "../assets/europeancity.jpg";
import mountainImage from "../assets/mountain-lake.jpg";
import templeImage from "../assets/japanese-temple.jpg";

const fallbackImages = [cityImage, mountainImage, templeImage];

const MyItineraries = () => {
  const { user } = useAuth();
  const [itineraries, setItineraries] = useState([]);

  useEffect(() => {
    if (!user) return; // wait for user to be available

    const fetchTrips = async () => {
      try {
        const snap = await getDocs(collection(db, `users/${user.uid}/trips`));
        const trips = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setItineraries(trips);
      } catch (err) {
        console.error("Error fetching trips:", err);
      }
    };

    fetchTrips();
  }, [user]);

  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {itineraries.map((trip, idx) => (
        <div key={trip.id} className="bg-white rounded-lg shadow overflow-hidden">
          <img
            src={trip.imageUrl || fallbackImages[idx % fallbackImages.length]}
            alt={trip.destination}
            className="h-48 w-full object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-bold">{trip.tripName}</h3>
            <p className="text-gray-600">{trip.destination}</p>
            <p className="text-gray-500 text-xs">
              {trip.startDate} - {trip.endDate}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default MyItineraries;
