import React, { useState, useEffect } from "react";
import axios from "axios";

function UserSetting({userData}) {

  const [name, setName] = useState(userData[0].name || '');
  const [email, setEmail] = useState(userData[0].email || '');
  const [password, setPassword] = useState(userData[0].password || '');
  const [address, setAddress] = useState(userData[0].address || '');
  const [number, setNumber] = useState(userData[0].number || '');
  console.log(userData[0].name)
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5500/usersettings/${userData[0].id}`,
        {
          name,
          email,
          password,
          address,
          number,
        }
      );
      console.log(res);
      alert("User details updated successfully.");
    } catch (err) {
      console.error(err);
      alert(`Error: ${err.response?.data?.error || err.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
    <div className="relative lg:w-[40%] py-3 my-auto sm:max-w-xl sm:mx-auto">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                {/* Name */}
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

                {/* Address */}
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="address"
                    name="address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Address"
                  />
                  <label
                    htmlFor="address"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-440 peer-focus:-top-3.5 peer-focus:text-gray-600"
                  >
                    Address
                  </label>
                </div>

                {/* Phone Number */}
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="number"
                    name="number"
                    type="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Phone Number"
                  />
                  <label
                    htmlFor="number"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-440 peer-focus:-top-3.5 peer-focus:text-gray-600"
                  >
                    Phone Number
                  </label>
                </div>

                {/* Submit Button */}
                <div className="relative">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-md px-2 py-1"
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
    </div>
  );
}

export default UserSetting;
