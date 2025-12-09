import { useState } from "react";
import axios from "axios";

export default function EditStudent({ student }) {
  const [form, setForm] = useState({
    studentName: student.studentName || "",
    studentId: student.studentId || "",
    address: student.address || "",
    parentPhone: student.parentPhone || "",
    busStop: student.busStop || "",
    vanNumber: student.vanNumber || "",
    classStandard: student.classStandard || "",
    username: student.username || "",
    password: student.password || ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(
        `https://school-van-track.onrender.com/api/students/${student._id}`,
        form
      );
      alert("Student updated successfully");
    } catch (err) {
      alert(err.response?.data?.msg || "Error updating student");
    }
  };

  return (
    <div className="max-w-md mx-auto p-5 bg-[#FEFAE0] rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-[#0A400C]">Edit Student</h2>

      <form onSubmit={handleSubmit} className="space-y-3">

        <input
          name="studentName"
          value={form.studentName}
          placeholder="Student Name"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          name="studentId"
          value={form.studentId}
          placeholder="Student ID"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          name="address"
          value={form.address}
          placeholder="Address"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          name="parentPhone"
          value={form.parentPhone}
          placeholder="Parent Phone"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          name="busStop"
          value={form.busStop}
          placeholder="Bus Stop"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          name="vanNumber"
          value={form.vanNumber}
          placeholder="Van Number"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          name="classStandard"
          value={form.classStandard}
          placeholder="Class Standard"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          name="username"
          value={form.username}
          placeholder="Username"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          name="password"
          type="password"
          value={form.password}
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button className="bg-[#819067] text-white w-full p-2 rounded">
          Update Student
        </button>

      </form>
    </div>
  );
}
