import Image from "next/image";

import acmeLogo from "../assets/acme.png";
import quantumLogo from "../assets/quantum.png";
import echoLogo from "../assets/echo.png";
import celestialLogo from "../assets/celestial.png";
import pulseLogo from "../assets/pulse.png";
import apexLogo from "../assets/apex.png";

const images = [
  { src: acmeLogo, alt: "Acme Logo" },
  { src: quantumLogo, alt: "Quantum Logo" },
  { src: echoLogo, alt: "Echo Logo" },
  { src: celestialLogo, alt: "Celestial Logo" },
  { src: pulseLogo, alt: "Pulse Logo" },
  { src: apexLogo, alt: "Apex Logo" },
];

function LogoTicker() {
  return (
    <div className="bg-black text-white py-[72px] sm:py-24">
      <div className="container">
        <h2 className="text-xl text-center text-white/70">Trusted by the world's most innovative teams</h2>
        <div className="overflow-hidden mt-9 before:content-[''] after:content-['']  before:absolute after:absolute before:top-0 after:top-0 before:left-0 after:right-0 before:w-20 after:w-20 before:h-full after:h-full relative before:bg-[linear-gradient(to_right,#000,rgba(0,0,0,0))] after:bg-[linear-gradient(to_left,#000,rgba(0,0,0,0))]">
          <div className="flex gap-16">
            {images.map(({ src, alt }, index) => (
              <Image key={index} src={src} alt={alt} className="flex-none h-8 w-auto"/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoTicker;
