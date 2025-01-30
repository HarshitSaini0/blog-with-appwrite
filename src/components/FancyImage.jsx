import React from 'react'
import { FaRocket } from 'react-icons/fa'

function FancyImage() {
  return (
    <div 
  className="relative overflow-hidden  
     transition-all duration-500 group"
  data-aos="fade-right"
>
  <div className="relative h-96 overflow-hidden">
    <img
      src="./about-section/image.svg"
      alt="About us"
      className="w-full h-full object-cover transform 
        scale-100 transition-transform duration-500 
        animate-float"
    />
    
    {/* Animated overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-space-900/60 
      via-transparent to-transparent opacity-0 group-hover:opacity-100 
      transition-opacity duration-500">
      
      {/* Floating elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        space-y-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="animate-float-delay-1">
          <FaRocket className="text-4xl text-nebula-400 mx-auto" />
        </div>
        <p className="text-cosmic-light-primary font-bold text-xl text-center 
          animate-float-delay-2">
          Explore More
        </p>
      </div>
    </div>

 
  </div>

  {/* Continuous background animation */}
  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-nebula-700/20 
    to-space-900/20 opacity-30 group-hover:opacity-50 animate-shine 
    transition-opacity duration-500" />
</div>
  )
}

export default FancyImage