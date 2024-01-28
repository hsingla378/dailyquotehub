import React, { useEffect, useState } from "react";
import useAllCategories from "../../utils/useAllCategories";
import useAllAuthors from "../../utils/useAllAuthors";
import axios from "axios";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { capitalizeTitle } from "../../utils/constants";
import AddQuote from "./AddQuote";
import { Dropdown } from "flowbite-react";
import UpdateQuote from "./UpdateQuote";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const ITEMS_PER_PAGE = 10;

const Dashboard = () => {
  const [quotes, setQuotes] = useState([]);
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentQuoteId, setCurrentQuoteId] = useState(null);
  const [currentQuoteSlug, setCurrentQuoteSlug] = useState(null);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const categories = useAllCategories();
  const authors = useAllAuthors();
  const token = Cookies.get("token");

  const fetchQuotes = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/quotes"
      );
      const data = await response.data;
      setQuotes(data);
      setFilteredQuotes(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Cookies.get("token") && fetchQuotes();
  }, []);

  const performSearch = (searchTerm) => {
    if (searchTerm === "") {
      setFilteredQuotes(quotes);
      return;
    }
    const newQuotes = quotes.filter((quote) => {
      return quote.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredQuotes(newQuotes);
  };

  const handleAuthorChange = (authorName) => {
    const updatedAuthors = selectedAuthors.includes(authorName)
      ? selectedAuthors.filter((name) => name !== authorName)
      : [...selectedAuthors, authorName];
    setSelectedAuthors(updatedAuthors);
    updateFilteredQuotes(updatedAuthors, selectedCategories);
  };

  const handleCategoryChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updatedCategories);
    updateFilteredQuotes(selectedAuthors, updatedCategories);
  };

  const updateFilteredQuotes = (authors, categories) => {
    let newFilteredQuotes = quotes;

    if (authors.length > 0) {
      newFilteredQuotes = newFilteredQuotes.filter((quote) =>
        authors.includes(quote.author.name)
      );
    }

    if (categories.length > 0) {
      newFilteredQuotes = newFilteredQuotes.filter((quote) =>
        quote.categories.some((cat) => categories.includes(cat))
      );
    }

    setFilteredQuotes(newFilteredQuotes);
  };

  const deleteQuote = (token, quoteId) => {
    let data = "";

    if (!token) {
      enqueueSnackbar("Kindly login!", {
        variant: "success",
        persist: false,
      });
      return;
    }

    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_BACKEND_URL + "/quotes/" + quoteId,
      headers: {
        Authorization: token,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        enqueueSnackbar("Quote Deleted!", {
          variant: "success",
          persist: false,
        });
      })
      .catch((error) => {
        enqueueSnackbar(error, {
          variant: "error",
          persist: false,
        });
      });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(filteredQuotes.length / ITEMS_PER_PAGE);

    if (totalPages <= 1) {
      return null;
    }

    const renderPageButtons = () => {
      const startPage = Math.max(1, currentPage - 4);
      const endPage = Math.min(totalPages, startPage + 9);

      return [...Array(endPage - startPage + 1)].map((_, index) => (
        <li key={startPage + index}>
          <a
            href="#"
            className={`flex items-center justify-center text-sm py-2 px-3 leading-tight ${
              currentPage === startPage + index
                ? "text-primary-600 bg-primary-50 border border-primary-300"
                : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            }`}
            onClick={() => handlePageChange(startPage + index)}
          >
            {startPage + index}
          </a>
        </li>
      ));
    };

    return (
      <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4">
        <ul className="inline-flex items-stretch -space-x-px">
          <li>
            <button
              className={`flex items-center justify-center text-sm py-2 px-3 leading-tight ${
                currentPage === 1
                  ? "text-gray-500 bg-white border border-gray-300 cursor-not-allowed"
                  : "text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
          </li>
          {renderPageButtons()}
          <li>
            <button
              className={`flex items-center justify-center text-sm py-2 px-3 leading-tight ${
                currentPage === totalPages
                  ? "text-gray-500 bg-white border border-gray-300 cursor-not-allowed"
                  : "text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  const startItem = (currentPage - 1) * ITEMS_PER_PAGE;
  const endItem = currentPage * ITEMS_PER_PAGE;

  return (
    <div>
      {/* <DashboardNav /> */}
      {/* <!-- Start block --> */}
      <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
        <SnackbarProvider
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        />
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          {/* <!-- Start coding here --> */}
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-1/2">
                <form className="flex items-center">
                  <label htmlFor="simple-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="simple-search"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Search"
                      required=""
                      onChange={(e) => performSearch(e.target.value.trim())}
                    />
                  </div>
                </form>
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0 ">
                <button
                  type="button"
                  id="createProductModalButton"
                  data-modal-target="createProductModal"
                  data-modal-toggle="createProductModal"
                  className="flex items-center justify-center text-white bg-green-600 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                >
                  <svg
                    className="h-3.5 w-3.5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    />
                  </svg>
                  Add Quote
                </button>
                <Link to={"/add-multiple-quotes"}>
                  <button
                    type="button"
                    className="flex items-center justify-center text-white bg-blue-600 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                  >
                    <svg
                      className="h-3.5 w-3.5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      />
                    </svg>
                    Add Multiple Quotes
                  </button>
                </Link>
                <Link to={"/add-multiple-quotes"}>
                  <button
                    type="button"
                    className="flex items-center justify-center text-white bg-red-600 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                  >
                    <svg
                      className="h-3.5 w-3.5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      />
                    </svg>
                    Add Author
                  </button>
                </Link>
                <div className="flex items-center space-x-3 w-full md:w-auto">
                  <button
                    id="authorDropdownButton"
                    data-dropdown-toggle="authorDropdown"
                    className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    type="button"
                  >
                    <svg
                      className="-ml-1 mr-1.5 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      />
                    </svg>
                    Authors
                  </button>
                  <div
                    id="authorDropdown"
                    className="z-10 hidden w-56 p-3 bg-white rounded-lg shadow dark:bg-gray-700"
                  >
                    <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                      Author
                    </h6>
                    <ul
                      className="space-y-2 text-sm"
                      aria-labelledby="authorDropdownButton"
                    >
                      {authors.map((author) => (
                        <li className="flex items-center" key={author.name}>
                          <input
                            id={author.name}
                            type="checkbox"
                            checked={selectedAuthors.includes(author.name)}
                            onChange={() => handleAuthorChange(author.name)}
                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            htmlFor={author.name}
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                          >
                            {capitalizeTitle(author.name)}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    id="categoryDropdownButton"
                    data-dropdown-toggle="categoryDropdown"
                    className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      className="h-4 w-4 mr-2 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Categories
                    <svg
                      className="-mr-1 ml-1.5 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      />
                    </svg>
                  </button>
                  <div
                    id="categoryDropdown"
                    className="z-10 hidden w-56 p-3 bg-white rounded-lg shadow dark:bg-gray-700"
                  >
                    <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                      Category
                    </h6>
                    <ul
                      className="space-y-2 text-sm"
                      aria-labelledby="categoryDropdownButton"
                    >
                      {categories.map((category) => (
                        <li className="flex items-center" key={category}>
                          <input
                            id={category}
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCategoryChange(category)}
                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            htmlFor={category}
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                          >
                            {capitalizeTitle(category)}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-4">
                      Quote Title
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Categories
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Author Name
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Book Name
                    </th>
                    <th scope="col" className="px-4 py-3 text-right">
                      Actions
                      {/* <span className="sr-only">Actions</span> */}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQuotes.slice(startItem, endItem).map((quote) => (
                    <tr
                      className="border-b dark:border-gray-700"
                      key={quote._id}
                    >
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white truncate max-w-[12rem]"
                      >
                        {quote.title}
                      </th>
                      <td className="px-4 py-3 truncate max-w-[12rem]">
                        {quote.categories
                          .map((category) => capitalizeTitle(category))
                          .join(", ")}
                      </td>
                      <td className="px-4 py-3 truncate max-w-[12rem]">
                        {capitalizeTitle(quote.author.name)}
                      </td>
                      <td className="px-4 py-3 max-w-[12rem] truncate">
                        {quote.book.name}
                      </td>
                      <td className="px-4 py-3 flex items-center justify-end">
                        <Dropdown label="Action " dismissOnClick={false}>
                          <Dropdown.Item
                            onClick={() => {
                              setShowUpdateModal(true);
                              setCurrentQuoteId(quote._id);
                              setCurrentQuoteSlug(quote.slug);
                            }}
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() =>
                              window.open("/quotes/" + quote.slug, "_blank")
                            }
                          >
                            Preview
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              confirm(
                                "Are you sure you want to delete this quote?"
                              ) && deleteQuote(token, quote._id);
                            }}
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end">{renderPagination()}</div>
          </div>
        </div>
      </section>
      {/* <!-- End block --> */}
      {/* <!-- Create modal --> */}
      <div
        id="createProductModal"
        tabIndex="-1"
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            {/* <!-- Modal header --> */}
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add Quote
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-target="createProductModal"
                data-modal-toggle="createProductModal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <AddQuote />
          </div>
        </div>
      </div>
      {/* <!-- Update modal --> */}
      {showUpdateModal && (
        <div
          id="updateProductModal"
          tabIndex="-1"
          aria-hidden="true"
          className={
            "flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          }
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            {/* <!-- Modal content --> */}
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              {/* <!-- Modal header --> */}
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Update Product
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="updateProductModal"
                  onClick={() => {
                    setShowUpdateModal(false);
                    setCurrentQuoteId(null);
                    setCurrentQuoteSlug(null);
                  }}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <UpdateQuote id={currentQuoteId} slug={currentQuoteSlug} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
