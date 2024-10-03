import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAppointment, setIsAppointment] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const doctorsPerPage = 10;
  useEffect(() => {
    // Fetch all doctors when component mounts
    axios
      .get("http://localhost:5500/doctor")
      .then((response) => setDoctors(response.data))
      .catch((err) => console.error("Error fetching doctors:", err));
  }, []);
  const handleSchedule = (doctor) => {
    setCurrentDoctor(doctor);
    setIsAppointment(true);
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
  const handleBack = () => {
    setIsAppointment(false);
    setCurrentDoctor(null);
  };
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

export default ViewDoctors;
