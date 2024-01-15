import QOTD from "./QOTD";
import AuthorsContainer from "./AuthorsContainer";
import QuotesContainer from "./QuotesContainer";
import { quotes, authors, uniqueCategories } from "../utils/constants";
import Heading from "./Heading";
import CategoriesContainer from "./CategoriesContainer";

const LandingPage = () => {
  // const [randomQuote, setRandomQuote] = useState("");

  // useEffect(() => {
  //   const currentDate = new Date();
  //   const dayOfMonth = currentDate.getDate();
  //   const randomIndex = dayOfMonth % quotes.length;
  //   setRandomQuote(quotes[randomIndex]);
  // }, []);

  return (
    <div>
      <QOTD quote={quotes[Math.floor(Math.random() * quotes.length)]} />
      {/* Authors */}
      <AuthorsContainer authors={authors.slice(0, 5)} />
      {/*  Heading - Featured Quotes */}
      <QuotesContainer quotes={quotes.slice(0, 8)} />
      {/*  Heading - Tag or Cat */}
      <Heading left="Tag" middle={" or "} right={"Cat"} />
      {/* Categories */}
      <CategoriesContainer categories={uniqueCategories.slice(0, 20)} />
    </div>
  );
};

export default LandingPage;
