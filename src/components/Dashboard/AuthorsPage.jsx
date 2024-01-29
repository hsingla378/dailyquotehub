import React, { useEffect, useState } from "react";
import axios from "axios";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { capitalizeTitle } from "../../utils/constants";
import AddQuote from "./AddQuote";
import { Button, Dropdown, Modal, Table } from "flowbite-react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AddAuthorModal from "./AddAuthorModal";
import UpdateAuthorModal from "./UpdateAuthorModal";

const ITEMS_PER_PAGE = 10;

const AuthorsPage = () => {
  const [authors, setAuthors] = useState([]);
  const [filteredAuthors, setFilteredAuthors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openAddAuthorModal, setOpenAddAuthorModal] = useState(false);
  const [openUpdateAuthorModal, setOpenUpdateAuthorModal] = useState(false);
  const token = Cookies.get("token");

  const fetchAuthors = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/authors"
      );
      const data = await response.data;
      setAuthors(data);
      setFilteredAuthors(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Cookies.get("token") && fetchAuthors();
  }, []);

  const performSearch = (searchTerm) => {
    if (searchTerm === "") {
      setFilteredAuthors(authors);
      return;
    }
    const newAuthors = authors.filter((author) => {
      return author.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredAuthors(newAuthors);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDeleteAuthor = (authorId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmDelete) {
      // Send a request to your backend to delete the category
      axios
        .delete(import.meta.env.VITE_BACKEND_URL + "/authors/" + authorId, {
          headers: { Authorization: token },
        })
        .then(() => {
          enqueueSnackbar("Author deleted successfully.", {
            variant: "success",
            persist: false,
          });
          fetchAuthors(); // Refresh authors after deleting category
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
    const totalPages = Math.ceil(filteredAuthors.length / ITEMS_PER_PAGE);

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

  const generateAuthorLink = (author) => {
    return `/authors/${author.split(" ").join("-").toLowerCase()}`;
  };

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
                    Search an Author
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
                      placeholder="Search an Author"
                      required=""
                      onChange={(e) => performSearch(e.target.value.trim())}
                    />
                  </div>
                </form>
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0 ">
                {/* Add Author */}
                <>
                  <Button
                    onClick={() => setOpenAddAuthorModal(true)}
                    size="sm"
                    color="success"
                  >
                    Add Author
                  </Button>
                  <Modal
                    show={openAddAuthorModal}
                    size={"3xl"}
                    onClose={() => setOpenAddAuthorModal(false)}
                  >
                    <AddAuthorModal />
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
                      Designation
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Description
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Avatar
                    </th>
                    <th scope="col" className="px-4 py-3 text-right">
                      Actions
                      {/* <span className="sr-only">Actions</span> */}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {generateAuthorLink.length > 0 &&
                    filteredAuthors.slice(startItem, endItem).map((author) => (
                      <tr
                        className="border-b dark:border-gray-700"
                        key={author._id}
                      >
                        <th
                          scope="row"
                          className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white truncate max-w-[12rem]"
                        >
                          {capitalizeTitle(author.name)}
                        </th>
                        <td className="px-4 py-3 truncate max-w-[12rem]">
                          {author.designation}
                        </td>
                        <td className="px-4 py-3 truncate max-w-[12rem]">
                          {author.description}
                        </td>
                        <td className="px-4 py-3 max-w-[12rem] truncate">
                          {author.avatar}
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
                                setOpenUpdateAuthorModal(true);
                              }}
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() =>
                                window.open(
                                  generateAuthorLink(author.name),
                                  "_blank"
                                )
                              }
                            >
                              Preview
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => {
                                handleDeleteAuthor(author._id);
                              }}
                            >
                              Delete
                            </Dropdown.Item>
                          </Dropdown>
                          {/* <!-- Update modal --> */}
                          <Modal
                            show={openUpdateAuthorModal}
                            onClose={() => setOpenUpdateAuthorModal(false)}
                          >
                            <UpdateAuthorModal authorId={author._id} />
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
    </div>
  );
};

export default AuthorsPage;
