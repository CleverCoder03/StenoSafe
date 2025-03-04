"use client";
import { useState } from "react";
import Link from "next/link";
import { handleGithubLogin, handleGoogleLogin } from "@/lib/action";
import LoginForm from "@/components/LoginForm";
import LogoNavbar from "@/components/LogoNavbar";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const LoginPage = () => {
  const [notification, setNotification] = useState("");

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 2000);
  };

  const handleSocialLogin = async (provider) => {
    try {
      if (provider === "google") {
        await handleGoogleLogin();
      } else {
        await handleGithubLogin();
      }
    } catch (error) {
      showNotification("❌ Login failed. Try again!");
    }
  };

  return (
    <div className="bg-black text-white h-screen w-screen overflow-hidden">
      <LogoNavbar />

      {/* Notification */}
      {notification && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg text-center transition-opacity duration-300">
          {notification}
        </div>
      )}

      <div className="h-full w-full flex items-center justify-center px-3 sm:px-0 translate-y-5">
        <div className="bg-[#222222] p-3 rounded-lg w-96">
          <div className="flex flex-col gap-2 mt-2">
            {/* Google Login */}
            <button
              className="border bg-white text-black text-sm border-white/70 p-2 rounded-lg w-full flex justify-center items-center gap-2"
              onClick={() => handleSocialLogin("google")}
            >
              <span className="text-xl">
                <FcGoogle />
              </span>
              Login with Google
            </button>

            {/* GitHub Login */}
            <button
              className="border bg-white text-black text-sm border-white/70 p-2 rounded-lg w-full flex justify-center items-center gap-2"
              onClick={() => handleSocialLogin("github")}
            >
              <span className="text-xl">
                <FaGithub />
              </span>
              Login with GitHub
            </button>
          </div>

          {/* Login Form */}
          <LoginForm />

          {/* Register Link */}
          <h2 className="text-center mt-4 text-[#fffffff1]">
            Don't have an account?{" "}
            <Link href="/register" className="underline font-bold text-white">
              Register
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
