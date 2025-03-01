import Image from "next/image";
import logoP from "../../../assets/logo_p.png";
import Link from "next/link";
import { handleGithubLogin } from "@/lib/action";
import LoginForm from "@/components/LoginForm";

const LoginPage = async () => {
  return (
    <div className="bg-black text-white h-screen w-screen ">
      <div className="flex items-center justify-center">
        <div className="fixed top-7 sm:top-10">
          <div className="inline-flex items-center gap-6">
            <Link href="/">
              <div className="w-12 h-12 relative md:w-[76px] md:h-[76px] z-[2]">
                <div className="absolute w-full top-2 bottom-0 bg-[linear-gradient(to_right,#F87BFF,#FB92CF,#FFDD9B,#C2F0B1,#2FD8FE)] blur-md"></div>
                <Image
                  src={logoP}
                  alt="logo"
                  className="relative rounded-xl"
                  fill
                />
              </div>
            </Link>
            <h2 className="text-2xl sm:text-3xl text-white font-medium tracking-wide">
              StenoSafe
            </h2>
          </div>
        </div>
      </div>
      {/* <div className="h-full w-full flex items-center justify-center">
        <form action={handleGithubLogin}>
          <button className="border border-white/70 p-4 rounded-lg" onClick={handleGithubLogin}>Login with GitHub</button>
        </form>
      </div> */}
      <div className="h-full w-full flex items-center justify-center px-3 sm:px-0">
        <div className="bg-[#222222] p-4 rounded-lg w-96">
            <button className="border border-white/70 p-4 rounded-lg w-full" onClick={handleGithubLogin}>Login with GitHub</button>
          <LoginForm />
          <h2 className="text-center mt-4 text-#fffffff1">Don't have an account? <Link href="/register" className="underline font-bold text-white">Register</Link></h2>
        </div>
      </div>
    </div>
  )
}

export default LoginPage