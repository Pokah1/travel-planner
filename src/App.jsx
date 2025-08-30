import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Navigation from "./components/NavBar";
import HomePage from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
// import HotelSearch from "./pages/HotelSearch";

import Destinations from "./pages/Destinations";
import DestinationDetails from "./pages/DestinationDetails";
import MyItineraries from "./pages/MyItineraries";
import TravelPlanner from "./pages/Planner";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import HotelDetails from "./pages/HotelDetails";
import Footer from "./components/Footer";
import TripDetail from "./pages/TripDetail";
import ScrollReveal from "./components/ScrollReveal";

function App() {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <ScrollReveal direction="down" delay={100}>
        <Navigation />
      </ScrollReveal>

      <main className="flex-1">
        <ScrollReveal direction="up" delay={200}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route
                path="/destinations/:cityCode/:cityName"
                element={<DestinationDetails />}
              />
              <Route path="/hotels/:id" element={<HotelDetails />} />
              <Route path="/itineraries" element={<MyItineraries />} />
              <Route path="/itineraries/:tripId" element={<TripDetail />} />
              <Route path="/planner" element={<TravelPlanner />} />
              <Route path="/planner/:tripId" element={<TravelPlanner />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </ScrollReveal>
      </main>

      <ScrollReveal direction="up" delay={300}>
        <Footer />
      </ScrollReveal>
    </div>
  );
}

export default App;
