import React from 'react';
import { Divider } from 'antd';

const AboutUs = () => {
  const points = [
    "24/7 Academic assistance",
    "Aligned with school curriculum",
    "Interactive and Engaging",
    "Personalized Learning Assistance"
  ];

  return (
    <div className="px-6 sm:px-12 md:px-24 lg:px-48 mt-20 md:mt-32 lg:mt-44 z-10">
      <h2 className="font-normal mb-5 text-xl sm:text-2xl md:text-3xl text-center md:text-left">
        Why should you choose DriveLearn?
      </h2>

      <div className="flex flex-col md:flex-row pt-5 pb-3 relative h-auto md:h-[530px] justify-center md:justify-between text-left gap-x-9">
        
        {/* Left Side - Images */}
        <div className="w-full md:w-1/2 relative flex flex-col items-center">
          <img src="../../images/aboutUs1.png" className="h-64 sm:h-72 md:h-80 max-w-full rounded-md shadow-md" alt="About Us 1" />
          <div className="flex justify-end absolute top-64 md:top-72 w-full">
            <img src="../../images/aboutus2.png" className="h-32 sm:h-40 md:h-44 max-w-full rounded-md shadow-md" alt="About Us 2" />
          </div>
        </div>

        {/* Right Side - Points */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-end">
          <div className="h-fit flex gap-x-2">
            <div className="hidden md:block w-1/12">
              <Divider type="vertical" style={{ borderColor: "black", fontSize: 28, height: "100%", borderWidth: 3 }} />
            </div>
            <div className="flex flex-col justify-end">
              <div className="flex flex-col gap-y-6 text-sm sm:text-base font-medium">
                {points.map((point, index) => (
                  <div
                    key={index}
                    className="flex items-center hover:bg-gray-100 p-3 rounded-xl transition-all duration-300"
                  >
                    <span className="mr-5 px-3 font-bold py-1 text-base rounded-full border border-black bg-white shadow-sm">
                      {index + 1}
                    </span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay Description Text */}
      <div className="mt-8 md:mt-12 lg:mt-16 text-center md:text-left font-medium text-sm sm:text-base md:text-lg leading-6 tracking-widest">
        <h2>
          DriveLearn redefines learning by making academic help smart, accessible, and engaging. It is not just a tutor—it’s a personalized guide that adapts to your pace and style of learning.
        </h2>
      </div>
    </div>
  );
};

export default AboutUs;
