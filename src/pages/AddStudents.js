import { useState, useEffect } from "react";
import axios from "axios";

export default function AddStudent() {
  const [form, setForm] = useState({
    studentName: "",
    studentId: "",
    address: "",
    parentPhone: "",
    busStop: "",
    vanNumber: "",
    classStandard: "",
    username: "",
    password: ""
  });

  const [drivers, setDrivers] = useState([]);

  // fetch approved drivers for dropdown
  useEffect(() => {
    axios.get("https://school-van-track.onrender.com/api/drivers")
      .then(res => setDrivers(res.data.filter(d => d.status === "approved")))
      .catch(err => console.log(err));
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("https://school-van-track.onrender.com/api/students/add", form);
      alert(res.data.msg);
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };

  return (
   <div className="min-h-screen flex items-center justify-center bg-[#FEFAE0]">
  <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-[#B1AB86]">

    {/* Header */}
    <h2 className="text-3xl font-bold mb-6 text-center text-[#0A400C]">
      Add Student
    </h2>

    <form onSubmit={handleSubmit} className="space-y-5">

      <input
        name="studentName"
        placeholder="Student Name"
        onChange={handleChange}
        className="w-full p-3 border border-[#B1AB86] rounded-lg focus:outline-none focus:border-[#819067]"
      />

      <input
        name="studentId"
        placeholder="Student ID"
        onChange={handleChange}
        className="w-full p-3 border border-[#B1AB86] rounded-lg focus:outline-none focus:border-[#819067]"
      />

      <input
        name="address"
        placeholder="Address"
        onChange={handleChange}
        className="w-full p-3 border border-[#B1AB86] rounded-lg focus:outline-none focus:border-[#819067]"
      />

      <input
        name="parentPhone"
        placeholder="Parent Phone"
        onChange={handleChange}
        className="w-full p-3 border border-[#B1AB86] rounded-lg focus:outline-none focus:border-[#819067]"
      />

      <input
        name="busStop"
        placeholder="Bus Stop"
        onChange={handleChange}
        className="w-full p-3 border border-[#B1AB86] rounded-lg focus:outline-none focus:border-[#819067]"
      />

      <select
        name="vanNumber"
        value={form.vanNumber}
        onChange={handleChange}
        className="w-full p-3 border border-[#B1AB86] rounded-lg focus:outline-none focus:border-[#819067]"
      >
        <option value="">Select Van</option>
        {drivers.map(d => (
          <option key={d._id} value={d.vanNumber}>
            {d.vanNumber} - {d.driverName}
          </option>
        ))}
      </select>

      <input
        name="classStandard"
        placeholder="Class Standard"
        onChange={handleChange}
        className="w-full p-3 border border-[#B1AB86] rounded-lg focus:outline-none focus:border-[#819067]"
      />

      <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
        className="w-full p-3 border border-[#B1AB86] rounded-lg focus:outline-none focus:border-[#819067]"
      />

      <input
        name="password"
      
        placeholder="Password"
        onChange={handleChange}
        className="w-full p-3 border border-[#B1AB86] rounded-lg focus:outline-none focus:border-[#819067]"
      />

      <button
        className="w-full bg-[#0A400C] text-[#FEFAE0] p-3 rounded-lg font-semibold hover:bg-[#819067] transition duration-200"
      >
        Add Student
      </button>

    </form>
  </div>
</div>

  );
}
