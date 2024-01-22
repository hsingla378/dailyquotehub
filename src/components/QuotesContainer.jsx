import { Link } from "react-router-dom";
import Loading from "./Loading";

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
    <>
      {quotes.length ? (
        <section>
          <div className="pt-4 px-4 mx-auto max-w-screen-xl lg:pt-8 lg:px-6 ">
            <div className="grid gap-8 mb-6 lg:mb-8 grid-cols-2 lg:grid-cols-5 sm:grid-cols-3 items-stretch justify-center">
              {quotes.map((quote) => {
                return (
                  <Link to={`/quotes/${quote._id}`} key={quote._id}>
                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 shadow-md h-full">
                      <img
                        className="w-full rounded-lg"
                        src={quote.thumbnail}
                        alt={capitalizeTitle(quote.author.name)}
                      />

                      <div className="p-5">
                        <h5 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
                          {quote.title}
                        </h5>

                        <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
                          {capitalizeTitle(quote.author.name)}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default QuotesContainer;
