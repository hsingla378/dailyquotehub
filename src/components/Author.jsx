import { Link, useParams } from "react-router-dom";
import HeadSection from "./HeadSection";
import { FaFacebook, FaGithub, FaTwitter } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import Heading from "./Heading";
import QuotesContainer from "./QuotesContainer";
import { quotes } from "../utils/constants";

const Author = () => {
  let blogPosts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let { author } = useParams();
  author = author.split("-").join(" ");

  const authorInfo = quotes.filter(
    (quote) => quote.author.name.toLowerCase() == author.toLowerCase()
  )[0].author;
  // console.log("authorInfo", authorInfo);
  const authorQuotes = quotes.filter(
    (quote) => quote.author.name.toLowerCase() == author.toLowerCase()
  );
  // console.log("authorQuotes", authorQuotes);

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
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
              alt="Bonnie Avatar"
            />
          </div>
          <div className="mx-auto md:m-[unset] md:mr-auto place-self-center sm:col-span-6 text-center md:text-left ">
            <h2 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              {authorInfo.name}
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
      <Heading middle={"Quotes By"} right={authorInfo.name} />
      {/* Author Posts */}
      <QuotesContainer quotes={authorQuotes} />
    </div>
  );
};

export default Author;
