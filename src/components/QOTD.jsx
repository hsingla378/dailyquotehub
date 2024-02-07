import { Link } from "react-router-dom";
import { capitalizeTitle } from "../utils/constants";

const QOTD = ({ quote }) => {
  const generateAuthorLink = (author) => {
    return `/authors/${author.split(" ").join("-").toLowerCase()}`;
  };

  return (
    <section className="p-10 bg-center bg-no-repeat bg-cover bg-[url('https://cdn.britannica.com/42/163042-131-6AC5D943/greeting-guests-Agathon-canvas-oil-Platos-Symposium-1869.jpg')] bg-gray-700 bg-blend-multiply text-white">
      <figure className="max-w-screen-md mx-auto text-center">
        <svg
          className="w-10 h-10 mx-auto mb-3 text-gray-400 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 14"
        >
          <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
        </svg>
        <blockquote>
          <p className="text-2xl italic font-medium  dark:text-white">
            {quote.title}
          </p>
        </blockquote>
        <Link to={generateAuthorLink(quote.author.name)}>
          <figcaption className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
            <img
              className="w-6 h-6 rounded-full"
              src={"../../backend/images/authors/" + quote.author.avatar}
              alt="profile picture"
            />

            <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500 dark:divide-gray-700">
              <cite className="pe-3 font-medium dark:text-white">
                {capitalizeTitle(quote.author.name)}
              </cite>
            </div>
          </figcaption>
        </Link>
      </figure>
    </section>
  );
};

export default QOTD;
