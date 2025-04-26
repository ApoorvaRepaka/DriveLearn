import React, { useState } from 'react';
import NavbarButton from '../elements/button/NavbarButton';
import NavbarSecondButton from '../elements/button/NavbarSecondButton';
import Link from 'next/link';

const Navbar = () => {
  const [type, setType] = useState<number | null>(null);

  // Check if either Services or About Us is selected
  const isPageButtonActive = type === 1 || type === 2;

  return (
    <div className="px-20 pt-9">
      <div className="border-b-[3px] pb-0.5 border-[#BEA06A] flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img src="../../images/logo.jpeg" className="h-9" alt="Logo" />
          <span className="font-normal text-3xl">DRIVE LEARN</span>
        </div>

        <div className="w-[40%] flex justify-between">
          <Link href="/">
            <NavbarSecondButton text={'Home'} />
          </Link>

          <Link href="#services">
            <div onClick={() => setType(1)}>
              <NavbarButton type={isPageButtonActive} text={'Services'} />
            </div>
          </Link>

          <Link href="#about-us">
            <div onClick={() => setType(2)}>
              <NavbarButton type={isPageButtonActive} text={'About Us'} />
            </div>
          </Link>
        </div>

        <Link href="/SignUp">
          <NavbarSecondButton text={'Sign Up'} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
