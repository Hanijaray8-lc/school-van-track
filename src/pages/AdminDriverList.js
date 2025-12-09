import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminDriverList() {
  const [drivers, setDrivers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    const res = await axios.get("https://school-van-track.onrender.com/api/reports/drivers/list");
    setDrivers(res.data);
  };

  return (
    <div className="p-6 bg-[#FEFAE0] min-h-screen">

  {/* Title */}
  <h1 className="text-3xl font-bold text-[#0A400C] mb-6 tracking-wide">
    Drivers Report List 🚐
  </h1>

  {/* Card List */}
  {drivers.map((d, i) => (
    <div
      key={i}
      className="
        p-5 
        bg-white 
        border border-[#B1AB86] 
        rounded-xl 
        shadow-md 
        mb-4 
        cursor-pointer 
        hover:shadow-xl 
        hover:scale-[1.02] 
        hover:bg-[#FFFCE8]
        transition transform duration-200
      "
      onClick={() =>
        navigate("/admin/driver-report", {
          state: { driverName: d.driverName, vanNumber: d.vanNumber }
        })
      }
    >
      <p className="text-xl font-bold text-[#0A400C]">
        {d.driverName}
      </p>

      <p className="text-sm text-[#819067] mt-1">
        🚐 Van No: <span className="font-semibold text-[#0A400C]">{d.vanNumber}</span>
      </p>
      <p className="text-xs text-[#B1AB86] mt-1 italic">
        👉 Click to view report
      </p>
    </div>
  ))}
</div>

  );
}
