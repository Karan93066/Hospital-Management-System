import React, { useState, useEffect } from "react";
import axios from "axios";
function UserDetails() {
  const [user, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddMode, setIsAddMode] = useState(false);
  const [isAppointment, setIsAppointment] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const userPerPage = 10;
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    // Fetch all users
    axios
      .get("http://localhost:5500/user")
      .then((response) => setUser(response.data))
      .catch((err) => console.error("Error fetching Users:", err));
  };
  const handleSchedule = (user) => {
    setCurrentUser(user);
    setIsAppointment(true);
  };
  const handleAddNewUser = () => {
    setIsAddMode(true);
  };
  const handleBack = () => {
    setIsAddMode(false);
    setIsAppointment(false);
    setCurrentUser(null);
  };
  // Get current user to display based on pagination
  const indexOfLastUser = currentPage * userPerPage;
  const indexOfFirstUser = indexOfLastUser - userPerPage;
  const currentUsers = user.slice(indexOfFirstUser, indexOfLastUser);

  // Calculate total number of pages
  const totalPages = Math.ceil(user.length / userPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  if (isAppointment && currentUser) {
    return (
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-4">
          Appointments Of {currentUser.name}
        </h2>
        <button
          className="mt-4 bg-gray-500 text-white p-2"
          onClick={handleBack}
        >
          Back
        </button>
        <Appointment userData={currentUser} />
      </div>
    );
  }

  if (isAddMode) {
    return (
      <>
        <div className="container mx-auto py-8">
          <h2 className="text-3xl font-bold mb-4">Add New User Details</h2>
          <button
            className="mt-4 bg-gray-500 text-white p-2"
            onClick={handleBack}
          >
            Back
          </button>
          <InfoForm />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-4">All Users</h2>
        <button
          className="bg-green-500 text-white p-2 mb-4"
          onClick={handleAddNewUser}
        >
          Add New User
        </button>

        {/* Table to display doctor details */}
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Address</th>
              <th className="border border-gray-300 px-4 py-2">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {user.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.address}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.number}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleSchedule(user)}
                    className="bg-blue-500 text-white p-2"
                  >
                    Schedule
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination buttons */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`p-2 border ${
              currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
            }`}
          >
            Previous
          </button>

          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`p-2 border ${
              currentPage === totalPages
                ? "bg-gray-300"
                : "bg-blue-500 text-white"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

const InfoForm = () => {
  // State for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5500/userDetail", {
        name,
        email,
        password,
        number,
        address,
      });
      console.log(res);
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert(`Error: ${err.response?.data?.error || err.message}`);
    }
    setName("");
    setEmail("");
    setNumber("");
    setAddress("");
    setPassword("");
  };
  return (
    <div className="relative lg:w-[40%] py-3 my-10 sm:max-w-xl sm:mx-auto">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                {/* Full Name */}
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Full Name"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-440 peer-focus:-top-3.5 peer-focus:text-gray-600"
                  >
                    Full Name
                  </label>
                </div>

                {/* Email */}
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="email"
                    name="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Email Address"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-440 peer-focus:-top-3.5 peer-focus:text-gray-600"
                  >
                    Email Address
                  </label>
                </div>

                {/* Password */}
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Password"
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-440 peer-focus:-top-3.5 peer-focus:text-gray-600"
                  >
                    Password
                  </label>
                </div>

                {/* NIC */}
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="number"
                    name="number"
                    type="text"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Number"
                  />
                  <label
                    htmlFor="nic"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-440 peer-focus:-top-3.5 peer-focus:text-gray-600"
                  >
                    Number
                  </label>
                </div>

                {/* Phone Number */}
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="address"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Phone Number"
                  />
                  <label
                    htmlFor="telephone"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-440 peer-focus:-top-3.5 peer-focus:text-gray-600"
                  >
                    Address
                  </label>
                </div>

                {/* Submit Button */}
                <div className="relative">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-md px-2 py-1"
                  >
                    Add User Details
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const Appointment = ({ userData }) => {
  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  useEffect(() => {
    fetchAppointments();
  }, [page, statusFilter, monthFilter]);

  const fetchAppointments = () => {
    // Fetch appointments with pagination, filters
    axios
      .get(`http://localhost:5500/appointments`, {
        params: {
          id: userData.id,
          page,
          status: statusFilter,
          month: monthFilter,
        },
      })
      .then((response) => setAppointments(response.data))
      .catch((err) => console.error("Error fetching appointments:", err));
  };
  const changeStatus = (id, newStatus) => {
    axios
      .put(`http://localhost:5500/appointment/status/${id}`, {
        status: newStatus,
      })
      .then((response) => {
        alert(response.data.message);
        fetchAppointments(); // Refresh appointments after status change
      })
      .catch((err) => console.error("Error updating status:", err));
  };
  return (
    <>
      <div className="container mx-auto py-8">
        {/* Filters */}
        <div className="flex space-x-4 mb-4">
          <select
            onChange={(e) => setStatusFilter(e.target.value)}
            value={statusFilter}
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            onChange={(e) => setMonthFilter(e.target.value)}
            value={monthFilter}
          >
            <option value="">All Months</option>
            <option value="1">January</option>
            <option value="2">February</option>
            {/* Add options for all months */}
          </select>
        </div>

        {/* Table to display appointments */}
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Doctor Name</th>
              <th className="border border-gray-300 px-4 py-2">Patient Name</th>
              <th className="border border-gray-300 px-4 py-2">
                Appointment Date
              </th>
              <th className="border border-gray-300 px-4 py-2">
                Appointment Time
              </th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.appointment_id}>
                <td className="border border-gray-300 px-4 py-2">
                  {appointment.doctor_name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {appointment.patient_name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {appointment.appointment_date.split("T")[0]}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {appointment.appointment_time}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {appointment.status}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <select
                    onChange={(e) =>
                      changeStatus(appointment.appointment_id, e.target.value)
                    }
                    value={appointment.status}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="bg-gray-500 text-white p-2"
          >
            Previous
          </button>
          <span>Page {page}</span>
          <button
            onClick={() => setPage(page + 1)}
            className="bg-gray-500 text-white p-2"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
