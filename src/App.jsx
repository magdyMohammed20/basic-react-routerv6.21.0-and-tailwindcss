import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import { fetchImages } from "./functions/api/functions.js";
import RequireAuth from "./utils/requireAuth.jsx";
import { useAuth } from "./utils/context.jsx";
import { Suspense, lazy } from "react";

const Todos = lazy(() => import("./pages/Todos/Todos.jsx"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound.jsx"));
const Profile = lazy(() => import("./pages/profile/Profile.jsx"));
const Login = lazy(() => import("./pages/authentication/login/Login.jsx"));
const Blog = lazy(() => import("./pages/Blog/Blog.jsx"));
const About = lazy(() => import("./pages/About/About.jsx"));
const Home = lazy(() => import("./pages/Home/Home.jsx"));

function App() {
  const { user } = useAuth();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route
          path=""
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          }
        />
        {Object.keys(user).length == 0 && (
          <Route
            path="login"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Login />
              </Suspense>
            }
          />
        )}
        <Route
          path="about"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <About />
            </Suspense>
          }
        />

        <Route
          path="profile"
          element={
            <RequireAuth>
              <Suspense fallback={<div>Loading...</div>}>
                <Profile />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="todo"
          element={
            <RequireAuth>
              <Suspense fallback={<div>Loading...</div>}>
                <Todos />
              </Suspense>
            </RequireAuth>
          }
        />
        <Route
          path="blog"
          element={
            <RequireAuth>
              <Suspense fallback={<div>Loading...</div>}>
                <Blog />
              </Suspense>
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
            <Suspense fallback={<div>Loading...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
