import { useEffect, useState } from "react";
import QuotesContainer from "./QuotesContainer";
import Pagination from "./Pagination";
import Heading from "./Heading";
import { Link, useParams } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaAmazon } from "react-icons/fa";
import useQuoteInfo from "../utils/useQuoteInfo";
import useAllQuotes from "../utils/useAllQuotes";

const Quote = () => {
  const { id } = useParams();
  const quotes = useAllQuotes();
  const quoteInfo = useQuoteInfo(id);
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the range of items to display on the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentQuotes = quotes.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const generateAuthorLink = (author) => {
    return `/authors/${author.split(" ").join("-").toLowerCase()}`;
  };

  return (
    <div>
      {/* Quote Details */}
      {quoteInfo.title && (
        <section>
          <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="lg:mt-0 lg:col-span-6 lg:flex">
              <img
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
                alt="mockup"
                className="max-w-[85%]"
              />
            </div>
            <div className="place-self-center lg:col-span-6">
              {/* Quote */}
              <blockquote className="text-xl italic font-semibold text-gray-900 dark:text-white">
                <svg
                  className="w-8 h-8 text-gray-400 dark:text-gray-600 mb-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 14"
                >
                  <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                </svg>
                <p>{quoteInfo.description}</p>
              </blockquote>

              {/* Author */}
              <Link to={generateAuthorLink(quoteInfo.author.name)}>
                <figcaption className="flex items-center my-6 space-x-3 rtl:space-x-reverse">
                  <img
                    className="w-6 h-6 rounded-full"
                    src={quoteInfo.thumbnail}
                    alt="profile picture"
                  />
                  <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-300 dark:divide-gray-700">
                    <cite className="pe-3 font-medium text-gray-900 dark:text-white">
                      {quoteInfo.author.name}
                    </cite>
                  </div>
                </figcaption>
              </Link>

              {/* Amazon Book Reference */}
              <Link to={quoteInfo.amazonLink} target="_blank">
                <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700 px-4 my-6 w-max flex">
                  <FaAmazon className="text-5xl text-white mx-auto" />

                  <div className="p-5">
                    <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      Bonnie Green
                    </h3>
                    <span className="text-gray-500 dark:text-gray-400">
                      Book Reference Basically
                    </span>
                  </div>
                </div>
              </Link>
              {/* Quote Categories */}
              <div>
                {" "}
                {quoteInfo.categories.map((category) => (
                  <Link
                    key={category}
                    to={"/categories/" + category}
                    className="inline-flex items-center justify-center text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                  >
                    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        {category}
                      </span>
                    </button>
                  </Link>
                ))}
                ={" "}
              </div>

              {/* Social Share Icons */}
              <ul className="flex space-x-4 my-6">
                <li>
                  <Link
                    href="/"
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-white w-5 h-5"
                  >
                    <FaFacebook />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-white w-5 h-5"
                  >
                    <FaTwitter />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-white w-5 h-5"
                  >
                    <FaGithub />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-white w-5 h-5"
                  >
                    <IoLogoWhatsapp />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
      )}
      <Heading left={"Tag"} middle={"or"} right={"Cat"} />
      {/* Related Quotes */}
      <QuotesContainer quotes={currentQuotes} />
      <Pagination
        currentPage={currentPage}
        itemsPerPage={ITEMS_PER_PAGE}
        totalItems={quotes.length}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Quote;
