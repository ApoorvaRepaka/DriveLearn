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
    <div className=''>
      {/* Background Image */}
      <img
        src="../../images/homebg1.png"
        className="absolute opacity-80 w-[400px] h-[850px] top-[280px] left-[0] max-md:hidden"
        alt="Background"
      />
      <img
        src="../../images/Group 2427.png"
        className="absolute opacity-80 top-[1200px] left-[-5px] w-[95%] max-md:hidden"
        alt="Decorative Elements"
      />

      {/* Page Sections */}
      <Navbar />
      <HeroSection />
      <HomeIntroduction />
      <div id="services">
        <BestServices />
      </div>
      <div id="about-us">
        <AboutUs />
      </div>
      <JoinUs />
      <Footer />
    </div>
  );
};

export default HomePage;
