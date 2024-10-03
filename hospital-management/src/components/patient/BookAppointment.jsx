import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const BookAppointment = () => {
  const id = useSelector((state) => state.auth.id);
  const [formData, setFormData] = useState({
    doctorId: "",
    appointmentDate: "",
    appointmentTime: "",
  });
  const [doctors, setDoctors] = useState([]);

  // Fetch doctors data on component load
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:5500/doctor");
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const appointmentData = {
      id,
      doctorId: formData.doctorId,
      appointmentDate: formData.appointmentDate,
      appointmentTime: formData.appointmentTime,
    };
    
    console.log(appointmentData); // Check the values before sending the request

    try {
      const response = await fetch("http://localhost:5500/bookappointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Appointment booked successfully!");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      alert("An error occurred while booking the appointment.");
    }
  };

  return (
    <>
      <div>
        <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
          <div className="relative lg:w-[40%] py-3 sm:max-w-xl sm:mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
              <div className="max-w-md mx-auto">
                <form onSubmit={handleSubmit}>
                  <div>
                    <h1 className="text-2xl font-semibold">Book Appointment</h1>
                  </div>
                  <div className="divide-y divide-gray-200">
                    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                      <div className="relative">
                        <label
                          htmlFor="doctorId"
                          className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                          Doctor Name
                        </label>
                        <select
                          name="doctorId"
                          value={formData.doctorId}
                          onChange={handleChange}
                          required
                          className="appearance-none w-full p-2 mt-2 text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="">Select Doctor</option>
                          {doctors.map((doctor) => (
                            <option key={doctor.id} value={doctor.id}>
                              {doctor.docname}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            ></path>
                          </svg>
                        </div>
                      </div>

                      <div className="relative">
                        <input
                          autoComplete="off"
                          id="appointment_date"
                          name="appointmentDate" // Update to match formData key
                          type="date"
                          className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                          onChange={handleChange} // Use handleChange for input updates
                        />
                        <label
                          htmlFor="appointment_date"
                          className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                          Appointment Date
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          autoComplete="off"
                          id="appointment_time"
                          name="appointmentTime" // Update to match formData key
                          type="time"
                          className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                          onChange={handleChange} // Use handleChange for input updates
                        />
                        <label
                          htmlFor="appointment_time"
                          className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                          Appointment Time
                        </label>
                      </div>
                      <div className="relative">
                        <button
                          type="submit"
                          className="bg-blue-500 text-white rounded-md px-2 py-1"
                        >
                          Book Appointment
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookAppointment;
