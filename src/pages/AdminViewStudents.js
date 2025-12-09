import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminStudentList() {
  const [students, setStudents] = useState([]);
  const [vanNumbers, setVanNumbers] = useState([]);
  const [vanNumber, setVanNumber] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Fetch distinct van numbers
  useEffect(() => {
    axios
      .get("https://school-van-track.onrender.com/api/students/van-numbers")
      .then((res) => setVanNumbers(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Fetch students when filter changes
  useEffect(() => {
    axios
      .get("https://school-van-track.onrender.com/api/students/adminview", {
        params: { vanNumber },
      })
      .then((res) => setStudents(res.data))
      .catch((err) => console.log(err));
  }, [vanNumber]);

  // Format date/time to IST
  const formatDateIST = (dateString) => {
    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Intl.DateTimeFormat("en-IN", options).format(new Date(dateString));
  };

  return (
    <div className="p-4 sm:p-6 bg-[#FEFAE0] min-h-screen">
      {/* ---------- FILTER ---------- */}
      <div className="mb-4 flex flex-col sm:flex-row gap-4 items-center">
        <h1 className="text-2xl font-bold text-[#0A400C]">
          Student Management 🎓
        </h1>

        <select
          className="border border-[#B1AB86] px-4 py-2 rounded-lg bg-white focus:outline-none focus:border-[#819067]"
          value={vanNumber}
          onChange={(e) => setVanNumber(e.target.value)}
        >
          <option value="">All Vans</option>
          {vanNumbers.map((van, i) => (
            <option key={i} value={van}>
              {van}
            </option>
          ))}
        </select>
      </div>

      {/* ---------- TABLE ---------- */}
      <div className="overflow-x-auto rounded-xl border border-[#B1AB86] shadow-lg">
        <table className="w-full min-w-[600px]">
          <thead className="bg-[#B1AB86] text-[#0A400C] sticky top-0">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Class</th>
              <th className="p-3 text-left">Van</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No students found
                </td>
              </tr>
            ) : (
              students.map((std) => (
                <tr
                  key={std._id}
                  className="border-b border-[#B1AB86] hover:bg-[#FFFCE8] transition"
                >
                  <td className="p-3">{std.studentName}</td>
                  <td className="p-3">{std.classStandard}</td>
                  <td className="p-3 font-semibold text-[#0A400C]">
                    {std.vanNumber}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        std.status === "approved"
                          ? "bg-[#0A400C]"
                          : "bg-[#819067]"
                      }`}
                    >
                      {std.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      className="bg-[#0A400C] text-[#FEFAE0] px-4 py-2 rounded-lg hover:bg-[#819067] transition"
                      onClick={() => setSelectedStudent(std)}
                    >
                      View 👁️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ---------- VIEW MODAL ---------- */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#FEFAE0] border border-[#B1AB86] rounded-2xl p-6 w-11/12 sm:w-96 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-center text-[#0A400C]">
              Student Details
            </h2>

            <div className="space-y-2 text-[#0A400C] text-sm">
              <p>
                <b>Name:</b> {selectedStudent.studentName}
              </p>
              <p>
                <b>ID:</b> {selectedStudent.studentId}
              </p>
              <p>
                <b>Class:</b> {selectedStudent.classStandard}
              </p>
              <p>
                <b>Van:</b> {selectedStudent.vanNumber}
              </p>
              <p>
                <b>Bus Stop:</b> {selectedStudent.busStop}
              </p>
              <p>
                <b>Parent Phone:</b> {selectedStudent.parentPhone}
              </p>
              <p>
                <b>Address:</b> {selectedStudent.address}
              </p>
              <p>
                <b>Status:</b> {selectedStudent.status}
              </p>
              {selectedStudent.createdAt && (
                <p>
                  <b>Registered At:</b>{" "}
                  {formatDateIST(selectedStudent.createdAt)}
                </p>
              )}
            </div>

            <button
              className="mt-6 w-full bg-[#819067] text-[#FEFAE0] py-2 rounded-lg hover:bg-[#0A400C] transition"
              onClick={() => setSelectedStudent(null)}
            >
              Close ❌
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
