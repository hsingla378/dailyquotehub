import React, { useEffect, useState } from "react";
import useAllCategories from "../../utils/useAllCategories";
import useAllAuthors from "../../utils/useAllAuthors";
import axios from "axios";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { capitalizeTitle } from "../../utils/constants";
import AddQuote from "./AddQuote";
import AddMultipleQuotes from "./AddMultipleQuotes";
import { Button, Dropdown, Modal, Table } from "flowbite-react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import AddBookModal from "./AddBookModal";
import AddAuthorModal from "./AddAuthorModal";
import UpdateBookModal from "./UpdateBookModal";
import UpdateQuoteModal from "./UpdateQuoteModal";

const ITEMS_PER_PAGE = 10;

const Dashboard = () => {
  const [quotes, setQuotes] = useState([]);
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentQuoteId, setCurrentQuoteId] = useState(null);
  const [currentQuote, setCurrentQuote] = useState(null);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openCategoriesModal, setOpenCategoriesModal] = useState(false);
  const [openAddQuoteModal, setOpenAddQuoteModal] = useState(false);
  const [openUpdateQuoteModal, setOpenUpdateQuoteModal] = useState(false);
  const [openMultipleQuotesModal, setOpenMultipleQuotesModal] = useState(false);
  const [openAddAuthorModal, setOpenAddAuthorModal] = useState(false);
  const [openAddBookModal, setOpenAddBookModal] = useState(false);
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
        fetchQuotes();
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

  const handleEditCategory = (category) => {
    const newCategory = prompt("Enter the new category:", category);
    if (newCategory) {
      // Send a request to your backend to update the category
      axios
        .put(
          import.meta.env.VITE_BACKEND_URL + "/categories/" + category,
          { newCategory },
          { headers: { Authorization: token } }
        )
        .then(() => {
          enqueueSnackbar("Category updated successfully.", {
            variant: "success",
            persist: false,
          });
          fetchQuotes(); // Refresh quotes after editing category
        })
        .catch((error) => {
          enqueueSnackbar(error.message, {
            variant: "error",
            persist: false,
          });
        });
    }
  };

  const handleDeleteCategory = (category) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmDelete) {
      // Send a request to your backend to delete the category
      axios
        .delete(import.meta.env.VITE_BACKEND_URL + "/categories/" + category, {
          headers: { Authorization: token },
        })
        .then(() => {
          enqueueSnackbar("Category deleted successfully.", {
            variant: "success",
            persist: false,
          });
          fetchQuotes(); // Refresh quotes after deleting category
        })
        .catch((error) => {
          enqueueSnackbar(error.message, {
            variant: "error",
            persist: false,
          });
        });
    }
  };

  const handleAddCategory = (quoteId) => {
    const category = prompt("Enter the new category:");
    if (category) {
      // Send a request to your backend to add the category
      axios
        .post(
          import.meta.env.VITE_BACKEND_URL + "/categories/add/" + quoteId,
          { category },
          { headers: { Authorization: token } }
        )
        .then(() => {
          enqueueSnackbar("Category added successfully.", {
            variant: "success",
            persist: false,
          });
          fetchQuotes(); // Refresh quotes after adding category
        })
        .catch((error) => {
          enqueueSnackbar(error.message, {
            variant: "error",
            persist: false,
          });
        });
    }
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
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg">
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
                {/* Add Multiple Quotes Model */}
                <>
                  <Button
                    onClick={() => setOpenMultipleQuotesModal(true)}
                    size="sm"
                    color="blue"
                  >
                    Add Multiple Quotes
                  </Button>
                  <Modal
                    show={openMultipleQuotesModal}
                    size={"7xl"}
                    onClose={() => setOpenMultipleQuotesModal(false)}
                  >
                    <AddMultipleQuotes />
                  </Modal>
                </>
                {/* Add a Quote */}
                <>
                  <Button
                    onClick={() => setOpenAddQuoteModal(true)}
                    size="sm"
                    color="success"
                  >
                    Add a Quote
                  </Button>
                  <Modal
                    show={openAddQuoteModal}
                    size={"2xl"}
                    onClose={() => setOpenAddQuoteModal(false)}
                  >
                    <AddQuote />{" "}
                  </Modal>
                </>
                {/* Add Author */}
                <>
                  <Button
                    onClick={() => setOpenAddAuthorModal(true)}
                    size="sm"
                    color="failure"
                  >
                    Add Author
                  </Button>
                  <Modal
                    show={openAddAuthorModal}
                    size={"3xl"}
                    onClose={() => setOpenAddAuthorModal(false)}
                  >
                    <Modal.Body>
                      <AddAuthorModal />
                    </Modal.Body>
                  </Modal>
                </>
                {/* Add Book */}
                <>
                  <Button
                    onClick={() => setOpenAddBookModal(true)}
                    size="sm"
                    color="success"
                  >
                    Add Book
                  </Button>
                  <Modal
                    show={openAddBookModal}
                    size={"2xl"}
                    onClose={() => setOpenAddBookModal(false)}
                  >
                    <AddBookModal />
                  </Modal>
                </>
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
                  {filteredQuotes.length > 0 &&
                    filteredQuotes.slice(startItem, endItem).map((quote) => (
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
                          {quote.book && quote.book.name && quote.book.name}
                        </td>
                        <td className="px-4 py-3 flex items-center justify-end">
                          <Dropdown
                            label="Action"
                            size={"sm"}
                            color={"dark"}
                            dismissOnClick={false}
                          >
                            <Dropdown.Item
                              onClick={() => {
                                setCurrentQuoteId(quote._id);
                                setShowUpdateModal(true);
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
                            <Dropdown.Item
                              onClick={() => {
                                setCurrentQuote(quote);
                                setOpenCategoriesModal(true);
                              }}
                            >
                              Edit Categories
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
      {/* Update Quote Modal */}
      <Modal show={showUpdateModal} onClose={() => setShowUpdateModal(false)}>
        <UpdateQuoteModal quoteId={currentQuoteId} />
      </Modal>
      {/* Categories Modal */}
      {openCategoriesModal && (
        <Modal
          show={openCategoriesModal}
          onClose={() => setOpenCategoriesModal(false)}
        >
          <Modal.Header>
            <div className="flex justify-between gap-4">
              <p>Edit Categories </p>
              <Button
                color="light"
                size="xs"
                onClick={() => handleAddCategory(currentQuote._id)}
              >
                Add new Category
              </Button>
            </div>
          </Modal.Header>
          <Modal.Body>
            <Table>
              <Table.Head>
                <Table.HeadCell>Catgories</Table.HeadCell>
                <Table.HeadCell>Edit</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {currentQuote.categories.map((category) => (
                  <Table.Row
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={category}
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {category}
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        color="success"
                        size="xs"
                        onClick={() => handleEditCategory(category)}
                      >
                        Edit
                      </Button>
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        color="failure"
                        size="xs"
                        onClick={() => handleDeleteCategory(category)}
                      >
                        Delete
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;
