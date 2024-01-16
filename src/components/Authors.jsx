import HeadSection from "./HeadSection";
import AuthorsContainer from "./AuthorsContainer";
import useAllAuthors from "../utils/useAllAuthors";

const Authors = () => {
  const authors = useAllAuthors();
  return (
    <>
      <HeadSection
        heading={"Meet the Minds Behind the Quotes"}
        subheading={
          "Meet the brilliant minds whose words have the power to inspire, comfort, and enlighten."
        }
      />
      {authors.length && <AuthorsContainer authors={authors} />}
    </>
  );
};

export default Authors;
