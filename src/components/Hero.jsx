import { FaArrowRight } from "react-icons/fa";

function Hero() {
  return (
    <div className="text-white bg-[linear-gradient(to_bottom,#111,#200D42_34%,#4F21A1_65%,#A46EDB_82%)] py-[72px] sm:py-24 relative overflow-clip">
      <div className="absolute h-[375px] w-[750px] sm:w-[1536px] sm:h-[768px] rounded-[100%] bg-black left-1/2 -translate-x-1/2 border-[#B48CDE] bg-[radial-gradient(closest-side,#000_82%,#9560EB)] top-[calc(100%-96px)] sm:top-[calc(100%-120px)]"></div>
      <div className="container relative">
        <div className="flex justify-center items-center">
          <a
            href="http://"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex gap-3 border py-1 px-2 rounded-lg border-white/30"
          >
            <span className="bg-[linear-gradient(to_right,#F87AFF,#FB93D0,#FFDD99,#C3F0B2,#2FD8FE)] text-transparent bg-clip-text [-webkit-background-clip:text]">
              Version 2.0 is here
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="">Read More</span>
              <FaArrowRight className="text-xs" />
            </span>
          </a>
        </div>
        <div className="flex justify-center">
        <h1 className="text-7xl sm:text-9xl font-bold text-center tracking-tighter mt-8">
          One Task <br /> at a Time
        </h1>
        </div>
        <div className="flex justify-center">
        <p className="text-center text-xl mt-8 max-w-md">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In enim
          doloribus tempore adipisci qui saepe ducimus harum nisi vel voluptate!
          Lorem ipsum dolor sit amet
        </p>
        </div>
        <div className="flex justify-center mt-8">
          <button className="bg-white text-black py-3 px-5 rounded-lg font-medium">Get Started</button>
        </div>
      </div>
      
    </div>
  );
}

export default Hero;
