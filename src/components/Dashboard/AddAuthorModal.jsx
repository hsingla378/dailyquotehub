import { Button, Modal } from "flowbite-react";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import axios from "axios";

const AddAuthorModal = () => {
  const [authorInfo, setAuthorInfo] = useState({
    name: "",
    designation: "",
    description: "",
    avatar: "",
  });
  const token = Cookies.get("token");

  const handleAuthorImageChange = async (e) => {
    console.log(e.target.files[0]);
    const imageData = new FormData();
    imageData.append("image", e.target.files[0]);

    try {
      enqueueSnackbar("Uploading image...", {
        variant: "info",
        persist: false,
      });

      let response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/upload/author",
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
      setAuthorInfo({ ...authorInfo, avatar: response.data.filename });
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

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_BACKEND_URL + "/authors",
      headers: {
        Authorization: token,
      },
      data: authorInfo,
    };

    axios
      .request(config)
      .then((response) => {
        enqueueSnackbar("Author Added!", {
          variant: "success",
          persist: false,
        });
        setAuthorInfo({
          name: "",
          description: "",
          designation: "",
          avatar: "",
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
      <Modal.Header>Add an Author</Modal.Header>
      <Modal.Body>
        <SnackbarProvider
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        />
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={authorInfo.name}
            onChange={(e) =>
              setAuthorInfo({ ...authorInfo, name: e.target.value })
            }
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="designation"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Designation
          </label>
          <input
            type="text"
            id="designation"
            value={authorInfo.designation}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={(e) =>
              setAuthorInfo({ ...authorInfo, designation: e.target.value })
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
            value={authorInfo.description}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={(e) =>
              setAuthorInfo({ ...authorInfo, description: e.target.value })
            }
          />
        </div>
        <div className="mb-6">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="avatar"
          >
            Upload Avatar
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="avatar"
            type="file"
            accept="image/*"
            onChange={handleAuthorImageChange}
          />
        </div>
        <Button color="blue" className="m-auto w-full" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Body>
    </>
  );
};

export default AddAuthorModal;
