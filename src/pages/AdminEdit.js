import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminEdit() {
  const adminId = localStorage.getItem("adminId");

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    axios.get(`https://school-van-track.onrender.com/api/admin/${adminId}`)
      .then(res => setForm(res.data))
      .catch(console.error);
  }, [adminId]);

  const update = async () => {
    await axios.put(`https://school-van-track.onrender.com/api/admin/edit/${adminId}`, form);
    alert("Admin updated successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FEFAE0] p-4">
  <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md animate-fadeIn">
    <h2 className="text-3xl font-bold text-[#0A400C] mb-6 text-center">
      Edit Admin 🛠️
    </h2>

    <div className="space-y-4">
      <input
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#819067] transition"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        placeholder="Username"
      />

      <input
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#819067] transition"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        placeholder="Email"
      />

      <input
        type="text"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#819067] transition"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        placeholder="Password"
      />

      <button
        onClick={update}
        className="w-full bg-[#0A400C] text-white p-3 rounded-xl font-semibold hover:bg-[#136014] hover:scale-105 transition-transform duration-200 shadow-lg"
      >
        Save Changes 💾
      </button>
    </div>
  </div>
</div>

  );
}
