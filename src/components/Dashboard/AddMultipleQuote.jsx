import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "flowbite-react";
import Select from "react-select";
import Cookies from "js-cookie";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

const AddMultipleQuote = ({ author, description }) => {
  const [quoteInfo, setQuoteInfo] = useState({
    title: "",
    categories: [],
    thumbnail: "",
    book: "",
  });
  quoteInfo.author = author;
  quoteInfo.description = description;
  const [existingCategories, setExistingCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const token = Cookies.get("token");

  const fetchCategoriesFromAPI = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/categories`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchContent = async () => {
      const categories = await fetchCategoriesFromAPI();
      setExistingCategories(categories);
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

  const handleQuoteImageChange = async (e) => {
    const imageData = new FormData();
    imageData.append("image", e.target.files[0]);

    try {
      enqueueSnackbar("Uploading image...", {
        variant: "info",
        persist: false,
      });

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/upload/quote`,
        imageData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      enqueueSnackbar("Image uploaded!", {
        variant: "success",
        persist: false,
      });
      setQuoteInfo({ ...quoteInfo, thumbnail: response.data.filename });
    } catch (error) {
      console.error("Error uploading image!", error);
      enqueueSnackbar("Error uploading image!", {
        variant: "error",
        persist: false,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      enqueueSnackbar("Kindly login!", { variant: "success", persist: false });
      return;
    }

    if (!quoteInfo.title) {
      enqueueSnackbar("Title is required!", {
        variant: "error",
        persist: false,
      });
      return;
    }

    if (!quoteInfo.categories.length) {
      enqueueSnackbar("Categories are required!", {
        variant: "error",
        persist: false,
      });
      return;
    }

    if (!quoteInfo.author) {
      enqueueSnackbar("Author is required!", {
        variant: "error",
        persist: false,
      });
      return;
    }

    if (!quoteInfo.thumbnail) {
      enqueueSnackbar("Thumbnail is required!", {
        variant: "error",
        persist: false,
      });
      return;
    }

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_BACKEND_URL}/quotes`,
      headers: { Authorization: token },
      data: quoteInfo,
    };

    try {
      const response = await axios.request(config);
      enqueueSnackbar("Quote Added!", { variant: "success", persist: false });
      setQuoteInfo({ title: "", categories: [], thumbnail: "", book: "" });
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Error adding quote!", {
        variant: "error",
        persist: false,
      });
    }
  };

  return (
    <>
      <SnackbarProvider
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
      <div className="flex justify-between">
        <div className="mb-6">
          <input
            type="text"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Title"
            value={quoteInfo.title}
            onChange={(e) =>
              setQuoteInfo({ ...quoteInfo, title: e.target.value })
            }
          />
        </div>
        <div className="mb-6">
          <Select
            id="categories"
            className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
            placeholder="Select Categories"
            isMulti
            options={[
              ...existingCategories.map((category) => ({
                value: category,
                label: category,
              })),
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
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="thumbnail"
            type="file"
            accept="image/*"
            onChange={handleQuoteImageChange}
          />
        </div>
        <Button
          color="blue"
          size={"md"}
          className="h-fit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default AddMultipleQuote;
