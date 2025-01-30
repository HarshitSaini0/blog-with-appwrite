/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import appwriteService from "../appwrite/config.js";
import { Query } from "appwrite";
import Container from "../components/Container/Container.jsx";
import { FaArrowLeft, FaRegStar, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useSelector } from "react-redux";

function PaginatedAllPages() {
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [imageUrls, setImageUrls] = useState([]);
  const postsPerPage = 4;
  const { page } = useParams();
  const currentPage = parseInt(page, 10) || 0;
  const navigate = useNavigate();
  const currentTheme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await appwriteService.getBlogs([
          Query.limit(postsPerPage),
          Query.offset(currentPage * postsPerPage),
          Query.orderDesc("$createdAt"),
        ]);
        if (response) {
          setPosts(response.documents);
          setImageUrls([]);
          response.documents.forEach((post) => {
            if (post.featuredImage) {
              appwriteService
                .getBlogFilePreview(post.featuredImage)
                .then((url) => {
                  setImageUrls((prev) => [...prev, url]);
                });
            } else {
              setImageUrls((prev) => [...prev, null]);
            }
          });
          setTotalPages(Math.ceil(response.total / postsPerPage));
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [currentPage]);

  const handlePageChange = (page) => {
    navigate(`/posts/${page}`);
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    const maxPagesToShow = 5;
    const startPage = Math.max(0, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow);

    for (let i = startPage; i < endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`mx-1 px-3 py-1 rounded ${
            currentPage === i
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {i + 1}
        </button>
      );
    }

    return pageButtons;
  };

  return (
    <div className={`min-h-screen w-full py-10 px-14 transition-colors duration-500 ${
      currentTheme === 'dark' 
        ? 'bg-space-900 text-cosmic-text' 
        : 'bg-cosmic-dark-primary text-space-900'
    }`}>
      <Container>
        <div className="mb-8">
          <Link 
            to="/all-posts" 
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              currentTheme === 'dark'
                ? 'bg-nebula-400/20 hover:bg-nebula-400/30 text-cosmic-text'
                : 'bg-space-800/10 hover:bg-space-800/20 text-space-900'
            }`}
          >
            <FaArrowLeft className="mr-1" />
            Return to Stellar Grid
          </Link>
        </div>

        <div className="overflow-x-auto cosmic-table-container">
          <table className={`min-w-full rounded-xl overflow-hidden ${
            currentTheme === 'dark' 
              ? 'bg-space-800/50 backdrop-blur-lg' 
              : 'bg-white shadow-lg'
          }`}>
            <thead>
              <tr className={`${
                currentTheme === 'dark' 
                  ? 'bg-nebula-400/10' 
                  : 'bg-cosmic-dark-secondary'
              }`}>
                <th className={`px-6 py-4 text-left text-sm font-medium uppercase tracking-wider ${
                  currentTheme === 'dark' 
                    ? 'text-nebula-400' 
                    : 'text-space-800'
                }`}>
                  Galactic Preview
                </th>
                <th className={`px-6 py-4 text-left text-sm font-medium uppercase tracking-wider ${
                  currentTheme === 'dark' 
                    ? 'text-nebula-400' 
                    : 'text-space-800'
                }`}>
                  Cosmic Title
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.length > 0 ? (
                posts.map((post, index) => (
                  <tr
                    key={index}
                    className={`cursor-pointer transition-all hover:bg-nebula-400/5 ${
                      currentTheme === 'dark' 
                        ? 'border-b border-nebula-400/10' 
                        : 'border-b border-space-800/10'
                    }`}
                    onClick={() => navigate(`/post/${post.$id}`)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        {imageUrls[index] ? (
                          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-nebula-400/20">
                            <img
                              src={imageUrls[index]}
                              alt={post.title}
                              className="w-full h-full object-cover transform hover:scale-110 transition-transform"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-nebula-400/10 flex items-center justify-center">
                            <FaRegStar className="text-nebula-400/50 text-xl" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`text-sm font-medium ${
                        currentTheme === 'dark' 
                          ? 'text-cosmic-text' 
                          : 'text-space-900'
                      } truncate max-w-xs hover:text-nebula-400 transition-colors`}>
                        {post.title || 'Mysterious Cosmic Entry'}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="px-6 py-8 text-center">
                    <div className="flex flex-col items-center text-nebula-400/70">
                      <FaRegStar className="text-4xl mb-4 animate-pulse" />
                      <p className="text-lg">No Celestial Entries Discovered</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className={`flex justify-center mt-8 space-x-2 ${
          currentTheme === 'dark' ? 'text-cosmic-text' : 'text-space-900'
        }`}>
          <button
            onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
            className={`px-4 py-2 rounded-full flex items-center ${
              currentTheme === 'dark'
                ? 'bg-nebula-400/20 hover:bg-nebula-400/30'
                : 'bg-space-800/10 hover:bg-space-800/20'
            } transition-all ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentPage === 0}
          >
            <FaAngleLeft className="mr-2" />
            Previous
          </button>
          
          {renderPageButtons()}

          <button
            onClick={() => handlePageChange(Math.min(totalPages - 1, currentPage + 1))}
            className={`px-4 py-2 rounded-full flex items-center ${
              currentTheme === 'dark'
                ? 'bg-nebula-400/20 hover:bg-nebula-400/30'
                : 'bg-space-800/10 hover:bg-space-800/20'
            } transition-all ${currentPage === totalPages - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentPage === totalPages - 1}
          >
            Next
            <FaAngleRight className="ml-2" />
          </button>
        </div>
      </Container>
    </div>
  );

 
}

export default PaginatedAllPages;