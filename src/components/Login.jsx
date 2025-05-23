/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import authService from "../appwrite/auth.js";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button.jsx";
import Input from "./Input.jsx";
import Logo from "./Logo.jsx";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login as authLogin } from "../store/authSlice.js";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaRocket } from "react-icons/fa";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Confetti from "react-dom-confetti";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const currentTheme = useSelector((state) => state.theme.theme);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const login = async (data) => {
    setError(null);
    setIsLoading(true);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin({ userData }));
          setIsSuccess(true);
          setTimeout(() => navigate("/"), 2000);
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-500 ${
      currentTheme === 'dark' 
        ? 'bg-gradient-to-br from-space-900 to-space-800' 
        : 'bg-gradient-to-br from-gray-50 to-blue-50'
    }`}>
      {/* Animated Space Background */}
      <div className="absolute inset-0 z-0">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            particles: {
              number: { value: 50 },
              color: { value: currentTheme === 'dark' ? '#7d83ff' : '#334155' },
              opacity: { value: 0.5 },
              size: { value: 1 },
              move: { enable: true, speed: 0.5 }
            },
            interactivity: {
              events: {
                onHover: { enable: true, mode: "repulse" }
              }
            }
          }}
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`mx-auto w-full max-w-lg rounded-xl p-8 shadow-2xl backdrop-blur-lg relative z-10 ${
          currentTheme === 'dark'
            ? 'bg-space-800/90 border border-nebula-400/20'
            : 'bg-white/90 border border-blue-100'
        }`}
      >
        {/* Animated Rocket Confetti */}
        <Confetti active={isSuccess} config={{ 
          spread: 360,
          elementCount: 100,
          startVelocity: 30,
          colors: ['#7d83ff', '#e6f1ff', '#9da1ff']
        }} />

        <div className="mb-6 flex justify-center relative">
          <motion.div
            animate={{ y: [-5, 5] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
          >
            <Logo className={`w-32 transition-all duration-300 ${
              currentTheme === 'dark' ? 'filter brightness-125' : ''
            }`} />
          </motion.div>
          <div className="absolute -top-8 right-0 animate-float">
            <FaRocket className={`text-3xl ${
              currentTheme === 'dark' ? 'text-nebula-400' : 'text-space-700'
            }`} />
          </div>
        </div>

        <h2 className={`text-center text-3xl font-bold mb-2 bg-gradient-to-r ${
          currentTheme === 'dark' 
            ? 'from-nebula-400 to-blue-400' 
            : 'from-space-800 to-blue-600'
        } bg-clip-text text-transparent`}>
          Welcome Back, Space Explorer
        </h2>
        
        <p className={`text-center text-sm mb-8 ${
          currentTheme === 'dark' ? 'text-nebula-300' : 'text-space-700'
        }`}>
          New to the cosmos?&nbsp;
          <Link
            to="/signup"
            className={`font-semibold transition-all duration-300 hover:underline ${
              currentTheme === 'dark'
                ? 'text-nebula-400 hover:text-nebula-300'
                : 'text-blue-600 hover:text-blue-500'
            }`}
          >
            Launch Registration
          </Link>
        </p>

        {error && (
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className={`mb-6 p-3 rounded-lg flex items-center ${
              currentTheme === 'dark' 
                ? 'bg-red-900/30 text-red-300 border border-red-400/30'
                : 'bg-red-100 text-red-700'
            }`}
          >
            <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse mr-2" />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit(login)} className="space-y-6">
          <div className="space-y-5">
            <Input
              {...register("email", { required: true })}
              label="Email"
              placeholder="Enter your email"
              type="email"
              icon={<FiMail className={`${currentTheme === 'dark' ? 'text-nebula-400' : 'text-space-700'}`} />}
              theme={currentTheme}
              animatedBorder
            />

            <Input
              {...register("password", { required: true })}
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              icon={<FiLock className={`${currentTheme === 'dark' ? 'text-nebula-400' : 'text-space-700'}`} />}
              endAdornment={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                    currentTheme === 'dark' ? 'text-nebula-300' : 'text-space-600'
                  }`}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              }
              theme={currentTheme}
              animatedBorder
            />

            <div className="mt-6 relative">
              <Button
                type="submit"
                className="w-full group overflow-hidden cosmic-button"
                disabled={isLoading}
                theme={currentTheme}
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-transparent border-t-current rounded-full animate-spin mr-2" />
                      Authenticating...
                    </div>
                  ) : (
                    <>
                      Initiate Launch Sequence
                      <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-nebula-400/20 to-transparent animate-shine" />
              </Button>
            </div>
          </div>
        </form>

        <p className={`mt-8 text-center text-sm ${
          currentTheme === 'dark' ? 'text-nebula-300' : 'text-space-700'
        }`}>
          Forgot your password?&nbsp;
          <Link
            to="/recover"
            className={`font-semibold hover:underline ${
              currentTheme === 'dark' ? 'text-nebula-400' : 'text-blue-600'
            }`}
          >
            Quantum Recovery
          </Link>
        </p>
      </motion.div>

      {/* Floating Asteroids */}
      <div className="absolute top-20 right-10 w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-20 animate-float-delayed" />
      <div className="absolute bottom-1/3 left-20 w-6 h-6 bg-gradient-to-r from-orange-400 to-red-400 rounded-full opacity-20 animate-float" />
    </div>
  );
}

export default Login;