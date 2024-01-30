import QOTD from "./QOTD";
import AuthorsContainer from "./AuthorsContainer";
import QuotesContainer from "./QuotesContainer";
import Heading from "./Heading";
import CategoriesContainer from "./CategoriesContainer";
import useAllAuthors from "../utils/useAllAuthors";
import useAllCategories from "../utils/useAllCategories";
import Loading from "./Loading";
import ExploreMore from "./ExploreMore";
import useAllRandomQuotes from "../utils/useAllRandomQuotes";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const LandingPage = () => {
  const [quotes, setQuotes] = useState([]);
  const [loadingQuotes, setLoadingQuotes] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [loadingAuthors, setLoadingAuthors] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  const fetchQuotes = async () => {
    setLoadingQuotes(true);
    const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/quotes");
    const data = res.data;
    setQuotes(data);
    setLoadingQuotes(false);
  };

  const fetchAuthors = async () => {
    setLoadingAuthors(true);
    const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/authors");
    const data = res.data;
    setAuthors(data);
    setLoadingAuthors(false);
  };

  const fetchCategories = async () => {
    setLoadingCategories(true);
    const res = await axios.get(
      import.meta.env.VITE_BACKEND_URL + "/categories"
    );
    const data = res.data;
    setCategories(data);
    setLoadingCategories(false);
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  useEffect(() => {
    fetchAuthors();
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  console.log("quotes", quotes);
  console.log("authors", authors);
  console.log("categories", categories);

  if (quotes.length === 0 || authors.length === 0 || categories.length === 0) {
    return <Loading />;
  }

  return (
    <div>
      <QOTD quote={quotes[Math.floor(Math.random() * quotes.length)]} />

      {/* Authors */}
      <AuthorsContainer authors={authors.slice(0, 10)} />

      {/* Heading - Featured Quotes */}
      <div className="flex items-baseline mb-8 mt-16 m-auto justify-between max-w-[90%] xl:max-w-screen-xl">
        <Heading right={"Featured Quotes"} />
        <ExploreMore text={"Quotes"} link={"/quotes"} />
      </div>
      <QuotesContainer quotes={quotes.slice(0, 10)} />

      {/* Categories */}
      <div className="flex items-baseline mb-8 mt-16 m-auto justify-between max-w-[90%] xl:lg:max-w-6xl">
        <Heading right={"Categories"} />
        <ExploreMore text={"Categories"} link={"/categories"} />
      </div>
      <CategoriesContainer categories={categories.slice(0, 20)} />
    </div>
  );
};

export default LandingPage;
