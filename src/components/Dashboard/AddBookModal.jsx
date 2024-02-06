import { Button, Modal } from "flowbite-react";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import axios from "axios";

const AddBookModal = () => {
  const [bookInfo, setBookInfo] = useState({
    name: "",
    image: "",
    amazonLink: "",
  });
  const token = Cookies.get("token");

  const handleBookImageChange = async (e) => {
    const imageData = new FormData();
    imageData.append("image", e.target.files[0]);

    try {
      enqueueSnackbar("Uploading image...", {
        variant: "info",
        persist: false,
      });

      let response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/upload/book",
        imageData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      enqueueSnackbar("Image uploaded!", {
        variant: "success",
        persist: false,
      });
      setBookInfo({ ...bookInfo, image: response.data.filename });
    } catch (error) {
      console.log("error", error);
      enqueueSnackbar("Error uploading image!", {
        variant: "error",
        persist: false,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      enqueueSnackbar("Kindly login!", {
        variant: "success",
        persist: false,
      });
      return;
    }

    if (!bookInfo.name) {
      enqueueSnackbar("Name is required!", {
        variant: "error",
        persist: false,
      });
      return;
    }

    // if (!bookInfo.image) {
    //   enqueueSnackbar("Kindly upload an image!", {
    //     variant: "error",
    //     persist: false,
    //   });
    //   return;
    // }

    if (!bookInfo.amazonLink) {
      enqueueSnackbar("Amazon Link is required!", {
        variant: "error",
        persist: false,
      });
      return;
    }

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_BACKEND_URL + "/books",
      headers: {
        Authorization: token,
      },
      data: bookInfo,
    };

    axios
      .request(config)
      .then((response) => {
        enqueueSnackbar("Book Added!", {
          variant: "success",
          persist: false,
        });
        setBookInfo({
          name: "",
          image: "",
          amazonLink: "",
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
      <Modal.Header>Add a Book</Modal.Header>
      <Modal.Body>
        <SnackbarProvider
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        />
        <div className="mb-6">
          <label
            htmlFor="book-name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            id="book-name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={bookInfo.name}
            onChange={(e) => setBookInfo({ ...bookInfo, name: e.target.value })}
          />
        </div>
        <div className="mb-6">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="book-image"
          >
            Upload file
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="book-image"
            type="file"
            accept="image/*"
            onChange={handleBookImageChange}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="book-amazon-link"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Amazon Link
          </label>
          <input
            type="text"
            id="book-amazon-link"
            value={bookInfo.amazonLink}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={(e) =>
              setBookInfo({ ...bookInfo, amazonLink: e.target.value })
            }
          />
        </div>
        <Button color="blue" className="m-auto w-full" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Body>
    </>
  );
};

export default AddBookModal;
