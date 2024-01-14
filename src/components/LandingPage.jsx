import QOTD from "./QOTD";
import { authors, categories } from "../utils/constants";
import AuthorsContainer from "./AuthorsContainer";
import QuotesContainer from "./QuotesContainer";
import { quotes } from "../utils/constants";
import Heading from "./Heading";
import CategoriesContainer from "./CategoriesContainer";

const LandingPage = () => {
  return (
    <div>
      <QOTD
        quote={
          "I'm unpredictable, I never know where I'm going until I get there, I'm so random, I'm always growing, learning, changing, I'm never the same person twice. But one thing you can be sure of about me; is I will always do exactly what I want to do."
        }
        author={"C. JoyBell C"}
        image={
          "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/authors/1612358741i/4114218._UY200_CR33,0,200,200_.jpg"
        }
      />
      {/* Authors */}
      <AuthorsContainer authors={authors.slice(0, 5)} />
      {/*  Heading - Featured Quotes */}
      <QuotesContainer quotes={quotes.slice(0, 8)} />
      {/*  Heading - Tag or Cat */}
      <Heading left="Tag" middle={" or "} right={"Cat"} />
      {/* Categories */}
      <CategoriesContainer categories={categories.slice(0, 20)} />
    </div>
  );
};

export default LandingPage;
