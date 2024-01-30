import { Button, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import axios from "axios";
import Select from "react-select";

const UpdateQuoteModal = ({ quoteId }) => {
  const [quoteInfo, setQuoteInfo] = useState({
    title: "",
    description: "",
    categories: [],
    thumbnail: "",
    author: "",
    book: "",
  });
  const [existingCategories, setExistingCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);

  const fetchCategoriesFromAPI = async () => {
    try {
      let response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/categories"
      );
      let data = await response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAuthorsFromAPI = async () => {
    try {
      let response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/authors"
      );
      let data = await response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBooksFromAPI = async () => {
    try {
      let response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/books"
      );
      let data = await response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Fetch existing categories from the API when the component mounts
    const fetchContent = async () => {
      const categories = await fetchCategoriesFromAPI();
      setExistingCategories(categories);
      const authors = await fetchAuthorsFromAPI();
      setAuthors(authors);
      const books = await fetchBooksFromAPI();
      setBooks(books);
    };

    fetchContent();
  }, []);

  const handleCategoryChange = (selectedOptions) => {
    const newCategories = selectedOptions.map((option) => option.value);
    setQuoteInfo((prevDetails) => ({
      ...prevDetails,
      categories: newCategories,
    }));
  };

  const handleNewCategoryChange = (newValue) => {
    setNewCategory(newValue);
  };

  const token = Cookies.get("token");

  useEffect(() => {
    // Fetch quote info when the component mounts
    const fetchQuoteInfo = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/quotes/id/" + quoteId
        );
        const data = response.data;
        // Set initial values of the input boxes to fetched data
        setQuoteInfo({
          title: data.title,
          description: data.description,
          categories: data.categories,
          thumbnail: data.thumbnail,
          author: data.author,
          book: data.book,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuoteInfo();
  }, [quoteId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      enqueueSnackbar("Kindly login!", {
        variant: "success",
        persist: false,
      });
      return;
    }

    // Fetch the original quote data from the server
    const originalQuoteData = await axios.get(
      import.meta.env.VITE_BACKEND_URL + "/quotes/id/" + quoteId,
      { headers: { Authorization: token } }
    );

    // Compare the current state with the original data
    const updatedData = {};
    Object.keys(quoteInfo).forEach((key) => {
      if (quoteInfo[key] !== originalQuoteData.data[key]) {
        updatedData[key] = quoteInfo[key];
      }
    });

    // If there are no changes, inform the user and return
    if (Object.keys(updatedData).length === 0) {
      enqueueSnackbar("No changes to update.", {
        variant: "info",
        persist: false,
      });
      return;
    }

    // If there are changes, send the request to update the quote
    let config = {
      method: "put", // Change method to "put" for update
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_BACKEND_URL + "/quotes/" + quoteId,
      headers: {
        Authorization: token,
      },
      data: updatedData,
    };

    axios
      .request(config)
      .then((response) => {
        enqueueSnackbar("Quote Updated!", {
          variant: "success",
          persist: false,
        });
        setQuoteInfo({
          title: "",
          description: "",
          categories: [],
          thumbnail: "",
          author: "",
          book: "",
        });
      })
      .catch((error) => {
        enqueueSnackbar(error, {
          variant: "error",
          persist: false,
        });
      });
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "40px",
      boxShadow: state.isFocused ? null : null,
      borderColor: state.isFocused ? "#4E6EF5" : provided.borderColor,
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      padding: "0 8px",
    }),
    input: (provided, state) => ({
      ...provided,
      margin: "0px",
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      margin: "0px",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "40px",
    }),
  };

  return (
    <>
      <Modal.Header>Update Quote</Modal.Header>
      <Modal.Body>
        <SnackbarProvider
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        />
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={quoteInfo.title}
            onChange={(e) =>
              setQuoteInfo({ ...quoteInfo, title: e.target.value })
            }
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            value={quoteInfo.description}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={(e) =>
              setQuoteInfo({ ...quoteInfo, description: e.target.value })
            }
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="categories"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Categories
          </label>
          <Select
            id="categories"
            className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
            isMulti
            options={[
              ...existingCategories.map((category) => ({
                value: category,
                label: category,
              })),
              // Add an option to add a new category
              { value: newCategory, label: newCategory },
            ]}
            value={quoteInfo.categories.map((category) => ({
              value: category,
              label: category,
            }))}
            onChange={handleCategoryChange}
            onInputChange={handleNewCategoryChange}
            styles={customStyles}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="author"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Author
          </label>
          <select
            id="author"
            className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={quoteInfo.author}
            onChange={(e) =>
              setQuoteInfo({ ...quoteInfo, author: e.target.value })
            }
          >
            <option disabled>Select an Author</option>
            {authors.map((author) => (
              <option key={author._id} value={author._id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label
            htmlFor="book"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Book
          </label>
          <select
            id="book"
            className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={quoteInfo.book}
            onChange={(e) =>
              setQuoteInfo({ ...quoteInfo, book: e.target.value })
            }
          >
            <option disabled>Select a Book</option>
            {books.map((book) => (
              <option key={book._id} value={book._id}>
                {book.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="thumbnail"
          >
            Upload Thumbnail
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="thumbnail"
            type="file"
            accept="image/*"
            onChange={(e) => {
              console.log(e.target.files[0]);
              setQuoteInfo({
                ...quoteInfo,
                thumbnail: e.target.files[0].name,
              });
            }}
          />
        </div>
        <Button color="blue" className="m-auto w-full" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Body>
    </>
  );
};

export default UpdateQuoteModal;
