// eslint-disable-next-line no-unused-vars
import React from 'react';
import { FaRocket, FaSatellite, FaRegCopyright, FaInstagram, FaTwitter, FaGalacticRepublic } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-space-900 text-cosmic-text relative overflow-hidden pt-12 ">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-1 h-1 bg-white rounded-full animate-twinkle" style={{ top: '15%', left: '20%' }}></div>
                <div className="absolute w-1 h-1 bg-white rounded-full animate-twinkle" style={{ top: '30%', left: '70%' }}></div>
                <div className="absolute w-1 h-1 bg-white rounded-full animate-twinkle-delayed" style={{ top: '50%', left: '40%' }}></div>
                <div className="absolute h-full w-1 bg-gradient-to-b from-nebula-400/20 left-1/3"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Column 1 */}
                    <div className="space-y-4">
                        <div className="flex items-center text-2xl font-bold">
                            <FaRocket className="mr-2 text-nebula-400" />
                            SpaceBlog
                        </div>
                        <p className="text-sm opacity-80">
                            Exploring the final frontier of knowledge. Join us on our journey through the cosmos.
                        </p>
                    </div>

                    {/* Column 2 */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold mb-2 flex items-center">
                            <FaSatellite className="mr-2 text-nebula-400" />
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            {['Space News', 'Galaxy Guide', 'Cosmic Research', 'Astronaut Diaries'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="opacity-80 hover:text-nebula-400 transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold mb-2">Follow Us</h3>
                        <div className="flex space-x-4">
                            {[FaInstagram, FaTwitter, FaGalacticRepublic].map((Icon, index) => (
                                <a 
                                    key={index} 
                                    href="#" 
                                    className="p-2 bg-space-800 rounded-lg hover:bg-nebula-400 transition-colors"
                                >
                                    <Icon className="text-xl" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 4 */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold mb-2">Cosmic Newsletter</h3>
                        <div className="flex">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="bg-space-800 px-4 py-2 rounded-l-lg focus:outline-none w-full"
                            />
                            <button className="bg-nebula-400 text-space-900 px-4 py-2 rounded-r-lg font-bold hover:bg-nebula-300 transition-colors">
                                <FaRocket />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-space-800 mb-6"></div>

                {/* Copyright */}
                <div className="flex flex-col md:flex-row items-center justify-between pb-6 text-sm opacity-80">
                    <div className="flex items-center mb-4 md:mb-0">
                        <FaRegCopyright className="mr-2" />
                        {new Date().getFullYear()} Cosmic Explorers Inc. All rights reserved.
                    </div>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-nebula-400 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-nebula-400 transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>

            {/* Shooting Star */}
            <div className="absolute top-0 left-0 w-1 h-1 bg-white animate-shooting-star"></div>
        </footer>
    );
};

export default Footer;