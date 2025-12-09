import { useNavigate } from "react-router-dom";
import { FaUserTie, FaUserGraduate, FaUserShield, FaUserCog } from "react-icons/fa";

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#0A400C] via-[#819067] to-[#FEFAE0] flex flex-col justify-center items-center">

      {/* Animated Background Circles */}
      <div className="absolute w-[600px] h-[600px] bg-[#FEFAE0]/30 rounded-full -top-48 -left-48 animate-pulseSlow"></div>
      <div className="absolute w-[500px] h-[500px] bg-[#819067]/30 rounded-full -bottom-40 -right-40 animate-pulseSlow"></div>

      {/* Welcome Text */}
<h1 className="text-5xl sm:text-6xl font-extrabold text-[#FEFAE0] mb-10 text-center">
  <span
    className="cursor-pointer transition-colors"
    onClick={() => navigate("/company")}
  >
    W
  </span>
  elcome to Aziel
</h1>

<p className="text-[#B1AB86] text-lg sm:text-xl mb-16 text-center">
  Select your login to continue
</p>


      {/* Login Cards */}
      <div className="flex flex-col sm:flex-row gap-10 z-10">
        {/* Driver Login */}
        <div
          onClick={() => navigate("/driver-login")}
          className="bg-white/90 hover:bg-white shadow-xl hover:shadow-2xl cursor-pointer w-64 p-6 rounded-3xl flex flex-col items-center gap-4 transition transform hover:scale-105"
        >
          <FaUserTie className="text-5xl text-[#0A400C]" />
          <h2 className="text-xl font-bold text-[#0A400C]">Driver Login</h2>
        </div>

        {/* Student Login */}
        <div
          onClick={() => navigate("/student-login")}
          className="bg-white/90 hover:bg-white shadow-xl hover:shadow-2xl cursor-pointer w-64 p-6 rounded-3xl flex flex-col items-center gap-4 transition transform hover:scale-105"
        >
          <FaUserGraduate className="text-5xl text-[#819067]" />
          <h2 className="text-xl font-bold text-[#0A400C]">Student Login</h2>
        </div>
      </div>

      {/* Hidden Admin & Owner */}
      <div className="absolute top-4 right-4 flex flex-col gap-4 z-20">
        <button
          title="Admin Login"
          onClick={() => navigate("/admin-login")}
          className="w-12 h-12 rounded-full bg-[#0A400C] hover:bg-[#136014] text-[#FEFAE0] flex items-center justify-center shadow-lg transition"
        >
          <FaUserShield />
        </button>
        {/* <button
          title="Owner Login"
          onClick={() => navigate("/owner-login")}
          className="w-12 h-12 rounded-full bg-[#819067] hover:bg-[#B1AB86] text-[#0A400C] flex items-center justify-center shadow-lg transition"
        >
          <FaUserCog />
        </button> */}
      </div>

      {/* Tailwind Animations */}
      <style>
        {`
          @keyframes pulseSlow {
            0%, 100% { transform: scale(1); opacity: 0.6; }
            50% { transform: scale(1.2); opacity: 0.3; }
          }
          .animate-pulseSlow {
            animation: pulseSlow 8s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
}
