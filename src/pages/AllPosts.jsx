/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config.js";
import Container from "../components/Container/Container.jsx";
import PostCard from "../components/PostCard.jsx";

function AllPosts() {
  const [posts, setPosts] = useState([])


   useEffect(()=>{ appwriteService.getBlogs([]).then((response) => {
      if (response) {
        setPosts(response.documents)
      }
    })},[])


  return (
    <div className="py-6 w-full">
      <Container>
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
