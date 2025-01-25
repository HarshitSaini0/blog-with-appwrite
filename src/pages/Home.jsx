/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

function Home() {
  const userData = useSelector((state) => state.auth.userData);
  const [scrolled, setScrolled] = useState(false);
  const testimonials = [
    {
      stars: 5,
      feedback: "This platform has transformed how I consume content. The articles are insightful and well-written.",
      initials: "JD",
      name: "John Doe",
      role: "Regular Reader",
    },
    {
      stars: 4.75,
      feedback: "I absolutely love the variety of content available. There's something for everyone here!",
      initials: "AS",
      name: "Alice Smith",
      role: "Tech Enthusiast",
    },
    {
      stars: 4.60,
      feedback: "A fantastic resource for staying updated. I look forward to the new posts every week.",
      initials: "MR",
      name: "Michael Roe",
      role: "Frequent Visitor",
    },
  ];
  

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
  {/* Hero Section with Parallax */}
  <div
    className="relative h-screen flex items-center justify-center bg-fixed bg-cover bg-center"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80')",
    }}
  >
    <div className="absolute inset-0 bg-black opacity-50"></div>
    <div className="relative z-10 text-center text-white">
      <h1
        className="text-5xl md:text-7xl font-bold mb-4"
        data-aos="fade-down"
      >
        Welcome {userData ? userData.name : "Guest"}
      </h1>
      <p className="text-xl md:text-2xl mb-8" data-aos="fade-up">
        Explore the world of knowledge
      </p>
      <Link to="/all-posts">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transform hover:scale-105 transition-all duration-300">
          Get Started
        </button>
      </Link>
    </div>
    <div className="absolute bottom-0 left-0 right-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="w-full"
      >
        <path
          fill="#ffffff"
          d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>
    </div>
  </div>

  {/* Featured Section */}
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Creative Writing",
            description: "Express your thoughts through words",
            img: "https://images.unsplash.com/photo-1516414447565-b14be0adf13e?q=80",
          },
          {
            title: "Tech Insights",
            description: "Stay updated with latest tech trends",
            img: "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80",
          },
          {
            title: "Community",
            description: "Connect with like-minded people",
            img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80",
          },
        ].map((item, index) => (
          <div className="group" data-aos={index === 0 ? "fade-right" : index === 1 ? "fade-up" : "fade-left"} key={index}>
            <div className="overflow-hidden rounded-lg">
              <img
                src={item.img}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
                alt={item.title}
              />
            </div>
            <h3 className="text-xl font-bold mt-4">{item.title}</h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* About Section */}
  <section className="py-20 bg-gray-50">
    <div className="container mx-auto px-4" data-aos="fade-up">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">About Us</h2>
      <p className="max-w-3xl mx-auto text-lg text-gray-600 text-center">
        Welcome to our blog website! We are dedicated to bringing you the latest insights and stories from various fields. Our team of writers is passionate about sharing knowledge and engaging with our readers.
      </p>
    </div>
  </section>

  {/* Stats Section */}
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        {[
          { number: "1000+", label: "Articles" },
          { number: "50K+", label: "Readers" },
          { number: "100+", label: "Writers" },
          { number: "4.9", label: "Rating" },
        ].map((stat, index) => (
          <div
            key={index}
            className="p-6 bg-gray-50 rounded-lg shadow-lg transform hover:-translate-y-2 transition-all duration-300"
            data-aos="zoom-in"
          >
            <h3 className="text-4xl font-bold text-blue-600 mb-2">
              {stat.number}
            </h3>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* Contact Section */}
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4" data-aos="fade-up">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Get In Touch</h2>
      <form className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-8 space-y-4">
        <input
          type="email"
          placeholder="Your Email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Your Message"
          rows="4"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
          Send Message
        </button>
      </form>
    </div>
  </section>
  {/* {
      stars: 5,
      feedback: "This platform has transformed how I consume content. The articles are insightful and well-written.",
      initials: "JD",
      name: "John Doe",
      role: "Regular Reader", */}
  

 { /* Testimonials Section */}
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12" data-aos="fade-up">
          What Our Readers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg transform hover:-translate-y-2 transition-all duration-300"
              data-aos="fade-up"
            >
              <div className="text-yellow-400 flex mb-4">
                {Array.from({ length: Math.floor(testimonial.stars) }, (_, i) => (
                  <svg
                    key={i}
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.392 2.46a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.392-2.46a1 1 0 00-1.176 0l-3.392 2.46c-.784.57-1.838-.197-1.54-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.245 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
                  </svg>
                ))}
                {testimonial.stars % 1 !== 0 && (
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <defs>
                      <linearGradient id={`half-star-${index}`}>
                        <stop offset="50%" stopColor="currentColor" />
                        <stop offset="50%" stopColor="transparent" stopOpacity="1" />
                      </linearGradient>
                    </defs>
                    <path
                      fill={`url(#half-star-${index})`}
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.392 2.46a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.392-2.46a1 1 0 00-1.176 0l-3.392 2.46c-.784.57-1.838-.197-1.54-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.245 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z"
                    />
                  </svg>
                )}
              </div>
              <p className="text-gray-600 mb-4">
                &ldquo;{testimonial.feedback}&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold">{testimonial.initials}</span>
                </div>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Scroll to Top Button */}
  <button
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    className={`fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 ${
      scrolled ? "opacity-100" : "opacity-0"
    }`}
  >
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 10l7-7m0 0l7 7m-7-7v18"
      />
    </svg>
  </button>
</div>

  );
}

export default Home;
