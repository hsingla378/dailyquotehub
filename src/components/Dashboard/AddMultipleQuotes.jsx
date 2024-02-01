import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "flowbite-react";
import { SnackbarProvider } from "notistack";
import AddMultipleQuote from "./AddMultipleQuote";

const AddMultipleQuotes = () => {
  const [currentAuthor, setCurrentAuthor] = useState("");
  const [quoteDescription, setQuoteDescription] = useState("");
  const [mutlipleQuotesLength, setMultipleQuotesLength] = useState(1);
  const [authors, setAuthors] = useState([]);

  const fetchAuthorsFromAPI = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/authors`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchContent = async () => {
      const authors = await fetchAuthorsFromAPI();
      setAuthors(authors);
    };

    fetchContent();
  }, []);

  const addMultipleQuotes = () => {
    setMultipleQuotesLength(mutlipleQuotesLength + 1);
  };

  return (
    <>
      <Modal.Header>Add Multiple Quotes</Modal.Header>
      <Modal.Body>
        <SnackbarProvider
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        />
        <div className="flex justify-between gap-4">
          <div className="mb-6 w-full">
            <select
              id="author"
              className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setCurrentAuthor(e.target.value)}
            >
              <option disabled>Select an Author</option>
              {authors.map((author) => (
                <option key={author._id} value={author._id}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6 w-full">
            <input
              type="text"
              id="description"
              value={quoteDescription}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Description"
              onChange={(e) => setQuoteDescription(e.target.value)}
            />
          </div>
          <Button
            size={"md"}
            color="success"
            className="h-fit w-72"
            onClick={addMultipleQuotes}
          >
            Add Quote
          </Button>
        </div>
        {[...Array(mutlipleQuotesLength)].map((_, index) => (
          <AddMultipleQuote
            key={index}
            author={currentAuthor}
            description={quoteDescription}
          />
        ))}
      </Modal.Body>
    </>
  );
};

export default AddMultipleQuotes;
