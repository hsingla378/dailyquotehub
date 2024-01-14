import HeadSection from "./HeadSection";
import { authors } from "../utils/constants";
import AuthorsContainer from "./AuthorsContainer";

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
