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

  // console.log(quotes, authors, categories);

  if (!quotes.length && !authors.length) return <div>Loading...</div>;

  return (
    <div>
      {quotes.length && (
        <QOTD quote={quotes[Math.floor(Math.random() * quotes.length)]} />
      )}
      {/* Authors */}
      {authors.length && <AuthorsContainer authors={authors.slice(0, 10)} />}
      {/*  Heading - Featured Quotes */}
      {quotes.length && <Heading right={"Quotes"} />}
      {quotes.length && <QuotesContainer quotes={quotes.slice(0, 10)} />}
      {/*  Heading - Tag or Cat */}
      {categories.length && <Heading right={"Categories"} />}
      {/* Categories */}
      {categories.length && (
        <CategoriesContainer categories={categories.slice(0, 20)} />
      )}
    </div>
  );
};

export default LandingPage;
