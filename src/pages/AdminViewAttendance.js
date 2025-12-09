import { useEffect, useState } from "react";
import axios from "axios";

export default function ViewAllAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [vanNumber, setVanNumber] = useState("");
  const [date, setDate] = useState("");
  const [vanNumbers, setVanNumbers] = useState([]);

  // Load Van Options
  const loadVanNumbers = async () => {
    try {
      const res = await axios.get(
        "https://school-van-track.onrender.com/api/attendance/van-numbers"
      );
      setVanNumbers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Load Attendance data
  const loadAttendance = async () => {
    try {
      const res = await axios.get(
        "https://school-van-track.onrender.com/api/attendance/adminviewatten",
        {
          params: { vanNumber, date },
        }
      );
      setAttendance(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadVanNumbers();
    loadAttendance();
  }, []);

  useEffect(() => {
    loadAttendance();
  }, [vanNumber, date]);

  // Format date as dd/mm/yyyy
  const formatDate = (d) => {
    const dt = new Date(d);
    const day = String(dt.getDate()).padStart(2, "0");
    const month = String(dt.getMonth() + 1).padStart(2, "0");
    const year = dt.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="min-h-screen bg-[#FEFAE0] p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-[#0A400C] mb-4">
        📋 All Students Attendance
      </h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Van Filter */}
        <select
          className="border border-[#0A400C] text-[#0A400C] px-4 py-2 rounded-lg shadow-sm"
          value={vanNumber}
          onChange={(e) => setVanNumber(e.target.value)}
        >
          <option value="">All Vans</option>
          {vanNumbers.map((van, index) => (
            <option key={index} value={van}>
              {van}
            </option>
          ))}
        </select>

        {/* Date Filter */}
        <input
          type="date"
          className="border border-[#0A400C] px-4 py-2 rounded-lg shadow-sm"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* Attendance Table */}
      <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-[#0A400C] text-white sticky top-0">
            <tr>
              <th className="p-3 text-left">Student Name</th>
              <th className="p-3 text-left">Van</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {attendance.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No attendance found
                </td>
              </tr>
            ) : (
              attendance.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{item.studentName}</td>
                  <td className="p-3">{item.vanNumber}</td>
                  <td className="p-3">{formatDate(item.date)}</td>
                  <td
                    className={`p-3 font-bold ${
                      item.status === "present"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.status.toUpperCase()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
