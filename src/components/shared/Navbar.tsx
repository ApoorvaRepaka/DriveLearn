import React, { useState } from 'react';
import NavbarButton from '../elements/button/NavbarButton';
import NavbarSecondButton from '../elements/button/NavbarSecondButton';
import Link from 'next/link';

const Navbar = () => {
  const [type, setType] = useState<number | null>(null);

  // Check if either Services or About Us is selected
  const isPageButtonActive = type === 1 || type === 2;

  return (
    <div className="px-6 sm:px-12 md:px-20 pt-6 sm:pt-9">
      <div className="border-b-[3px] pb-1 border-[#BEA06A] flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Logo & Title */}
        <div className="flex items-center space-x-3">
          <img src="../../images/logo.jpeg" className="h-9 max-w-full" alt="Logo" />
          <span className="font-normal text-lg sm:text-xl md:text-3xl">DRIVE LEARN</span>
        </div>

        {/* Navigation Links */}
        <div className="w-full md:w-[50%] flex flex-col md:flex-row justify-center md:justify-between items-center gap-4">
          <Link href="/">
            <NavbarSecondButton text="Home" />
          </Link>

          <Link href="#services">
            <div onClick={() => setType(1)}>
              <NavbarButton type={isPageButtonActive} text="Services" />
            </div>
          </Link>

          <Link href="#about-us">
            <div onClick={() => setType(2)}>
              <NavbarButton type={isPageButtonActive} text="About Us" />
            </div>
          </Link>
        </div>

        {/* Sign Up Button */}
        <div className="mt-3 md:mt-0">
          <Link href="/SignUp">
            <NavbarSecondButton text="Sign Up" />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
