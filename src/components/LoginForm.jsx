"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import Next.js router
import { login } from "@/lib/action";

function LoginForm() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize router

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    setLoading(true);
    setError(null); // Clear previous errors

    const formData = new FormData(event.target);
    const data = {
      username: formData.get("username").trim(),
      password: formData.get("password").trim(),
    };

    if (!data.username || !data.password) {
      setError("⚠️ Please fill in both fields.");
      setLoading(false);
      return;
    }

    const response = await login(data); // Call login function

    if (response?.error) {
      setError(`❌ ${response.error}`);
      setLoading(false);
    } else {
      router.push("/"); // Redirect to homepage on success
    }
  };

  return (
    // <form onSubmit={handleSubmit} className="flex flex-col mt-6 gap-3">
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex flex-col">
        <label htmlFor="username" className="text-sm">
          Username
        </label>
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          className="py-1.5 pl-1.5 text-sm rounded mt-1 text-[#222]"
          required
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="password" className="text-sm">
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          className="py-1.5 pl-1.5 text-sm rounded mt-1 text-[#222]"
          required
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        className={`bg-[#841eeb] py-2 rounded-md outline-none mt-4 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
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
