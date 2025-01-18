/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import appwriteServices from "../appwrite/config.js";

function PostCard({ $id, title, featuredImage }) {

  const [imgUrl, setImgUrl] = useState();

  useEffect(() => {
    const fetchImage = async () => {
      if (featuredImage) {
        try {
          // Await the promise to resolve and get the URL
          const url = await appwriteServices.getBlogFilePreview(featuredImage);
          // console.log(url);
          
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
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={imgUrl}
            alt={'img'}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
