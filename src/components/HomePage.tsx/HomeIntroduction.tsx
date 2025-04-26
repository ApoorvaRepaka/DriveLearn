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
    <div className="px-32 mt-32 z-10 relative text-center">
      <div className="bg-secondbg px-8 h-[480px] flex pt-5 pb-3 justify-around shadow-lg">
        {/* Image Carousel */}
        <div className="w-1/3 relative">
          <div className="relative w-full">
            <div className="animate-slide-bl relative z-30">
              <img
                src={`../../images/intro${zHandler.i1}.png`}
                alt="Intro 1"
                className="absolute h-[370px] w-[410px] left-16 top-4 transition-all ease-in duration-500"
              />
            </div>
            <div className="animate-slide-tr relative z-20">
              <img
                src={`../../images/intro${zHandler.i2}.png`}
                alt="Intro 2"
                className="absolute h-[370px] w-[410px] left-11 top-8 transition-all ease-in duration-500"
              />
            </div>
            <div className="animate-slide-tr relative z-10">
              <img
                src={`../../images/intro${zHandler.i3}.png`}
                alt="Intro 3"
                className="absolute h-[370px] w-[410px] left-6 top-12 transition-all ease-in duration-500"
              />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="w-2/3 flex flex-col items-center">
          <h1 className="font-bold text-3xl">BEAUTY</h1>

          <div className="w-2/3">
            <Divider style={{ borderColor: 'black', fontSize: 28 }}>
              <img src="../../images/star.png" alt="star" className="h-6 w-12" />
            </Divider>
          </div>

          <div className="flex justify-between w-1/3 text-lg font-semibold">
            <span>Ask</span>
            <span>Learn</span>
            <span>Grow</span>
          </div>

          <div className="flex flex-col items-center w-2/3 mt-5 text-lg font-medium">
            <h2 className="leading-relaxed">
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
