import HeadSection from "./HeadSection";
import AuthorsContainer from "./AuthorsContainer";
import { authors } from "../utils/constants";

const Authors = () => {
  
  return (
    <>
      <HeadSection
        heading={"Meet the Minds Behind the Quotes"}
        subheading={
          "Meet the brilliant minds whose words have the power to inspire, comfort, and enlighten."
        }
      />
      <AuthorsContainer authors={authors} />
    </>
  );
};

export default Authors;
