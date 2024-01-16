import axios from "axios";
import React, { useEffect, useState } from "react";

const useAllQuotes = () => {
  const [quotes, setQuotes] = useState([]);

  const getQuotes = async () => {
    try {
      let response = await axios.get("http://localhost:3000/quotes");
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

export default useAllQuotes;
