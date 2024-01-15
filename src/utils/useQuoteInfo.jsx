import { useEffect, useState } from "react";
import { quotes } from "./constants";

const useQuoteInfo = (id) => {
  const [quoteInfo, setQuoteInfo] = useState(null);
  console.log(id);

  useEffect(() => {
    console.log("before useeffect");
    fetchQuoteInfo();
    console.log("after useeffect");
  }, []);

  const fetchQuoteInfo = () => {
    console.log("quotes", quotes);
    const data = quotes.filter((quote) => quote.id === id);
    console.log("data", data);
    setQuoteInfo(data[0]);
    // let data = await fetch(MENU_API + resId);
    // const json = await data.json();
    // setResInfo(json?.data);
  };

  //return restaurant menu
  return quoteInfo;
};

export default useQuoteInfo;
