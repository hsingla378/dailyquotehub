import React, { useState } from "react";
import {
  Link,
  createSearchParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { navLinks } from "../utils/constants";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const isLinkActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const params = { value: searchQuery };

  const handleSearch = (e) => {
    // navigate({
    //   pathname: "/quotes/search",
    //   search: `?${createSearchParams(params)}`,
    // });
    // navigate({
    //   pathname: "/quotes/search",
    //   search: "?sort=date&order=" + searchQuery,
    // });
    e.preventDefault();
    navigate(`/quotes/search?value=${searchQuery}`);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            DailyQuoteHub
          </span>
        </Link>
        <div className="flex md:order-2 gap-4">
          <button
            type="button"
            data-collapse-toggle="navbar-search"
            aria-controls="navbar-search"
            aria-expanded="false"
            className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search icon</span>
            </div>
            <form onSubmit={handleSearch}>
              {" "}
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          <button
            data-collapse-toggle="navbar-search"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-search"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          {localStorage.getItem("token") && (
            <div className="flex gap-4">
              <li className="hidden md:block py-1 px-4 bg-blue-600 rounded-lg text-white cursor-pointer hover:bg-blue-500">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li
                className=" md:block hidden py-1 px-4 bg-red-600 rounded-lg text-white cursor-pointer hover:bg-red-500"
                onClick={handleLogout}
              >
                Logout
              </li>
            </div>
          )}
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-search"
        >
          <div className="relative mt-3 md:hidden">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <ul className="flex flex-col justify-center md:items-center p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`block py-3 px-4 ${
                    isLinkActive(link.path)
                      ? "text-black  md:dark:text-blue-700 bg-blue-700 md:bg-transparent"
                      : "text-gray-900 dark:text-white"
                  } rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 hover:text-gray-900 md:p-0 md:dark:hover:text-blue-500  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
                >
                  {link.text}
                </Link>
              </li>
            ))}
            {localStorage.getItem("token") && (
              <Link to="/dashboard">
                <li className="block md:hidden py-3 px-4 bg-gray-600 rounded text-white cursor-pointer hover:bg-gray-500">
                  Dashboard
                </li>
              </Link>
            )}
            {localStorage.getItem("token") && (
              <li
                className=" md:hidden block py-3 px-4 bg-red-600 rounded text-white cursor-pointer hover:bg-red-500"
                onClick={handleLogout}
              >
                Logout
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
