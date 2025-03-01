"use client";
import { register } from "@/lib/action";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
// import { useFormState } from 'react-dom'

function RegisterForm() {
  const [state, formAction] = useActionState(register, undefined);

  const router = useRouter()

  useEffect(()=>{
    state?.success && router.push('/login')
  },[state?.success, router])
  return (
    <form action={formAction} className="flex flex-col gap-5">
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
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Enter your Email"
          name="email"
          className="p-1.5 rounded mt-1 text-[#222]"
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
      <div className="flex flex-col">
        <label htmlFor="passwordRepeat">Re-enter Password</label>
        <input
          type="password"
          placeholder="Re-enter Password"
          name="passwordRepeat"
          required
          className="p-1.5 rounded mt-1 text-[#222]"
        />
      </div>
      <button className="bg-[#841eeb] py-2 rounded-md outline-none mt-4">
        Register
      </button>
      <p className={state?.error ? `text-center bg-red-500 py-2 rounded-lg` : `hidden`}>
        {state?.error}
      </p>
    </form>
  );
}

export default RegisterForm;
