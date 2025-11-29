import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dashboardBg from "../images/Dashboard.png"; // ✅ imported local image

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in both fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      } else {
        setError("Login failed — please try again.");
      }
    } catch (err) {
      console.error("Login failed:", err.response?.data || err);
      setError("Incorrect email or password");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${dashboardBg})`, // ✅ using imported background
      }}
    >
      {/* Overlay for soft blur and contrast */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Login Card */}
      <div className="relative z-10 bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md border border-purple-100">
        <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Login to continue to <span className="font-semibold">PostPlanner</span>
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            autoComplete="email"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            autoComplete="current-password"
          />

          {error && (
            <p className="text-red-600 text-sm text-center mb-4">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#287379] text-white font-semibold py-3 rounded-lg shadow-lg hover:opacity-90 transition duration-300"
          >
            Log In
          </button>
        </form>

        {/* Footer Links */}
        <div className="flex justify-between items-center text-sm text-gray-600 mt-4">
          <a href="#" className="hover:text-purple-600">
            Forgot Password?
          </a>
          <a
            href="/register"
            className="text-purple-700 font-semibold hover:underline"
          >
            Create Account
          </a>
        </div>

        {/* Divider */}
        <div className="mt-6 flex items-center justify-center">
          <div className="h-px bg-gray-300 flex-grow"></div>
          <span className="mx-3 text-gray-500 text-sm">or</span>
          <div className="h-px bg-gray-300 flex-grow"></div>
        </div>

        {/* Google Login Button */}
        <button
          type="button"
          className="mt-4 w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-sm text-gray-700 font-medium">
            Continue with Google
          </span>
        </button>
      </div>
    </div>
  );
}
