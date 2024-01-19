import HeadSection from "./HeadSection";
import CategoriesContainer from "./CategoriesContainer";
import useAllCategories from "../utils/useAllCategories";
import Pagination from "./Pagination";
import { useState } from "react";
import Loading from "./Loading";

const ITEMS_PER_PAGE = 50;

const Categories = () => {
  let categories = useAllCategories();
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the range of items to display on the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCategories = categories.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <HeadSection
        heading={"Unlock Inspiration Across Different Themes"}
        subheading={
          "Navigate through our curated categories to find the perfect quote that resonates with you."
        }
      />
      {categories.length ? (
        <>
          <CategoriesContainer categories={currentCategories} />
          <Pagination
            currentPage={currentPage}
            itemsPerPage={ITEMS_PER_PAGE}
            totalItems={categories.length}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Categories;
