import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import DoctorAppointment from "./Doctor_Appointment";
import EditInfo from "./Edit_Info";

const DoctorDashboard = () => {
  const [doctorData, setDoctors] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedView, setSelectedView] = useState("doctorAppointment");
  const id = useSelector((state) => state.auth.id);
  var name = localStorage.getItem("name");
  var email = localStorage.getItem("email");
       // Fetching Details
       useEffect(() => {
        fetchDoctors();
      }, []);
    const fetchDoctors = () => {
        // Fetch all doctors
        axios
          .get(`http://localhost:5500/doctor/${id}`)
          .then((response) => setDoctors(response.data))
          .catch((err) => console.error("Error fetching doctors:", err));
      };
      console.log(doctorData)


  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // Render the current view
  const renderView = () => {
    switch (selectedView) {
      // case "doctorDetail":
      //   return <DoctorDetails />;
      case "doctorAppointment":
        return  (
          <>
           <div className="container mx-auto py-8">
                <h2 className="text-3xl font-bold mb-4">
                All Your Appointments
                </h2>
                <DoctorAppointment/>
              </div>
         
          </>
        );
      case "editInfo":
        return <EditInfo doctorData={doctorData} id = {id}/>;
    }
  };

  return (
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
            {/* <li>
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
            </li> */}
             <li>
              <button
                className={`p-2 w-full text-left rounded-xl ${
                  selectedView === "doctorAppointment"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                }`}
                onClick={() => setSelectedView("doctorAppointment")}
              >
                View Your Appointments
              </button>
            </li>
            <li>
              <button
                className={`p-2 w-full text-left rounded-xl ${
                  selectedView === "editInfo"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100"
                }`}
                onClick={() => setSelectedView("editInfo")}
              >
                Edit Your Info
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="w-3/4 bg-white p-6">{renderView()}</div>
      </div>
  );
};

export default DoctorDashboard;
