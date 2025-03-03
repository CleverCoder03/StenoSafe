import Link from "next/link";
import RegisterForm from "@/components/RegisterForm";
import LogoNavbar from "@/components/LogoNavbar";

function RegisterPage() {
  return (
    <div className="bg-black text-white h-screen w-screen overflow-hidden">
      <LogoNavbar />
      <div className="h-full w-full flex items-center justify-center px-3 sm:px-0 translate-y-5">
        <div className="bg-[#222222] p-4 rounded-lg w-96">
          <RegisterForm />
          <h2 className="text-center mt-4 text-#fffffff1">Alreay a user? <Link href="/login" className="underline font-bold text-white">Login</Link></h2>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
