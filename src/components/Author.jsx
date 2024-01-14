import { Link } from "react-router-dom";
import HeadSection from "./HeadSection";
import { FaFacebook, FaGithub, FaTwitter } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import Heading from "./Heading";
import QuotesContainer from "./QuotesContainer";
import { quotes } from "../utils/constants";

const Author = () => {
  let blogPosts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div>
      <HeadSection />
      {/* Author Details */}
      <section className="bg-white dark:bg-gray-900 py-4">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="my-4 lg:mt-0 lg:col-span-5 lg:flex">
            <img
              className="max-w-[90%] m-auto"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
              alt="Bonnie Avatar"
            />
          </div>
          <div className="ml-auto place-self-center lg:col-span-7">
            <h2 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              Himanshu Singla
            </h2>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              From checkout to global sales tax compliance, companies around the
              world use Flowbite to simplify their payment stack.
            </p>
            <ul className="flex space-x-4 sm:mt-0">
              <li>
                <Link
                  href="/"
                  className="text-gray-500 hover:text-gray-900 dark:hover:text-white w-5 h-5"
                >
                  <FaFacebook />
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-gray-500 hover:text-gray-900 dark:hover:text-white w-5 h-5"
                >
                  <FaTwitter />
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-gray-500 hover:text-gray-900 dark:hover:text-white w-5 h-5"
                >
                  <FaGithub />
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-gray-500 hover:text-gray-900 dark:hover:text-white w-5 h-5"
                >
                  <IoLogoWhatsapp />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* Heading - His/Her Quotes */}
      <Heading middle={"His/Her"} right={"Quotes"} />
      {/* Author Posts */}
      <QuotesContainer quotes={quotes.slice(0, 10)} />
    </div>
  );
};

export default Author;
