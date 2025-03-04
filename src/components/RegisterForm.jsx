"use client";
import { useActionState, useState, useEffect } from "react";
import { register } from "@/lib/action";
import { useRouter } from "next/navigation";
// import { useActionState } from "react-dom"; // Ensure correct import

function RegisterForm() {
  const [state, formAction] = useActionState(register, undefined);
  const [loading, setLoading] = useState(false); // Loading state

  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      setLoading(false);
      router.push("/login");
    } else if (state?.error) {
      setLoading(false);
    }
  }, [state?.success, state?.error, router]);

  const handleSubmit = async (event) => {
    setLoading(true);
    formAction(event);
  };

  return (
    <form action={handleSubmit} className="flex flex-col gap-3">
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
        <label htmlFor="email" className="text-sm">Email</label>
        <input
          type="email"
          placeholder="Enter your Email"
          name="email"
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

      <div className="flex flex-col">
        <label htmlFor="passwordRepeat" className="text-sm">Re-enter Password</label>
        <input
          type="password"
          placeholder="Re-enter Password"
          name="passwordRepeat"
          required
          className="py-1.5 pl-1.5 text-sm rounded mt-1 text-[#222]"
        />
      </div>

      <button
        type="submit"
        className={`bg-[#841eeb] py-2 rounded-md outline-none mt-4 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>

      {state?.error && (
        <p className="text-center bg-red-500 text-white py-2 rounded-lg">
          {state?.error}
        </p>
      )}
    </form>
  );
}

export default RegisterForm;
