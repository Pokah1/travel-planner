import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Home, LayoutDashboard } from "lucide-react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase/firebase"

const NotFound = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Listen for Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user)
    })
    return () => unsubscribe()
  }, [])

  // Log attempted invalid route
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    )
  }, [location.pathname])

  const handleRedirect = () => {
    if (isLoggedIn) {
      navigate("/dashboard")
    } else {
      navigate("/")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-extrabold text-indigo-600 drop-shadow-md">404</h1>
        <p className="mt-4 text-2xl font-semibold text-gray-800">
          Oops! Page not found
        </p>
        <p className="mt-2 text-gray-600">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <button onClick={handleRedirect} className="flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <LayoutDashboard className="w-4 h-4" /> Go to Dashboard
              </>
            ) : (
              <>
                <Home className="w-4 h-4" /> Return Home
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFound
