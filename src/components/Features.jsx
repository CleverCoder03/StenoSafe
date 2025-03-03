import Image from "next/image";
// import EcosystemIcon from './SVG/Ecosystem'
import encrypt from "../assets/encrypt.png";
import cloud from "../assets/cloud.png";
import uiux from "../assets/uiux.png";
import Feature from "./Feature";

const features = [
  {
    title: "Military-Grade Encryption",
    description:
      "Your data is encoded using highly secure encryption methods, ensuring complete confidentiality.",
    imgSrc: encrypt,
  },
  {
    title: "Cloud Storage Integration",
    description:
      "Securely store your encrypted images in the cloud and access them anytime, anywhere.",
      imgSrc: cloud,
  },
  {
    title: "User-Friendly Interface",
    description:
      "A seamless and intuitive experience that makes encrypting and decrypting data easier than ever.",
      imgSrc: uiux,
  },
];

function Features() {
  return (
    <div className="bg-black text-white py-[72px] sm:py-24">
      <div className="container">
        <h2 className="text-center font-bold text-5xl sm:text-6xl tracking-tighter">
          Everything you need
        </h2>
        <div className="max-w-xl mx-auto">
          <p className="text-center text-xl mt-5 sm:mt-8 text-white/70">
            Protect your confidential data effortlessly with our cutting-edge
            encryption techniques. StenoSafe ensures your messages remain
            hidden, secure, and accessible only to you.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 mt-16 sm:px-10">
          {features.map(({ title, description, imgSrc }, index) => (
            <Feature title={title} description={description} imgSrc={imgSrc} key={index}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Features;
