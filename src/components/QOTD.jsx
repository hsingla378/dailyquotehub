import { Link } from "react-router-dom";
import PropTypes from 'prop-types';


const QOTD = ({ quote }) => {
  const generateAuthorLink = (author) => {
    return `/authors/${author.split(" ").join("-").toLowerCase()}`;
  };

  const capitalizeTitle = function (title) {
    return title
      .split(" ")
      .map((item) =>
        item.length <= 2
          ? item.toLowerCase()
          : `${item[0].toUpperCase()}${item.slice(1).toLowerCase()}`
      )
      .join(" ");
  };

  return (
    <section className="p-10 bg-center bg-no-repeat bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-gray-700 bg-blend-multiply">
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
          <p className="text-2xl italic font-medium text-gray-900 dark:text-white">
            {quote.description}
          </p>
        </blockquote>
        <Link to={generateAuthorLink(quote.author.name)}>
          <figcaption className="flex items-center justify-center mt-6 space-x-3 rtl:space-x-reverse">
            <img
              className="w-6 h-6 rounded-full"
              src={quote.author.avatar}
              alt="profile picture"
            />

            <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500 dark:divide-gray-700">
              <cite className="pe-3 font-medium text-gray-900 dark:text-white">
                {capitalizeTitle(quote.author.name)}
              </cite>
              {/* <cite className="ps-3 text-sm text-gray-500 dark:text-gray-400">
              CEO at Google
            </cite> */}
            </div>
          </figcaption>
        </Link>
      </figure>
    </section>
  );
};

export default QOTD;
