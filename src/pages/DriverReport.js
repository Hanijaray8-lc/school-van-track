import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function DriverReportForm() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const driverName = state?.driverName;
  const vanNumber = state?.vanNumber;

  const [coords, setCoords] = useState({
    latitude: "",
    longitude: ""
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    // Get GPS coordinates
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setCoords({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        });
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reportData = {
      driverName,
      vanNumber,
      latitude: coords.latitude,
      longitude: coords.longitude,
      message
    };

    try {
      await axios.post("https://school-van-track.onrender.com/api/reports", reportData);
      alert("Report submitted successfully!");

      navigate("/driver-login");
    } catch (err) {
      console.error(err);
      alert("Failed to submit report");
    }
  };

  return (
    <div className="min-h-screen bg-[#FEFAE0] p-5 flex justify-center">
  <div className="w-full max-w-md">

    {/* HEADER */}
    <h1 className="text-2xl font-bold text-[#0A400C] mb-6 text-center">
      Driver Report Form 📝
    </h1>

    {/* FORM */}
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-lg space-y-4"
    >
      {/* DRIVER NAME */}
      <div>
        <label className="font-semibold text-[#0A400C] mb-1 block">
          Driver Name
        </label>
        <input
          type="text"
          value={driverName}
          readOnly
          className="w-full p-3 border border-[#B1AB86] rounded-xl bg-[#F5F5DC] text-[#0A400C] font-medium"
        />
      </div>

      {/* VAN NUMBER */}
      <div>
        <label className="font-semibold text-[#0A400C] mb-1 block">
          Van Number
        </label>
        <input
          type="text"
          value={vanNumber}
          readOnly
          className="w-full p-3 border border-[#B1AB86] rounded-xl bg-[#F5F5DC] text-[#0A400C] font-medium"
        />
      </div>

      {/* LATITUDE & LONGITUDE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-semibold text-[#0A400C] mb-1 block">
            Latitude
          </label>
          <input
            type="text"
            value={coords.latitude}
            readOnly
            className="w-full p-3 border border-[#B1AB86] rounded-xl bg-[#F5F5DC] text-[#0A400C]"
          />
        </div>
        <div>
          <label className="font-semibold text-[#0A400C] mb-1 block">
            Longitude
          </label>
          <input
            type="text"
            value={coords.longitude}
            readOnly
            className="w-full p-3 border border-[#B1AB86] rounded-xl bg-[#F5F5DC] text-[#0A400C]"
          />
        </div>
      </div>

      {/* REPORT MESSAGE */}
      <div>
        <label className="font-semibold text-[#0A400C] mb-1 block">
          Report Message
        </label>
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-3 border border-[#B1AB86] rounded-2xl bg-[#FEFEF0] text-[#0A400C] font-medium h-32 resize-none placeholder-gray-400"
          placeholder="Type your report here..."
        />
      </div>

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        className="w-full bg-[#0A400C] hover:bg-[#136014] text-white py-3 rounded-xl font-semibold transition-colors"
      >
        Submit Report
      </button>
    </form>
  </div>
</div>

  );
}
