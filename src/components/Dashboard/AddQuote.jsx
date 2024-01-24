// MultiStepForm.jsx

import axios from "axios";
import { Button } from "flowbite-react";
import Cookies from "js-cookie";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { useState, useEffect } from "react";

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

const AddQuote = () => {
  const [step, setStep] = useState(1);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [quoteDetails, setQuoteDetails] = useState({
    title: "",
    description: "",
    thumbnail: "",
    categories: [],
    author: {
      name: "",
      designation: "",
      description: "",
      avatar: "",
    },
    book: {
      name: "",
      image: "",
      amazonLink: "",
    },
  });
  const [existingCategories, setExistingCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const [existingAuthors, setExistingAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  useEffect(() => {
    // Fetch existing categories from the API when the component mounts
    const fetchCategories = async () => {
      const categories = await fetchCategoriesFromAPI();
      setExistingCategories(categories);
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (category) => {
    // Toggle the selected/unselected state of the category
    setQuoteDetails((prevDetails) => {
      const existingCategories = prevDetails.categories.includes(category)
        ? prevDetails.categories.filter((cat) => cat !== category)
        : [...prevDetails.categories, category];

      return {
        ...prevDetails,
        categories: existingCategories,
      };
    });
  };

  const handleNewCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleAddNewCategory = () => {
    // Add the new category to the list of categories
    if (newCategory.trim() !== "") {
      setQuoteDetails((prevDetails) => ({
        ...prevDetails,
        categories: [...prevDetails.categories, newCategory.trim()],
      }));
      setNewCategory("");
    }
  };

  // Add this function to handle removing a category
  const handleRemoveCategory = (index) => {
    setQuoteDetails((prevDetails) => {
      const updatedCategories = [...prevDetails.categories];
      updatedCategories.splice(index, 1);

      return {
        ...prevDetails,
        categories: updatedCategories,
      };
    });
  };

  useEffect(() => {
    // Fetch existing authors from the API when the component mounts
    const fetchAuthors = async () => {
      const authors = await fetchAuthorsFromAPI();
      setExistingAuthors(authors);
    };

    fetchAuthors();
  }, []);

  const handleAuthorChange = (authorName) => {
    // If the selected option is "other," enable new author input
    setQuoteDetails((prevDetails) => ({
      ...prevDetails,
      author: {
        name: "",
        designation: "",
        description: "",
        avatar: "",
      },
    }));
    if (authorName === "other") {
      setSelectedAuthor("other");
    } else {
      // Set the selected existing author
      const author = existingAuthors.find(
        (a) => a.name.toLowerCase() === authorName.toLowerCase()
      );
      setQuoteDetails((prevDetails) => ({
        ...prevDetails,
        author,
      }));
    }
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_BACKEND_URL + "/quotes",
      headers: {
        Authorization:
          Cookies.get("token") !== null ? `Bearer ${Cookies.get("token")}` : "",
        "Content-Type": "application/json",
      },
      data: quoteDetails,
    };

    try {
      // Implement your logic to submit the quote details to the backend API
      await axios.request(config);

      // Reset form and show success message
      setQuoteDetails({
        title: "",
        description: "",
        thumbnail: "",
        categories: [],
        author: {
          name: "",
          designation: "",
          description: "",
          avatar: "",
        },
        book: {
          name: "",
          image: "",
          amazonLink: "",
        },
      });
      setSelectedAuthor(null);
      setStep(1);
      enqueueSnackbar("Quote details submitted successfully", {
        variant: "success",
        persist: false,
      });
    } catch (error) {
      // Handle fetch or other errors
      enqueueSnackbar(error, {
        variant: "error",
        persist: false,
      });
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-8 bg-white rounded shadow">
      <SnackbarProvider
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
      {step === 1 && (
        <div>
          <h1 className="text-2xl font-bold mb-4">General Quote Details</h1>

          {/* Title Input */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-600"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={quoteDetails.title}
              onChange={(e) =>
                setQuoteDetails((prevDetails) => ({
                  ...prevDetails,
                  title: e.target.value,
                }))
              }
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          {/* Description Textarea */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={quoteDetails.description}
              onChange={(e) =>
                setQuoteDetails((prevDetails) => ({
                  ...prevDetails,
                  description: e.target.value,
                }))
              }
              rows="4"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            ></textarea>
          </div>

          {/* Thumbnail Upload */}
          <div className="mb-4">
            <label
              htmlFor="thumbnail"
              className="block text-sm font-medium text-gray-600"
            >
              Thumbnail
            </label>
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              accept="image/*"
              onChange={(e) => {
                const data = new FormData();
                data.append("file", e.target.files[0]);
                data.append(
                  "upload_preset",
                  import.meta.env.VITE_UPLOAD_PRESET
                );
                data.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);
                setUploadingImage(true);
                enqueueSnackbar("Uploading Thumbnail", {
                  variant: "warning",
                  persist: false,
                });
                fetch(import.meta.env.VITE_CLOUDINARY_URL, {
                  method: "post",
                  body: data,
                })
                  .then((res) => res.json())
                  .then((data) => {
                    setQuoteDetails((prevDetails) => ({
                      ...prevDetails,
                      thumbnail: data.url,
                    }));
                    setUploadingImage(false);
                    enqueueSnackbar("Thumbnail Uploaded!", {
                      variant: "success",
                      persist: false,
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                    setUploadingImage(false);
                    enqueueSnackbar(err, {
                      variant: "error",
                      persist: false,
                    });
                  });
              }}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          {/* Next Button */}
          {/* <button
            onClick={handleNext}
            className="btn"
          >
            Next
          </button> */}
          <Button
            size="sm"
            onClick={handleNext}
            isProcessing={uploadingImage}
            disabled={
              quoteDetails.title.trim() === "" ||
              quoteDetails.description.trim() === "" ||
              quoteDetails.thumbnail.trim() === ""
                ? true
                : false
            }
          >
            Next
          </Button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h1 className="text-2xl font-bold mb-4">Categories</h1>

          {/* Existing Categories */}
          <label
            htmlFor="categories"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-4"
          >
            Select Categories
          </label>
          <select
            id="categories"
            className="bg-gray-50 border my-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option selected disabled value={""}>
              Choose a category
            </option>
            {existingCategories.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>

          {/* New Category Input */}
          <div className="mt-4">
            <label
              htmlFor="newCategory"
              className="block text-sm font-medium text-gray-600"
            >
              Add New Category
            </label>
            <div className="flex">
              <input
                type="text"
                id="newCategory"
                value={newCategory}
                onChange={handleNewCategoryChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
              <button onClick={handleAddNewCategory} className="ml-2 btn">
                Add
              </button>
            </div>
          </div>

          {/* Selected Categories */}
          {quoteDetails.categories.length > 0 && (
            <div className="my-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-4">
                Selected Categories
              </label>

              {quoteDetails.categories.map((category, index) => (
                <span
                  type="button"
                  key={category}
                  className="relative text-black border-gray-300 border-2 hover:shadow-xl focus:ring-4 focus:ring-blue-300 font-normal rounded-lg text-xs sm:text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                >
                  {category}
                  <button
                    type="button"
                    className="absolute top-0 right-0 p-1 text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveCategory(index)}
                  >
                    &#10006;
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-4 flex justify-between">
            <button onClick={handlePrev} className="btn">
              Back
            </button>
            <Button
              size="sm"
              onClick={handleNext}
              isProcessing={uploadingImage}
              disabled={quoteDetails.categories.length === 0 ? true : false}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h1 className="text-2xl font-bold mb-4">Author Details</h1>

          {/* Dropdown for Existing Authors */}

          <div className="mb-4">
            <label
              htmlFor="existingAuthor"
              className="block text-sm font-medium text-gray-600"
            >
              Select Existing Author
            </label>
            <select
              id="existingAuthor"
              name="existingAuthor"
              // value={selectedAuthor ? selectedAuthor.value : ""}
              onChange={(e) => handleAuthorChange(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            >
              <option selected value="">
                Select an existing author
              </option>
              {existingAuthors.map((author) => (
                <option key={author.name} value={author.name}>
                  {author.name}
                </option>
              ))}
              <option value="other">Other (Create New Author)</option>
            </select>
          </div>

          {/* Conditional Rendering for New Author Form */}
          {selectedAuthor === "other" && (
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">
                Create a New Author
              </h2>

              {/* New Author Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="newAuthorName"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="newAuthorName"
                    name="name"
                    value={quoteDetails.author.name}
                    onChange={(e) =>
                      setQuoteDetails((prevDetails) => ({
                        ...prevDetails,
                        author: {
                          ...prevDetails.author,
                          name: e.target.value,
                        },
                      }))
                    }
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
                <div>
                  <label
                    htmlFor="newAuthorDesignation"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Designation
                  </label>
                  <input
                    type="text"
                    id="newAuthorDesignation"
                    name="designation"
                    value={quoteDetails.author.designation}
                    onChange={(e) =>
                      setQuoteDetails((prevDetails) => ({
                        ...prevDetails,
                        author: {
                          ...prevDetails.author,
                          designation: e.target.value,
                        },
                      }))
                    }
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="newAuthorDescription"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Description
                  </label>
                  <textarea
                    id="newAuthorDescription"
                    name="description"
                    value={quoteDetails.author.description}
                    onChange={(e) =>
                      setQuoteDetails((prevDetails) => ({
                        ...prevDetails,
                        author: {
                          ...prevDetails.author,
                          description: e.target.value,
                        },
                      }))
                    }
                    rows="4"
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  ></textarea>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="newAuthorAvatar"
                    className="block text-sm font-medium text-gray-600"
                  >
                    Avatar (Image Upload)
                  </label>
                  <input
                    type="file"
                    id="newAuthorAvatar"
                    name="avatar"
                    accept="image/*"
                    onChange={(e) => {
                      const data = new FormData();
                      data.append("file", e.target.files[0]);
                      data.append(
                        "upload_preset",
                        import.meta.env.VITE_UPLOAD_PRESET
                      );
                      data.append(
                        "cloud_name",
                        import.meta.env.VITE_CLOUD_NAME
                      );

                      setUploadingImage(true);
                      enqueueSnackbar("Uploading Image", {
                        variant: "warning",
                        persist: false,
                      });
                      fetch(import.meta.env.VITE_CLOUDINARY_URL, {
                        method: "post",
                        body: data,
                      })
                        .then((res) => res.json())
                        .then((data) => {
                          setQuoteDetails((prevDetails) => ({
                            ...prevDetails,
                            author: {
                              ...prevDetails.author,
                              avatar: data.url,
                            },
                          }));
                          setUploadingImage(false);
                          enqueueSnackbar("Image Uploaded", {
                            variant: "success",
                            persist: false,
                          });
                        })
                        .catch((err) => {
                          console.log(err);
                          setUploadingImage(false);
                          enqueueSnackbar(err, {
                            variant: "error",
                            persist: false,
                          });
                        });
                    }}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-4 flex justify-between">
            <button onClick={handlePrev} className="btn">
              Back
            </button>
            <Button
              size="sm"
              onClick={handleNext}
              isProcessing={uploadingImage}
              disabled={
                !quoteDetails.author.name.trim() ||
                !quoteDetails.author.designation ||
                !quoteDetails.author.description ||
                !quoteDetails.author.avatar
                  ? true
                  : false
              }
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h1 className="text-2xl font-bold mb-4">Book Details</h1>

          {/* Book Name Input */}
          <div className="mb-4">
            <label
              htmlFor="bookName"
              className="block text-sm font-medium text-gray-600"
            >
              Book Name
            </label>
            <input
              type="text"
              id="bookName"
              name="bookName"
              value={quoteDetails.book.name}
              onChange={(e) =>
                setQuoteDetails((prevDetails) => ({
                  ...prevDetails,
                  book: { ...prevDetails.book, name: e.target.value },
                }))
              }
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          {/* Thumbnail Upload */}
          <div className="mb-4">
            <label
              htmlFor="thumbnail"
              className="block text-sm font-medium text-gray-600"
            >
              Thumbnail (Book Image)
            </label>
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              accept="image/*"
              onChange={(e) => {
                const data = new FormData();
                data.append("file", e.target.files[0]);
                data.append(
                  "upload_preset",
                  import.meta.env.VITE_UPLOAD_PRESET
                );
                data.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

                setUploadingImage(true);
                enqueueSnackbar("Uploading Image", {
                  variant: "warning",
                  persist: false,
                });
                fetch(import.meta.env.VITE_CLOUDINARY_URL, {
                  method: "post",
                  body: data,
                })
                  .then((res) => res.json())
                  .then((data) => {
                    setQuoteDetails((prevDetails) => ({
                      ...prevDetails,
                      book: {
                        ...prevDetails.book,
                        image: data.url,
                      },
                    }));
                    setUploadingImage(false);
                    enqueueSnackbar("Image Uploaded", {
                      variant: "success",
                      persist: false,
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                    setUploadingImage(false);
                    enqueueSnackbar("Uploading Image", {
                      variant: "error",
                      persist: false,
                    });
                  });
              }}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          {/* Amazon Link Input */}
          <div className="mb-4">
            <label
              htmlFor="amazonLink"
              className="block text-sm font-medium text-gray-600"
            >
              Amazon Link
            </label>
            <input
              type="text"
              id="amazonLink"
              name="amazonLink"
              value={quoteDetails.book.amazonLink}
              onChange={(e) =>
                setQuoteDetails((prevDetails) => ({
                  ...prevDetails,
                  book: { ...prevDetails.book, amazonLink: e.target.value },
                }))
              }
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          {/* Navigation Buttons */}
          <div className="mt-4 flex justify-between">
            <button onClick={handlePrev} className="btn">
              Back
            </button>
            <Button
              onClick={handleSubmit}
              className="btn"
              disabled={
                !quoteDetails.book.name.trim() ||
                !quoteDetails.book.image ||
                !quoteDetails.book.amazonLink
                  ? true
                  : false
              }
            >
              Submit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddQuote;
