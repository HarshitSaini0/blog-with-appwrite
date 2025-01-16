/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config.js";
import Button from "../components/Button.jsx";
import Container from '../components/Container/Container.jsx'
import parse from "html-react-parser";
import { useSelector } from "react-redux";

function Post() {
  const [post, setPost] = useState(null);
const { postId } = useParams();
const navigate = useNavigate();
const userData = useSelector((state) => state.auth.userData);
const [imgURL, setImgURL] = useState(null);

const isAuthor = post && userData ? post.userId === userData.$id : false;

const fetchPost = async () => {
  try {
    if (!postId) return;

    // Fetch the blog post
    const response = await appwriteService.getBlog(postId);
    if (response) {
      setPost(response);

      // Fetch the image URL
      if (response.featuredImage) {
        const imageUrl = await appwriteService.getBlogFile(response.featuredImage);
        setImgURL(imageUrl);
      }
    } else {
      // Redirect if post doesn't exist
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
      await appwriteService.deleteBlog(postId).then((status) => {
        if (status) {
          appwriteService.deleteFile(post.featuredImage);
          navigate("/");
        }
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="flex flex-col items-center justify-center h-full ">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl w-11/12">
              <div className="flex items-center">
                {
                  isAuthor && (
                    <div className="flex items-center justify-between w-full">
                      <Link to={`/edit-post/${post.$id}`}>
                        <Button>Edit</Button>
                      </Link>
                      <Button onClick={deletePost}>Delete</Button>
                    </div>
                  )
                }
                <img
                  src={`https://cloud.appwrite.io/v1/storage/buckets/676d6a1900256d40aa8f/files/${post.featuredImage}/preview?project=676d6671000ec3e76a14&project=676d6671000ec3e76a14`}
                  alt={'img'}
                  
                  className=" w-full h-72 rounded-sm shadow-sm object-cover"
              />
              </div>
            <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
            <div className="text-gray-600 text-sm mb-4">
                {parse(post.content)}
            </div>
            
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}

export default Post;
