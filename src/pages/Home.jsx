import { Link } from "react-router-dom";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import heroImage from "../assets/heroImage.jpg";
import DestinationCard from "../components/DestinationCard";
import mountainImage from "../assets/mountain-lake.jpg";
import cityImage from "../assets/europeancity.jpg";
import templeImage from "../assets/japanese-temple.jpg";
import ScrollReveal from "../components/ScrollReveal";

const HomePage = () => {
  const destinationSamples = [
    {
      id: "1",
      name: "Swiss Alps",
      country: "Switzerland",
      image: mountainImage,
      rating: 4.8,
      price: "From $199",
      tags: ["Mountains", "Adventure", "Nature"],
    },
    {
      id: "2",
      name: "Prague",
      country: "Czech Republic",
      image: cityImage,
      rating: 4.7,
      price: "From $89",
      tags: ["Culture", "History", "Architecture"],
    },
    {
      id: "3",
      name: "Kyoto",
      country: "Japan",
      image: templeImage,
      rating: 4.9,
      price: "From $156",
      tags: ["Culture", "Temples", "Gardens"],
    },
  ];

  const destinationFeatures = [
    {
      icon: MapPin,
      title: "Discover Destinations",
      description:
        "Explore thousands of destinations with detailed information about attractions and activities",
    },
    {
      icon: Calendar,
      title: "Plan Your Journey",
      description:
        "Create personalized itineraries with our intuitive planning tools",
    },
    {
      icon: Users,
      title: "Travel Community",
      description: "Connect with fellow travelers and share your experiences",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <ScrollReveal direction="up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Your Next
              <span className="block bg-[linear-gradient(135deg,#004466,#1ac27b)] bg-clip-text text-transparent">
                Adventure Awaits
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Discover amazing destinations and create unforgettable memories
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={400}>
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto mb-8">
              <div className="flex-1 relative max-w-xl">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <input
                  placeholder="Where do you want to go?"
                  className="pl-8 w-full h-12 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/70 rounded-md"
                />
              </div>

              <Link to="/destinations">
                <button className="h-12 px-8 bg-[#F79C4B] hover:bg-[#F87665] rounded-md">
                  Search Destinations
                </button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Trivana?</h2>
            <p className="text-xl text-[#667085] max-w-2xl mx-auto">
              We make travel planning simple, personal, and unforgettable
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {destinationFeatures.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <ScrollReveal key={index} direction="up" delay={index * 200}>
                  <div className="text-center p-6 [box-shadow:0_4px_20px_-4px_#005c731A] hover:[box-shadow:0_8px_30px_-4px_#005c7333] transition-all duration-300 rounded-lg bg-white">
                    <div className="pt-6">
                      <div className="w-16 h-16 bg-[#F79C4B]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-[#F79C4B]" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-[#667085]">{feature.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 px-4 bg-[#f1f5f9]/30">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-4">Featured Destinations</h2>
              <p className="text-xl text-[#667085]">
                Handpicked destinations for your next adventure
              </p>
            </div>
            <Link to="/destinations">
              <button>View All</button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {destinationSamples.map((destination, index) => (
              <ScrollReveal
                key={destination.id}
                direction="up"
                delay={index * 200}
              >
                <DestinationCard {...destination} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
