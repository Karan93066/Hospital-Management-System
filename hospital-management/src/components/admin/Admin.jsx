import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import AddAdmin from "./AddAdmin";
import DoctorDetails from "./DoctorDetails";
import UserDetails from "./UserDetails";
import Appointment from "./Appointment";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedView, setSelectedView] = useState("doctorDetail");
  var name = localStorage.getItem("name");
  var email = localStorage.getItem("email");
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // Render the current view
  const renderView = () => {
    switch (selectedView) {
      case "doctorDetail":
        return <DoctorDetails />;
      case "addAdmin":
        return <AddAdmin />;
      case "userDetails":
        return <UserDetails />;
      case "appointment":
        return <Appointment />;
      default:
        return <DoctorDetails />;
    }
  };
  return (
    <>
      <div className="flex h-screen">
        {/* Sidebar Navigation */}
        <div className="w-1/4 bg-gray-200 p-4 flex flex-col">
          {/* User Profile Section */}
          <div className="mb-6 bg-blue-200 p-4 rounded-xl">
            <h2 className="text-lg font-bold text-gray-700 mb-2">
              Name : {name}
            </h2>
            <p className="text-sm text-gray-600">E-mail : {email}</p>
            <button
              onClick={handleLogout}
              className="mt-4 text-white bg-red-500 hover:bg-red-600 p-2 rounded-xl w-full"
            >
              Logout
            </button>
          </div>

          {/* Navigation Links */}
          <ul className="space-y-4">
            <li>
              <button
                className={`p-2 w-full text-left rounded-xl ${
                  selectedView === "doctorDetail"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                }`}
                onClick={() => setSelectedView("doctorDetail")}
              >
                View Doctors
              </button>
            </li>
            <li>
              <button
                className={`p-2 w-full text-left rounded-xl ${
                  selectedView === "addAdmin"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                }`}
                onClick={() => setSelectedView("addAdmin")}
              >
                Add New Admin
              </button>
            </li>
            <li>
              <button
                className={`p-2 w-full text-left rounded-xl ${
                  selectedView === "userDetails"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                }`}
                onClick={() => setSelectedView("userDetails")}
              >
                User Details
              </button>
            </li>
            <li>
              <button
                className={`p-2 w-full text-left rounded-xl ${
                  selectedView === "appointment"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                }`}
                onClick={() => setSelectedView("appointment")}
              >
                View Appointments
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="w-3/4 bg-white p-6">{renderView()}</div>
      </div>
    </>
  );
};

export default AdminDashboard;
