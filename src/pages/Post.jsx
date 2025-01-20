/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config.js";
import Button from "../components/Button.jsx";
import Container from "../components/Container/Container.jsx";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import likeServices from "../appwrite/likes.js";

function Post() {
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [imgURL, setImgURL] = useState(null);

  const isAuthor = post && userData ? post.owner_id === userData.$id : false;

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

  const [likes, setLikes] = useState(0);
  const [currentLike, setCurrentLike] = useState(false);

  const handleLike = async () => {
    try {
      likeServices.toggleLike(postId, userData.$id).then((liked) => {
        if (!liked) {
          setLikes(likes + 1);
          setCurrentLike(true);
        } else {
          setLikes(likes - 1);
          setCurrentLike(false);
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
        // setLikes(post.likes || 0);
        await likeServices.currentUserLikeState(postId,userData.$id).then((res)=>{
          setCurrentLike(res);
        })
      }

    }
    fetchLikes();
  }, [postId]);

  return post ? (
    <div className="py-8">
      <Container>
        <div className="flex flex-col items-center justify-center h-full">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl w-11/12">
            {imgURL && (
              <img
                src={imgURL}
                alt={"img"}
                className="w-full h-72 rounded-sm shadow-sm object-cover mb-4"
              />
            )}
            <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
            <div className="text-gray-600 text-sm mb-4">
              {parse(post.content)}
            </div>
            {isAuthor && (
              <div className="flex justify-end space-x-4 mt-4">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button>Edit</Button>
                </Link>
                <Button onClick={deletePost}>Delete</Button>
              </div>
            )}
            <div className="flex justify-end space-x-4 mt-4">
              <Button onClick={handleLike}>
                {currentLike ? "unlike" : "like"} ({likes})
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}

export default Post;
