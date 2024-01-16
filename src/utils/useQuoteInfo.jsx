import axios from "axios";
import React, { useEffect, useState } from "react";

const useQuoteInfo = (quoteId) => {
  const [quoteInfo, setQuoteInfo] = useState([]);

  const getQuoteInfo = async () => {
    try {
      let response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/quotes/" + quoteId
      );
      let data = await response.data;
      setQuoteInfo(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuoteInfo();
    window.scrollTo(0, 0);
  }, [quoteId]);

  return quoteInfo;
};

export default useQuoteInfo;
