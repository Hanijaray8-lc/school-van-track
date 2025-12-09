import { useEffect, useState } from "react";
import axios from "axios";

export default function ViewDrivers() {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    getAllDrivers();
  }, []);

  const getAllDrivers = async () => {
    try {
      const res = await axios.get("https://school-van-track.onrender.com/api/drivers"); // new route
      setDrivers(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch drivers");
    }
  };

  return (
    <div className="min-h-screen bg-[#FEFAE0] p-10">
      <h1 className="text-4xl font-bold mb-6 text-[#0A400C]">
        All Drivers
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {drivers.length === 0 && (
          <p className="text-[#819067] col-span-full text-center">
            No drivers found
          </p>
        )}

        {drivers.map((driver) => (
          <div
            key={driver._id}
            className="bg-[#819067] text-white rounded-2xl p-6 shadow-md flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-bold">{driver.driverName}</h2>
              <p>Van Number: {driver.vanNumber}</p>
              {driver.routeName && <p>Route: {driver.routeName}</p>}
              <p>Username: {driver.username}</p>
              <p>Password: {driver.password}</p>
            </div>

            <span
              className={`mt-4 inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                driver.status === "approved"
                  ? "bg-[#B1AB86] text-[#0A400C]"
                  : "bg-[#FEFAE0] text-[#819067] border border-[#819067]"
              }`}
            >
              {driver.status.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
