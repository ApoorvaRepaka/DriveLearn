import React from 'react';
import { Divider } from 'antd';
// import { CheckCircleOutlined } from '@ant-design/icons'; // Uncomment if using icons

const AboutUs = () => {
  const points = [
    "24/7 Academic assistance",
    "Aligned with school curriculum",
    "Interactive and Engaging",
    "Personalized Learning Assistance"
  ];

  return (
    <div className='px-48 mt-44 z-10'>
      <h2 className='font-normal mb-5 text-3xl'>
        Why should you choose DriveLearn?
      </h2>

      <div className='flex pt-5 pb-3 relative h-[530px] justify-between text-left gap-x-9'>

        {/* Left Side - Images */}
        <div className='w-1/2 relative'>
          <img src='../../images/aboutus1.png' className='h-80' alt='About Us 1' />
          <div className='flex justify-end absolute top-72 w-full'>
            <img src='../../images/aboutus2.png' className='h-44' alt='About Us 2' />
          </div>
        </div>

        {/* Right Side - Points */}
        <div className='w-1/2 flex flex-col justify-end'>
          <div className='h-fit flex gap-x-2'>
            <div className='w-1/12'>
              <Divider type='vertical' style={{ borderColor: 'black', fontSize: 28, height: '100%', borderWidth: 3 }} />
            </div>
            <div className='flex flex-col justify-end'>
              <div className='flex flex-col gap-y-6 text-sm font-medium'>
                {points.map((point, index) => (
                  <div
                    key={index}
                    className='flex items-center hover:bg-gray-100 p-3 rounded-xl transition-all duration-300'
                  >
                    <span className='mr-5 px-3 font-bold py-1 text-base rounded-full border border-black bg-white shadow-sm'>
                      {index + 1}
                    </span>
                    {/* <CheckCircleOutlined className="mr-2 text-green-500" /> */}
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Overlay Description Text */}
        <div className='absolute w-1/2 right-36 top-12 font-medium text-lg leading-6 tracking-widest'>
          <h2>
            DriveLearn redefines learning by making academic help smart, accessible, and engaging. It is not just a tutor—it’s a personalized guide that adapts to your pace and style of learning.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
