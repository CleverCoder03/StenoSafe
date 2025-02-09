"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";

const navLinks = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Encrypt", path: "/encryption" },
  { title: "Decrypt", path: "/decryption" },
  { title: "Contact", path: "/contact" },
];

function Navbar() {
  const container = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div ref={container} className="">
      <div className="menu_bar fixed">
        <div className="menu_logo">
        <Link href="/">stenosafe</Link>
        </div>
        <div className="menu_open" onClick={handleMenuClick}>Menu</div>
      </div>
      <div className="menu_overlay fixed top-0 left-0 w-screen lg:">
        <div className="menu_overlay_bar">
          <div className="menu_logo">
            <Link href="/">stenosafe</Link>
          </div>
          <div className="menu_close" onClick={handleMenuClick}>Close</div>
        </div>
        <div className="menu_close_icon">
          <p>&#x2715;</p>
        </div>
        <div className="menu_copy">
          <div className="menu_links">
            {
              navLinks.map((link, index) => (
                <div className="menu_link_item" key={index}>
                  <div className="menu_link_item_holder" onClick={handleMenuClick}>
                    <Link href={link.path} className="menu_link">{link.title}</Link>
                  </div>
                </div>
              ))
            }
          </div>
          <div className="menu_info">
            <div className="menu_info_col">
              <a href="http://" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="http://" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
            <div className="menu_info_col">
              <a href="http://" target="_blank" rel="noopener noreferrer">info@stenosafe.com</a>
              <a href="http://" target="_blank" rel="noopener noreferrer">+91 7249084224</a>
            </div>
          </div>
          <div className="menu_preview">
            <Link href="/login">Login</Link>
            <Link href="/register">Signup</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
