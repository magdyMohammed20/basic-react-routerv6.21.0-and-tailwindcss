import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About/About.jsx";
import Blog from "./pages/Blog/Blog.jsx";
import { fetchImages } from "./pages/Blog/Blog.jsx";
import Login from "./pages/authentication/login/Login.jsx";
import { AuthProvider } from "./utils/context.jsx";
import Profile from "./pages/profile/Profile.jsx";
import RequireAuth from "./utils/requireAuth.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="about" element={<About />} />

      <Route
        path="profile"
        element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        }
      />

      <Route
        path="blog"
        element={
          <RequireAuth>
            <Blog />
          </RequireAuth>
        }
        loader={fetchImages}
        errorElement={
          <div className="text-4xl h-screen flex items-center justify-center">
            Error!!!
          </div>
        }
      />
      <Route
        path="*"
        element={
          <div className="text-5xl mx-auto mt-44 text-blue-600">Not Found</div>
        }
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </AuthProvider>
  </React.StrictMode>
);
