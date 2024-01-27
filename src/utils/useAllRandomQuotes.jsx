import axios from "axios";
import { useEffect, useState } from "react";

const useAllRandomQuotes = () => {
  const [quotes, setQuotes] = useState([]);

  const getQuotes = async () => {
    try {
      let response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/quotes/random"
      );
      let data = await response.data;
      setQuotes(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuotes();
  }, []);

  return quotes;
};

export default useAllRandomQuotes;
