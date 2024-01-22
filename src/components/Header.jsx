import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { navLinks } from "../utils/constants";
import { Navbar } from "flowbite-react";
import Cookies from "js-cookie";

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    Cookies.remove("token");
    window.location.href = "/";
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/quotes/search?value=${searchQuery}`);
  };

  return (
    <Navbar fluid rounded className="max-w-screen-xl m-auto">
      <div>
        <Link
          to={"/"}
          className="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
        >
          DailyQuoteHub
        </Link>
      </div>
      <div className="flex md:order-2 gap-4">
        {/* <Button>Get started</Button> */}
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
        {Cookies.get("token") && (
          <div className="flex gap-4 text-sm text-white">
            <button className="hidden md:block py-1 px-4 bg-blue-600 rounded-lg  hover:bg-blue-500">
              <Link to="/dashboard">Dashboard</Link>
            </button>
            <button
              className=" md:block hidden py-1 px-4 bg-red-600 rounded-lg hover:bg-red-500"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {navLinks.map((link) => (
          <Link
            to={link.path}
            key={link.path}
            className="py-2 px-3 md:px-0 w-full"
          >
            {link.text}
          </Link>
        ))}
        <div className="py-2 px-4 w-full">
          <div className="relative md:hidden">
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
        </div>
        {Cookies.get("token") && (
          <div className="flex justify-center gap-4 my-3 w-full">
            <div className=" bg-blue-600 rounded-lg hover:bg-blue-500 text-white block md:hidden py-2 px-4 text-base flex-grow">
              <Link to="/dashboard">Dashboard</Link>
            </div>
            <div
              onClick={handleLogout}
              className=" bg-red-600 rounded-lg hover:bg-red-500 text-white block md:hidden py-2 px-4 text-base flex-grow"
            >
              Logout
            </div>
          </div>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
