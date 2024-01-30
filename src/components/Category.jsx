import { useParams } from "react-router-dom";
import HeadSection from "./HeadSection";
import useCategoryData from "../utils/useCategoryData";
import QuotesContainer from "./QuotesContainer";
import Pagination from "./Pagination";
import { useState } from "react";
import { capitalizeTitle } from "../utils/constants";

const ITEMS_PER_PAGE = 10;

const Category = () => {
  const { category } = useParams();
  let categoryData = useCategoryData(category);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the range of items to display on the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCategories = categoryData.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  console.log("categoryData", categoryData);

  return (
    <div>
      <HeadSection heading={"Quotes on " + capitalizeTitle(category)} />
      {/* Quotes */}
      <QuotesContainer quotes={currentCategories} />
      {/* Pagination */}
      {categoryData.length && (
        <Pagination
          currentPage={currentPage}
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={categoryData.length}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Category;
