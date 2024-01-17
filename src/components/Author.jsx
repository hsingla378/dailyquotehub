import { Link, useParams } from "react-router-dom";
import HeadSection from "./HeadSection";
import Heading from "./Heading";
import QuotesContainer from "./QuotesContainer";
import { quotes } from "../utils/constants";
import useAuthorData from "../utils/useAuthorData";

const Author = () => {
  let { author } = useParams();
  const authorData = useAuthorData(author);

  if (!authorData.length) return <div>Loading...</div>;

  const authorInfo = authorData[0].author;
  console.log("authorInfo", authorInfo);
  console.log("authorData", authorData);

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
    <div>
      <HeadSection
        heading={"Author Spotlight"}
        subheading={"Unveiling the Creative Mind of " + authorInfo.name}
      />
      {/* Author Details */}
      <section className="bg-white dark:bg-gray-900 py-4">
        <div className="flex justify-center flex-col md:grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 sm:grid-cols-12">
          <div className="my-4 lg:mt-0 sm:col-span-6">
            <img
              className="max-w-[90%] m-auto"
              src={authorInfo.avatar}
              alt="Bonnie Avatar"
            />
          </div>
          <div className="mx-auto md:m-[unset] md:mr-auto place-self-center sm:col-span-6 text-center md:text-left ">
            <h2 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              {capitalizeTitle(authorInfo.name)}
            </h2>
            <h3 className="max-w-2xl mb-4 text-xl font-semibold tracking-tight leading-none md:text-xl xl:text-xl dark:text-white">
              {authorInfo.designation}
            </h3>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              {authorInfo.description}
            </p>
          </div>
        </div>
      </section>
      {/* Heading - His/Her Quotes */}
      <Heading middle={"Quotes By"} right={capitalizeTitle(authorInfo.name)} />
      {/* Author Posts */}
      <QuotesContainer quotes={authorData} />
    </div>
  );
};

export default Author;
