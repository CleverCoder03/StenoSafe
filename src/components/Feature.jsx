"use client";
import Image from "next/image";
import React, { useEffect, useRef, useCallback } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

function Feature({ title, description, imgSrc }) {
  const offsetX = useMotionValue(-100);
  const offsetY = useMotionValue(-100);
  const maskImage = useMotionTemplate`radial-gradient(100px 100px at ${offsetX}px ${offsetY}px, black, transparent)`;

  const borderRef = useRef(null);

  const updateMousePosition = useCallback((e) => {
    if (!borderRef.current) return;
    const rect = borderRef.current.getBoundingClientRect();
    offsetX.set(e.clientX - rect.x);
    offsetY.set(e.clientY - rect.y);
  }, [offsetX, offsetY]);

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [updateMousePosition]);

  return (
    <div className="border border-white/30 px-5 py-10 text-center rounded-xl flex-1 relative">
      <motion.div
        className="absolute inset-0 border-2 border-purple-400 rounded-xl"
        style={{
          WebkitMaskImage: maskImage,
          maskImage,
        }}
        ref={borderRef}
      ></motion.div>
      <div className="flex justify-center">
        <div className="bg-white p-2 w-fit rounded-lg">
          <div className="inline-flex h-10 w-10 justify-center items-center relative">
            <Image
              alt={title}
              src={imgSrc}
              width={40}
              height={40}
              className="p-2"
              aria-label={title}
            />
          </div>
        </div>
      </div>
      <h3 className="mt-6 font-bold text-lg">{title}</h3>
      <p className="mt-2 text-white/70">{description}</p>
    </div>
  );
}

export default Feature;
