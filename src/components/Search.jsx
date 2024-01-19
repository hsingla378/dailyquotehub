import { useEffect, useState } from "react";
import AuthorsContainer from "./AuthorsContainer";
import QuotesContainer from "./QuotesContainer";
import Heading from "./Heading";
import CategoriesContainer from "./CategoriesContainer";
import useAllQuotes from "../utils/useAllQuotes";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Loading from "./Loading";

const Search = () => {
  const quotes = useAllQuotes();
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const location = useLocation();
  const [loading, setLoading] = useState(true);

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
      setLoading(true);
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
    setLoading(false);
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

  return (
    <>
      {" "}
      {loading ? (
        <Loading />
      ) : (
        <div className="my-4">
          {filteredQuotes.length === 0 ? (
            <div className="flex items-baseline mb-8 mt-16 m-auto justify-between max-w-[90%] xl:lg:max-w-6xl">
              <Heading middle={`No results found for "${query}"`} />
            </div>
          ) : (
            <>
              <div className="flex items-baseline mb-8 mt-16 m-auto justify-between max-w-[90%] xl:lg:max-w-6xl">
                <Heading middle={`Search results for "${query}"`} />
              </div>
            </>
          )}

          {authors.length > 0 && (
            <>
              <div className="flex items-baseline mb-8 mt-16 m-auto justify-center max-w-[90%] xl:lg:max-w-6xl">
                <Heading right={"Authors"} />
              </div>
              <AuthorsContainer authors={authors} />
            </>
          )}

          {filteredQuotes.length > 0 && (
            <>
              <div className="flex items-baseline mb-8 mt-16 m-auto justify-center max-w-[90%] xl:lg:max-w-6xl">
                <Heading right={"Quotes"} />
              </div>
              <QuotesContainer quotes={filteredQuotes} />
            </>
          )}

          {categories.length > 0 && (
            <>
              <div className="flex items-baseline mb-8 mt-16 m-auto justify-center max-w-[90%] xl:lg:max-w-6xl">
                <Heading right={"Categories"} />
              </div>
              <CategoriesContainer categories={categories} />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Search;
