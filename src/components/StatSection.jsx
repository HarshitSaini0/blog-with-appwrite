/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaBook, FaUserAstronaut, FaRocket, FaStar } from 'react-icons/fa';

const StatsSection = () => {
  const currentTheme = useSelector((state) => state.theme.theme);
  const stats = [
    { target: 1000, label: "Articles", Icon: FaBook },
    { target: 50000, label: "Readers", Icon: FaUserAstronaut },
    { target: 100, label: "Writers", Icon: FaRocket },
    { target: 4.9, label: "Rating", Icon: FaStar },
  ];

  return (
    <section className={` py-24 relative overflow-hidden ${
      currentTheme === 'dark' 
        ? 'bg-cosmic-light-primary' 
        : 'bg-cosmic-dark-primary'
    }`}>
      <div className="absolute inset-0 bg-star-pattern opacity-10 dark:opacity-5"></div>
      
      <div className="container mx-auto px-4" data-aos="fade-up">
        <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${
          currentTheme === 'dark' 
            ? 'text-nebula-400' 
            : ' text-nebula-400'
        }`}>
          Cosmic Community Metrics
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <AnimatedStatCard
              key={index}
              target={stat.target}
              label={stat.label}
              Icon={stat.Icon}
              theme={currentTheme}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const AnimatedStatCard = ({ target, label, Icon, theme }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const isDecimal = target % 1 !== 0;

  // Intersection Observer for viewport detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    const cardElement = document.querySelector(`#stat-${label}`);
    if (cardElement) observer.observe(cardElement);

    return () => {
      if (cardElement) observer.unobserve(cardElement);
    };
  }, [label]);

  // Animation effect
  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const startTime = Date.now();
    const increment = target / (duration / 10);

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const nextCount = Math.min(target, increment * (elapsed / 10));
      
      setCount(isDecimal ? Number(nextCount.toFixed(1)) : Math.floor(nextCount));

      if (elapsed >= duration) clearInterval(timer);
    }, 10);

    return () => clearInterval(timer);
  }, [isVisible, target, isDecimal]);

  return (
    <div 
      id={`stat-${label}`}
      className={`p-8 rounded-xl backdrop-blur-lg border transition-all duration-300 hover:-translate-y-2 group ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-space-700/30 to-space-600/20 border-nebula-400/20 hover:border-nebula-400/40'
          : 'bg-gradient-to-br from-cosmic-dark-secondary/50 to-cosmic-dark-primary/30 border-nebula-400/30 hover:border-nebula-400/50'
      }`}
    >
      <div className={`mb-4 flex justify-center ${
        theme === 'dark' ? 'text-nebula-400' : ' text-nebula-400'
      }`}>
        <Icon className="w-12 h-12 animate-float" />
      </div>
      <h3 className={`text-4xl font-bold text-center mb-2 ${
        theme === 'dark' ? 'text-cosmic-text glow' : ' text-nebula-400'
      }`}>
        {isDecimal ? count.toFixed(1) : count}+
      </h3>
      <p className={`text-center font-medium tracking-wider ${
        theme === 'dark' ? 'text-nebula-300' : 'text-space-700'
      }`}>
        {label}
      </p>
    </div>
  );
};

export default StatsSection;