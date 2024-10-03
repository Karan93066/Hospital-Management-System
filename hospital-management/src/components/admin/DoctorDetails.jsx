import React, { useState, useEffect } from "react";
import axios from "axios";

function AddDoctorDetails() {
  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModifyMode, setIsModifyMode] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [isAppointment, setIsAppointment] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const doctorsPerPage = 10; // Number of doctors to show per page

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = () => {
    // Fetch all doctors
    axios
      .get("http://localhost:5500/doctor")
      .then((response) => setDoctors(response.data))
      .catch((err) => console.error("Error fetching doctors:", err));
  };

  const deleteDoctor = (id) => {
    axios
      .delete(`http://localhost:5500/doctor/${id}`)
      .then(() => {
        alert("Doctor deleted");
        fetchDoctors();
      })
      .catch((err) => console.error("Error deleting doctor:", err));
  };

  const handleModify = (doctor) => {
    setCurrentDoctor(doctor);
    setIsModifyMode(true);
  };

  const handleSchedule = (doctor) => {
    setCurrentDoctor(doctor);
    setIsAppointment(true);
  };

  const handleAddNewDoctor = () => {
    setIsAddMode(true);
  };

  const handleBack = () => {
    setIsModifyMode(false);
    setIsAddMode(false);
    setIsAppointment(false);
    setCurrentDoctor(null);
  };

  // Get current doctors to display based on pagination
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  // Calculate total number of pages
  const totalPages = Math.ceil(doctors.length / doctorsPerPage);

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

  if (isAddMode) {
    return (
      <>
        <div className="container mx-auto py-8">
          <h2 className="text-3xl font-bold mb-4">Add New Doctor Details</h2>
          <button
            className="mt-4 bg-gray-500 text-white p-2"
            onClick={handleBack}
          >
            Back
          </button>
          <InfoForm mode="add" />
        </div>
      </>
    );
  }
  if (isModifyMode && currentDoctor) {
    return (
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-4">
          Modify Doctor: {currentDoctor.docname}
        </h2>
        <button
          className="mt-4 bg-gray-500 text-white p-2"
          onClick={handleBack}
        >
          Back
        </button>
        <InfoForm mode="modify" doctorData={currentDoctor} />
      </div>
    );
  }
  if (isAppointment && currentDoctor) {
    return (
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-4">
          Appointments Of {currentDoctor.docname}
        </h2>
        <button
          className="mt-4 bg-gray-500 text-white p-2"
          onClick={handleBack}
        >
          Back
        </button>
        <Appointment doctorData={currentDoctor} />
      </div>
    );
  }
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-4">All Doctors</h2>
      <button
        className="bg-green-500 text-white p-2 mb-4"
        onClick={handleAddNewDoctor}
      >
        Add New Doctor
      </button>

      {/* Table to display doctor details */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">NIC</th>
            <th className="border border-gray-300 px-4 py-2">Specialty</th>
            <th className="border border-gray-300 px-4 py-2">Telephone</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentDoctors.map((doctor) => (
            <tr key={doctor.id}>
              <td className="border border-gray-300 px-4 py-2">
                {doctor.docname}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {doctor.email}
              </td>
              <td className="border border-gray-300 px-4 py-2">{doctor.nic}</td>
              <td className="border border-gray-300 px-4 py-2">
                {doctor.specialties}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {doctor.telephone}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleModify(doctor)}
                  className="bg-yellow-500 text-white p-2 mr-2"
                >
                  Modify
                </button>
                <button
                  onClick={() => deleteDoctor(doctor.id)}
                  className="bg-red-500 text-white p-2 mr-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleSchedule(doctor)}
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
  );
}

