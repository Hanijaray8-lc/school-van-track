import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DriverLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const [showPassword, setShowPassword] = useState(false);

  const login = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://school-van-track.onrender.com/api/drivers/login",
        form
      );

      // ====== SUCCESS ======
      alert(res.data.msg);

      // send driver data to share location page
      navigate("/share-location", {
        state: {
          vanNumber: res.data.driver.vanNumber,
          driverName: res.data.driver.driverName
        }
      });

    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FEFAE0] p-4">

  <div className="w-full max-w-sm bg-white shadow-xl rounded-2xl p-6 border border-[#B1AB86]">

    <h1 className="text-2xl font-bold text-center text-[#0A400C] mb-6">
       Driver Login
    </h1>

    <form onSubmit={login} className="space-y-4">

      <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#819067]"
      />

     <div className="relative w-full">
  <input
    name="password"
    type={showPassword ? "text" : "password"}
    className="w-full p-3 pr-12 border rounded-xl focus:ring-2 focus:ring-[#819067] outline-none transition"
    placeholder="Password"
    onChange={handleChange}
  />

  {/* Eye Icon */}
  <span
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer"
  >
    {showPassword ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
           viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4-10-7 
                 0-1.094.333-2.124.925-3.034m3.201-2.641A9.956 9.956 0 0112 5c5.523 0 
                 10 4 10 7 0 1.358-.497 2.63-1.325 3.722M15 12a3 3 0 11-6 0 
                 3 3 0 016 0z" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
           viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M3 3l18 18M15 12a3 3 0 00-3-3M4.868 4.879A9.956 9.956 0 
                 0112 5c5.523 0 10 4 10 7 0 1.113-.337 2.165-.938 3.087M9.88 
                 9.88A3 3 0 0114.12 14.12M6.14 6.142C4.253 7.27 3 
                 8.993 3 12c0 3 4.477 7 10 7 1.683 0 3.27-.33 
                 4.682-.94" />
      </svg>
    )}
  </span>
</div>


      <button
        className="w-full bg-[#819067] text-white font-semibold py-3 rounded-lg 
        hover:bg-[#0A400C] transition duration-200"
      >
        Login
      </button>

    </form>

    <p className="text-center text-sm text-gray-600 mt-4">
      Contact admin if you forgot password
    </p>

  </div>

</div>

  );
}
