import React from 'react';
import { Divider } from 'antd';

const Footer = () => {
    return (
        <footer className="bg-secondbg py-10 sm:py-12 md:py-16 px-6 sm:px-12 md:px-24 lg:px-48 text-gray-800">
            
            {/* Top Footer Section */}
            <div className="flex flex-col md:flex-row gap-12 justify-between">
                
                {/* Information Columns */}
                <div className="w-full md:w-3/5 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { title: "Content", items: ["New Services", "Blog"] },
                        { title: "Links", items: ["About Us", "Join Us", "Business", "Jobs"] },
                        { title: "Legal", items: ["Terms & Conditions", "License Agreement", "Privacy Policy", "Cookies Settings"] },
                        { title: "Support", items: ["FAQ", "Contact"] },
                    ].map((section, index) => (
                        <ul key={index} className="space-y-2">
                            <li className="text-lg font-semibold">{section.title}</li>
                            {section.items.map((item, idx) => (
                                <li key={idx} className="text-sm hover:text-gray-500 transition-all duration-200">{item}</li>
                            ))}
                        </ul>
                    ))}
                </div>

                {/* Social Media Section */}
                <div className="w-full md:w-1/3 text-center md:text-left">
                    <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
                    <div className="flex justify-center md:justify-start gap-4">
                        {["linkedin", "facebook", "insta", "tiktok", "whatsapp"].map((platform) => (
                            <img 
                                key={platform} 
                                src={`/images/${platform}.png`} 
                                className="h-7 w-7 hover:scale-110 transition-transform duration-200" 
                                alt={platform} 
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Divider & Copyright Section */}
            <div className="flex flex-col items-center my-8">
                <Divider style={{ borderWidth: "1px", borderColor: "#25323B", opacity: "0.6" }} />
                <div className="flex flex-col md:flex-row justify-between items-center w-full px-5 mt-6 text-gray-600">
                <img src="/images/logo.jpeg" alt="Logo" className="h-16 w-auto max-w-full" />

                    <span className="text-sm sm:text-base font-semibold">© Copyrights Promptly AI. All rights reserved.</span>
                </div>
            </div>

            {/* Bottom Footer Bar */}
            <div className="bg-mainblack text-white flex items-center justify-center h-16 text-center text-sm sm:text-base">
                <span>Your trusted learning companion.</span>
            </div>
        </footer>
    );
};

export default Footer;