const InfoForm = ({ mode = "add", doctorData }) => {
  // State for form fields
  const [docname, setDocName] = useState(doctorData?.docname || "");
  const [email, setEmail] = useState(doctorData?.email || "");
  const [password, setPassword] = useState(doctorData?.password || "");
  const [specialties, setSpecialties] = useState(doctorData?.specialties || "");
  const [nic, setNic] = useState(doctorData?.nic || "");
  const [telephone, setTelephone] = useState(doctorData?.telephone || "");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "add") {
        const res = await axios.post("http://localhost:5500/adddoctordetails", {
          docname,
          email,
          password,
          specialties,
          nic,
          telephone,
        });
        console.log(res);
        alert(res.data.message);
      } else if (mode === "modify") {
        const res = await axios.put(
          `http://localhost:5500/doctordetails/${doctorData.id}`,
          {
            docname,
            email,
            password,
            specialties,
            nic,
            telephone,
          }
        );
        console.log(res);
        alert("Doctor details updated successfully.");
      }
    } catch (err) {
      console.error(err);
      alert(`Error: ${err.response?.data?.error || err.message}`);
    }
  };

  return (
    <div class="relative lg:w-[40%] py-3 my-10 sm:max-w-xl sm:mx-auto">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div class="max-w-md mx-auto">
          <form onSubmit={handleSubmit}>
            <div class="divide-y divide-gray-200">
              <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                {/* Full Name */}
                <div class="relative">
                  <input
                    autoComplete="off"
                    id="name"
                    name="name"
                    type="text"
                    value={docname}
                    onChange={(e) => setDocName(e.target.value)}
                    class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Full Name"
                  />
                  <label
                    htmlFor="name"
                    class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-440 peer-focus:-top-3.5 peer-focus:text-gray-600"
                  >
                    Full Name
                  </label>
                </div>

                {/* Email */}
                <div class="relative">
                  <input
                    autoComplete="off"
                    id="email"
                    name="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Email Address"
                  />
                  <label
                    htmlFor="email"
                    class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-440 peer-focus:-top-3.5 peer-focus:text-gray-600"
                  >
                    Email Address
                  </label>
                </div>

                {/* Password */}
                <div class="relative">
                  <input
                    autoComplete="off"
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Password"
                  />
                  <label
                    htmlFor="password"
                    class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-440 peer-focus:-top-3.5 peer-focus:text-gray-600"
                  >
                    Password
                  </label>
                </div>

                {/* NIC */}
                <div class="relative">
                  <input
                    autoComplete="off"
                    id="nic"
                    name="nic"
                    type="text"
                    value={nic}
                    onChange={(e) => setNic(e.target.value)}
                    class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="NIC"
                  />
                  <label
                    htmlFor="nic"
                    class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-440 peer-focus:-top-3.5 peer-focus:text-gray-600"
                  >
                    NIC
                  </label>
                </div>

                {/* Specialties */}
                <div class="relative">
                  <select
                    id="specialties"
                    name="specialties"
                    value={specialties}
                    onChange={(e) => setSpecialties(e.target.value)}
                    class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                  >
                    <option value="" disabled>
                      Select Specialties
                    </option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Dermatology">Dermatology</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Radiology">Radiology</option>
                  </select>
                  <label
                    htmlFor="specialties"
                    class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-440 peer-focus:-top-3.5 peer-focus:text-gray-600"
                  >
                    Specialties
                  </label>
                </div>

                {/* Phone Number */}
                <div class="relative">
                  <input
                    autoComplete="off"
                    id="telephone"
                    name="telephone"
                    type="number"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
                    class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Phone Number"
                  />
                  <label
                    htmlFor="telephone"
                    class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-440 peer-focus:-top-3.5 peer-focus:text-gray-600"
                  >
                    Phone Number
                  </label>
                </div>

                {/* Submit Button */}
                <div class="relative">
                  <button
                    type="submit"
                    class="bg-blue-500 text-white rounded-md px-2 py-1"
                  >
                    {mode === "add" ? "Add Details" : "Update Details"}
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

const Appointment = ({ doctorData }) => {
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
          id: doctorData.id,
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

export default AddDoctorDetails;
