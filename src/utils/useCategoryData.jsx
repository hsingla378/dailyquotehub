import axios from "axios";
import { useEffect, useState } from "react";

const useCategoryData = (category) => {
  const [categoryData, setCategoryData] = useState([]);

  const getCategoryData = async () => {
    try {
      let response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/categories/" + category
      );
      let data = await response.data;
      setCategoryData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategoryData();
    window.scrollTo(0, 0);
  }, [category]);

  return categoryData;
};

export default useCategoryData;
