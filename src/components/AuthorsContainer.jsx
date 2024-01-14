import React from "react";
import { FaFacebook, FaGithub, FaTwitter } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { Link } from "react-router-dom";

const AuthorsContainer = ({ authors }) => {
  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
        <div className="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {authors.map((author) => {
            return (
              <div
                key={author.name}
                className="text-center text-gray-500 dark:text-gray-400"
              >
                <img
                  className="mx-auto mb-4 w-36 h-36 rounded-full"
                  src={author.image}
                  alt="Bonnie Avatar"
                />
                <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  <a href="#">{author.name}</a>
                </h3>
                <p>{author.description}</p>
                <ul className="flex justify-center mt-4 space-x-4">
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AuthorsContainer;
