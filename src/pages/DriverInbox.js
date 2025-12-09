import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function DriverInbox() {
  const { state } = useLocation();
  const vanNumber = state?.vanNumber;   // <-- FIX
  const driverName = state?.driverName;

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (vanNumber) {
      fetchMessages();
    }
  }, [vanNumber]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `https://school-van-track.onrender.com/api/messages/${vanNumber}`
      );
      setMessages(res.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const markAsRead = async (messageId) => {
    try {
      await axios.put(
        `https://school-van-track.onrender.com/api/messages/read/${messageId}`
      );

      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === messageId ? { ...msg, read: true } : msg
        )
      );
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };
const formatIST = (timestamp) => {
  const dt = new Date(timestamp);
  if (isNaN(dt.getTime())) return "-";
  return dt.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

  return (
 <div className="min-h-screen bg-[#FEFAE0] p-4">
  <h2 className="text-xl font-bold text-[#0A400C] mb-4">
    📥 Driver Inbox (Van {vanNumber})
  </h2>

  <div className="overflow-y-auto max-h-[80vh] space-y-3 pr-1">
    {messages.length === 0 ? (
      <p className="text-[#0A400C] font-semibold text-center">
        No messages yet ❌
      </p>
    ) : (
      messages.map((msg) => (
        <div
          key={msg._id}
          className={`w-full p-4 rounded-2xl shadow-lg border transition-all
            ${msg.read ? "bg-[#B1AB86] border-[#818067] opacity-90" : "bg-white border-[#B1AB86]"}
          `}
        >
          <p className="font-bold text-[#0A400C] text-sm mb-1">
            👤 {msg.studentName}
          </p>

          <p className="text-base font-semibold text-gray-800 mb-3">
            💬 {msg.message}
          </p>

          {msg.latitude && msg.longitude && (
            <a
              href={`https://www.google.com/maps?q=${msg.latitude},${msg.longitude}`}
              className="text-[#0A400C] text-sm font-bold underline"
              target="_blank"
              rel="noreferrer"
            >
              📍 View Location
            </a>
          )}

          {!msg.read && (
            <button
              onClick={() => markAsRead(msg._id)}
              className="mt-3 text-xs font-semibold bg-[#819067] hover:bg-[#6d7d54] 
                         text-white px-3 py-1 rounded-full shadow-sm transition"
            >
              ✔ Mark as Read
            </button>
          )}

          <p className="text-[10px] text-gray-600 mt-3 text-right">
            {formatIST(msg.timestamp)}
          </p>
        </div>
      ))
    )}
  </div>
</div>



  );
}
