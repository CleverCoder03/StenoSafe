import Image from "next/image";
import logoP from "../../../assets/logo_p.png";
import Link from "next/link";
import { handleGithubLogin } from "@/lib/action";

const LoginPage = async () => {
  return (
    <div className="bg-black text-white h-screen w-screen ">
      <div className="flex items-center justify-center">
      <div className="fixed inline-flex items-center gap-6 top-10">
        <div className="">
          <Link href="/">
            <div className="w-16 h-16 relative md:w-[76px] md:h-[76px] z-[2]">
              <div className="absolute w-full top-2 bottom-0 bg-[linear-gradient(to_right,#F87BFF,#FB92CF,#FFDD9B,#C2F0B1,#2FD8FE)] blur-md"></div>
              <Image
                src={logoP}
                alt="logo"
                className="relative rounded-xl"
                fill
              />
            </div>
          </Link>
        </div>
        <h2 className="text-3xl text-white font-medium tracking-wide">StenoSafe</h2>
      </div>
      </div>
      <div className="h-full w-full flex items-center justify-center">
        <form action={handleGithubLogin}>
          <button className="border border-white/70 p-4 rounded-lg">Login with GitHub</button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage