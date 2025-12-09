import { useEffect, useState } from "react";
import axios from "axios";
import AdminLiveTracking from "./AdminTrack";

export default function DriverList() {
  const [drivers, setDrivers] = useState([]);
  const [selectedVan, setSelectedVan] = useState("");

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const res = await axios.get("https://school-van-track.onrender.com/api/drivers/track");
      setDrivers(res.data);
    } catch (error) {
      console.log("Error fetching drivers:", error);
    }
  };

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Driver List</h1>

      {/* Driver List UI */}
      <div className="bg-gray-900 p-4 rounded-lg">
        {drivers.length === 0 ? (
          <p className="text-red-400">No approved drivers found.</p>
        ) : (
          drivers.map((d, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-gray-700 p-3 rounded mb-2"
            >
              <p>{d.driverName} - {d.vanNumber}</p>
              <button
                className="bg-blue-500 px-4 py-2 rounded"
                onClick={() => setSelectedVan(d.vanNumber)}
              >
                Track
              </button>
            </div>
          ))
        )}
      </div>

      {/* Live Tracking Map */}
      {selectedVan && (
        <div className="mt-5">
          <AdminLiveTracking selectedVan={selectedVan} />
        </div>
      )}
    </div>
  );
}
