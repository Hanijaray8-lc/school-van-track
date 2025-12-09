import { useState } from "react";
import axios from "axios";

export default function AddDriver() {
  const [form, setForm] = useState({
    vanNumber: "",
    driverName: "",
    routeName: "",
    username: "",
    password: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("https://school-van-track.onrender.com/api/drivers/add", form);
      alert("Driver added. Awaiting owner approval.");
      setForm({
        vanNumber: "",
        driverName: "",
        routeName: "",
        username: "",
        password: ""
      });
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FEFAE0]">
  <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-[#B1AB86]">

    {/* Header */}
    <h1 className="text-3xl font-bold mb-6 text-center text-[#0A400C]">
      Add Van Driver
    </h1>

    <form onSubmit={handleSubmit} className="space-y-5">

      <input
        name="vanNumber"
        placeholder="Van Number"
        value={form.vanNumber}
        onChange={handleChange}
        className="w-full p-3 border border-[#B1AB86] rounded-lg focus:outline-none focus:border-[#819067]"
      />

      <input
        name="driverName"
        placeholder="Driver Name"
        value={form.driverName}
        onChange={handleChange}
        className="w-full p-3 border border-[#B1AB86] rounded-lg focus:outline-none focus:border-[#819067]"
      />

      <input
        name="routeName"
        placeholder="Route Name (optional)"
        value={form.routeName}
        onChange={handleChange}
        className="w-full p-3 border border-[#B1AB86] rounded-lg focus:outline-none focus:border-[#819067]"
      />

      <input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        className="w-full p-3 border border-[#B1AB86] rounded-lg focus:outline-none focus:border-[#819067]"
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full p-3 border border-[#B1AB86] rounded-lg focus:outline-none focus:border-[#819067]"
      />

      {/* Button */}
      <button
        className="w-full bg-[#0A400C] text-[#FEFAE0] p-3 rounded-lg font-semibold hover:bg-[#819067] transition duration-200"
      >
        Add Driver
      </button>

    </form>
  </div>
</div>

  );
}
