import HeadSection from "./HeadSection";
import { uniqueCategories } from "../utils/constants";
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
      <CategoriesContainer categories={uniqueCategories} />
    </div>
  );
};

export default Categories;
