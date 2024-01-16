import axios from "axios";
import React, { useEffect, useState } from "react";

const useAllCategories = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      let response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/categories"
      );
      let data = await response.data;
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
};

export default useAllCategories;
