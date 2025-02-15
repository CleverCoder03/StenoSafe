import Link from "next/link";
import logoP from "../assets/logo_p.png";
import Image from "next/image";
import "./navbar.css";

import Navlinks from "./Navlinks";
import { auth } from "@/lib/auth";

const Navbar = async() => {
  // const session = session();
  const session = await auth();
  console.log(session)
  return (
    <div className="menu_container">
      <div className="menu_bar bg-[#000] top-0 left-0 w-full flex flex-row justify-between items-center py-4 px-6 z-[1] md:py-6 md:px-12 lg:px-20 ">
        <div className="menu_logo">
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

        <Navlinks  session={session}/>
      </div>
    </div>
  );
}

export default Navbar;
