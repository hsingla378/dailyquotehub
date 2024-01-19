import { Link } from "react-router-dom";
import { FaPinterest } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-4">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="lg:flex lg:justify-between lg:max-w-[80%] m-auto">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              {/* <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-8 me-3"
                alt="FlowBite Logo"
              /> */}
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                DailyQuoteHub
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-10 md:gap-20 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Featured Categories
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4 ">
                  <Link
                    to={"/categories/adventure"}
                    className="hover:underline"
                  >
                    Adventure
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to={"/categories/soul"} className="hover:underline">
                    Soul
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to={"/categories/infinity"} className="hover:underline">
                    Infinity
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to={"/categories/puzzles"} className="hover:underline">
                    Puzzles
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Authors
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link
                    to={"/authors/athena-weaver"}
                    className="hover:underline "
                  >
                    Athena Weaver
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to={"/authors/lyra-melodica"}
                    className="hover:underline "
                  >
                    Lyra Melodica
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to={"/authors/luna-celestia"}
                    className="hover:underline "
                  >
                    Luna Celestia
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to={"/authors/elysia-dreamweaver"}
                    className="hover:underline "
                  >
                    Elysia Dreamweaver
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link to={"/privacy-policy"} className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <Link to="/" className="hover:underline">
              DailyQuoteHub
            </Link>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <Link
              to={"https://pin.it/kGVIZTISA"}
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
              target="_blank"
            >
              <FaPinterest />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
