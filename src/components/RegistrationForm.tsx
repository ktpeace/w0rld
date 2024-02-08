"use client";
import { useState } from "react";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Validate and process form data here
    console.log(formData);
  };

  return (
    <div className="flex p-6 justify-between bg-gradient-to-r from-turquoise-100 to-[#528C41] dark:bg-opacity-50">
      {/* Intro text */}
      <div className="w-1/2 text-white text-lg font-medium">
        <p className="mb-4">
          <strong>
            W<span className="text-xl">O</span>RLD ZER
            <span className="text-xl">O</span>
          </strong>{" "}
          is a free game played worldwide by doing tasks in real life and
          sharing them with fellow players for points and glory.
        </p>
        <p className="text-xl">Begin your journey?</p>
      </div>
      {/* Form */}
      <form onSubmit={handleSubmit} className="w-1/4 space-y-6">
        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-900 block mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            htmlFor="username"
            className="text-sm font-medium text-gray-900 block mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-900 block mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-gray-900 block mb-2"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center uppercase"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
