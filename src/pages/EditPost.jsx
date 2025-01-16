/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import appwriteService from '../appwrite/config.js';
import Container from '../components/Container/Container.jsx';
import RTE from '../components/RTE.jsx';

function EditPost() {

  const [post, setPost] = useState(null);
  const {postId} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (postId) {
      appwriteService.getBlog(postId).then((response) => {
        if (response) {
          setPost(response);
        }
        else {
          navigate("/");
        }
      })
    }

      
      },[postId, navigate]);
  return (
    <div className='py-6'>
             <Container>
              <RTE post={post} />
             </Container>

    </div>
  )
}

export default EditPost