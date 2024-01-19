import { Link } from "react-router-dom";
import { capitalizeTitle } from "../utils/constants";

// Function to generate a random hex color
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const CategoriesContainer = ({ categories }) => {
  return (
    <section className="bg-white dark:bg-gray-900 py-4 px-4 mx-auto max-w-screen-xl lg:py-8 lg:px-6 flex flex-wrap gap-4 justify-center">
      {categories.map((category) => (
        <Link to={"/categories/" + category} key={category}>
          <button
            className={`relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group hover:text-white dark:text-white focus:ring-4 focus:outline-none`}
            style={{
              background: `linear-gradient(to bottom right, ${getRandomColor()}, ${getRandomColor()})`,
            }}
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              {capitalizeTitle(category)}
            </span>
          </button>
        </Link>
      ))}
    </section>
  );
};

export default CategoriesContainer;
