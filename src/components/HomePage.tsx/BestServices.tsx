import React from 'react';
import { Avatar, Rating } from '@mui/material';
import HomeMainButton from '../elements/button/HomeMainButton';

const BestServices = () => {
    return (
        <div className="px-6 sm:px-12 md:px-24 lg:px-32 mt-20 md:mt-44 z-10 relative text-center mb-20">
            <h2 className="text-left text-xl sm:text-2xl md:text-3xl mb-5 pl-3">Services</h2>

            <div className="relative bestServices h-auto md:h-[320px] px-4 sm:px-8 flex flex-col md:flex-row gap-8 pt-5 pb-3 justify-center md:justify-between">
                
                {/* Left Side - Text Content */}
                <div className="w-full md:w-[45%] text-left">
                    <h2 className="font-semibold text-sm sm:text-base md:text-lg mb-2">AI-Powered Q&A Support</h2>
                    <h3 className="text-sm sm:text-base">Students can ask academic questions via text or voice and receive accurate, board-specific answers with clear step-by-step explanations.</h3>
                    
                    <h2 className="font-semibold text-sm sm:text-base md:text-lg mb-2 mt-4">Visual Learning Aids</h2>
                    <h3 className="text-sm sm:text-base">Drive Learn generates relevant diagrams and videos to simplify complex topics, making learning more interactive and easier to understand.</h3>
                </div>

                {/* Right Side - Image */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <img src="../../images/sara.jpg" className="h-64 sm:h-72 md:h-80 max-w-full rounded-lg shadow-md" alt="AI Assistance" />
                </div>               
            </div>
        </div>
    );
};

export default BestServices;
