import React from "react";
import Header from "./Navbar";
import Footer from "./Footer";
import HeadSection from "./HeadSection";

const LandingPage = () => {
  let blogPosts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <>
      <Header />
      <HeadSection />
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
          <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Our Team
            </h2>
            <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
              Explore the whole collection of open-source web components and
              elements built with the utility classNamees from Tailwind
            </p>
          </div>

          <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-4 sm:grid-cols-4">
            {blogPosts.map((post) => {
              return (
                <div
                  key={post}
                  className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                >
                  <a href="#">
                    <img
                      className="w-full rounded-lg"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                      alt="Bonnie Avatar"
                    />
                  </a>
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Noteworthy technology acquisitions 2021
                      </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                    <a
                      href="#"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Read more
                      <svg
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default LandingPage;
