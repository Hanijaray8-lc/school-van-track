import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function OwnerDashboard() {
  const [drivers, setDrivers] = useState([]);
  const [approvedDrivers, setApprovedDrivers] = useState([]);
  const [students, setStudents] = useState([]);
  const [approvedStudents, setApprovedStudents] = useState([]);

  useEffect(() => {
    fetchDrivers();
    fetchApprovedDrivers();
    fetchStudents();
    fetchApprovedStudents();
  }, []);

  // Pending drivers
  const fetchDrivers = async () => {
    try {
      const res = await axios.get("https://school-van-track.onrender.com/api/drivers/pending");
      setDrivers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Approved drivers
  const fetchApprovedDrivers = async () => {
    try {
      const res = await axios.get("https://school-van-track.onrender.com/api/drivers/approved");
      setApprovedDrivers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Pending students
  const fetchStudents = async () => {
    try {
      const res = await axios.get("https://school-van-track.onrender.com/api/students/pending");
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Approved students
  const fetchApprovedStudents = async () => {
    try {
      const res = await axios.get("https://school-van-track.onrender.com/api/students");
      setApprovedStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const approveDriver = async (id) => {
    await axios.put(`https://school-van-track.onrender.com/api/drivers/approve/${id}`);
    fetchDrivers();
    fetchApprovedDrivers();
  };

  const approveStudent = async (id) => {
    await axios.put(`https://school-van-track.onrender.com/api/students/approve/${id}`);
    fetchStudents();
    fetchApprovedStudents();
  };

  // ⬇️ SIMPLE EDIT NAVIGATION
const navigate = useNavigate();

const editDriver = (driver) => {
  navigate("/edit-driver", { state: driver });
};

const editStudent = (student) => {
  navigate("/edit-student", { state: student });
};


  return (
   <div className="min-h-screen bg-[#FEFAE0] p-5">
  {/* HEADER */}
  <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
    <h1 className="text-3xl sm:text-4xl font-bold text-[#0A400C] text-center sm:text-left">
      Owner Dashboard
    </h1>

    <button
      onClick={() => navigate("/admin-edit")}
      className="w-full sm:w-auto bg-[#0A400C] text-white px-6 py-2 rounded-xl font-semibold hover:bg-[#136014] transition"
    >
      Edit Admin 🛠️
    </button>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
    {/* PENDING DRIVERS */}
    <div className="bg-white p-5 shadow-lg rounded-2xl h-[450px] overflow-y-auto">
      <h2 className="text-2xl font-semibold text-[#0A400C] mb-4">Pending Drivers</h2>
      {drivers.length === 0 ? (
        <p className="text-[#819067]">No pending driver requests</p>
      ) : (
        drivers.map((d) => (
          <div
            key={d._id}
            className="bg-[#819067] text-white p-4 rounded-2xl mb-4 shadow-md flex justify-between items-center hover:scale-105 transform transition"
          >
            <div>
              <p className="font-bold text-lg">{d.driverName}</p>
              <p>Van: {d.vanNumber}</p>
              {d.routeName && <p>Route: {d.routeName}</p>}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => approveDriver(d._id)}
                className="bg-green-400 px-3 py-1 rounded text-[#0A400C] hover:bg-green-500 transition"
              >
                Approve
              </button>
              <button
                onClick={() => editDriver(d)}
                className="bg-[#0A400C] px-3 py-1 rounded text-white hover:bg-[#136014] transition"
              >
                Edit
              </button>
            </div>
          </div>
        ))
      )}
    </div>

    {/* APPROVED DRIVERS */}
    <div className="bg-white p-5 shadow-lg rounded-2xl h-[450px] overflow-y-auto">
      <h2 className="text-2xl font-semibold text-[#0A400C] mb-4">Approved Drivers</h2>
      {approvedDrivers.length === 0 ? (
        <p className="text-[#819067]">No approved drivers</p>
      ) : (
        approvedDrivers.map((d) => (
          <div
            key={d._id}
            className="bg-[#B1AB86] text-[#0A400C] p-4 rounded-2xl mb-4 shadow-md flex justify-between items-center hover:scale-105 transform transition"
          >
            <div>
              <p className="font-bold text-lg">{d.driverName}</p>
              <p>Van: {d.vanNumber}</p>
              {d.routeName && <p>Route: {d.routeName}</p>}
            </div>
            <button
              onClick={() => editDriver(d)}
              className="bg-[#0A400C] px-3 py-1 rounded text-white hover:bg-[#136014] transition"
            >
              Edit
            </button>
          </div>
        ))
      )}
    </div>

    {/* PENDING STUDENTS */}
    <div className="bg-white p-5 shadow-lg rounded-2xl h-[450px] overflow-y-auto">
      <h2 className="text-2xl font-semibold text-[#0A400C] mb-4">Pending Students</h2>
      {students.length === 0 ? (
        <p className="text-[#819067]">No pending student requests</p>
      ) : (
        students.map((s) => (
          <div
            key={s._id}
            className="bg-[#819067] text-white p-4 rounded-2xl mb-4 shadow-md flex justify-between items-center hover:scale-105 transform transition"
          >
            <div>
              <p className="font-bold text-lg">{s.studentName}</p>
              <p>ID: {s.studentId}</p>
              <p>Van: {s.vanNumber}</p>
              <p>Class: {s.classStandard}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => approveStudent(s._id)}
                className="bg-green-400 px-3 py-1 rounded text-[#0A400C] hover:bg-green-500 transition"
              >
                Approve
              </button>
              {/* <button
                onClick={() => editStudent(s)}
                className="bg-[#0A400C] px-3 py-1 rounded text-white hover:bg-[#136014] transition"
              >
                Edit
              </button> */}
            </div>
          </div>
        ))
      )}
    </div>

    {/* APPROVED STUDENTS */}
    <div className="bg-white p-5 shadow-lg rounded-2xl h-[450px] overflow-y-auto">
      <h2 className="text-2xl font-semibold text-[#0A400C] mb-4">Approved Students</h2>
      {approvedStudents.length === 0 ? (
        <p className="text-[#819067]">No approved students</p>
      ) : (
        approvedStudents.map((s) => (
          <div
            key={s._id}
            className="bg-[#B1AB86] text-[#0A400C] p-4 rounded-2xl mb-4 shadow-md flex justify-between items-center hover:scale-105 transform transition"
          >
            <div>
              <p className="font-bold text-lg">{s.studentName}</p>
              <p>ID: {s.studentId}</p>
              <p>Van: {s.vanNumber}</p>
              <p>Class: {s.classStandard}</p>
            </div>
            {/* <button
              onClick={() => editStudent(s)}
              className="bg-[#0A400C] px-3 py-1 rounded text-white hover:bg-[#136014] transition"
            >
              Edit
            </button> */}
          </div>
        ))
      )}
    </div>
  </div>
</div>


  );
}

export default OwnerDashboard;
