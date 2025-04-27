import React from 'react';
import Navbar from '../shared/Navbar';
import HeroSection from './HeroSection';
import HomeIntroduction from './HomeIntroduction';
import BestServices from './BestServices';
import AboutUs from './AboutUs';
import JoinUs from './JoinUs';
import Footer from '../shared/Footer';

const HomePage = () => {
  return (
    <div className="relative">
      {/* Background Image */}
      <img
        src="../../images/homebg1.png"
        className="absolute opacity-80 w-72 sm:w-96 md:w-[400px] h-auto md:h-[850px] top-[280px] left-0 hidden md:block"
        alt="Background"
      />
      <img
        src="../../images/Group 2427.png"
        className="absolute opacity-80 top-[1200px] left-0 w-full sm:w-[95%] hidden md:block"
        alt="Decorative Elements"
      />

      {/* Page Sections */}
      <Navbar />
      <HeroSection />
      <HomeIntroduction />
      <div id="services" className="px-6 sm:px-12 md:px-24 lg:px-32 gap-6">
        <BestServices />
      </div>
      <div id="about-us" className="px-6 sm:px-12 md:px-24 lg:px-32 gap-6">
        <AboutUs />
      </div>
      <JoinUs />
      <Footer />
    </div>
  );
};

export default HomePage;
