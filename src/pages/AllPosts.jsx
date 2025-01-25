/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import appwriteService from "../appwrite/config.js";
import { Query } from "appwrite";
import Container from "../components/Container/Container.jsx";
import PostCard from "../components/PostCard.jsx";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    appwriteService.getBlogs([
      Query.limit(10),
      Query.orderDesc("$createdAt")
    ]).then((response) => {
      if (response) {
        setPosts(response.documents);
      }
    });
  }, []);

  const handleRedirect = () => {
    navigate("/posts/0");
  };

  return (
    <div className="py-6 w-full">
      <Container>
        <div className="flex justify-end mb-4">
          <button
            onClick={handleRedirect}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            View Paginated Posts
          </button>
        </div>
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div key={index} className="break-inside-avoid mb-4">
                {post.$id && post.title ? (
                  <PostCard {...post} />
                ) : (
                  <div>Invalid post data</div>
                )}
              </div>
            ))
          ) : (
            <div>No posts available</div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
