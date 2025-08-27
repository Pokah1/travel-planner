import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Navigation from "./components/NavBar";
import HomePage from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import HotelSearch from "./pages/HotelSearch";
import Destinations from "./pages/Destinations";
import DestinationDetails from "./pages/DestinationDetails";
import MyItineraries from "./pages/MyItineraries";
import TravelPlanner from "./pages/Planner";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navigation />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />

          {/* Wrap all protected pages once */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/hotels" element={<HotelSearch />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/:cityCode/:cityName" element={<DestinationDetails />} />
            <Route path="/itineraries" element={<MyItineraries />} />
            <Route path="/planner" element={<TravelPlanner />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
