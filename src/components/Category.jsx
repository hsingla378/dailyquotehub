import { Link, useParams } from "react-router-dom";
import HeadSection from "./HeadSection";
import { quotes } from "../utils/constants";
import Heading from "./Heading";
import useCategoryData from "../utils/useCategoryData";
import QuotesContainer from "./QuotesContainer";
import Pagination from "./Pagination";
import { useState } from "react";

const ITEMS_PER_PAGE = 10;

const Category = () => {
  const { category } = useParams();
  let categoryData = useCategoryData(category);
  console.log("categoryData", categoryData);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the range of items to display on the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCategories = categoryData.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const capitalizeTitle = function (title) {
    return title
      .split(" ")
      .map((item) =>
        item.length <= 2
          ? item.toLowerCase()
          : `${item[0].toUpperCase()}${item.slice(1).toLowerCase()}`
      )
      .join(" ");
  };

  return (
    <div>
      <HeadSection heading={"Quotes on " + capitalizeTitle(category)} />
      {/* <Heading /> */}
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
