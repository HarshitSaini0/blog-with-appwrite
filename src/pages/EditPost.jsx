/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config.js";
import Container from "../components/Container/Container.jsx";
import RTE from "../components/RTE.jsx";
import PostForm from "../components/post-form/PostForm.jsx";

function EditPost() {
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();
  const fetchPost = async () => {
    if (postId) {
      try {
        await appwriteService.getBlog(postId).then((response) => {
          if (response) {
            setPost(response);
            // console.log("Fetched response:", response);
          } else {
            navigate("/");
          }
        });
      } catch (error) {
        console.error("Failed to fetch the blog post:", error);
        navigate("/");
      }
    }
  };
  useEffect(() => {
    fetchPost();
  }, [postId, navigate]);

  

  return (
      <Container>
        {post ? <PostForm post={post} /> : <div>Loading...</div>}
      </Container>
  );
}

export default EditPost;
