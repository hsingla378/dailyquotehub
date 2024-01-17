import { FaFacebook, FaGithub, FaTwitter } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { Link } from "react-router-dom";

const AuthorsContainer = ({ authors }) => {
  const generateAuthorLink = (author) => {
    return `/authors/${author.split(" ").join("-").toLowerCase()}`;
  };

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
    <section>
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
        <div className="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {authors.map((author) => {
            return (
              <Link to={generateAuthorLink(author.name)} key={author.name}>
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <img
                    className="mx-auto mb-4 rounded-full w-24 h-24 object-cover"
                    src={author.avatar}
                    alt="Bonnie Avatar"
                  />
                  <h3 className="mb-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {capitalizeTitle(author.name)}
                  </h3>
                  <p>{author.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AuthorsContainer;
