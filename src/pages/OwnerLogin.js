import { useState } from "react";
import { useNavigate } from "react-router-dom";

function OwnerLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "lcind" && password === "life@123") {
      navigate("/owner/dashboard");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen 
                bg-gradient-to-br from-[#FEFAE0] via-[#B1AB86] to-[#819067]
                animate-gradientBG">
  <div className="bg-white/20 backdrop-blur-md text-[#0A400C] p-10 rounded-3xl shadow-2xl w-full max-w-md
                  transform transition-transform duration-500 hover:scale-105">
    
    <h2 className="text-3xl font-bold text-center mb-8 tracking-wider animate-bounce">
      Owner Login 🚐
    </h2>

    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="text-sm font-semibold">Username</label>
        <input
          type="text"
          className="w-full mt-2 px-4 py-3 bg-white/20 rounded-xl outline-none 
                     focus:ring-2 focus:ring-[#819067] placeholder-[#0A400C]/60 text-[#0A400C]"
          placeholder="Enter owner username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm font-semibold">Password</label>
        <input
          type="password"
          className="w-full mt-2 px-4 py-3 bg-white/20 rounded-xl outline-none 
                     focus:ring-2 focus:ring-[#819067] placeholder-[#0A400C]/60 text-[#0A400C]"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 text-lg font-semibold bg-[#819067] hover:bg-[#0A400C] 
                   hover:text-white rounded-xl transition-all duration-300 shadow-lg 
                   hover:shadow-[#B1AB86]/50"
      >
        Login
      </button>
    </form>
{/* 
    <p className="mt-4 text-center text-sm text-[#0A400C]">
      Don't have an account?{" "}
      <span
        className="font-semibold cursor-pointer underline"
        onClick={() => navigate("/owner-signup")}
      >
        Sign Up
      </span>
    </p> */}
  </div>
</div>

  );
}

export default OwnerLogin;
