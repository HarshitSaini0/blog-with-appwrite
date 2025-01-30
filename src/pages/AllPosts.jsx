/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import appwriteService from "../appwrite/config.js";
import { Query } from "appwrite";
import Container from "../components/Container/Container.jsx";
import PostCard from "../components/PostCard.jsx";
import { useSelector } from "react-redux";
import { FaRocket, FaRegCompass } from "react-icons/fa";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const currentTheme = useSelector((state) => state.theme.theme);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  useEffect(() => {
    appwriteService.getBlogs([Query.limit(10), Query.orderDesc("$createdAt")])
      .then((response) => {
        if (response) {
          setPosts(response.documents);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleRedirect = () => {
    navigate("/posts/0");
  };

  return (
    <div className={`min-h-screen w-full py-8 px-16 transition-colors duration-500 ${
      currentTheme === 'dark' 
        ? 'bg-space-900 text-cosmic-text' 
        : 'bg-cosmic-dark-primary text-space-900'
    }`}>
      {/* Animated Background Particles */}
      <div className="fixed inset-0 z-0">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            particles: {
              number: { value: 30 },
              color: { value: currentTheme === 'dark' ? '#7d83ff' : '#334155' },
              opacity: { value: 0.5 },
              size: { value: 1 },
              move: { enable: true, speed: 0.3 }
            }
          }}
        />
      </div>

      <Container>
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-8">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-bold flex items-center gap-2"
            >
              <FaRegCompass className="text-nebula-400" />
              Galactic Archives
            </motion.h1>
            
            <motion.button
              whileHover={{ scale: 0.98 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRedirect}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                currentTheme === 'dark'
                  ? 'bg-nebula-400/20 hover:bg-nebula-400/30 text-cosmic-text border border-nebula-400/30'
                  : 'bg-space-800/10 hover:bg-space-800/20 text-space-900 border border-space-800/20'
              }`}
            >
              <FaRocket className="animate-pulse" />
              Explore Chrono-Stream
            </motion.button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-4 border-nebula-400 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : posts.length > 0 ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
              {posts.map((post, index) => (
                <motion.div 
                  key={post.$id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="break-inside-avoid"
                >
                  {post.$id && post.title ? (
                    <PostCard {...post} />
                  ) : (
                    <div className="p-4 bg-red-500/10 text-red-300 rounded-lg mb-6">
                      Data Anomaly Detected
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className={`text-center py-16 rounded-xl ${
              currentTheme === 'dark' 
                ? 'bg-space-800/50' 
                : 'bg-cosmic-light-secondary'
            }`}>
              <p className="text-xl flex items-center justify-center gap-2">
                <FaRegCompass className="animate-spin" />
                No Celestial Entries Found
              </p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;