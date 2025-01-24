/* eslint-disable no-unused-vars */
import React,{ useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Outlet } from "react-router-dom"
import Header from "./components/Header/Header.jsx"
import Footer from "./components/Footer/Footer.jsx"
import authServices from "./appwrite/auth.js"
import { login as authLogin } from "./store/authSlice.js";
import LoadingBar from "./components/LoadingBar"; 

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await authServices.getCurrentUser();
        if (userData) {
          dispatch(authLogin({ userData }));
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header /> {/* Always render Header */}
      <main className="flex-grow">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <LoadingBar />
          </div>
        ) : (
          <Outlet />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
