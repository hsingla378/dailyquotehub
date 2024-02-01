import axios from "axios";
import { useEffect, useState } from "react";

const useAllAuthors = () => {
  const [authors, setAuthors] = useState([]);

  const getAuthors = async () => {
    try {
      let response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/quotes"
      );
      let data = await response.data;
      let set = new Set();
      let authors = [];
      data.forEach((quote) => {
        if (!set.has(quote.author._id)) {
          set.add(quote.author._id);
          authors.push(quote.author);
        }
      });
      setAuthors(authors);
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
