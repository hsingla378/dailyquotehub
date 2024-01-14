import HeadSection from "./HeadSection";
import { quotes } from "../utils/constants";
import QuotesContainer from "./QuotesContainer";
import Pagination from "./Pagination";
import { useState } from "react";

const ITEMS_PER_PAGE = 10;

const Quotes = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the range of items to display on the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentQuotes = quotes.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <HeadSection
        heading={"Journey Through Quotes"}
        subheading={
          "Embark on a Journey of Enlightenment with Our Handpicked Quotes"
        }
      />
      <QuotesContainer quotes={currentQuotes} />
      <Pagination
        currentPage={currentPage}
        itemsPerPage={ITEMS_PER_PAGE}
        totalItems={quotes.length}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Quotes;
