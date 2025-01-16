import { Outlet } from "react-router-dom"
import Header from "./components/Header/Header.jsx"
import Footer from "./components/Footer/Footer.jsx"
import { useEffect } from "react"
import authServices from "./appwrite/auth.js"
import { useDispatch } from "react-redux"
import { login as authLogin } from "./store/authSlice.js";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      const userData = await authServices.getCurrentUser();
      dispatch(authLogin({ userData }));
    }
    fetchData();
  }, [])

  return (
    <>
     <Header />
      <main><Outlet/></main>
      <Footer />
    </>
  )
}

export default App
