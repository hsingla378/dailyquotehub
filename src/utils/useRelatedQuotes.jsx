import React, { useEffect, useState } from "react";
import useCategoryData from "./useCategoryData";

const useRelatedQuotes = (categories) => {
  const [relatedQuotes, setRelatedQuotes] = useState([]);
  let allCategoriesData = [];

  const getCategoryData = async () => {
    try {
      let response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/categories/" + category
      );
      let data = await response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getRelatedQuotes = async () => {
    try {
      for (let category of categories) {
        let categoryData = await getCategoryData(category);
        allCategoriesData = [...allCategoriesData, ...categoryData];
      }
    } catch (error) {
      console.log(error);
    }
  };

  setRelatedQuotes(allCategoriesData);

  useEffect(() => {
    getRelatedQuotes();
    window.scrollTo(0, 0);
  }, []);

  return relatedQuotes;
};

export default useRelatedQuotes;
