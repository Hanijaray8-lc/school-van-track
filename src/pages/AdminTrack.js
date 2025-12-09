import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const socket = io("https://school-van-track.onrender.com");  // your backend server

const vanIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854894.png",
  iconSize: [40, 40],
});

export default function AdminLiveTracking({ selectedVan }) {
  const [location, setLocation] = useState(null);
  const [noSignal, setNoSignal] = useState(true);

  useEffect(() => {
  if (!selectedVan) return;

  // Reset UI state
  setLocation(null);
  setNoSignal(true);

  // Socket listener
  const eventName = `van-${selectedVan}`;
  socket.on(eventName, (data) => {
    setLocation(data);
    setNoSignal(false);
  });

  // Cleanup
  return () => {
    socket.off(eventName);
  };
}, [selectedVan]);

  return (
    <div className="p-4 bg-[#FEFAE0] rounded-xl shadow-md">
  <h2 className="text-xl md:text-2xl font-bold text-[#0A400C] mb-4">
    Live Tracking — Van {selectedVan} 🚐
  </h2>

  {/* No Signal Alert */}
  {noSignal && (
    <div className="bg-red-500 text-white p-3 text-center rounded-lg mb-3 font-semibold">
      🚫 Driver not sharing location
    </div>
  )}

  {/* Map Section */}
  {location ? (
    <div className="mt-3 border border-[#B1AB86] rounded-xl overflow-hidden">
      <MapContainer
        center={[location.latitude, location.longitude]}
        zoom={15}
        className="h-[350px] md:h-[450px] w-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker
          position={[location.latitude, location.longitude]}
          icon={vanIcon}
        >
          <Popup>
            <p className="font-semibold text-[#0A400C]">
              🚐 {location.driverName}
            </p>
            <p>Van: {location.vanNumber}</p>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  ) : (
    <p className="text-center text-gray-600 py-10 bg-white rounded-lg border border-[#B1AB86]">
      📍 Waiting for location...
    </p>
  )}
</div>

  );
}
