import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const res = await axios.get("https://school-van-track.onrender.com/api/messages/admin/all");
      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Convert timestamp to IST
  const formatIST = (timestamp) => {
    return new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(timestamp));
  };

  return (
    <div className="p-5 bg-[#FEFAE0] min-h-screen">
      <h1 className="text-2xl font-bold text-[#0A400C] mb-5">
        📩 Student Messages (Admin View)
      </h1>

      <div className="bg-white rounded-xl shadow-lg border border-[#B1AB86] overflow-hidden">

        {/* Table Wrapper for Scroll */}
        <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
          <table className="w-full border-collapse text-sm md:text-base min-w-[700px]">
            
            <thead className="bg-[#B1AB86] text-[#0A400C] sticky top-0 z-10">
              <tr>
                <th className="p-3 text-left">Student</th>
                <th className="p-3 text-left">Message</th>
                <th className="p-3 text-left">Van</th>
                <th className="p-3 text-left">Driver</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Time (IST)</th>
              </tr>
            </thead>

            <tbody>
              {messages.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-4">
                    No messages found
                  </td>
                </tr>
              ) : (
                messages.map((msg) => (
                  <tr
                    key={msg._id}
                    className="border-b hover:bg-[#FEFAE0] transition cursor-pointer"
                  >
                    <td className="p-3 font-semibold text-[#0A400C]">
                      {msg.studentName}
                    </td>

                    <td className="p-3 text-gray-700 max-w-[240px] truncate">
                      {msg.message}
                    </td>

                    <td className="p-3 text-[#0A400C] font-semibold">
                      {msg.vanNumber}
                    </td>

                    <td className="p-3">
                      <span className="text-[#0A400C]">{msg.driverName}</span>
                    </td>

                    <td className="p-3">
                      {msg.read ? (
                        <span className="bg-[#819067] text-white px-2 py-1 rounded-md text-xs md:text-sm">
                          ✔ Read by Driver
                        </span>
                      ) : (
                        <span className="bg-red-500 text-white px-2 py-1 rounded-md text-xs md:text-sm">
                          ⏳ Not Read Yet
                        </span>
                      )}
                    </td>

                    <td className="p-3 text-xs text-gray-500">
                      {formatIST(msg.timestamp)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}
