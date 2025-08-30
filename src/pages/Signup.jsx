import { useState } from "react";
import { Link } from "react-router-dom";
import { Plane, Eye, EyeOff } from "lucide-react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

const Signup = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Password do not match");
      setSuccess("");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const { user } = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      console.log(user);

      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email: email.trim(),
      });

      setSuccess("Signup successful! Welcome aboard 🎉");

      // Clear the form inputs
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background:
          "linear-gradient(135deg, rgba(0,68,102,0.05), rgba(26,194,123,0.05))",
      }}
    >
      <section
        className="w-full max-w-md rounded-lg shadow-lg p-6"
        style={{ backgroundColor: "#ffffff" }}
      >
        {/* Header */}
        <header className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Plane className="h-8 w-8" style={{ color: "#004466" }} />
            <span className="text-2xl font-bold" style={{ color: "#004466" }}>
              Trivana
            </span>
          </div>
          <h1 className="text-2xl font-semibold">Create Account</h1>
          <p className="text-gray-500" style={{ color: "#6b7280" }}>
            Join us and start planning your next adventure
          </p>
        </header>

        {/* Success message for signup */}
        {success && (
          <p className="text-green-500 text-lg font-bold mb-2">{success}</p>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <fieldset className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm font-medium">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                required
                autoComplete="given-name"
                className="w-full border rounded-md px-3 py-2 focus:outline-none"
                style={{
                  borderColor: "#cbd5e1",
                  boxShadow: "0 0 0 2px rgba(0,68,102,0.25)",
                }}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="block text-sm font-medium">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full border rounded-md px-3 py-2 focus:outline-none"
                style={{
                  borderColor: "#cbd5e1",
                  boxShadow: "0 0 0 2px rgba(0,68,102,0.25)",
                }}
              />
            </div>
          </fieldset>

          {/* Email */}
          <fieldset className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-3 py-2 focus:outline-none"
              style={{
                borderColor: "#cbd5e1",
                boxShadow: "0 0 0 2px rgba(0,68,102,0.25)",
              }}
            />
          </fieldset>

          {/* Password */}
          <fieldset className="space-y-2 relative">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
              className="w-full border rounded-md px-3 py-2 pr-10 focus:outline-none"
              style={{
                borderColor: "#cbd5e1",
                boxShadow: "0 0 0 2px rgba(0,68,102,0.25)",
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 mt-5"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </fieldset>

          {/* Confirm Password */}
          <fieldset className="space-y-2 relative">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-3 py-2 pr-10 focus:outline-none"
              style={{
                borderColor: "#cbd5e1",
                boxShadow: "0 0 0 2px rgba(0,68,102,0.25)",
              }}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 mt-5"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </fieldset>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          {/* Loading Spinner */}
          {loading && (
            <div className="flex items-center justify-center mb-2">
              <svg
                className="animate-spin h-5 w-5 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              <span className="ml-2 text-blue-500 text-sm">
                Creating your account...
              </span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md transition-colors ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            style={{ backgroundColor: "#004466", color: "#ffffff" }}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Footer */}
        <footer className="mt-6 text-center text-sm">
          <span style={{ color: "#6b7280" }}>Already have an account? </span>
          <Link
            to="/login"
            style={{ color: "#004466", textDecoration: "underline" }}
          >
            Sign in
          </Link>
        </footer>
      </section>
    </main>
  );
};

export default Signup;
