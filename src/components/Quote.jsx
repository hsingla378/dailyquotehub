import { useEffect, useState } from "react";
import QuotesContainer from "./QuotesContainer";
import Pagination from "./Pagination";
import Heading from "./Heading";
import { Link, useParams } from "react-router-dom";
import { FaAmazon } from "react-icons/fa";
import {
  capitalizeTitle,
  transformImageCloudinaryUrl,
} from "../utils/constants";
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
import axios from "axios";
import { FaRegCopy } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { Helmet } from "react-helmet";

const Quote = () => {
  const { slug } = useParams();
  const [quotes, setQuotes] = useState([]);
  const [quoteInfo, setQuoteInfo] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      let response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/quotes"
      );
      let data = await response.data;
      setQuotes(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const fetchQuoteInfo = async () => {
    setLoading(true);
    try {
      let response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/quotes/" + slug
      );
      let data = await response.data;
      setQuoteInfo(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuotes();
    fetchQuoteInfo();
    window.scrollTo(0, 0);
  }, [slug]);

  const copyToClipboard = () => {
    const quoteTitle = capitalizeTitle(quoteInfo.title);
    const authorName = capitalizeTitle(quoteInfo.author.name);
    const currentLink = window.location.href;

    const textToCopy = `${quoteTitle}\n - ${authorName}\nVisit Now: ${currentLink}`;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        enqueueSnackbar("Quote Copied!", {
          persist: false,
        });
      })
      .catch((error) => {
        enqueueSnackbar(error, {
          persist: false,
        });
      });
  };

  const downloadThumbnail = () => {
    const imageUrl = `../src/assets/images/quotes/${quoteInfo.thumbnail}`;
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "quote_dailyquotehub.jpg";
    link.click();

    enqueueSnackbar("Quote downloaded! 🎉", {
      persist: false,
      variant: "success",
    });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {/* Quote Details */}
          {quoteInfo.title && (
            <section className="bg-white dark:bg-gray-900">
              <SnackbarProvider
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              />
              <Helmet>
                <meta charSet="utf-8" />
                <meta property="og:title" content={quoteInfo.title} />
                <meta
                  property="og:description"
                  content={quoteInfo.description}
                />
                <meta
                  property="og:image"
                  content={`https://www.dailyquotehub.com/backend/images/quotes/${quoteInfo.thumbnail}`}
                />
                <meta
                  property="og:url"
                  content={`https://dailyquotehub.com/quotes/${slug}`}
                />
                <title>{quoteInfo.title} - DailyQuoteHub</title>
              </Helmet>

              <div className="flex justify-center flex-col items-center md:grid max-w-screen-xl px-4 pt-8 mx-auto lg:gap-8 xl:gap-0 sm:grid-cols-12">
                <div className="my-4 lg:mt-0 sm:col-span-6 flex items-center relative">
                  <img
                    src={"../../backend/images/quotes/" + quoteInfo.thumbnail}
                    alt={quoteInfo.title}
                    className="max-w-96 m-auto rounded md:mr-[3rem] max-h-[500px]"
                  />
                  {/* Download Button */}
                  <button
                    onClick={downloadThumbnail}
                    className="absolute bottom-4 right-4 md:right-[65px] bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white p-2 rounded-sm focus:outline-none"
                  >
                    <FaDownload size={20} />
                  </button>
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
                    <p className="max-w-[80%]">{quoteInfo.title}</p>
                  </blockquote>

                  {/* Author */}
                  {quoteInfo.author.name && (
                    <figcaption className="flex items-center my-6 space-x-2 rtl:space-x-reverse">
                      <Link to={generateAuthorLink(quoteInfo.author.name)}>
                        <div className="flex gap-2 justify-center items-center">
                          <img
                            className="w-6 h-6 rounded-full"
                            src={
                              "../../backend/images/authors/" +
                              quoteInfo.author.avatar
                            }
                            alt="profile picture"
                          />
                          <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-300 dark:divide-gray-700">
                            <cite className="pe-3 text-gray-900 dark:text-white font-bold">
                              {capitalizeTitle(quoteInfo.author.name)}
                            </cite>
                          </div>
                        </div>
                      </Link>
                      {/* Copy Button */}
                      <button
                        onClick={copyToClipboard}
                        className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
                      >
                        <FaRegCopy size={20} />
                      </button>
                    </figcaption>
                  )}

                  {/* Quote Description */}
                  <p className="my-4">{quoteInfo.description}</p>

                  {/* Amazon Book Reference */}
                  {quoteInfo.book && quoteInfo.book.amazonLink && (
                    <Link to={quoteInfo.book.amazonLink} target="_blank">
                      <div className="items-center bg-gray-50 rounded-lg sm:flex dark:bg-gray-800 dark:border-gray-700 px-4 my-6 w-max flex shadow-md hover:shadow-lg max-w-96">
                        {quoteInfo.book.image ? (
                          <img
                            src={
                              "../../backend/images/books/" +
                              quoteInfo.book.image
                            }
                            className="w-11 rounded-md"
                          />
                        ) : (
                          <FaAmazon className="text-5xl text-white mx-auto" />
                        )}

                        <div className="p-5">
                          <h3 className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
                            {quoteInfo.book.name}
                          </h3>
                          <span className="text-gray-500 text-sm dark:text-gray-400">
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
                          className="text-black border-gray-300 border-2 hover:shadow-xl focus:ring-4 focus:ring-blue-300 font-normal rounded-lg text-xs sm:text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
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
      )}
    </>
  );
};

export default Quote;
