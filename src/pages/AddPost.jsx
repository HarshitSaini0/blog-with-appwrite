/* eslint-disable no-unused-vars */
import React from 'react'
import Container from '../components/Container/Container.jsx'
import PostForm from '../components/post-form/PostForm.jsx'



function AddPost() {
  return (
    <div className='py-6'>
      <Container>
        <PostForm />
      </Container>
    </div>
  )
}

export default AddPost