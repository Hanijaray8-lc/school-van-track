import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { io } from "socket.io-client";
import axios from "axios";
import {socket} from "./socket";
const vanIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", 
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export default function DriverDashboard() {
  const { state } = useLocation();
  const vanNumber = state?.vanNumber;
  const driverName = state?.driverName;

  const [position, setPosition] = useState([10.8505, 78.6920]);
  const [students, setStudents] = useState([]);
  const [attendanceMarked, setAttendanceMarked] = useState({});
  const [wakeLock, setWakeLock] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);


  const navigate = useNavigate();
socket.connect();
  // ===== SOCKET.IO =====
 // create ONE socket instance globally

// your backend server

  useEffect(() => {
    loadStudentList();
    requestWakeLock();

    // ==== Restore saved attendance ====
    const today = new Date().toISOString().split("T")[0];
    const saved = JSON.parse(localStorage.getItem(`attendance-${today}`));
    if (saved) setAttendanceMarked(saved);

    if (!navigator.geolocation) {
      alert("GPS is not supported");
      return;
    }

    const id = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);

        // Send location to students live via socket
        socket.emit("driver-location", {
          vanNumber,
          driverName,
          latitude,
          longitude,
          timestamp: new Date(),
        });
      },
      (error) => console.log("GPS error:", error),
      { enableHighAccuracy: true }
    );
console.log("Driver emitting vanNumber:", vanNumber);

    return () => {
      navigator.geolocation.clearWatch(id);
      if (wakeLock) wakeLock.release();
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
  const fetchUnread = async () => {
    try {
      const res = await axios.get(
        `https://school-van-track.onrender.com/api/messages/${vanNumber}`
      );

      const unread = res.data.filter((msg) => msg.read === false).length;
      setUnreadCount(unread);
    } catch (err) {
      console.log(err);
    }
  };

  if (vanNumber) {
    fetchUnread();
  }
}, [vanNumber]);


  const loadStudentList = async () => {
    try {
      const res = await fetch(`https://school-van-track.onrender.com/api/students/${vanNumber}`);
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.log(err);
    }
  };

  const requestWakeLock = async () => {
    try {
      const lock = await navigator.wakeLock.request("screen");
      setWakeLock(lock);
    } catch (err) {
      console.log("Wake lock failed:", err);
    }
  };

 const today = new Date().toISOString().split("T")[0];

const markAttendance = async (student) => {
  try {
    await axios.post("https://school-van-track.onrender.com/api/attendance", {
      studentId: student.studentId,
      studentName: student.studentName,
      vanNumber,
      markedBy: driverName,
      status: "present"
    });

    // === UI UPDATE ===
    setAttendanceMarked((prev) => {
      const updated = { ...prev, [student._id]: true };
      localStorage.setItem(`attendance-${today}`, JSON.stringify(updated));
      return updated;
    });

    alert(`Attendance marked for ${student.studentName}`);
  } catch (err) {
    if (err.response?.data?.message === "Attendance already marked today") {
      alert("Already marked today!");
    } else {
      alert("Error marking attendance");
      console.log(err);
    }
  }
};

return (
 <div className="min-h-screen bg-[#FEFAE0] p-4">

  {/* HEADER */}
  <div className="mb-4">
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

      {/* TITLE */}
      <h1 className="text-2xl font-bold text-[#0A400C]">
        Driver Dashboard 🚐
      </h1>

      {/* BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">

        <button
          className="w-full sm:w-auto bg-[#819067] text-white px-5 py-2 rounded-xl shadow hover:bg-[#0A400C] transition"
          onClick={() =>
            navigate("/view-attendance", { state: { vanNumber, driverName } })
          }
        >
          View Attendance 📋
        </button>

        <button
          className="relative w-full sm:w-auto bg-[#819067] text-white px-5 py-2 rounded-xl shadow hover:bg-[#0A400C] transition"
          onClick={() =>
            navigate("/driver-inbox", { state: { vanNumber, driverName } })
          }
        >
          View Messages 💬

          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </button>

      </div>
    </div>
  </div>


  {/* GRID CONTAINER */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

    {/* LEFT MAP PANEL */}
    <div className="bg-white rounded-2xl shadow-xl p-4 border border-[#B1AB86]">

      {/* INFO + REPORT BUTTON */}
      <div className="mb-4 flex flex-col sm:flex-row sm:justify-between gap-2">

        <p className="text-sm font-semibold text-red-600">
          🚨 Keep this tab open to share live location
        </p>

        <button
          className="w-full sm:w-auto bg-[#0A400C] text-white px-5 py-2 rounded-xl hover:bg-[#136014] transition"
          onClick={() =>
            navigate("/report-form", { state: { vanNumber, driverName } })
          }
        >
          Report Form 📝
        </button>
      </div>

      {/* MAP WINDOW */}
      <div className="rounded-xl overflow-hidden border border-[#E1E1C3]">
        <MapContainer
          center={position}
          zoom={6}
          className="h-[45vh] w-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={position} icon={vanIcon}>
            <Popup>
              <b>{driverName}</b> <br /> Van: {vanNumber}
            </Popup>
          </Marker>
        </MapContainer>
      </div>

    </div>


    {/* STUDENT LIST PANEL */}
    <div className="bg-white rounded-2xl shadow-xl p-4 border border-[#B1AB86] flex flex-col">
      
      <h2 className="text-lg font-bold text-[#0A400C] mb-3">
        Students in Van {vanNumber}
      </h2>

      <div className="overflow-y-auto space-y-2 pr-1 flex-1 h-[80vh]">

        {students.map((student) => (
          <div
            key={student._id}
            className="bg-[#FEFAE0] rounded-xl p-3 flex justify-between items-center border border-[#E1E1C3]"
          >
            <div>
              <p className="font-semibold text-[#0A400C]">{student.studentName}</p>
              <p className="text-xs text-gray-600">
                ID: {student.studentId}
              </p>
            </div>

            <button
              onClick={() => markAttendance(student)}
              disabled={attendanceMarked[student._id]}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                attendanceMarked[student._id]
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-[#819067] text-white hover:bg-[#0A400C]"
              }`}
            >
              {attendanceMarked[student._id] ? "Marked" : "Mark Present"}
            </button>
          </div>
        ))}

      </div>

    </div>

  </div>

</div>

);
}
