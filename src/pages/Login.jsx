import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plane , Globe, Eye, EyeOff } from "lucide-react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase";
import googleIcon from "../assets/googleIcon.svg"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      setLoading(false);
      navigate("/"); // redirect
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setError("");
    setLoading(true);

    try {
      await signInWithPopup(auth, provider);
      setLoading(false);
      navigate("/"); // redirect
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(135deg, rgba(0,68,102,0.05), rgba(26,194,123,0.05))",
      }}
    >
      <section
        className="w-full max-w-md p-6 rounded-lg shadow-lg"
        style={{ backgroundColor: "#ffffff" }}
      >
        {/* Header */}
        <header className="text-center mb-6">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Plane className="h-8 w-8" style={{ color: "#004466" }} />
            <span className="text-2xl font-bold" style={{ color: "#004466" }}>
              Wanderlust
            </span>
          </div>
          <h1 className="text-2xl font-semibold">Welcome Back</h1>
          <p className="text-gray-500" style={{ color: "#6b7280" }}>
            Sign in to your account to continue your journey
          </p>
        </header>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border rounded-md px-3 py-2 focus:outline-none"
              style={{
                borderColor: "#cbd5e1",
                boxShadow: "0 0 0 2px rgba(0,68,102,0.1)",
              }}
            />
          </div>
<div className="space-y-2 relative">
  <label htmlFor="password" className="block text-sm font-medium">
    Password
  </label>
  <input
    id="password"
    type={showPassword ? "text" : "password"}
    placeholder="Enter your password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
    className="w-full border rounded-md px-3 py-2 pr-10 focus:outline-none"
    style={{
      borderColor: "#cbd5e1",
      boxShadow: "0 0 0 2px rgba(0,68,102,0.1)",
    }}
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 mt-5"
  >
    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
  </button>
</div>


          {/* Loading Spinner */}
          {loading && (
            <p className="text-blue-500 text-sm mb-2">Signing you in...</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md text-white ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            style={{ backgroundColor: "#004466" }}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Or Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-400">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>


{/* Google Sign-In Button */}

<button
  onClick={handleGoogleSignIn}
  disabled={loading}
  className={`w-full py-2 rounded-md flex items-center justify-center space-x-2 text-white ${
    loading ? "opacity-50 cursor-not-allowed" : ""
  }`}
  style={{ backgroundColor: "#DB4347" }}
>
  <img src={googleIcon} alt="Google" width={20} height={20} />
  <span>{loading ? "Signing In..." : "Sign in with Google"}</span>
</button>


        {/* Footer */}
        <p className="mt-6 text-center text-sm">
          <span style={{ color: "#6b7280" }}>Don't have an account? </span>
          <Link to="/signup" style={{ color: "#004466", textDecoration: "underline" }}>
            Sign up
          </Link>
        </p>
      </section>
    </main>
  );
};

export default Login;
