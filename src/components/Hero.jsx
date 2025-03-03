import { FaArrowRight } from "react-icons/fa";

import cursorImage from "../assets/cursor.png";
import messageImage from "../assets/message.png";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/lib/auth";

const Hero = async () => {
  const session = await auth();
  return (
    <div className="text-white bg-[linear-gradient(to_bottom,#000,#200D42_34%,#4F21A1_65%,#A46EDB_82%)] py-[72px] sm:py-24 relative overflow-clip">
      <div className="absolute h-[375px] w-[750px] sm:w-[1536px] sm:h-[768px] lg:w-[2400px] lg:h-[1200px] rounded-[100%] bg-black left-1/2 -translate-x-1/2 border-[#B48CDE] bg-[radial-gradient(closest-side,#000_82%,#9560EB)] top-[calc(100%-96px)] sm:top-[calc(100%-120px)]"></div>
      <div className="container relative">
        <div className="flex justify-center items-center">
          <span className="inline-flex gap-3 border py-1 px-2 rounded-lg border-white/30">
            <span className="bg-[linear-gradient(to_right,#F87AFF,#FB93D0,#FFDD99,#C3F0B2,#2FD8FE)] text-transparent bg-clip-text [-webkit-background-clip:text]">
              StenoSafe
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="">Protect What Matters</span>
              {/* <FaArrowRight className="text-xs" /> */}
            </span>
          </span>
        </div>
        <div className="flex justify-center mt-8">
          <div className="inline-flex relative">
            <h1 className="text-6xl sm:text-8xl font-bold text-center tracking-tighter">
              The Art of
              <br /> Concealment
            </h1>
            <Image
              src={cursorImage}
              alt="cursor"
              height="200"
              width="200"
              className="absolute right-[506px] top-[108px] lg:right-[518px] hidden sm:inline"
            />
            <Image
              src={messageImage}
              alt="message"
              height="200"
              width="200"
              className="absolute top-[56px] left-[538px] lg:left-[545px] hidden sm:inline"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <p className="text-center text-xl mt-8 max-w-md">
          Keep your confidential data safe with next-level steganography. StenoSafe allows you to seamlessly hide messages inside images, ensuring privacy and security like never before.
          </p>
        </div>
        <div className="flex justify-center mt-8">
          {session ? (
            <Link href="/encryption">
              <button className="bg-white text-black py-3 px-5 rounded-lg font-medium">
                Encrypt now!!
              </button>
            </Link>
          ) : (
            <Link href="/register">
              <button className="bg-white text-black py-3 px-5 rounded-lg font-medium">
                Get Started
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
