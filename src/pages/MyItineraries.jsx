import { Calendar, MapPin, Clock, Share, Edit3, Trash2 } from "lucide-react";
import mountainImage from "../assets/mountain-lake.jpg";
import cityImage from "../assets/europeancity.jpg";
import templeImage from "../assets/japanese-temple.jpg";

const MyItineraries = () => {
  const savedItineraries = [
    {
      id: "1",
      title: "European Adventure",
      destination: "Prague, Czech Republic",
      image: cityImage,
      duration: "7 days",
      startDate: "2024-06-15",
      endDate: "2024-06-22",
      activities: 12,
      status: "upcoming",
    },
    {
      id: "2",
      title: "Alpine Retreat",
      destination: "Swiss Alps, Switzerland",
      image: mountainImage,
      duration: "5 days",
      startDate: "2024-04-10",
      endDate: "2024-04-15",
      activities: 8,
      status: "completed",
    },
    {
      id: "3",
      title: "Cultural Journey",
      destination: "Kyoto, Japan",
      image: templeImage,
      duration: "10 days",
      startDate: "2024-08-20",
      endDate: "2024-08-30",
      activities: 15,
      status: "draft",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-600";
      case "completed":
        return "bg-gray-200 text-gray-600";
      case "draft":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-gray-200 text-gray-600";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "upcoming":
        return "Upcoming";
      case "completed":
        return "Completed";
      case "draft":
        return "Draft";
      default:
        return status;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="pt-8 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <header className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-bold mb-2">My Itineraries</h1>
              <p className="text-lg text-gray-600">
                Manage your planned and completed trips
              </p>
            </div>
            <button className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
              Create New Trip
            </button>
          </header>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <p className="text-3xl font-bold text-blue-600">3</p>
              <p className="text-gray-500">Total Trips</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <p className="text-3xl font-bold text-green-600">1</p>
              <p className="text-gray-500">Upcoming</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <p className="text-3xl font-bold text-purple-600">35</p>
              <p className="text-gray-500">Activities Planned</p>
            </div>
          </div>

          {/* Filters */}
          <nav className="flex gap-2 mb-8">
            {["All", "Upcoming", "Completed", "Drafts"].map((filter) => (
              <button
                key={filter}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                  filter === "All"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {filter}
              </button>
            ))}
          </nav>

          {/* Itineraries Grid */}
          <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedItineraries.map((itinerary) => (
              <article
                key={itinerary.id}
                className="bg-white rounded-xl shadow overflow-hidden group hover:shadow-lg transition"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={itinerary.image}
                    alt={itinerary.destination}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      itinerary.status
                    )}`}
                  >
                    {getStatusText(itinerary.status)}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold group-hover:text-blue-600 transition">
                    {itinerary.title}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                    <MapPin className="h-4 w-4" />
                    <span>{itinerary.destination}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mt-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{itinerary.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{itinerary.activities} activities</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(itinerary.startDate).toLocaleDateString()} -{" "}
                    {new Date(itinerary.endDate).toLocaleDateString()}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4">
                    <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm border rounded-lg hover:bg-gray-50">
                      <Edit3 className="h-4 w-4" /> Edit
                    </button>
                    <button className="px-3 py-2 border rounded-lg hover:bg-gray-50">
                      <Share className="h-4 w-4" />
                    </button>
                    <button className="px-3 py-2 border rounded-lg text-red-600 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>

          {/* Empty State */}
          {savedItineraries.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">
                No itineraries yet
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Start planning your first trip to create amazing memories and
                organize your travels
              </p>
              <button className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
                Create Your First Trip
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default MyItineraries;
