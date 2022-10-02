import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/home";
import Register from "./Components/Auth/register";
import Login from "./Components/Auth/login";
import Profile from "./Components/Profile/profile";
import ResetPassword from "./Components/Auth/resetPass";
import Complaints from "./Components/Complaint/complaints";
import UserComplaints from "./Components/History/complaints";
import AddComplaint from "./Components/Complaint/addComplaint";
import UserPrivateRoute from "./Components/common/UserPrivateRoute";
import ComplaintDetails from "./Components/ComplaintDetails/details";

// Admin Routes
import AdminLogin from "./Components/Admin/Login/login";
import AdminDashboard from "./Components/Admin/Dashboard/dashboard";
import AdminUsers from "./Components/Admin/Users/users";
import AdminComplaints from "./Components/Admin/Complaints/complaints";
import AdminPrivateRoute from "./Components/common/AdminPrivateRoute";
import AdminCategories from "./Components/Admin/categories/categories";
import AdminAddCategory from "./Components/Admin/categories/addCategory";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return window.location.pathname.includes("/admin") ? (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminLogin />} />
        <Route element={<AdminPrivateRoute />}>
          <Route path="/admin/dash" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/complaints" element={<AdminComplaints />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/admin/categories/add" element={<AdminAddCategory />} />
        </Route>
      </Routes>
    </Router>
  ) : (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/complaints/details" element={<ComplaintDetails />} />
        <Route element={<UserPrivateRoute />}>
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/history" element={<UserComplaints />} />
          <Route path="/complaints/add" element={<AddComplaint />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
