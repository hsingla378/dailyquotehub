import HeadSection from "./HeadSection";
import AuthorsContainer from "./AuthorsContainer";
import useAllAuthors from "../utils/useAllAuthors";
import Pagination from "./Pagination";
import { useState } from "react";

const ITEMS_PER_PAGE = 10;

const Authors = () => {
  const authors = useAllAuthors();
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the range of items to display on the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentAuthors = authors.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <HeadSection
        heading={"Meet the Minds Behind the Quotes"}
        subheading={
          "Meet the brilliant minds whose words have the power to inspire, comfort, and enlighten."
        }
      />
      {authors.length && <AuthorsContainer authors={currentAuthors} />}
      {authors.length && (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={authors.length}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default Authors;
