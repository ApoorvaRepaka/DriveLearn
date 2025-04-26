import React from 'react';
import YellowButton from '../elements/button/YellowButton';

const HeroSection = () => {
    return (
        <div className='pl-32 mt-20 flex justify-between   z-10 relative'>
            <div>
                <img src="../../images/heroSection.png"  className='h-[450px] w-96' alt="" />
            </div>
            <div className=' flex items-start  gap-y-5 justify-start flex-col  w-2/3  '>
              <h1 className='text-5xl mt-32  pl-10 '>Make Your Future Bright</h1>
              <h3 className='w-1/2 text-lg pl-10  font-medium'>AI-powered learning platform designed to support students from CBSE, ICSE, and State Boards. With personalized explanations, voice/text queries, and smart visuals, it helps students learn better and make their future bright.</h3>
              <div className='flex justify-end w-5/6 mt-3 z-10'>
              <YellowButton text={'Start Learning'} />
              </div>

             {/* <h2>s;'mpmswcmpcs</h2>
             <h2>aalosmncomnn</h2> */}
              <img className='absolute right-0 h-[450px] mt-8 z-0' src="../../images/herosecbg.png" alt="" />
                
                
            </div>
        </div>
    );
};

export default HeroSection;