/* eslint-disable no-unused-vars */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./components/Signup.jsx";
import AllPosts from "./pages/AllPosts.jsx";
import AddPost from "./pages/AddPost.jsx";
import EditPost from "./pages/EditPost.jsx";
import Post from "./pages/Post.jsx";
import Protected from "./components/AuthLayout.jsx";
import PaginatedAllPages from "./pages/PaginatedAllPages.jsx";
import ThemeProvider from "./components/Container/ThemeProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        ),
      },
      {
        path: "/signup",
        element: (
          <Protected authentication={false}>
            <Signup />
          </Protected>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <Protected authentication>
            < AllPosts/>
          </Protected>
        ),
      },
      {
        path: "/posts/:page",
        element: (
          <Protected authentication>
            < PaginatedAllPages/>
          </Protected>
        ),
      },
      {
        path: "/add-post",
        element: (
          <Protected authentication>
            < AddPost/>
          </Protected>
        ),
      },
      {
        path: "/edit-post/:postId",
        element: (
          <Protected authentication>
            < EditPost/>
          </Protected>
        ),
      },
      {
        path: "/post/:postId",
        element: (
          <Protected authentication>
            < Post/>
          </Protected>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>

      <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
