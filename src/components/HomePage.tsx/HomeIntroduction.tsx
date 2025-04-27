import React, { useEffect, useState } from 'react';
import { Divider } from "antd";

interface ZHandler {
  i1: number;
  i2: number;
  i3: number;
}

const HomeIntroduction = () => {
  const [zHandler, setZHandler] = useState<ZHandler>({
    i1: 1,
    i2: 2,
    i3: 3
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setZHandler(prev => {
        if (prev.i1 === 1) return { i1: 2, i2: 3, i3: 1 };
        if (prev.i1 === 2) return { i1: 3, i2: 1, i3: 2 };
        return { i1: 1, i2: 2, i3: 3 };
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-6 sm:px-12 md:px-24 lg:px-32 mt-16 sm:mt-28 md:mt-32 z-10 relative text-center">
      <div className="bg-secondbg px-4 sm:px-8 h-auto md:h-[480px] flex flex-col md:flex-row pt-5 pb-3 justify-center md:justify-around shadow-lg gap-6">

        {/* Image Carousel - Only for Large Screens */}
        <div className="w-full md:w-1/3 relative flex justify-center hidden sm:flex">
          <div className="relative w-full">
            {['i1', 'i2', 'i3'].map((key, index) => (
              <img
                key={key}
                src={`../../images/intro${zHandler[key as keyof ZHandler]}.png`}
                alt={`Intro ${index + 1}`}
                className={`absolute h-56 sm:h-72 md:h-[370px] w-48 sm:w-72 md:w-[410px] left-${index * 5 + 6} top-${index * 5 + 4} transition-all ease-in duration-500`}
              />
            ))}
          </div>
        </div>


        {/* Text Content */}
        <div className="w-full md:w-2/3 flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">EDUCATE</h1>

          <div className="w-2/3 mx-auto md:mx-0">
            <Divider style={{ borderColor: 'black', fontSize: 28 }}>
              <img src="../../images/star.png" alt="star" className="h-6 w-12" />
            </Divider>
          </div>

          <div className="flex justify-around md:justify-between w-full md:w-1/3 text-sm sm:text-base md:text-lg font-semibold">
            <span>Ask</span>
            <span>Learn</span>
            <span>Grow</span>
          </div>

          <div className="flex flex-col items-center md:items-start w-full sm:w-2/3 mt-5 text-sm sm:text-base md:text-lg font-medium leading-relaxed">
            <h2>
              DriveLearn empowers students to ask questions freely,
              learn through step-by-step AI guidance, and grow with personalized insights
              and visual aids—turning everyday doubts into confident understanding and success.
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeIntroduction;
