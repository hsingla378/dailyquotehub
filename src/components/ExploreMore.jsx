import { Link } from "react-router-dom";

const ExploreMore = ({ text, link }) => {
  return (
    <div className="flex justify-center">
      <Link to={link}>
        {" "}
        <button
          type="button"
          className=" text-black py-2 px-5 font-medium rounded-lg text-[10px] md:text-sm  inline-flex text-center items-cente"
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
