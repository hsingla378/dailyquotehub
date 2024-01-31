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
      data = data.map((quote) => quote.author);
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
