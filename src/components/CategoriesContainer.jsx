import { Link } from "react-router-dom";
import { capitalizeTitle } from "../utils/constants";
import Loading from "./Loading";

const CategoriesContainer = ({ categories }) => {
  return (
    <>
      <section className="bg-white dark:bg-gray-900 py-4 px-4 mx-auto max-w-screen-xl lg:py-8 lg:px-6 flex flex-wrap gap-4 justify-center">
        {categories.length ? (
          categories.map((category) => (
            <Link to={"/categories/" + category} key={category}>
              <button
                type="button"
                className="text-black border-gray-300 border-2 hover:shadow-xl focus:ring-4 focus:ring-blue-300 font-normal rounded-lg text-xs sm:text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
              >
                {capitalizeTitle(category)}
              </button>
            </Link>
          ))
        ) : (
          <Loading />
        )}
      </section>
    </>
  );
};

export default CategoriesContainer;
