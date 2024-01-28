import axios from "axios";
import { Button } from "flowbite-react";
import Cookies from "js-cookie";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import Select from "react-select";

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

const AddQuotePage = () => {
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
  const [addBookDetails, setAddBookDetails] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // Fetch existing categories from the API when the component mounts
    const fetchCategories = async () => {
      const categories = await fetchCategoriesFromAPI();
      setExistingCategories(categories);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // Fetch existing authors from the API when the component mounts
    const fetchAuthors = async () => {
      const authors = await fetchAuthorsFromAPI();
      setExistingAuthors(authors);
    };

    fetchAuthors();
  }, []);

  const handleCategoryChange = (selectedOptions) => {
    const newCategories = selectedOptions.map((option) => option.value);
    setQuoteDetails((prevDetails) => ({
      ...prevDetails,
      categories: newCategories,
    }));
  };

  const handleNewCategoryChange = (newValue) => {
    setNewCategory(newValue);
  };

  const handleAddNewCategory = () => {
    if (newCategory.trim() !== "") {
      setExistingCategories((prevCategories) => [
        ...prevCategories,
        newCategory.trim(),
      ]);
      setQuoteDetails((prevDetails) => ({
        ...prevDetails,
        categories: [...prevDetails.categories, newCategory.trim()],
      }));
      setNewCategory("");
    }
  };

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

  const handleAuthorChange = (authorName) => {
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
      const author = existingAuthors.find(
        (a) => a.name.toLowerCase() === authorName.toLowerCase()
      );
      setQuoteDetails((prevDetails) => ({
        ...prevDetails,
        author,
      }));
    }
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
      await axios.request(config);

      setQuoteDetails({
        ...quoteDetails,
        title: "",
        description: "",
        thumbnail: "",
        categories: [],
        book: {
          name: "",
          image: "",
          amazonLink: "",
        },
      });
      setSelectedAuthor(null);
      setUploadingImage(false);
      enqueueSnackbar("Quote details submitted successfully", {
        variant: "success",
        persist: false,
      });
    } catch (error) {
      enqueueSnackbar(error, {
        variant: "error",
        persist: false,
      });
    }
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
    <div className=" mx-auto my-8 p-8 bg-white rounded shadow">
      <SnackbarProvider
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
      <div className="flex justify-between items-center max-w-7xl m-auto mb-10">
        <h1 className="text-2xl font-bold mb-4">Add Quotes</h1>

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
          </select>
        </div>
      </div>
      <div className="flex justify-evenly items-center">
        {" "}
        {/* Title Input */}
        <div>
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
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600"
          >
            Description
          </label>
          <input
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
          />
        </div>
        {/* New Category Input */}
        <div className="w-1/4">
          <label
            htmlFor="categories"
            className="block text-sm font-medium text-gray-600"
          >
            Categories
          </label>
          <Select
            id="categories"
            isMulti
            options={[
              ...existingCategories.map((category) => ({
                value: category,
                label: category,
              })),
              // Add an option to add a new category
              { value: newCategory, label: newCategory },
            ]}
            value={quoteDetails.categories.map((category) => ({
              value: category,
              label: category,
            }))}
            onChange={handleCategoryChange}
            onInputChange={handleNewCategoryChange}
            styles={customStyles}
          />
        </div>
        {/* Thumbnail Upload */}
        <div>
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
              data.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
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
        {/* Add Button */}
        <div>
          <Button
            onClick={handleSubmit}
            className="btn py-1 font-bold"
            disabled={
              !quoteDetails.title.trim() ||
              !quoteDetails.categories.length ||
              !quoteDetails.thumbnail
            }
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddQuotePage;
