import { NavLink, useLocation } from "react-router-dom";
import { SunMedium, Moon } from "lucide-react";

import { useEffect, useState } from "react";
import { useAuth } from "../utils/context";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  // Retrieve the theme preference from localStorage or default to 'light'
  const storedTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(storedTheme || "light");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();
  useEffect(() => {
    // Update the class on the document element when the theme changes
    document.documentElement.classList.toggle("dark", theme === "dark");
    // Save the theme preference to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeToggle = () => {
    // Toggle the theme and update the state
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const handleActive = ({ isActive }) => `
  text-sm font-semibold leading-6 dark:text-gray-200 px-4 ${
    isActive
      ? "text-indigo-600 dark:text-indigo-300 light:text-indigo-600"
      : "text-gray-900"
  }`;
  return (
    <nav
      style={{ height: "60px" }}
      className="flex bg-white dark:bg-gray-800 dark:shadow-2xl  items-center justify-between p-6 lg:px-8 sticky shadow-sm z-50 w-full top-0 left-0 right-0"
      aria-label="Global">
      <div className="flex lg:flex-1">
        <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">Your Company</span>
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt=""
          />
        </a>
      </div>
      <div className="flex lg:hidden">
        <button
          type="button"
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>
      <div className="hidden lg:flex lg:gap-x-12">
        <NavLink to="/" className={handleActive}>
          Home
        </NavLink>
        <NavLink to="about" className={handleActive}>
          About
        </NavLink>
        {Object.keys(user).length != 0 && (
          <NavLink to="blog" className={handleActive}>
            Blog
          </NavLink>
        )}

        {Object.keys(user).length != 0 && (
          <NavLink to="profile" className={handleActive}>
            Profile
          </NavLink>
        )}
      </div>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center">
        <div className="p-4">
          <label htmlFor="themeToggle" className=" cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                id="themeToggle"
                className="hidden"
                checked={theme}
                onChange={handleThemeToggle}
              />
              <div className="border border-solid border-2 border-slate-400 dark:border-indigo-500 toggle__line w-12 h-6 bg-gray-200  dark:bg-gray-600 rounded-full shadow-inner flex justify-between items-center">
                <span className="ps-1">
                  {" "}
                  <SunMedium size={18} className="text-yellow-600" />
                </span>
                <span className="pe-0.5">
                  {" "}
                  <Moon size={18} className="text-yellow-600" />
                </span>
              </div>
              <div
                style={{ top: "0px" }}
                className={`toggle__dot ease-in-out duration-300 absolute w-6 h-6 bg-indigo-400 dark:bg-gray-500 rounded-full shadow inset-y-0 ${
                  theme == "light" ? "left-0" : "translate-x-6"
                }`}></div>
            </div>
          </label>
        </div>
        {Object.keys(user).length == 0 && location.pathname != "/login" && (
          <NavLink
            to="login"
            className="text-sm font-semibold leading-6  text-white bg-indigo-600 p-2 px-4 rounded-lg">
            Log in
          </NavLink>
        )}
        {Object.keys(user).length != 0 && (
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="text-sm font-semibold leading-6  text-white bg-indigo-600 p-2 px-4 rounded-lg ms-2">
            Log Out
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
