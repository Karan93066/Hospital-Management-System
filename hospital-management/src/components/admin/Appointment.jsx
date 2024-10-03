import React, { useState, useEffect } from "react";
import axios from "axios";
function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [isModifyMode, setIsModifyMode] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, [page, statusFilter, monthFilter]);

  const fetchAppointments = () => {
    // Fetch appointments with pagination, filters
    axios
      .get(`http://localhost:5500/appointments`, {
        params: {
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

  const handleModify = (appointment) => {
    setCurrentAppointment(appointment);
    setIsModifyMode(true);
  };
  const handleBack = () => {
    setIsModifyMode(false);
  };

  if (isModifyMode && currentAppointment) {
    return (
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-4">
          Modify Appointment: {currentAppointment.patient_name}
        </h2>
        <button
          className="mt-4 bg-gray-500 text-white p-2"
          onClick={handleBack}
        >
          Back
        </button>
        <Form  appointmentData={currentAppointment}  fetchAppointments={fetchAppointments}/>
      </div>
    );
  }
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-4">View All Appointments</h2>

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
                {appointment.appointment_date.split('T')[0]}
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
                <button
                  onClick={() => handleModify(appointment)}
                  className="bg-blue-500 text-white p-2 ml-2"
                >
                  Edit
                </button>
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
  );
}

const Form = ({appointmentData,fetchAppointments}) =>{

    const [appointmentDate, setAppointmentDate] = useState(appointmentData.appointment_date.split('T')[0]); // extracting date
    const [appointmentTime, setAppointmentTime] = useState(appointmentData.appointment_time);
    
    const handleSubmit =  (e) => {
      e.preventDefault();
      axios.put(`http://localhost:5500/updateAppointment/${appointmentData.appointment_id}`, {
        appointmentDate: appointmentDate,
        appointmentTime: appointmentTime
      })
        .then((response) => {
          alert(response.data.message);
          fetchAppointments(); // Refresh appointments after status change
        })
        .catch((err) => console.error("Error updating status:", err));
    };
  
    return (
      <>
      <div className="h-full py-6 mx-auto flex flex-col justify-center sm:py-12">
        <div className="relative lg:w-[40%] py-3 sm:max-w-xl sm:mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
              <div className="max-w-md mx-auto">
                <form onSubmit={handleSubmit}>
                  <div>
                    <h1 className="text-2xl font-semibold">Update Appointment Details</h1>
                  </div>
                  <div className="divide-y divide-gray-200">
                    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                      
                      {/* Appointment Date */}
                      <div className="relative">
                        <input
                          type="date"
                          id="appointment_date"
                          name="appointment_date"
                          value={appointmentDate}
                          onChange={(e) => setAppointmentDate(e.target.value)}
                          className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600"
                          required
                        />
                        <label
                          htmlFor="appointment_date"
                          className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                          Appointment Date
                        </label>
                      </div>
  
                      {/* Appointment Time */}
                      <div className="relative">
                        <input
                          type="time"
                          id="appointment_time"
                          name="appointment_time"
                          value={appointmentTime}
                          onChange={(e) => setAppointmentTime(e.target.value)}
                          className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600"
                          required
                        />
                        <label
                          htmlFor="appointment_time"
                          className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                          Appointment Time
                        </label>
                      </div>
  
                      {/* Submit Button */}
                      <div className="relative">
                        <button
                          type="submit"
                          className="bg-blue-500 text-white rounded-md px-2 py-1"
                        >
                          Update Appointment
                        </button>
                      </div>
                      
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          </div>
      </>
        
        
    );
  }

export default Appointment;
