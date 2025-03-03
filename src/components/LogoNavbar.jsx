import Image from "next/image";
import logoP from "../assets/logo_p.png";
import Link from "next/link";

function LogoNavbar() {
  return (
    <div className="flex items-center justify-center">
        <div className="fixed top-7 sm:top-10 z-[2]">
          <div className="inline-flex items-center gap-6">
            <Link href="/">
              <div className="w-12 h-12 relative md:w-16 md:h-16 ">
                <div className="absolute w-full top-2 bottom-0 bg-[linear-gradient(to_right,#F87BFF,#FB92CF,#FFDD9B,#C2F0B1,#2FD8FE)] blur-md"></div>
                <Image
                  src={logoP}
                  alt="logo"
                  className="relative rounded-xl"
                  fill
                />
              </div>
            </Link>
            <h2 className="text-2xl text-white font-medium tracking-wide">
              StenoSafe
            </h2>
          </div>
        </div>
      </div>
  )
}

export default LogoNavbar