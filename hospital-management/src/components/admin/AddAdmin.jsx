import React, { useState } from "react";
import axios from "axios";

function AddAdmin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    console.log(name, email, password);
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5500/admin", {
        name,
        email,
        password,
      });
      console.log(res);
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert(`Error : ${err.response.data.error}`);
    }
  };
  return (
    <div>
      <div class="min-h-screen  py-6 flex flex-col justify-center sm:py-12">
        <div class="relative lg:w-[40%] py-3 sm:max-w-xl sm:mx-auto">
          <div class="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div class="max-w-md mx-auto">
              <form onSubmit={handleSubmit}>
                <div>
                  <h1 class="text-2xl font-semibold">Add Admin Details</h1>
                </div>
                <div class="divide-y divide-gray-200">
                  <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div class="relative">
                      <input
                        autocomplete="off"
                        id="name"
                        name="name"
                        type="text"
                        class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Full Name"
                        onChange={(e) => setName(e.target.value)}
                      />
                      <label
                        for="name"
                        class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Full Name
                      </label>
                    </div>
                    <div class="relative">
                      <input
                        autocomplete="off"
                        id="email"
                        name="email"
                        type="text"
                        class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Email address"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label
                        for="email"
                        class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Email Address
                      </label>
                    </div>
                    <div class="relative">
                      <input
                        autocomplete="off"
                        id="password"
                        name="password"
                        type="password"
                        class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label
                        for="password"
                        class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Password
                      </label>
                    </div>
                    <div class="relative">
                      <button
                        type="submit"
                        class="bg-blue-500 text-white rounded-md px-2 py-1"
                      >
                        Add Details
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
  );
}

export default AddAdmin;
