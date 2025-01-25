/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config.js";
import { Query } from "appwrite";
import Container from "../components/Container/Container.jsx";
import PostCard from "../components/PostCard.jsx";

function PaginatedAllPages() {
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [imageUrls, setImageUrls] = useState([]);
  const postsPerPage = 4;
  const { page } = useParams();
  const currentPage = parseInt(page, 10) || 0;
  const navigate = useNavigate();

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
              appwriteService.getBlogFilePreview(post.featuredImage).then((url) => {
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
            currentPage === i ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          {i + 1}
        </button>
      );
    }

    return pageButtons;
  };

  return (
    <div className="py-6 w-full">
      <Container>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <tr key={index} className="cursor-pointer" onClick={() => window.location.href = `/post/${post.$id}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {imageUrls[index] ? (
                      <img src={imageUrls[index]} alt={post.title} className="h-10 w-10 rounded-full" />
                    ) : (
                      <div>No Image</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {post.title ? (
                      <div className="text-sm font-medium text-gray-900">{post.title}</div>
                    ) : (
                      <div>Invalid post data</div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  No posts available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex justify-center mt-8">
          <button
            onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
            className="mx-1 px-3 py-1 rounded bg-gray-200 text-gray-700"
            disabled={currentPage === 0}
          >
            Previous
          </button>
          {renderPageButtons()}
          <button
            onClick={() => handlePageChange(Math.min(totalPages - 1, currentPage + 1))}
            className="mx-1 px-3 py-1 rounded bg-gray-200 text-gray-700"
            disabled={currentPage === totalPages - 1}
          >
            Next
          </button>
        </div>
      </Container>
    </div>
  );
}

export default PaginatedAllPages;