import React from 'react';
import HomeMainButton from '../elements/button/HomeMainButton';

const JoinUs = () => {
    return (
        <div className="px-6 sm:px-12 md:px-24 lg:px-48 mt-20 sm:mt-40 md:mt-56 z-10 relative text-left mb-20">
            <div className="relative joinus h-auto md:h-[270px] gap-6 flex flex-col md:flex-row pt-5 justify-between items-center rounded-lg shadow-lg bg-white">
                
                {/* Left Side - Text Content */}
                <div className="w-full md:w-2/3 text-center md:text-left flex flex-col gap-5 px-6">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800">
                        Improve Our Community
                    </h1>
                    <h2 className="text-sm sm:text-base md:text-lg font-medium w-full md:w-3/4 text-gray-700">
                        Enhance your personalized learning experience—join us today!
                    </h2>
                    <div className="mt-6 flex justify-center md:justify-start">
                        <HomeMainButton text="Join Us" />
                    </div>
                </div>

                {/* Right Side - Image */}
                <div className="w-full md:w-1/3 flex justify-center p-4">
                    <img 
                        src="../../images/joinusbbl.png"  
                        className="joinusShadow h-56 sm:h-64 md:h-72 max-w-full rounded-lg shadow-md transition-transform transform hover:scale-105" 
                        alt="Join Us" 
                    />
                </div>
            </div>
        </div>
    );
};

export default JoinUs;
