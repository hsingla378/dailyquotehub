import QOTD from "./QOTD";
import AuthorsContainer from "./AuthorsContainer";
import QuotesContainer from "./QuotesContainer";
import Heading from "./Heading";
import CategoriesContainer from "./CategoriesContainer";
import useAllQuotes from "../utils/useAllQuotes";
import useAllAuthors from "../utils/useAllAuthors";
import useAllCategories from "../utils/useAllCategories";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const LandingPage = () => {
  const quotes = useAllQuotes();
  const authors = useAllAuthors();
  const categories = useAllCategories();

  if (!quotes.length) return <Loading />;

  return (
    <div>
      {quotes.length && (
        <QOTD quote={quotes[Math.floor(Math.random() * quotes.length)]} />
      )}
      {/* Authors */}
      {authors.length && (
        <>
          <AuthorsContainer authors={authors.slice(0, 10)} />
        </>
      )}
      {/*  Heading - Featured Quotes */}
      {quotes.length && (
        <>
          <Heading right={"Featured Quotes"} />
          <QuotesContainer quotes={quotes.slice(0, 10)} />
          <div className="flex justify-center mb-16">
            <Link to="/quotes" className="shadow-sm">
              {" "}
              <button
                type="button"
                className=" bg-blue-700 text-white shadow-2xl shadow-blue-700 py-2 px-5    focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  inline-flex text-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Explore more Quotes
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
        </>
      )}
      {categories.length && (
        <>
          <Heading right={"Categories"} />
          <CategoriesContainer categories={categories.slice(0, 20)} />
          <div className="flex justify-center mb-16">
            <Link to="/categories">
              {" "}
              <button
                type="button"
                className="bg-blue-700 text-white shadow-2xl shadow-blue-700 py-2 px-5  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  inline-flex text-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Explore more Categories
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
        </>
      )}
    </div>
  );
};

export default LandingPage;
