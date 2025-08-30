import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Plane,
  Menu,
  X,
  MapPin,
  Calendar,
  Heart,
  User,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { logout } from "../utils/logout";

const navItems = [
  { path: "/", label: "Home", icon: Plane },
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/destinations", label: "Destinations", icon: MapPin },
  { path: "/planner", label: "Planner", icon: Calendar },
  { path: "/itineraries", label: "My Trips", icon: Heart },
];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const isActive = (path) => currentPath === path;

  //listen to auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-2"
              aria-label="Wanderlust Home"
            >
              <Plane className="h-8 w-8 text-[#03547c]" />
              <span className="text-xl font-bold text-[#03547c]">Trivana</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all ${
                      active
                        ? "bg-[#03547c] text-white"
                        : "text-[#03547c] hover:text-[#03547c] hover:bg-[#03547c]/10"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {/* Sign In  / Logout Button */}
              {user ? (
                <button
                  type="button"
                  onClick={() => logout(navigate)}
                  className="flex items-center space-x-2 border border-border rounded-md px-3 py-2 hover:bg-[#03547c] hover:text-[#b7b9be] transition-all"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              ) : (
                <Link to="/login">
                  <button
                    type="button"
                    className="flex items-center space-x-2 border border-border rounded-md px-3 py-2 hover:bg-[#03547c] hover:text-[#b7b9be] transition-all"
                  >
                    <User className="h-4 w-4" />
                    <span>Sign In</span>
                  </button>
                </Link>
              )}
            </nav>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="md:hidden p-2 rounded-md hover:bg-text-[#03547f]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-border shadow-lg">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-all w-full ${
                      active
                        ? "bg-[#03547c] text-white"
                        : "text-muted-foreground hover:bg-[#03547c]hover:bg-[#03547f]"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {/* ✅ Mobile Sign In / Logout */}
              {user ? (
                <button
                  type="button"
                  onClick={() => {
                    logout(navigate);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 w-full justify-start px-4 py-3 border border-border rounded-md hover:bg-[#03547c] hover:text-white transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              ) : (
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <button
                    type="button"
                    className="flex items-center space-x-3 w-full justify-start px-4 py-3 border border-border rounded-md hover:bg-[#03547c] hover:text-white transition-all"
                  >
                    <User className="h-5 w-5" />
                    <span>Sign In</span>
                  </button>
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Spacer to prevent content from hiding under fixed nav */}
      <div className="h-16" />
    </>
  );
};

export default Navigation;
