/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useSelector } from 'react-redux';



function Home() {
  const userData = useSelector((state) => state.auth.userData);
  return (
    <div className="min-h-screen bg-gray-100">
      
      <main className="container mx-auto p-4">
        <section className="my-8">
          <h3>Hello {userData?userData.name: "Guest"}</h3>
          <h1 className="text-4xl font-bold text-center my-8">Welcome to My Blog</h1>

          <blockquote className="text-xl italic text-center text-gray-600">
            "The best way to predict the future is to create it." - Peter Drucker
          </blockquote>
        </section>
        <section className="my-8">
          <h2 className="text-3xl font-semibold text-center">About Us</h2>
          <p className="mt-4 text-lg text-gray-700 text-center">
            Welcome to our blog website! We are dedicated to bringing you the latest insights and stories from various fields. Our team of writers is passionate about sharing knowledge and engaging with our readers. Stay tuned for exciting content and feel free to reach out to us with any questions or feedback.
          </p>
        </section>
        <section className="my-8">
          <h2 className="text-3xl font-semibold text-center">Contact Us</h2>
          <p className="mt-4 text-lg text-gray-700 text-center">
            Have any questions or suggestions? We'd love to hear from you! You can reach us at contact@ourblogwebsite.com or follow us on our social media channels. We are always here to help and engage with our community.
          </p>
        </section>
      </main>
    </div>
  )
}

export default Home
