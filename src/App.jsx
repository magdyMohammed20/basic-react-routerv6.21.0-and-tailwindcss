import "./App.css";
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
import { fetchImages } from "./functions/api/functions.js";
import Login from "./pages/authentication/login/Login.jsx";
import Profile from "./pages/profile/Profile.jsx";
import RequireAuth from "./utils/requireAuth.jsx";
import { useAuth } from "./utils/context.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
function App() {
  const { user } = useAuth();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        {Object.keys(user).length == 0 && (
          <Route path="login" element={<Login />} />
        )}
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
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
