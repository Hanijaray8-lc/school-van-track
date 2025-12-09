import { useEffect, useState } from "react";
import axios from "axios";

import { useLocation } from "react-router-dom";

export default function ViewAttendance() {
  const { state } = useLocation();
  const vanNumber = state?.vanNumber;
  const driverName = state?.driverName;
  const [attendance, setAttendance] = useState([]);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");

 const loadAttendance = async () => {
  try {
    const res = await axios.get(
      "https://school-van-track.onrender.com/api/attendance/history",
      {
        params: {
          vanNumber: vanNumber,
          driverName: driverName,
          date: date,
          status: status
        }
      }
    );

    setAttendance(res.data);
  } catch (err) {
    console.log(err);
  }
};



  useEffect(() => {
    loadAttendance();
  }, [date, status]);

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-3 text-[#0A400C]">
        Attendance History 📋
      </h2>

      {/* FILTER SECTION */}
      <div className="flex gap-3 mb-4">

        {/* Date Filter */}
        <input
          type="date"
          className="border p-2 rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        {/* Status Filter */}
        <select
          className="border p-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
        </select>

        <button
          className="bg-[#0A400C] text-white px-4 rounded"
          onClick={loadAttendance}
        >
          Filter
        </button>

      </div>

      {/* TABLE */}
      <table className="w-full border-collapse">
        <thead className="bg-[#E1E1C3]">
          <tr>
            <th className="p-2 border">Student</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Time</th>
          </tr>
        </thead>

        <tbody>
          {attendance.map((a) => (
            <tr key={a._id} className="border">
              <td className="p-2 border">{a.studentName}</td>

              <td className={`p-2 border font-semibold ${
                a.status === "present" ? "text-green-600" : "text-red-600"
              }`}>
                {a.status}
              </td>

              <td className="p-2 border">{a.date}</td>
              <td className="p-2 border">{a.time}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {attendance.length === 0 && (
        <div className="text-center mt-3 text-gray-600">
          No attendance records found.
        </div>
      )}
    </div>
  );
}
