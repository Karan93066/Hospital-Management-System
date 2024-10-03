import React, { useState ,useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import ViewDoctors from './ViewDoctor';
import ViewBookings from './ViewBookings';
import BookAppointment from './BookAppointment';
import UserSetting from './userSetting';
import { useSelector } from 'react-redux';
import axios from 'axios';
const UserViewPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData,setUserData] = useState([]);
  const id = useSelector((state) => state.auth.id);

  // State to track which component to display
  const [selectedView, setSelectedView] = useState('viewDoctors');

  var name = localStorage.getItem('name');
 var email = localStorage.getItem('email');
  // Handle logout
  const handleLogout = () => {
    dispatch(logout()); // Clear authentication
    navigate('/'); // Redirect to login page
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    // Fetch all users
    axios
      .get(`http://localhost:5500/user/${id}`)
      .then((response) => setUserData(response.data))
      .catch((err) => console.error("Error fetching users:", err));
  };
  console.log(userData);

  // Render the current view
  const renderView = () => {
    switch (selectedView) {
      case 'viewDoctors':
        return <ViewDoctors />;
      case 'viewBookings':
        return <ViewBookings name={name} userData={userData}/>;
      case 'bookAppointment':
        return <BookAppointment />;
      case 'settings':
        return <UserSetting userData = {userData} />;
      default:
        return <ViewDoctors />;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar Navigation */}
      <div className="w-1/4 bg-gray-200 p-4 flex flex-col">
        {/* User Profile Section */}
        <div className="mb-6 bg-blue-200 p-4 rounded-xl">
          <h2 className="text-lg font-bold text-gray-700 mb-2">Name : {name}</h2>
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
              className={`p-2 w-full text-left rounded-xl ${selectedView === 'viewDoctors' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
              onClick={() => setSelectedView('viewDoctors')}
            >
              View Doctors
            </button>
          </li>
          <li>
            <button
              className={`p-2 w-full text-left rounded-xl ${selectedView === 'viewBookings' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
              onClick={() => setSelectedView('viewBookings')}
            >
              My Bookings
            </button>
          </li>
          <li>
          <button
              className={`p-2 w-full text-left rounded-xl ${selectedView === 'bookAppointment' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
              onClick={() => setSelectedView('bookAppointment')}
            >
              Book an Appointment
            </button>
          </li>
          <li>
            <button
              className={`p-2 w-full text-left rounded-xl ${selectedView === 'settings' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
              onClick={() => setSelectedView('settings')}
            >
              Settings
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="w-3/4 bg-white p-6">
        {renderView()}
      </div>
    </div>
  );
};

export default UserViewPage;
