
import HeadSection from "./HeadSection";

import { categories } from "../utils/constants";
import CategoriesContainer from "./CategoriesContainer";

const Categories = () => {
  return (
    <div>
      <HeadSection
        heading={"Unlock Inspiration Across Different Themes"}
        subheading={
          "Navigate through our curated categories to find the perfect quote that resonates with you."
        }
      />
      <CategoriesContainer categories={categories} />
    </div>
  );
};

export default Categories;
