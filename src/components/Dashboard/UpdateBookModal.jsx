import { useEffect, useState } from "react";
import { Button, Modal } from "flowbite-react";
import Cookies from "js-cookie";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import axios from "axios";

const UpdateBookModal = ({ bookId }) => {
  const [bookInfo, setBookInfo] = useState({
    name: "",
    amazonLink: "",
    image: "",
  });
  const token = Cookies.get("token");

  useEffect(() => {
    // Fetch author info when the component mounts
    fetchBookInfo();
  }, []);

  const fetchBookInfo = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_BACKEND_URL + "/books/" + bookId,
      headers: {
        Authorization: token,
      },
    };

    axios
      .request(config)
      .then((response) => {
        // Set initial values of the input boxes to fetched data
        setBookInfo({
          name: response.data.name,
          amazonLink: response.data.amazonLink,
          image: response.data.image,
        });
      })
      .catch((error) => {
        enqueueSnackbar(error, {
          variant: "error",
          persist: false,
        });
      });
  };

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

    if (!bookInfo.image) {
      enqueueSnackbar("Kindly upload an image!", {
        variant: "error",
        persist: false,
      });
      return;
    }

    // Fetch the original author data from the server
    const originalBookData = await axios.get(
      import.meta.env.VITE_BACKEND_URL + "/books/" + bookId,
      { headers: { Authorization: token } }
    );

    // Compare the current state with the original data
    const hasChanges = Object.keys(bookInfo).some(
      (key) => bookInfo[key] !== originalBookData.data[key]
    );

    if (!hasChanges) {
      // If there are no changes, inform the user and return
      enqueueSnackbar("No changes to update.", {
        variant: "info",
        persist: false,
      });
      return;
    }

    // If there are changes, send the request to update the author
    let config = {
      method: "put", // Change method to "put" for update
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_BACKEND_URL + "/books/" + bookId,
      headers: {
        Authorization: token,
      },
      data: bookInfo,
    };

    axios
      .request(config)
      .then((response) => {
        enqueueSnackbar("Book Updated!", {
          variant: "success",
          persist: false,
        });
        setBookInfo({
          name: "",
          amazonLink: "",
          image: "",
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
      <Modal.Header>Update Book</Modal.Header>
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
            value={bookInfo.name}
            onChange={(e) => setBookInfo({ ...bookInfo, name: e.target.value })}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="amazon-link"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Designation
          </label>
          <input
            type="text"
            id="amazon-link"
            value={bookInfo.amazonLink}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={(e) =>
              setBookInfo({ ...bookInfo, amazonLink: e.target.value })
            }
          />
        </div>
        <div className="mb-6">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="previous-image"
          >
            Previous Image
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg  bg-gray-50  focus:outline-none"
            id="previous-image"
            type="text"
            value={bookInfo.image}
          />
        </div>
        <div className="mb-6">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="image"
          >
            Upload Image
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none"
            id="image"
            type="file"
            accept="image/*"
            onChange={handleBookImageChange}
          />
        </div>
        <Button color="blue" className="m-auto w-full" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Body>
    </>
  );
};

export default UpdateBookModal;
