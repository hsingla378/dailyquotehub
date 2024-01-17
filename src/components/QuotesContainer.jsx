import { Link } from "react-router-dom";

const QuotesContainer = ({ quotes }) => {
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
    <section>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
        <div className="grid gap-8 mb-6 lg:mb-16 grid-cols-2 md:grid-cols-5 sm:grid-cols-3">
          {quotes.map((quote) => {
            return (
              <Link to={`/quotes/${quote._id}`} key={quote._id}>
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <img
                    className="w-full rounded-lg"
                    src={quote.thumbnail}
                    alt={capitalizeTitle(quote.author.name)}
                  />

                  <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {quote.title}
                    </h5>

                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {capitalizeTitle(quote.author.name)}
                    </p>
                    {/* <a
                    href="#"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Read more
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a> */}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuotesContainer;
