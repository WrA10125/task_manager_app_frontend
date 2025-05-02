import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { Eye, EyeOff } from "lucide-react";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/Dashboard");
    } catch (err) {
      alert("Login failed");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />

        <div className="relative">
          <input
            className="w-full p-3 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <button
          type="submit"
          className="w-full cursor-pointer bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}
