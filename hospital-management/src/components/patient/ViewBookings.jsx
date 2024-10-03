import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';


function ViewBookings({name,userData}) {
  const id = useSelector((state) => state.auth.id);
  console.log(id)
  return (
   <>
 <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-4">
          Appointments Of {name}
        </h2>
        <Appointment userData={userData} />
      </div>
   </>
  );
}

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
          id: userData[0].id,
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
export default ViewBookings;
