import React from 'react';
import Slider from './Slider';
import { Avatar, Rating } from '@mui/material';
import HomeMainButton from '../elements/button/HomeMainButton';

const BestServices = () => {
    return (
        <div className=' px-32 mt-56 z-10 relative text-center  mb-20'>
            <h2 className='text-left text-3xl mb-5 pl-3' >Services</h2>

                    <div className=' relative bestSevices h-[320px]  px-8  gap-x-24 flex pt-5 pb-3 justify-around'>
                        
                        
                       {/* <Slider /> */}
                       <div className='w-[45%] text-left'>
                        <h2 className='font-semibold text-lg mb-2'>AI-Powered Q&A Support</h2>
                        <h3>Students can ask academic questions via text or voice and receive accurate, board-specific answers with clear step-by-step explanations.</h3>
                        <h2 className='font-semibold text-lg mb-2'>Visual Learning Aids</h2>
                        <h3>Drive Learn generates relevant diagrams and videos to simplify complex topics, making learning more interactive and easier to understand.</h3>
                       </div>
                       <div className='w-1/2 flex relative '>
                        <img src="../../images/sara.jpg" className='relative top-[-80px] h-80' alt="" />
                       
                        </div>                       

                    </div>
        </div>
    );
};

export default BestServices;