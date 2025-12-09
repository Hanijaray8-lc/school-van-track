import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminSignup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const signup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://school-van-track.onrender.com/api/admin/signup", form);
      alert("Signup successful");
      navigate("/admin-login");
    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#FEFAE0] flex justify-center items-center p-4">
      <div className="bg-white shadow-md p-6 rounded-xl w-full max-w-md">
        <h1 className="text-2xl mb-5 font-bold text-[#0A400C] text-center">
          Admin Sign Up
        </h1>

        <form className="space-y-4" onSubmit={signup}>
          <input
            name="username"
            className="w-full p-3 border rounded"
            placeholder="Username"
            onChange={handleChange}
          />

          <input
            name="email"
            type="email"
            className="w-full p-3 border rounded"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            name="password"
            type="text"
            className="w-full p-3 border rounded"
            placeholder="Password"
            onChange={handleChange}
          />

          <button className="w-full bg-[#0A400C] text-white p-3 rounded-lg hover:bg-[#136014]">
            Create Account
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <span
            className="text-[#0A400C] font-semibold cursor-pointer"
            onClick={() => navigate("/admin-login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
