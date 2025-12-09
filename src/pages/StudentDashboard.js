import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const socket = io("https://school-van-track.onrender.com", { transports: ["websocket"] });

const vanIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export default function StudentDashboard() {
  const { state } = useLocation();
  const vanNumber = state?.vanNumber;
  const driverName = state?.driverName;

  const navigate = useNavigate();

  // DEFAULT MAP POSITION (Tamil Nadu)
  const [driverLocation, setDriverLocation] = useState(null);
  const [noSignal, setNoSignal] = useState(true);

  /** --------------------------
   * LISTEN TO DRIVER LOCATION
   * -------------------------- */
  useEffect(() => {
    if (!vanNumber) return;

    console.log("Listening to channel:", `van-${vanNumber}`);

    socket.on(`van-${vanNumber}`, (data) => {
      console.log("LIVE DRIVER LOCATION RECEIVED:", data);

      if (data.latitude && data.longitude) {
        setDriverLocation({
          lat: data.latitude,
          lng: data.longitude,
        });
        setNoSignal(false);
      }
    });

    // Cleanup listener
    return () => {
      socket.off(`van-${vanNumber}`);
    };
  }, [vanNumber]);

  return (
    <div className="min-h-screen bg-[#FEFAE0] p-4 flex flex-col gap-4">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
        <h1 className="text-2xl font-bold text-[#0A400C]">
          Student Dashboard 
        </h1>

        <button
          className="w-full sm:w-auto bg-[#0A400C] text-white px-6 py-2 rounded-xl font-semibold hover:bg-[#136014] transition"
          onClick={() =>
            navigate("/send-message", {
              state: {
                studentId: state?.studentId,
                studentName: state?.studentName,
                vanNumber,
                driverName,
              },
            })
          }
        >
          Leave Permission 📋
        </button>
      </div>

      {/* DRIVER SIGNAL NOTICE */}
      {noSignal && (
        <div className="bg-red-600 text-white text-center py-2 rounded-lg font-semibold">
          🚫 Driver is not sharing location now
        </div>
      )}

      {/* MAP CARD */}
      <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        <MapContainer
          center={driverLocation ? [driverLocation.lat, driverLocation.lng] : [10.8505, 78.6920]}
          zoom={driverLocation ? 16 : 6}
          className="h-[75vh] w-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {driverLocation && (
            <Marker position={[driverLocation.lat, driverLocation.lng]} icon={vanIcon}>
              <Popup>
                <b>{driverName}</b> <br /> Van: {vanNumber}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

    </div>
  );
}
