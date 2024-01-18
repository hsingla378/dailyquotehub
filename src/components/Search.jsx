import React, { useEffect, useState } from "react";
import AuthorsContainer from "./AuthorsContainer";
import QuotesContainer from "./QuotesContainer";
import Heading from "./Heading";
import CategoriesContainer from "./CategoriesContainer";
import useAllQuotes from "../utils/useAllQuotes";
import useAllAuthors from "../utils/useAllAuthors";
import useAllCategories from "../utils/useAllCategories";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import Quotes from "./Quotes";

const Search = () => {
  const quotes = useAllQuotes();
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const location = useLocation();

  const filterAuthors = (text) => {
    const filteredAuthors = quotes
      .map((quote) => {
        return quote.author;
      })
      .filter((author) =>
        author.name.toLowerCase().includes(text.toLowerCase())
      );

    setAuthors(filteredAuthors);
  };

  const filterCategories = (text) => {
    const filteredCategories = quotes
      .flatMap((quote) => quote.categories)
      .filter((category) =>
        category.toLowerCase().includes(text.toLowerCase())
      );

    setCategories(filteredCategories);
  };

  const performSearch = async (text) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/quotes/search?value=${text}`
      );

      const filteredQuotes = response.data.filter((quote) => {
        // Check if the search text is present in author name, quote title, or category name
        const matchAuthor = quote.author.name
          .toLowerCase()
          .includes(text.toLowerCase());
        const matchTitle = quote.title
          .toLowerCase()
          .includes(text.toLowerCase());
        const matchCategory = quote.categories.some((category) =>
          category.toLowerCase().includes(text.toLowerCase())
        );

        return matchAuthor || matchTitle || matchCategory;
      });

      setFilteredQuotes(filteredQuotes);
    } catch (e) {
      if (e.response) {
        if (e.response.status === 404) {
          setFilteredQuotes([]);
        }
        if (e.response.status === 500) {
          enqueueSnackbar(e.response.data.message, { variant: "error" });
          setFilteredQuotes(quotes);
        }
      } else {
        enqueueSnackbar(
          "Could not fetch products, check that the backend is running, reachable and returns valid JSON.",
          { variant: "error" }
        );
      }
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const value = queryParams.get("value");
    setQuery(value);
    performSearch(value);
  }, [location.search]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const value = queryParams.get("value");
    filterAuthors(value);
    filterCategories(value);
  }, [filteredQuotes]);

  //   console.log(filteredQuotes);

  console.log("categories", categories);

  return (
    <div className="my-4">
      {filteredQuotes.length === 0 ? (
        <Heading middle={`No results found for "${query}"`} />
      ) : (
        <Heading middle={`Search results for "${query}"`} />
      )}

      {authors.length > 0 && (
        <>
          <Heading right={"Authors"} />
          <AuthorsContainer authors={authors} />
        </>
      )}
      {filteredQuotes.length > 0 && (
        <>
          <Heading right={"Quotes"} />
          <QuotesContainer quotes={filteredQuotes} />
        </>
      )}
      {categories.length > 0 && (
        <>
          <Heading right={"Categories"} />
          <CategoriesContainer categories={categories} />
        </>
      )}
    </div>
  );
};

export default Search;
