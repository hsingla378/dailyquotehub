import QuotesContainer from "./QuotesContainer";
import Pagination from "./Pagination";
import { useState } from "react";
import useAllQuotes from "../utils/useAllQuotes";
import Loading from "./Loading";

const ITEMS_PER_PAGE = 10;

const Quotes = () => {
  const quotes = useAllQuotes();
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the range of items to display on the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentQuotes = quotes.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (!quotes.length) return <Loading />;

  return (
    <>
      {quotes.length && <QuotesContainer quotes={currentQuotes} />}
      {quotes.length && (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={quotes.length}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default Quotes;
