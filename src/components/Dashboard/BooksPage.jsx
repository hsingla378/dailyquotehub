import React, { useEffect, useState } from "react";
import axios from "axios";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { capitalizeTitle } from "../../utils/constants";
import AddQuote from "./AddQuote";
import { Button, Dropdown, Modal, Table } from "flowbite-react";
import Cookies from "js-cookie";
import AddBookModal from "./AddBookModal";
import UpdateBookModal from "./UpdateBookModal";

const ITEMS_PER_PAGE = 10;

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openAddBookModal, setOpenAddBookModal] = useState(false);
  const [openUpdateBookModal, setOpenUpdateBookModal] = useState(false);
  const token = Cookies.get("token");

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/books"
      );
      const data = await response.data;
      setBooks(data);
      setFilteredBooks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Cookies.get("token") && fetchBooks();
  }, []);

  const performSearch = (searchTerm) => {
    if (searchTerm === "") {
      setFilteredBooks(books);
      return;
    }
    const newBooks = books.filter((book) => {
      return book.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredBooks(newBooks);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const deleteBook = (bookId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (confirmDelete) {
      // Send a request to your backend to delete the category
      axios
        .delete(import.meta.env.VITE_BACKEND_URL + "/books/" + bookId, {
          headers: { Authorization: token },
        })
        .then(() => {
          enqueueSnackbar("Book deleted successfully.", {
            variant: "success",
            persist: false,
          });
          fetchBooks(); // Refresh quotes after deleting category
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
    const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);

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

  console.log("filteredBooks", filteredBooks);

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
                    Search a Book
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
                      placeholder="Search a Book"
                      required=""
                      onChange={(e) => performSearch(e.target.value.trim())}
                    />
                  </div>
                </form>
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0 ">
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
              </div>
            </div>
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-4">
                      Name
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Amazon Link
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Image
                    </th>
                    <th scope="col" className="px-4 py-3 text-right">
                      Actions
                      {/* <span className="sr-only">Actions</span> */}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBooks.length > 0 &&
                    filteredBooks.slice(startItem, endItem).map((book) => (
                      <tr
                        className="border-b dark:border-gray-700"
                        key={book._id}
                      >
                        <th
                          scope="row"
                          className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white truncate max-w-[12rem]"
                        >
                          {capitalizeTitle(book.name)}
                        </th>
                        <td className="px-4 py-3 truncate max-w-[12rem]">
                          {book.amazonLink}
                        </td>
                        <td className="px-4 py-3 truncate max-w-[12rem]">
                          {book.image}
                        </td>
                        <td className="px-4 py-3 flex items-center justify-end">
                          <Dropdown
                            color="dark"
                            size="sm"
                            label="Action "
                            dismissOnClick={false}
                          >
                            <Dropdown.Item
                              onClick={() => {
                                setOpenUpdateBookModal(true);
                              }}
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => {
                                deleteBook(book._id);
                              }}
                            >
                              Delete
                            </Dropdown.Item>
                          </Dropdown>
                          <Modal
                            show={openUpdateBookModal}
                            onClose={() => setOpenUpdateBookModal(false)}
                          >
                            <UpdateBookModal bookId={book._id} />
                          </Modal>
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
    </div>
  );
};

export default BooksPage;
