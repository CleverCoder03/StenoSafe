"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";
import logo from "../assets/logo.png";
import Image from "next/image";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const navLinks = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Encrypt", path: "/encryption" },
  { title: "Decrypt", path: "/decryption" },
  { title: "Gallery", path: "/gallery" },
  { title: "Contact", path: "/contact" },
];

function Navbar() {
  const container = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div ref={container} className="menu_container">
      <div className="menu_bar top-0 left-0 w-screen flex flex-row justify-between items-center py-4 px-6 z-[1]">
        <div className="menu_logo">
          <Link href="/">
            <div className="w-14 h-14 relative">
              <Image src={logo} alt="logo" className="rounded-[50%]" fill />
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div>
            <Link href="/register">
              <button className="text-black font-semibold py-1 px-2 rounded-sm text-xs bg-gray-300">
                GET STARTED
              </button>
            </Link>
          </div>

          <div
            className="menu_open rounded-[50%] border border-white p-2 z-[2]"
            onClick={handleMenuClick}
          >
            {
              isMenuOpen ? <CloseRoundedIcon className="text-white cursor-pointer" /> : <MenuRoundedIcon className="text-white cursor-pointer" />
            }
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="menu_overlay fixed top-0 left-0 w-screen h-screen py-4 px-6 bg-gray/10 backdrop-blur-md">
          <div className="menu_copy h-[inherit] flex flex-col items-center justify-center gap-4">
            <div className="menu_links flex flex-col items-center gap-4">
              {navLinks.map((link, index) => (
                <div className="menu_link_item" key={index}>
                  <div
                    className="menu_link_item_holder"
                    onClick={handleMenuClick}
                  >
                    <Link href={link.path} className="menu_link text-white text-4xl ">
                      {link.title}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <a href="http://" target="_blank" rel="noopener noreferrer">
                
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
