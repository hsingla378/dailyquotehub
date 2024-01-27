import { Link } from "react-router-dom";
import { FaPinterest } from "react-icons/fa";
import useAllQuotes from "../utils/useAllQuotes";
import { useEffect, useState } from "react";
import { capitalizeTitle } from "../utils/constants";

const Footer = () => {
  const quotes = useAllQuotes();
  const [topCategories, setTopCategories] = useState([]);
  const [topAuthors, setTopAuthors] = useState([]);

  useEffect(() => {
    // Calculate top categories
    const categoryCounts = {};
    quotes.forEach((quote) => {
      quote.categories.forEach((category) => {
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      });
    });
    const sortedCategories = Object.keys(categoryCounts).sort(
      (a, b) => categoryCounts[b] - categoryCounts[a]
    );
    setTopCategories(sortedCategories.slice(0, 4));

    // Calculate top authors
    const authorCounts = {};
    quotes.forEach((quote) => {
      const authorName = quote.author.name.toLowerCase();
      authorCounts[authorName] = (authorCounts[authorName] || 0) + 1;
    });
    const sortedAuthors = Object.keys(authorCounts).sort(
      (a, b) => authorCounts[b] - authorCounts[a]
    );
    setTopAuthors(sortedAuthors.slice(0, 4));
  }, [quotes]);

  return (
    <footer className="mt-4">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="lg:flex lg:justify-between lg:max-w-[80%] m-auto">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              {/* <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-8 me-3"
                alt="FlowBite Logo"
              /> */}
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                DailyQuoteHub
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-10 md:gap-20 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Featured Categories
              </h2>
              <ul className="text-gray-500 text-sm dark:text-gray-400 font-medium">
                {topCategories.map((category) => (
                  <li className="mb-4" key={category}>
                    <Link
                      to={`/categories/${category.split(" ").join("-")}`}
                      className="hover:underline"
                    >
                      {capitalizeTitle(category)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Authors
              </h2>
              <ul className="text-gray-500 text-sm dark:text-gray-400 font-medium">
                {topAuthors.map((author) => (
                  <li className="mb-4" key={author.name}>
                    <Link
                      to={`/authors/${author.toLowerCase().split(" ").join("-")}`}
                      className="hover:underline"
                    >
                      {capitalizeTitle(author)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-gray-500 text-sm dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link to={"/privacy-policy"} className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <Link to="/" className="hover:underline">
              DailyQuoteHub
            </Link>
            . All Rights Reserved.
          </span>
          <div className="flex justify-center items-center">
            <Link
              to={"https://pin.it/kGVIZTISA"}
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
              target="_blank"
            >
              <FaPinterest />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
