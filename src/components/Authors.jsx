import HeadSection from "./HeadSection";
import AuthorsContainer from "./AuthorsContainer";
import useAllAuthors from "../utils/useAllAuthors";
import Pagination from "./Pagination";
import { useState } from "react";
import { Link } from "react-router-dom";
import { capitalizeTitle } from "../utils/constants";

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

  const generateAuthorLink = (author) => {
    return `/authors/${author.split(" ").join("-").toLowerCase()}`;
  };

  return (
    <>
      <HeadSection
        heading={"Meet the Minds Behind the Quotes"}
        subheading={
          "Meet the brilliant minds whose words have the power to inspire, comfort, and enlighten."
        }
      />
      {authors.length && (
        <section>
          <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
            <div className="grid gap-8 lg:gap-16 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {authors.map((author) => {
                return (
                  <Link to={generateAuthorLink(author.name)} key={author.name}>
                    <div className="text-center text-gray-500 dark:text-gray-400">
                      <img
                        className="mx-auto mb-4 rounded-full w-24 h-24 object-cover"
                        src={author.avatar}
                        alt="Bonnie Avatar"
                      />
                      <h3 className="mb-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {capitalizeTitle(author.name)}
                      </h3>
                      <p>{author.description}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
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
