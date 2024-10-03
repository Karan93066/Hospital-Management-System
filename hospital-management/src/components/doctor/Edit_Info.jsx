import React, { useState, useEffect } from "react";
import axios from "axios";

function Edit_Info({doctorData ,id}) {
    const [docname, setDocName] = useState(doctorData[0].docname || '');
    const [email, setEmail] = useState(doctorData[0].email || '');
    const [password, setPassword] = useState(doctorData[0].password || '');
    const [specialties, setSpecialties] = useState(doctorData[0].specialties || '');
    const [nic, setNic] = useState(doctorData[0].nic || '');
    const [telephone, setTelephone] = useState(doctorData[0].telephone || '');
        // Handle form submission
        const handleSubmit = async (e) => {
          e.preventDefault();
          try {
              const res = await axios.put(
                `http://localhost:5500/doctordetails/${doctorData[0].id}`,
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
                          Update Your Details
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

export default Edit_Info;