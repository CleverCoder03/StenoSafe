import Image from "next/image";
import logoP from "../../../assets/logo_p.png";
import Link from "next/link";
import { register } from "@/lib/action";

function RegisterPage() {
  return (
    <div className="bg-black text-white h-screen w-screen ">
      <div className="flex items-center justify-center">
        <div className="fixed top-10">
          <div className="inline-flex items-center gap-6">
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
            <h2 className="text-3xl text-white font-medium tracking-wide">
              StenoSafe
            </h2>
          </div>
        </div>
      </div>
      <div className="h-full w-full flex items-center justify-center">
        <div className="bg-[#222222] p-4 rounded-lg w-96">
          <form action={register} className="flex flex-col gap-5">
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
            <input type="email" placeholder="Enter your Email" name="email" className="p-1.5 rounded mt-1 text-[#222]" />
            </div>
            <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" name="password" className="p-1.5 rounded mt-1 text-[#222]" required/>
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
            <button className="bg-[#841eeb] py-2 rounded-md outline-none mt-4">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
