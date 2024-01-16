import QOTD from "./QOTD";
import AuthorsContainer from "./AuthorsContainer";
import QuotesContainer from "./QuotesContainer";
import Heading from "./Heading";
import CategoriesContainer from "./CategoriesContainer";
import useAllQuotes from "../utils/useAllQuotes";
import useAllAuthors from "../utils/useAllAuthors";
import useAllCategories from "../utils/useAllCategories";

const LandingPage = () => {
  const quotes = useAllQuotes();
  const authors = useAllAuthors();
  const categories = useAllCategories();

  if (!quotes.length && !authors.length) return <div>Loading...</div>;

  return (
    <div>
      <QOTD quote={quotes[Math.floor(Math.random() * quotes.length)]} />
      {/* Authors */}
      <AuthorsContainer authors={authors.slice(0, 5)} />
      {/*  Heading - Featured Quotes */}
      <QuotesContainer quotes={quotes.slice(0, 8)} />
      {/*  Heading - Tag or Cat */}
      <Heading left="Tag" middle={" or "} right={"Cat"} />
      {/* Categories */}
      <CategoriesContainer categories={categories.slice(0, 20)} />
    </div>
  );
};

export default LandingPage;
