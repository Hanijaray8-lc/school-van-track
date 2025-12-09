import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

export default function AdminDriverReport() {
  const { state } = useLocation();
  const driverName = state?.driverName;

  const [reports, setReports] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");

  const vanIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/69/69524.png",
    iconSize: [40, 40]
  });

  useEffect(() => {
    if (driverName) fetchReports();
  }, [driverName]);

  const fetchReports = async () => {
    const res = await axios.get(`https://school-van-track.onrender.com/api/reports/driver/${driverName}`);
    setReports(res.data);
    setFiltered(res.data);
  };

  // filter logic
  useEffect(() => {
    let data = reports;

    if (search) {
      data = data.filter(r =>
        r.message.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (date) {
      data = data.filter(r =>
        new Date(r.timestamp).toISOString().slice(0, 10) === date
      );
    }

    setFiltered(data);
  }, [search, date, reports]);

  // Helper function to format date in IST
  const formatIST = (timestamp) => {
    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    };
    return new Intl.DateTimeFormat("en-IN", options).format(new Date(timestamp));
  };

  return (
    <div className="p-4 bg-[#FEFAE0] min-h-screen">
      <h1 className="text-xl md:text-2xl font-bold text-[#0A400C] mb-4">
        Driver Report — {driverName} 📍
      </h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <input
          type="date"
          className="p-2 border rounded w-full md:w-auto focus:ring focus:ring-[#B1AB86]"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          placeholder="Search message..."
          className="p-2 border rounded w-full md:w-auto focus:ring focus:ring-[#B1AB86]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Main layout */}
      <div className="flex flex-col md:flex-row gap-4">

        {/* Reports List */}
        <div className="md:w-1/2 bg-white rounded-xl shadow p-3 h-[400px] overflow-y-auto border border-[#B1AB86]">
          {filtered.length ? (
            filtered.map((report) => (
              <div
                key={report._id}
                onClick={() => setSelected(report)}
                className="p-3 mb-3 bg-[#FEFAE0] rounded-lg border border-[#B1AB86] cursor-pointer hover:bg-[#B1AB86] hover:text-white transition"
              >
                <p className="font-semibold text-[#0A400C]">{report.message}</p>
                <p className="text-xs text-gray-600">{formatIST(report.timestamp)}</p>
                <p className="text-[10px] text-[#819067] mt-1">📌 Tap to show on map</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No reports found</p>
          )}
        </div>

        {/* Map Section */}
        <div className="md:w-1/2 h-[400px] bg-white rounded-xl shadow border border-[#B1AB86]">
          {selected ? (
            <MapContainer
              center={[selected.latitude, selected.longitude]}
              zoom={16}
              className="h-full w-full rounded-xl"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker
                position={[selected.latitude, selected.longitude]}
                icon={vanIcon}
              >
                <Popup>{selected.message}</Popup>
              </Marker>
            </MapContainer>
          ) : (
            <p className="p-5 text-center text-gray-600">
              👆 Select a report to view location
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
