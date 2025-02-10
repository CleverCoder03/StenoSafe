"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";
import logo from "../assets/logo.png";
import Image from "next/image";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

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
      <div className="menu_bar top-0 left-0 w-screen flex flex-row justify-between items-center p-4 z-[1]">
        <div className="menu_logo">
          <Link href="/">
            <div className="w-12 h-12 relative">
            <Image src={logo} alt="logo" className="rounded-[50%]" fill/>
            </div>
          </Link>
        </div>
        <div className="menu_open" onClick={handleMenuClick}>
          <MenuRoundedIcon className="text-black cursor-pointer"/>
        </div>
      </div>
      {isMenuOpen && (
        <div className="menu_overlay fixed top-0 left-0 w-screen h-screen p-4 bg-[#c5fb45] z-[2]">
        <div className="menu_overlay_bar flex justify-between w-full">
          <div className="menu_logo">
            <Link href="/">stenosafe</Link>
          </div>
          <div className="menu_close" onClick={handleMenuClick}>
            <p className="text-black cursor-pointer">close</p>
          </div>
        </div>
        <div className="menu_copy h-fit flex flex-col justify-between">
          <div className="menu_links">
            {navLinks.map((link, index) => (
              <div className="menu_link_item" key={index}>
                <div
                  className="menu_link_item_holder"
                  onClick={handleMenuClick}
                >
                  <Link href={link.path} className="menu_link">
                    {link.title}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="menu_info">
            <div className="menu_preview">
              <Link href="/login">Login</Link> <br /> 
              <Link href="/register">Signup</Link>
            </div>
            <div className="menu_info_col">
              <a
                className="text-white cursor-pointer"
                href="http://"
                target="_blank"
                rel="noopener noreferrer"
              >
                info@stenosafe.com
              </a>
              <a
                className="text-white cursor-pointer"
                href="http://"
                target="_blank"
                rel="noopener noreferrer"
              >
                +91 7249084224
              </a>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default Navbar;
