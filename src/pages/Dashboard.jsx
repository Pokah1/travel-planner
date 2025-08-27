import { useState, useEffect } from "react";
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { MapPin, Calendar, Heart, TrendingUp, Globe } from "lucide-react";

const Dashboard = () => {
  const [displayName, setDisplayName] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const stats = [
    {
      label: "Trips Planned",
      value: "12",
      icon: MapPin,
      color: "text-blue-600",
    },
    {
      label: "Countries Visited",
      value: "8",
      icon: Globe,
      color: "text-green-600",
    },
    {
      label: "Saved Destinations",
      value: "24",
      icon: Heart,
      color: "text-red-600",
    },
    {
      label: "Days Traveled",
      value: "156",
      icon: Calendar,
      color: "text-purple-600",
    },
  ];

  const recentTrips = [
    {
      destination: "Tokyo, Japan",
      date: "Dec 2024",
      status: "Completed",
      image: "/src/assets/japanese-temple.jpg",
    },
    {
      destination: "Paris, France",
      date: "Jan 2025",
      status: "Upcoming",
      image: "/src/assets/europeancity.jpg",
    },
    {
      destination: "Bali, Indonesia",
      date: "Mar 2025",
      status: "Planning",
      image: "/src/assets/mountain-lake.jpg",
    },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {

// Set Google photoURL if exists
      setProfileImage(user.photoURL || null);

        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const { firstName, lastName, email } = userSnap.data();
            setDisplayName(
              firstName && lastName ? `${firstName} ${lastName}` : email
            );
          } else {
            setDisplayName(user.email);
          }
        } catch (err) {
          console.error("Error fetching user profile:", err);
          setDisplayName(user.email);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">

      {/* Welcome */}
      <header className="mb-8 flex items-center space-x-4">
  {profileImage && (
    <img
      src={profileImage}
      alt={displayName}
      className="w-15 h-15 rounded-full object-cover border-2 border-[#03547c]"
    />
  )}
  <div>
    <h1 className="text-3xl font-bold text-gray-800 mb-2">
      Welcome, {displayName || "Guest"}!
    </h1>
    <p className="text-gray-600">Ready for your next adventure?</p>
  </div>
</header>



      {/* Stats */}
      <section aria-labelledby="travel-stats" className="mb-8">
        <h2 id="travel-stats" className="sr-only">
          Travel Statistics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <article key={index} className="bg-gray-100 shadow-md rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Trips */}
        <article className="bg-white shadow rounded-lg">
          <header className="border-b p-4">
            <h2 className="text-lg font-semibold">Recent Trips</h2>
            <p className="text-sm text-gray-500">
              Your latest travel adventures
            </p>
          </header>
          <div className="p-4 space-y-4">
            {recentTrips.map((trip, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 rounded-lg border"
              >
                <img
                  src={trip.image}
                  alt={trip.destination}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{trip.destination}</h3>
                  <p className="text-sm text-gray-500">{trip.date}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    trip.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : trip.status === "Upcoming"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {trip.status}
                </span>
              </div>
            ))}
            <button className="w-full mt-4 px-4 py-2 bg-[#03547c] text-white rounded-lg hover:bg-[#03549d] transition-colors">
  View All Trips
</button>

          </div>
        </article>

        {/* Quick Actions */}
        <aside className="bg-white shadow rounded-lg">
          <header className="border-b p-4">
            <h2 className="text-lg font-semibold">Quick Actions</h2>
            <p className="text-sm text-gray-500">
              What would you like to do today?
            </p>
          </header>
          <nav className="p-4 space-y-4">
            <button className="w-full flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
              <MapPin className="mr-2 h-4 w-4" />
              Plan New Trip
            </button>
            <button className="w-full flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Globe className="mr-2 h-4 w-4" />
              Explore Destinations
            </button>
            <button className="w-full flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Heart className="mr-2 h-4 w-4" />
              View Saved Places
            </button>
            <button className="w-full flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
              <TrendingUp className="mr-2 h-4 w-4" />
              Travel Analytics
            </button>
          </nav>
        </aside>
      </section>

      {/* Travel Goals */}
      <section className="bg-white shadow rounded-lg mt-8">
        <header className="border-b border-gray-200 p-4 mb-2">
          <h2 className="text-lg font-semibold text-gray-700">2025 Travel Goals</h2>
          <p className="text-sm text-gray-500">
            Track your progress towards your travel objectives
          </p>
        </header>
        <div className="p-6 space-y-6">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Countries to Visit</span>
              <span>5 / 10</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: "50%" }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Adventure Activities</span>
              <span>3 / 8</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: "37.5%" }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Cultural Experiences</span>
              <span>7 / 12</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full"
                style={{ width: "58%" }}
              ></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
