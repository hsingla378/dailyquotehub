import axios from "axios";
import React, { useEffect, useState } from "react";

const useAllAuthors = () => {
  const [authors, setAuthors] = useState([]);

  const getAuthors = async () => {
    try {
      let response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/authors");
      let data = await response.data;
      setAuthors(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAuthors();
  }, []);

  return authors;
};

export default useAllAuthors;
