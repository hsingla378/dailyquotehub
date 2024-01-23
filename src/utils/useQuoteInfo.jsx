import axios from "axios";
import { useEffect, useState } from "react";

const useQuoteInfo = (slug) => {
  const [quoteInfo, setQuoteInfo] = useState([]);

  const getQuoteInfo = async () => {
    try {
      let response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/quotes/" + slug
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
  }, [slug]);

  return quoteInfo;
};

export default useQuoteInfo;
