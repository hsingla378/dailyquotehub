import axios from "axios";
import { useEffect, useState } from "react";

const useAuthorData = (author) => {
  const [authorData, setAuthorData] = useState([]);

  author = author.replaceAll("-", " ");

  const getAuthorData = async () => {
    try {
      let response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/quotes"
      );
      let data = await response.data;
      data = data.filter((quote) => quote.author.name === author);
      setAuthorData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAuthorData();
    window.scrollTo(0, 0);
  }, []);

  return authorData;
};

export default useAuthorData;
