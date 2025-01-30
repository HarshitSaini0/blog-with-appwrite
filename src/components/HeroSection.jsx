/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HeroSection = ({ userData }) => {
  const currentTheme = useSelector((state) => state.theme.theme);

  return (
    <div className="relative h-screen flex items-center justify-center bg-fixed bg-cover bg-center overflow-hidden cosmic-hero">
      {/* Theme-based background */}
      <div className="absolute inset-0 bg-gradient-to-br from-space-900/95 to-nebula-600/90 dark:from-space-800/95 dark:to-nebula-500/90">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-500"
          style={{
            backgroundImage: currentTheme === 'dark' 
              ? "url('./hero-section-dark.gif')"
              : "url('./hero-section-light.gif')"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 
          className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 ${currentTheme === 'dark'?"text-cosmic-text":"text-blue-950"}  dark:text-space-100`}
          data-aos="fade-down"
        >
          Welcome {userData ? userData.name : "Space Explorer"}
        </h1>
        
        <p 
          className="text-xl md:text-2xl mb-8 font-light opacity-90 max-w-2xl mx-auto text-space-200 dark:text-cosmic-text"
          data-aos="fade-up"
        >
          Journey through the cosmos of knowledge. Discover stellar articles, 
          share galactic perspectives, and expand your universe daily.
        </p>

        <div className="flex justify-center space-x-4" data-aos="fade-up">
          <Link to="/all-posts" className="group">
            <button className="bg-nebula-400/20 dark:bg-nebula-400/30 backdrop-blur-lg hover:bg-nebula-400/30 dark:hover:bg-nebula-400/40 text-space-900 dark:text-cosmic-text font-semibold py-3 px-8 rounded-full transform transition-all duration-300 group-hover:scale-105 border border-nebula-400/30 dark:border-nebula-400/50 hover:border-nebula-400/50">
              Explore Posts
            </button>
          </Link>
          
          {userData && (
            <Link to="/profile" className="group">
              <button className="bg-nebula-400 hover:bg-nebula-300 text-space-900 font-semibold py-3 px-8 rounded-full transform transition-all duration-300 group-hover:scale-105 dark:bg-nebula-500 dark:hover:bg-nebula-400">
                Your Profile
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;