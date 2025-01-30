import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config.js";
import Button from "../components/Button.jsx";
import Container from "../components/Container/Container.jsx";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import likeServices from "../appwrite/likes.js";
import { FaEdit, FaTrash, FaHeart, FaRegHeart } from "react-icons/fa";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { motion } from "framer-motion";

function Post() {
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [imgURL, setImgURL] = useState(null);
  const currentTheme = useSelector((state) => state.theme.theme);
  const [likes, setLikes] = useState(0);
  const [currentLike, setCurrentLike] = useState(false);

  const isAuthor = post && userData ? post.owner_id === userData.$id : false;

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const fetchImage = async (featuredImage) => {
    if (featuredImage) {
      try {
        const url = await appwriteService.getBlogFilePreview(featuredImage);
        setImgURL(url);
      } catch (error) {
        console.error("Error fetching image URL:", error);
      }
    }
  };

  const fetchPost = async () => {
    try {
      if (!postId) return;

      const response = await appwriteService.getBlog(postId);
      if (response) {
        setPost(response);

        if (response.featuredImage) {
          fetchImage(response.featuredImage);
        }
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching post or image:", error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId, navigate]);

  const deletePost = async () => {
    try {
      if (!postId) return;
      const wantToDelete = prompt("Are you sure you want to delete this post?\nType 'DELETE' to confirm.");
      if (wantToDelete !== "DELETE") return;

      await appwriteService.deleteBlog(postId).then((status) => {
        if (status) {
          appwriteService.deleteFile(post.featuredImage);
          navigate("/");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    try {
      likeServices.toggleLike(postId, userData.$id).then((liked) => {
        if (!liked) {
          setLikes(likes - 1);
          setCurrentLike(false);
        } else {
          setLikes(likes + 1);
          setCurrentLike(true);
        }
      });
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  useEffect(() => {
    async function fetchLikes() {
      if (postId) {
        await likeServices.getLikeCount(postId).then((likeCount) => {
          setLikes(likeCount);
        });
        await likeServices.currentUserLikeState(postId, userData.$id).then((res) => {
          setCurrentLike(res);
        });
      }
    }
    fetchLikes();
  }, [postId]);

  return post ? (
    <div className={`min-h-screen py-8 transition-colors duration-500 ${
      currentTheme === 'dark' 
        ? 'bg-space-900 text-cosmic-text' 
        : 'bg-cosmic-dark-primary text-space-900'
    }`}>
      {/* Animated Particles Background */}
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
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`relative z-10 rounded-xl backdrop-blur-lg p-8 max-w-4xl mx-auto ${
            currentTheme === 'dark' 
              ? 'bg-space-800/50 border border-nebula-400/20' 
              : 'bg-white/90 border border-space-800/20'
          }`}
        >
          {imgURL && (
            <div className="relative w-full h-96 rounded-xl overflow-hidden mb-8">
              <img
                src={imgURL}
                alt={post.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-space-900/60 via-transparent to-transparent" />
            </div>
          )}

          <h1 className={`text-4xl font-bold mb-6 ${
            currentTheme === 'dark' 
              ? 'text-nebula-400' 
              : 'text-space-900'
          }`}>
            {post.title}
          </h1>

          <div className={`prose max-w-none ${
            currentTheme === 'dark' 
              ? 'prose-invert text-cosmic-text' 
              : 'text-space-800'
          }`}>
            {parse(post.content)}
          </div>

          <div className="mt-8 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  currentLike 
                    ? 'bg-nebula-400 text-space-900' 
                    : 'bg-nebula-400/20 text-nebula-400 hover:bg-nebula-400/30'
                }`}
              >
                {currentLike ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
                <span>{likes} Likes</span>
              </button>
            </div>

            {isAuthor && (
              <div className="flex gap-4">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button className="flex items-center gap-2">
                    <FaEdit />
                    Edit
                  </Button>
                </Link>
                <Button 
                  onClick={deletePost}
                  className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-500"
                >
                  <FaTrash />
                  Delete
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </Container>
    </div>
  ) : null;
}

export default Post;