import Image from "next/image";
// import EcosystemIcon from './SVG/Ecosystem'
import encrypt from "../assets/encrypt.png";
import cloud from "../assets/cloud.png";
import uiux from "../assets/uiux.png";

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
        <div className="flex flex-col sm:flex-row gap-4 mt-16">
          {features.map(({ title, description, imgSrc }, index) => (
            <div
              key={index}
              className="border border-white/30 px-5 py-10 text-center rounded-xl flex-1"
            >
              <div className="flex justify-center">
                <div className="bg-white p-2 w-fit rounded-lg">
                  <div className="inline-flex h-10 w-10  justify-center items-center relative p-8">
                    <Image alt={title} src={imgSrc} fill />
                  </div>
                </div>
              </div>
              <h3 className="mt-6 font-bold">{title}</h3>
              <p className="mt-2 text-white/70 ">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Features;
