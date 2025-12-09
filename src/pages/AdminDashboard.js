import React from "react";
import {
  FaUserPlus,
  FaUsers,
  FaBus,
  FaClipboardList,
  FaCommentDots,
  FaMapMarkedAlt,
  FaUserCheck,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const AdminDashboard = () => {

  const navigate = useNavigate();
  const cards = [
    { title: "Add Van Driver", icon: <FaUserPlus size={30} />, link: "/add-driver" },
    { title: "Add Student", icon: <FaUserPlus size={30} />, link: "/add-student" },
    { title: "View Drivers", icon: <FaBus size={30} />, link: "/view-drivers" },
    { title: "View Students", icon: <FaUsers size={30} />, link: "/admin/view-students" },
    { title: "Driver Reports", icon: <FaClipboardList size={30} />, link: "/admin/driver-reports-list" },
    { title: "Student Attendance", icon: <FaUserCheck size={30} />, link: "/admin/view-attendance" },
    { title: "Track Drivers", icon: <FaMapMarkedAlt size={30} />, link: "/driver-tracklist" },
    { title: "Student Messages", icon: <FaCommentDots size={30} />, link: "/admin/messages" },
  ];

  return (
    <div className="min-h-screen bg-[#FEFAE0] p-5 flex flex-col items-center">

  {/* Header */}
  <div className="mb-6 text-center">
    <h1 className="text-3xl font-bold text-[#0A400C] animate-pulse">Admin Dashboard</h1>
    <p className="text-[#819067] text-sm mt-1">Manage routes, drivers, and students</p>
  </div>

  {/* Cards Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-6xl">
    {cards.map((card, index) => (
      <div
        key={index}
        className="bg-[#819067] text-white rounded-3xl p-6 shadow-2xl 
                   flex flex-col items-center justify-center gap-3 
                   hover:scale-105 hover:shadow-3xl transition transform cursor-pointer animate-fadeIn"
        onClick={() => navigate(card.link)}
      >
        <div className="text-4xl">{card.icon}</div>
        <h2 className="font-semibold text-center text-lg">{card.title}</h2>
      </div>
    ))}
  </div>
</div>

  );
};
export default AdminDashboard;
