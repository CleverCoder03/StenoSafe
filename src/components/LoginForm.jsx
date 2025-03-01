"use client";
import { login } from "@/lib/action";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

function LoginForm() {
      const [state, formAction] = useActionState(login, undefined);
    
      const router = useRouter()
    
      useEffect(()=>{
        state?.success && router.push('/')
      },[state?.success, router])
  return (
    <form action={formAction} className="flex flex-col mt-6 gap-5">
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
      <p className={state?.error ? `text-center bg-red-500 py-2 rounded-lg` : `hidden`}>
        {state?.error}
      </p>
    </form>
  );
}

export default LoginForm;
