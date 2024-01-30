import { Button, Modal } from "flowbite-react";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import axios from "axios";

const AddQuote = () => {
  const [quoteInfo, setQuoteInfo] = useState({
    title: "",
    description: "",
    categories: [],
    thumbnail: "",
    author: "",
    book: "",
  });
  const token = Cookies.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      enqueueSnackbar("Kindly login!", {
        variant: "success",
        persist: false,
      });
      return;
    }

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_BACKEND_URL + "/quotes",
      headers: {
        Authorization: token,
      },
      data: quoteInfo,
    };

    axios
      .request(config)
      .then((response) => {
        enqueueSnackbar("Quote Added!", {
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

  return (
    <>
      <Modal.Header>Add a Quote</Modal.Header>
      <Modal.Body>
        <SnackbarProvider
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        />
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
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
            Designation
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
        {/* <div className="mb-6">
          <label
            htmlFor="categories"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <input
            type="text"
            id="categories"
            value={quoteInfo.categories}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={(e) =>
              setQuoteInfo({ ...quoteInfo, description: e.target.value })
            }
          />
        </div> */}
        <div className="mb-6">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="thumbnail"
          >
            Upload Avatar
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="thumbnail"
            type="file"
            accept="image/*"
            onChange={(e) => {
              console.log(e.target.files[0]);
              setQuoteInfo({ ...quoteInfo, avatar: e.target.files[0].name });
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

export default AddQuote;
