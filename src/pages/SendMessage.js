import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SendMessageForm() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const studentId = state?.studentId;
  const studentName = state?.studentName;
  const vanNumber = state?.vanNumber;
  const driverName = state?.driverName;

  const [message, setMessage] = useState("");

  const submitMessage = async () => {
    if (!message.trim()) return alert("Message cannot be empty");

    try {
      await axios.post("https://school-van-track.onrender.com/api/messages", {
        studentId,
        studentName,
        vanNumber,
        driverName,
        message
      });

      alert("Message sent successfully ✔️");
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("Failed to send message ❌");
    }
  };

  return (
   <div className="min-h-screen bg-[#FEFAE0] p-4 flex flex-col items-center">

  <h1 className="text-2xl font-bold text-[#0A400C] mb-6 text-center">
    Send Leave / Permission 📋
  </h1>

  <div className="bg-[#819067] p-5 rounded-3xl shadow-lg w-full max-w-md flex flex-col gap-4">
    
    <p className="text-white text-lg">
      To Driver: <b>{driverName}</b> (Van – {vanNumber})
    </p>

    <textarea
      className="w-full p-3 rounded-xl text-black placeholder-gray-700 resize-none h-32"
      placeholder="Type your message..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
    />

    <button
      onClick={submitMessage}
      className="bg-[#B1AB86] text-[#0A400C] font-semibold px-6 py-2 rounded-xl hover:bg-[#0A400C] hover:text-white transition"
    >
      Send ✉️
    </button>

  </div>
</div>

  );
}
