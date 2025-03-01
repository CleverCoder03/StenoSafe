"use client";
import Link from "next/link";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useState } from "react";
import { handleLogout } from "@/lib/action";

function Navlinks({session}) {
  const navLinks = [
    { title: "Home", path: "/" },
    // { title: "About", path: "/about" },
    { title: "Encrypt", path: "/encryption" },
    { title: "Decrypt", path: "/decryption" },
    { title: "Gallery", path: "/gallery" },
    // { title: "Contact", path: "/contact" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="flex items-center gap-4 lg:gap-8">
          <div className="hidden md:flex gap-4 lg:gap-6">
            {navLinks.map((link, index) => (
              <div className="menu_link_item" key={index}>
                <div className="menu_link_item_holder">
                  <Link
                    href={link.path}
                    className="menu_link text-white text-lg "
                  >
                    {link.title}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div>
            {session?.user ? (
              <form action={handleLogout}>
                <button
                
                className="hidden md:flex text-black font-medium bg-white py-3 px-5 rounded-lg"
              >
                Logout
              </button>
              </form>
            ) : (
              <Link href="/login">
                <div className="hidden md:flex text-black font-medium bg-white py-3 px-5 rounded-lg">
                  Login
                </div>
              </Link>
            )}
          </div>

          <div
            className="menu_open rounded-[50%] border border-white border-opacity-70 p-2 z-[3] md:hidden"
            onClick={handleMenuClick}
          >
            {isMenuOpen ? (
              <CloseRoundedIcon className="hamburger text-white cursor-pointer" />
            ) : (
              <MenuRoundedIcon className="hamburger text-white cursor-pointer" />
            )}
          </div>
        </div>

        {isMenuOpen && (
          <div className="menu_overlay fixed top-0 left-0 w-screen h-screen py-4 px-6 bg-black/70 backdrop-blur-md z-[2]">
            <div className="menu_copy h-[inherit] flex flex-col items-center justify-center gap-4">
              <div className="menu_links flex flex-col items-center gap-4">
                {navLinks.map((link, index) => (
                  <div className="menu_link_item" key={index}>
                    <div
                      className="menu_link_item_holder"
                      onClick={handleMenuClick}
                    >
                      <Link
                        href={link.path}
                        className="menu_link text-white text-4xl "
                      >
                        {link.title}
                      </Link>
                    </div>
                  </div>
                ))}
                {session?.user ? (
              <form action={handleLogout}>
                <button
                
                className="flex text-red-500 font-medium bg-white py-3 px-5 rounded-lg"
              >
                Logout
              </button>
              </form>
            ) : (
              <Link href="/login">
                <div className="flex text-black font-medium bg-white py-3 px-5 rounded-lg">
                  Login
                </div>
              </Link>
            )}
              </div>
            </div>
          </div>
        )}
    </>
  );
}

export default Navlinks;
