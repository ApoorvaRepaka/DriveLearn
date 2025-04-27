import React from 'react';
import YellowButton from '../elements/button/YellowButton';

const HeroSection = () => {
    return (
        <div className="px-6 sm:px-12 md:px-24 lg:px-32 mt-16 sm:mt-20 md:mt-32 flex flex-col md:flex-row justify-center md:justify-between items-center z-10 relative">
            
            {/* Left Side - Image */}
            <div className="w-full md:w-1/2 flex justify-center">
                <img src="../../images/heroSection.png" className="h-67 sm:h-72 md:h-91 max-w-full rounded-lg shadow-md" alt="Hero Section" />
            </div>

            {/* Right Side - Text & Button */}
            <div className="w-full md:w-2/3 flex flex-col items-center md:items-start gap-5">
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold te5xt-center md:text-left">
                    Make Your Future Bright
                </h1>
                <h3 className="text-sm sm:text-base md:text-lg font-medium w-full sm:w-3/4 text-center md:text-left">
                    AI-powered learning platform designed to support students from CBSE, ICSE, and State Boards. With personalized explanations, voice/text queries, and smart visuals, it helps students learn better and make their future bright.
                </h3>
                <div className="flex justify-center md:justify-start mt-3">
                    <YellowButton text="Start Learning" />
                </div>
            </div>

            {/* Background Image */}
            <img className="absolute right-0 top-12 md:top-8 h-64 sm:h-72 md:h-96 max-w-full z-0 opacity-90" src="../../images/herosecbg.png" alt="Background" />
        </div>
    );
};

export default HeroSection;
