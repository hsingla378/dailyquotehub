import React from "react";
import { Link } from "react-router-dom";

const ExploreMore = ({ text, link }) => {
  return (
    <div className="flex justify-center">
      <Link to={link} className="shadow-sm">
        {" "}
        <button
          type="button"
          className=" bg-blue-700 text-white shadow-blue-700 py-2 px-5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[8px] md:text-xs  inline-flex text-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Explore more {text}
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </Link>
    </div>
  );
};

export default ExploreMore;
