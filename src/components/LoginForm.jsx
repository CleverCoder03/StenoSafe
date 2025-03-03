"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import Next.js router
import { login } from "@/lib/action";


function LoginForm() {
  const [error, setError] = useState(null);
  const router = useRouter(); // Initialize router

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const response = await login(data); // Call login function

    if (response?.error) {
      setError(response.error);
    } else {
      setError(null);
      router.push("/"); // Redirect to homepage on success
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mt-6 gap-3">
      <div className="flex flex-col">
        <label htmlFor="username" className="text-sm">Username</label>
        <input
          type="text"
          placeholder="Enter a username"
          name="username"
          className="py-1.5 pl-1.5 text-sm rounded mt-1 text-[#222]"
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="password" className="text-sm">Password</label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="py-1.5 pl-1.5 text-sm rounded mt-1 text-[#222]"
          required
        />
      </div>

      <button className="bg-[#841eeb] py-2 rounded-md outline-none mt-4">
        Login
      </button>

      {error && (
        <p className="text-center bg-red-500 text-white py-2 rounded-lg">
          {error}
        </p>
      )}
    </form>
  );
}

export default LoginForm;
