/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { FaCheck, FaRocket } from 'react-icons/fa';

const SpaceBlogCard = ({ 
  title, 
  description, 
  image, 
  features, 
  animation = "fade-up" 
}) => {
  return (
    <div 
      className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cosmic-card"
      data-aos={animation}
    >
      <div className="relative h-80">
        <img
          src={image || 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=2080'}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          alt={title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-space-900/90 via-transparent to-transparent"></div>
        <div className="absolute top-4 right-4 bg-space-800/80 px-3 py-1 rounded-full text-sm text-white flex items-center">
          <FaRocket className="mr-2" />
          Space Blog
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-2xl font-bold mb-2 cosmic-title">{title}</h3>
        <p className="text-gray-200 font-light mb-4">{description}</p>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li 
              key={index}
              className="flex items-center text-sm opacity-90 hover:opacity-100 transition-opacity"
              data-aos="fade-right"
            >
              <FaCheck className="w-4 h-4 mr-2 text-nebula-400" />
              <span className="cosmic-feature">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SpaceBlogCard;