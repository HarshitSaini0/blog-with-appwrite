/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import appwriteServices from "../appwrite/config.js";
import { FaRocket } from "react-icons/fa";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

function PostCard({ $id, title, featuredImage }) {
  const [imgUrl, setImgUrl] = useState("");
  const currentTheme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    const fetchImage = async () => {
      if (featuredImage) {
        try {
          const url = await appwriteServices.getBlogFilePreview(featuredImage);
          setImgUrl(url);
        } catch (error) {
          console.error("Error fetching image URL:", error);
        }
      }
    };
    fetchImage();
  }, [featuredImage]);

  return (
    <Link to={`/post/${$id}`}>
      <motion.div 
        whileHover={{ scale: 0.98 }}
        className={`relative group overflow-hidden rounded-xl p-6 shadow-2xl transition-all duration-500 ${
          currentTheme === 'dark'
            ? 'bg-space-800/80 border border-nebula-400/20 hover:border-nebula-400/40'
            : 'bg-cosmic-dark-primary/80 border border-nebula-400/30 hover:border-nebula-400/50'
        }`}
      >
        {/* Hover effect background */}
        <div className="absolute inset-0 bg-gradient-to-br from-nebula-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Corner accent */}
        <div className={`absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 ${
          currentTheme === 'dark' 
            ? 'border-nebula-400' 
            : 'border-space-800'
        } rounded-tr-xl`} />

        <div className="relative overflow-hidden rounded-lg mb-6 cosmic-image-container">
          <img
            src={imgUrl}
            alt={title}
            className="object-cover transform group-hover:scale-110 transition-transform duration-500 cosmic-image"
          />
          {/* Image overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-space-900/60 via-transparent to-transparent" />
          
          {/* Floating rocket icon */}
          <FaRocket className={`absolute bottom-4 right-4 text-2xl ${
            currentTheme === 'dark' 
              ? 'text-nebula-400' 
              : 'text-space-800'
          } opacity-80 group-hover:opacity-100 transition-opacity duration-300`} />
        </div>

        <h2 className={`text-2xl font-bold ${
          currentTheme === 'dark' 
            ? 'text-cosmic-text glow' 
            : 'text-space-900'
        } transition-colors duration-500`}>
          {title}
        </h2>

        {/* Hover line effect */}
        <div className={`absolute bottom-0 left-0 w-0 h-1 bg-nebula-400 group-hover:w-full transition-all duration-500`} />
      </motion.div>
    </Link>
  );
}

export default PostCard;