import axios from "axios";
import { useEffect, useState } from "react";

const useAuthorData = (authorId) => {
  const [authorData, setAuthorData] = useState([]);

  const getAuthorData = async () => {
    try {
      let response = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/authors/get/" + authorId
      );
      let data = await response.data;
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
