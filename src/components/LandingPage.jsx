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

const LandingPage = () => {
  const quotes = useAllRandomQuotes();
  const authors = useAllAuthors();
  const categories = useAllCategories();

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
