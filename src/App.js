import { BrowserRouter, Routes, Route } from "react-router-dom";
import OwnerLogin from "./pages/OwnerLogin";
import OwnerDashboard from "./pages/OwnerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AddDriver from "./pages/AddDrivers";
import ApproveDrivers from "./pages/viewDrivers";
import DriverLogin from "./pages/DriverLogin";
import DriverMap from "./pages/DriverMap";
import AddStudent from "./pages/AddStudents";
import StudentLogin from "./pages/StudentLogin";
import StudentDashboard from "./pages/StudentDashboard";
import ViewAttendance from "./pages/ViewAttendance";
import SendMessageForm from "./pages/SendMessage";
import DriverInbox from "./pages/DriverInbox";
import DriverReportForm from "./pages/DriverReport";
import AdminDriverList from "./pages/AdminDriverList";
import AdminDriverReport from "./pages/AdminViewReport";
import AdminViewStudents from "./pages/AdminViewStudents";
import ViewAllAttendance from "./pages/AdminViewAttendance";
import AdminLiveTracking from "./pages/AdminTrack";
import DriverList from "./pages/AdmindriverTracklist";
import EditDriver from "./pages/EditDriver";
import EditStudent from "./pages/EditStudent";
import AdminMessages from "./pages/AdminViewMessages";


import AdminSignup from "./pages/AdminSignup";
import AdminLogin from "./pages/AdminLogin";
import AdminEdit from "./pages/AdminEdit";
import Layout from "./pages/Layout";
import WelcomePage from "./pages/Welcome";




function App() {
  return (
    
    <BrowserRouter>
     <Layout fullScreen={true}>
      <Routes>
       
        <Route path="/company" element={<OwnerLogin />} />
        <Route path="/owner/dashboard" element={<OwnerDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/add-driver" element={<AddDriver />} />
        <Route path="/view-drivers" element={<ApproveDrivers />} />
        <Route path="/driver-login" element={<DriverLogin />} />
        <Route path="/share-location" element={<DriverMap />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/view-attendance" element={<ViewAttendance />} />
        <Route path="/send-message" element={<SendMessageForm />} />
        <Route path="/driver-inbox" element={<DriverInbox />} />
        <Route path="/report-form" element={<DriverReportForm />} />
        <Route path="/admin/driver-reports-list" element={<AdminDriverList />} />
        <Route path="/admin/driver-report" element={<AdminDriverReport />} />
        <Route path="/admin/view-students" element={<AdminViewStudents />} />
        <Route path="/admin/view-attendance" element={<ViewAllAttendance />} />
        <Route path="/track" element={<AdminLiveTracking />} />
        <Route path="/driver-tracklist" element={<DriverList />} />
        <Route path="/admin/messages" element={<AdminMessages />} />
        <Route path="/edit-driver" element={<EditDriver />} />
        <Route path="/edit-student" element={<EditStudent />} />
        <Route path="/admin-signup" element={<AdminSignup />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-edit" element={<AdminEdit />} />
        <Route path="/" element={<WelcomePage />} />
        


      </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
