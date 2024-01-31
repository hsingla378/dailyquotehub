import { useState } from "react";
import { useParams } from "react-router-dom";
import HeadSection from "./HeadSection";
import Heading from "./Heading";
import QuotesContainer from "./QuotesContainer";
import useAuthorData from "../utils/useAuthorData";
import { capitalizeTitle } from "../utils/constants";
import Loading from "./Loading";

const ITEMS_PER_PAGE = 10;

const Author = () => {
  let { author } = useParams();
  const authorData = useAuthorData(author);
  const [currentPage, setCurrentPage] = useState(1);

  if (!authorData.length) return <Loading />;

  const authorInfo = authorData[0].author;

  if (!authorData) return <Loading />;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(authorData.length / ITEMS_PER_PAGE);
    const maxPagesToShow = 10;
    const maxPagesOnEachSide = Math.floor((maxPagesToShow - 1) / 2);
    const isPrevButtonVisible = currentPage > 1;
    const isNextButtonVisible = currentPage < totalPages && totalPages > 1;

    if (totalPages <= 1) {
      return null;
    }

    const getPagesToShow = () => {
      const pagesToShow = [];
      const startPage = Math.max(1, currentPage - maxPagesOnEachSide);
      const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

      for (let i = startPage; i <= endPage; i++) {
        pagesToShow.push(i);
      }

      return pagesToShow;
    };

    return (
      <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4">
        <ul className="inline-flex items-stretch -space-x-px">
          {isPrevButtonVisible && (
            <li>
              <a
                href="#"
                className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Prev
              </a>
            </li>
          )}
          {getPagesToShow().map((pageIndex) => (
            <li key={pageIndex}>
              <a
                href="#"
                className={`flex items-center justify-center text-sm py-2 px-3 leading-tight ${
                  currentPage === pageIndex
                    ? "text-primary-600 bg-primary-50 border border-primary-300"
                    : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                }`}
                onClick={() => handlePageChange(pageIndex)}
              >
                {pageIndex}
              </a>
            </li>
          ))}
          {isNextButtonVisible && (
            <li>
              <a
                href="#"
                className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </a>
            </li>
          )}
        </ul>
      </nav>
    );
  };

  const startItem = (currentPage - 1) * ITEMS_PER_PAGE;
  const endItem = currentPage * ITEMS_PER_PAGE;

  return (
    <div>
      <HeadSection heading={"Author Spotlight"} />
      {/* Author Details */}
      <section className="bg-white dark:bg-gray-900 py-4">
        <div className="flex justify-center items-center flex-col sm:flex-row mx-auto max-w-screen-xl px-4 lg:px-6 py-8 lg:gap-8 xl:gap-0 lg:py-8 sm:grid-cols-12">
          <div className="my-4 lg:mt-0 sm:col-span-6 ">
            <img
              className="max-w-[90%] m-auto rounded md:mr-[3rem] w-64"
              src={authorInfo.avatar}
              alt="Bonnie Avatar"
            />
          </div>
          <div className="mx-auto md:m-[unset] md:mr-auto place-self-top pt-6 sm:col-span-6 text-center md:text-left ">
            <h2 className="max-w-2xl mb-4 text-2xl font-extrabold tracking-tight leading-none md:text-3xl xl:text-4xl dark:text-white">
              {capitalizeTitle(authorInfo.name)}
            </h2>
            <h3 className="max-w-2xl mb-4 text-sm font-semibold tracking-tight leading-none md:text-base xl:text-lg dark:text-white">
              {authorInfo.designation}
            </h3>
            <p className="max-w-2xl mb-6 text-sm font-light text-gray-500 lg:mb-8 md:text-base lg:text-base dark:text-gray-400">
              {authorInfo.description}
            </p>
          </div>
        </div>
      </section>
      {/* Heading - His/Her Quotes */}
      <div className="flex items-baseline mb-8 mt-8 m-auto justify-between max-w-[90%] xl:lg:max-w-6xl">
        <Heading
          middle={"Quotes By"}
          right={capitalizeTitle(authorInfo.name)}
        />
      </div>
      {/* Author Posts */}
      <div className="flex justify-end pt-4 px-4 mx-auto max-w-screen-xl lg:pt-8 lg:px-6 ">
        {renderPagination()}
      </div>
      <QuotesContainer quotes={authorData.slice(startItem, endItem)} />
      <div className="flex justify-end pt-4 px-4 mx-auto max-w-screen-xl lg:pt-8 lg:px-6 ">
        {renderPagination()}
      </div>
    </div>
  );
};

export default Author;
