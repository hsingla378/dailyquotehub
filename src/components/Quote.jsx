import { useState } from "react";
import QuotesContainer from "./QuotesContainer";
import Pagination from "./Pagination";
import Heading from "./Heading";
import { Link, useParams } from "react-router-dom";
import { FaAmazon } from "react-icons/fa";
import useQuoteInfo from "../utils/useQuoteInfo";
import useAllQuotes from "../utils/useAllQuotes";
import { capitalizeTitle } from "../utils/constants";
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import {
  EmailIcon,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import Loading from "./Loading";

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

  if (!quotes.length) return <Loading />;

  return (
    <div>
      {/* Quote Details */}
      {quoteInfo.title && (
        <section className="bg-white dark:bg-gray-900 py-4">
          <div className="flex justify-center flex-col items-center md:grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-8 sm:grid-cols-12">
            <div className="my-4 lg:mt-0 sm:col-span-6 flex items-center">
              <img
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
                alt="mockup"
                className="max-w-96 m-auto p-2 rounded md:mr-[3rem]"
              />
            </div>
            <div className="flex justify-center flex-col items-center md:block mx-auto md:m-[unset] md:mr-auto place-self-center sm:col-span-6 text-center md:text-left ">
              {/* Quote */}
              <blockquote className="text-xl italic font-semibold text-gray-900 dark:text-white flex justify-center flex-col items-center md:block">
                <svg
                  className="w-8 h-8 text-gray-400 dark:text-gray-600 mb-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 14"
                >
                  <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                </svg>
                <p>{quoteInfo.title}</p>
              </blockquote>

              {/* Author */}
              {quoteInfo.author.name && (
                <Link to={generateAuthorLink(quoteInfo.author.name)}>
                  <figcaption className="flex items-center my-6 space-x-3 rtl:space-x-reverse">
                    <img
                      className="w-6 h-6 rounded-full"
                      src={quoteInfo.thumbnail}
                      alt="profile picture"
                    />
                    <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-300 dark:divide-gray-700">
                      <cite className="pe-3 font-medium text-gray-900 dark:text-white">
                        {capitalizeTitle(quoteInfo.author.name)}
                      </cite>
                    </div>
                  </figcaption>
                </Link>
              )}

              {/* Amazon Book Reference */}
              {quoteInfo.book.amazonLink && (
                <Link to={quoteInfo.book.amazonLink} target="_blank">
                  <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700 px-4 my-6 w-max flex">
                    {quoteInfo.book.image ? (
                      <img
                        src={quoteInfo.book.image}
                        className="w-11 rounded-md"
                      />
                    ) : (
                      <FaAmazon className="text-5xl text-white mx-auto" />
                    )}

                    <div className="p-5">
                      <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {quoteInfo.book.name}
                      </h3>
                      <span className="text-gray-500 dark:text-gray-400">
                        Buy from Amazon
                      </span>
                    </div>
                  </div>
                </Link>
              )}

              {/* Quote Categories */}
              <div>
                {" "}
                {quoteInfo.categories.map((category) => (
                  <Link
                    key={category}
                    to={"/categories/" + category}
                    className="inline-flex items-center justify-center text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                  >
                    <button
                      type="button"
                      className="text-black bg-gray-300 hover:bg-gray-400 focus:ring-4 focus:ring-blue-300 font-normal rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                    >
                      {capitalizeTitle(category)}
                    </button>
                  </Link>
                ))}{" "}
              </div>

              {/* Social Share Icons */}

              <ul className="flex space-x-2 my-6">
                <li>
                  <FacebookShareButton
                    url={window.location.href}
                    quote={"Dummy text!"}
                    hashtag="#muo"
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                </li>
                <li>
                  <TwitterShareButton
                    url={window.location.href}
                    quote={"Dummy text!"}
                    hashtag="#muo"
                  >
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                </li>
                <li>
                  <EmailShareButton
                    url={window.location.href}
                    quote={"Dummy text!"}
                    hashtag="#muo"
                  >
                    <EmailIcon size={32} round />
                  </EmailShareButton>
                </li>
                <li>
                  <WhatsappShareButton
                    url={window.location.href}
                    quote={"Dummy text!"}
                    hashtag="#muo"
                  >
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                </li>
              </ul>
            </div>
          </div>
        </section>
      )}
      <div className="flex items-baseline mb-8 mt-16 m-auto justify-between max-w-[90%] xl:lg:max-w-6xl">
        <Heading middle={"Related"} right={"Quotes"} />
      </div>

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
