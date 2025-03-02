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
    <form onSubmit={handleSubmit} className="flex flex-col mt-6 gap-5">
      <div className="flex flex-col">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Enter a username"
          name="username"
          className="p-1.5 rounded mt-1 text-[#222]"
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="p-1.5 rounded mt-1 text-[#222]"
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
