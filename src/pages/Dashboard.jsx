import { useState, useEffect } from "react";
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { MapPin, Calendar, Heart, TrendingUp, Globe } from "lucide-react";

// Images
import templeImage from "../assets/japanese-temple.jpg";
import parisImage from "../assets/europeancity.jpg";
import baliImage from "../assets/bali.jpg";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const stats = [
    {
      label: "Planned Trips",
      value: "12",
      icon: MapPin,
      color: "text-blue-600",
    },
    {
      label: "Visited Nations",
      value: "8",
      icon: Globe,
      color: "text-green-600",
    },
    {
      label: "Bookmarks",
      value: "24",
      icon: Heart,
      color: "text-red-600",
    },
    {
      label: "Travel Days",
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
      image: templeImage,
    },
    {
      destination: "Paris, France",
      date: "Jan 2025",
      status: "Upcoming",
      image: parisImage,
    },
    {
      destination: "Bali, Indonesia",
      date: "Mar 2025",
      status: "Planning",
      image: baliImage,
    },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser); //  save full user
        setProfileImage(currentUser.photoURL || null);

        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const { firstName, lastName, email } = userSnap.data();
            setDisplayName(
              firstName && lastName ? `${firstName} ${lastName}` : email
            );
          } else {
            setDisplayName(currentUser.email || "");
          }
        } catch (err) {
          console.error("Error fetching user profile:", err);
          setDisplayName(currentUser.email || "");
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const formatName = (name, email) => {
    if (name) return name; // use actual name if available
    if (email && email.includes("@")) return email.split("@")[0]; // show just before "@"
    return "Traveler"; // fallback
  };

  return (
    <main className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      {/* Greeting */}
      <header className="mb-8 flex items-center space-x-4">
        {profileImage && (
          <img
            src={profileImage}
            alt={displayName}
            className="w-15 h-15 rounded-full object-cover border-2 border-[#03547c]"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2 truncate max-w-[220px] sm:max-w-[300px]">
            Hi, {formatName(displayName, user?.email)}!
          </h1>

          <p className="text-gray-600">
            Let’s get you moving on your journeys.
          </p>
        </div>
      </header>

      {/* Stats */}
      <section aria-labelledby="overview-stats" className="mb-8">
        <h2 id="overview-stats" className="sr-only">
          Overview Stats
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <article
                key={index}
                className="bg-gray-100 shadow-md rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
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
        {/* Trip Log */}
        <article className="bg-white shadow rounded-lg">
          <header className="border-b p-4">
            <h2 className="text-lg font-semibold">Latest Trips</h2>
            <p className="text-sm text-gray-500">
              A glance at your most recent travel notes
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
              Show All Journeys
            </button>
          </div>
        </article>

        {/* Quick Menu */}
        <aside className="bg-white shadow rounded-lg">
          <header className="border-b p-4">
            <h2 className="text-lg font-semibold">Quick Menu</h2>
            <p className="text-sm text-gray-500">
              Choose an action to get started
            </p>
          </header>
          <nav className="p-4 space-y-4">
            <button className="w-full flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
              <MapPin className="mr-2 h-4 w-4" />
              Start a New Plan
            </button>
            <button className="w-full flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Globe className="mr-2 h-4 w-4" />
              Discover Places
            </button>
            <button className="w-full flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Heart className="mr-2 h-4 w-4" />
              My Favorites
            </button>
            <button className="w-full flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
              <TrendingUp className="mr-2 h-4 w-4" />
              Travel Insights
            </button>
          </nav>
        </aside>
      </section>

      {/* Year Goals */}
      <section className="bg-white shadow rounded-lg mt-8">
        <header className="border-b border-gray-200 p-4 mb-2">
          <h2 className="text-lg font-semibold text-gray-700">
            2025 Travel Targets
          </h2>
          <p className="text-sm text-gray-500">
            Keep track of how you’re doing on your travel milestones
          </p>
        </header>
        <div className="p-6 space-y-6">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Countries Goal</span>
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
              <span>Adventure List</span>
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
              <span>Cultural Moments</span>
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
