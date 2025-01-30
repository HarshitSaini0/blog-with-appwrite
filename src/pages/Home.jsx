/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import {
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
  FaCheck,
} from "react-icons/fa";
import SpaceBlogCard from "../components/SpaceBlogCard.jsx";
import StatsSection from "../components/StatSection.jsx";
import HeroSection from "../components/HeroSection.jsx";

function Home() {
  const currentTheme = useSelector((state) => state.theme.theme);
  const userData = useSelector((state) => state.auth.userData);
  const [scrolled, setScrolled] = useState(false);
  const testimonials = [
    {
      stars: 5,
      feedback:
        "This platform has transformed how I consume content. The articles are insightful and well-written.",
      initials: "JD",
      name: "John Doe",
      role: "Regular Reader",
    },
    {
      stars: 4.75,
      feedback:
        "I absolutely love the variety of content available. There's something for everyone here!",
      initials: "AS",
      name: "Alice Smith",
      role: "Tech Enthusiast",
    },
    {
      stars: 4.6,
      feedback:
        "A fantastic resource for staying updated. I look forward to the new posts every week.",
      initials: "MR",
      name: "Michael Roe",
      role: "Frequent Visitor",
    },
  ];

  useEffect(() => {
    if (currentTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [currentTheme]);

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
      easing: "ease-out-quart",
    });
  }, []);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    return (
      <div className="flex items-center space-x-1">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className="text-yellow-400 w-5 h-5" />
        ))}
        {hasHalfStar && <FaStarHalfAlt className="text-yellow-400 w-5 h-5" />}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <FaRegStar key={`empty-${i}`} className="text-yellow-400 w-5 h-5" />
        ))}
      </div>
    );
  };

  return (
    <div className={`overflow-hidden transition-theme duration-300 ${
      currentTheme === 'dark' 
        ? 'bg-cosmic-light-primary text-cosmic-text' 
        : 'bg-cosmic-dark-primary text-space-900'
    }`}>
     <HeroSection userData={userData} />

      <section className="py-20 ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-nebula-400" data-aos="fade-up">
            Galactic Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Space Chronicles: Creative Writing",
                description: "Unleash your imagination across galaxies",
                img: "./featured-section/img0.png",
                features: [
                  "Daily cosmic writing prompts",
                  "Expert feedback from sci-fi authors & astrophysicists",
                  "Interstellar storytelling contests",
                ],
              },
              {
                title: "Frontier Tech: Space Innovations",
                description: "Where science fiction meets reality",
                img: "./featured-section/img1.png",
                features: [
                  "AI in space exploration",
                  "Spacecraft & telescope tech reviews",
                  "Industry analysis (NASA, SpaceX, Blue Origin)",
                ],
              },
              {
                title: "Stargazer Society",
                description: "Connect with cosmic enthusiasts",
                img: "./featured-section/img2.png",
                features: [
                  "Debate forums on space ethics & discoveries",
                  "Virtual rocket launch watch parties",
                  "Collaborative sci-fi projects",
                ],
              },
            ].map((item, index) => (
              <SpaceBlogCard
                key={index}
                title={item.title}
                description={item.description}
                image={item.img}
                features={item.features}
                animation="fade-right"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-xl cosmic-about" data-aos="fade-right">
              <img
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070"
                alt="About us"
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="space-y-6" data-aos="fade-left">
              <h2 className="text-3xl md:text-4xl font-bold text-nebula-400">
                About Our Cosmic Platform
              </h2>
              <p className="text-space-900 dark:text-cosmic-text text-lg leading-relaxed">
                We're a community-driven cosmos fostering knowledge sharing among stargazers.
              </p>
              <ul className="space-y-4">
                {[
                  "Daily curated content across 10+ cosmic categories",
                  "Interactive deep-space learning modules",
                  "Astronaut-guided author mentorship programs",
                  "Galaxy-wide reader engagement analytics"
                ].map((item, index) => (
                  <li key={index} className="flex items-start text-space-900 dark:text-cosmic-text">
                    <div className="bg-nebula-400 p-2 rounded-lg mr-4">
                      <FaCheck className="w-5 h-5 text-space-900" />
                    </div>
                    <span className="flex-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <StatsSection />

      <section className=" py-32">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-nebula-400" data-aos="fade-up">
            Celestial Testimonials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`${currentTheme=="dark"?"bg-cosmic-light-primary":"bg-cosmic-dark-primary"} dark:bg-space-700 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 cosmic-testimonial`}
                data-aos="fade-up"
              >
                <div className="mb-4">{renderStars(testimonial.stars)}</div>
                <p className="text-space-900 dark:text-cosmic-text mb-6 leading-relaxed">
                  &ldquo;{testimonial.feedback}&rdquo;
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-nebula-400/20 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-nebula-400 font-bold text-lg">
                      {testimonial.initials}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-space-900 dark:text-cosmic-text">
                      {testimonial.name}
                    </h4>
                    <p className="text-space-700 dark:text-nebula-300 text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-8 right-8 bg-white dark:bg-gray-800 text-blue-600 dark:text-white p-4 rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-110 ${
          scrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        } `}
        aria-label="Scroll to top"
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
