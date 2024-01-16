import HeadSection from "./HeadSection";
import CategoriesContainer from "./CategoriesContainer";
import useAllCategories from "../utils/useAllCategories";

const Categories = () => {
  let categories = useAllCategories();
  return (
    <div>
      <HeadSection
        heading={"Unlock Inspiration Across Different Themes"}
        subheading={
          "Navigate through our curated categories to find the perfect quote that resonates with you."
        }
      />
      {categories.length && <CategoriesContainer categories={categories} />}
    </div>
  );
};

export default Categories;
