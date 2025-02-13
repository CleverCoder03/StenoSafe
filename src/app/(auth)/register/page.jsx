import Image from "next/image";
import logoP from "../../../assets/logo_p.png";
import Link from "next/link";

function RegisterPage() {
  return (
    <div className="bg-black text-white h-screen w-screen">
      <div className="flex items-center justify-center py-10">
      <div className="inline-flex items-center gap-6">
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
    </div>
  );
}

export default RegisterPage;
