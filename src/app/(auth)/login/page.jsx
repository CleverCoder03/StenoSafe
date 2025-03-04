import Link from "next/link";
import { handleGithubLogin, handleGoogleLogin } from "@/lib/action";
import LoginForm from "@/components/LoginForm";
import LogoNavbar from "@/components/LogoNavbar";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const LoginPage = async () => {
  return (
    <div className="bg-black text-white h-screen w-screen overflow-hidden">
      <LogoNavbar />
      <div className="h-full w-full flex items-center justify-center px-3 sm:px-0 translate-y-5">
        <div className="bg-[#222222] p-3 rounded-lg w-96">
          <div className="flex flex-col gap-2 mt-2">
          <button
            className="border bg-white text-black text-sm border-white/70 p-2 rounded-lg w-full flex justify-center items-center align-middle gap-2"
            onClick={handleGoogleLogin}
          >
            <span className="text-xl"><FcGoogle /></span>
            Login with Google
          </button>
          <button
            className="border bg-white text-black text-sm border-white/70 p-2 rounded-lg w-full flex justify-center items-center align-middle gap-2"
            onClick={handleGithubLogin}
          >
            <span className="text-xl"><FaGithub /></span>
            Login with GitHub
          </button>
          </div>
          <LoginForm />
          <h2 className="text-center mt-4 text-#fffffff1">
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
