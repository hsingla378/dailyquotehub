import { useParams } from "react-router-dom";
import HeadSection from "./HeadSection";
import Heading from "./Heading";
import QuotesContainer from "./QuotesContainer";
import useAuthorData from "../utils/useAuthorData";
import { capitalizeTitle } from "../utils/constants";
import Loading from "./Loading";

const Author = () => {
  let { author } = useParams();
  const authorData = useAuthorData(author);

  if (!authorData.length) return <Loading />;

  const authorInfo = authorData[0].author;

  if (!authorData) return <Loading />;

  return (
    <div>
      <HeadSection
        heading={"Author Spotlight"}
        subheading={
          "Unveiling the Creative Mind of " + capitalizeTitle(authorInfo.name)
        }
      />
      {/* Author Details */}
      <section className="bg-white dark:bg-gray-900 py-4">
        <div className="flex justify-center flex-col sm:flex-row mx-auto max-w-screen-xl px-4 lg:px-6 py-8 lg:gap-8 xl:gap-0 lg:py-8 sm:grid-cols-12">
          <div className="my-4 lg:mt-0 sm:col-span-6 ">
            <img
              className="max-w-[90%] m-auto rounded md:mr-[3rem] w-64"
              src={authorInfo.avatar}
              alt="Bonnie Avatar"
            />
          </div>
          <div className="mx-auto md:m-[unset] md:mr-auto place-self-top pt-6 sm:col-span-6 text-center md:text-left ">
            <h2 className="max-w-2xl mb-4 text-2xl font-extrabold tracking-tight leading-none md:text-3xl xl:text-4xl dark:text-white">
              {capitalizeTitle(authorInfo.name)}
            </h2>
            <h3 className="max-w-2xl mb-4 text-sm font-semibold tracking-tight leading-none md:text-base xl:text-lg dark:text-white">
              {authorInfo.designation}
            </h3>
            <p className="max-w-2xl mb-6 text-sm font-light text-gray-500 lg:mb-8 md:text-base lg:text-lg dark:text-gray-400">
              {authorInfo.description}
            </p>
          </div>
        </div>
      </section>
      {/* Heading - His/Her Quotes */}
      <div className="flex items-baseline mb-8 mt-8 m-auto justify-between max-w-[90%] xl:lg:max-w-6xl">
        <Heading
          middle={"Quotes By"}
          right={capitalizeTitle(authorInfo.name)}
        />
      </div>
      {/* Author Posts */}
      <QuotesContainer quotes={authorData} />
    </div>
  );
};

export default Author;
