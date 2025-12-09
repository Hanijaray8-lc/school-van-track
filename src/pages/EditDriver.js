import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function EditDriver() {
  const { state } = useLocation();        // full driver object
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    _id: state._id,
    vanNumber: state.vanNumber,
    driverName: state.driverName,
    routeName: state.routeName || "",
    username: state.username,
    password: state.password
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.put(`https://school-van-track.onrender.com/api/drivers/update/${form._id}`, form);

    alert("Driver updated successfully!");
    navigate("/owner-dashboard");
  };

  return (
   <div className="min-h-screen flex items-center justify-center bg-[#FEFAE0] p-4">
  <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md animate-fadeIn">
    <h1 className="text-3xl font-bold text-[#0A400C] mb-6 text-center">
      Edit Driver 🚐
    </h1>

    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="vanNumber"
        placeholder="Van Number"
        value={form.vanNumber}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#819067] transition"
      />

      <input
        name="driverName"
        placeholder="Driver Name"
        value={form.driverName}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#819067] transition"
      />

      <input
        name="routeName"
        placeholder="Route Name"
        value={form.routeName}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#819067] transition"
      />

      <input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#819067] transition"
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#819067] transition"
      />

      <button
        type="submit"
        className="w-full bg-[#819067] text-white p-3 rounded-xl font-semibold hover:bg-[#0A400C] hover:scale-105 transition-transform duration-200 shadow-md"
      >
        Update Driver ✏️
      </button>
    </form>
  </div>
</div>

  );
}
