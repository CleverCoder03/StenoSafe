import CallToAction from "@/components/CallToAction";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
// import Hero from "@/components/Hero";
import HeroWrapper from "@/components/HeroWrapper";
// import LogoTicker from "@/components/LogoTicker";
// import Navbar from "@/components/navbar/Navbar";
import Navbar from "@/components/Navbar";


export default function Home() {
  return (
    <>
     <Navbar />
     <HeroWrapper /> 
     {/* <LogoTicker /> */}
     <Features />
     <CallToAction />
     <Footer />
    </>
  );
}
