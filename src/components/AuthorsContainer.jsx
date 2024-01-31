import { Link } from "react-router-dom";
import { capitalizeTitle } from "../utils/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import Loading from "./Loading";

const AuthorsContainer = ({ authors }) => {
  const generateAuthorLink = (author) => {
    return `/authors/${author.split(" ").join("-").toLowerCase()}`;
  };

  return (
    <section>
      <div className="mt-8 py-4 px-4 mx-auto max-w-screen-xl text-center lg:py-4 lg:px-6">
        <div>
          <Swiper
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            slidesPerView={2}
            spaceBetween={30}
            freeMode={true}
            // pagination={{
            //   clickable: true,
            // }}
            modules={[FreeMode, Pagination, Autoplay, Navigation]}
            className="mySwiper"
            grabCursor={true}
          >
            {authors.length ? (
              authors.map((author) => {
                return (
                  <SwiperSlide key={author.name}>
                    <Link to={generateAuthorLink(author.name)}>
                      <div className="text-center text-gray-500 dark:text-gray-400 h-full">
                        <img
                          className="mx-auto mb-4 rounded-full w-24 h-24 object-cover"
                          src={"../src/assets/images/authors/" + author.avatar}
                          alt={capitalizeTitle(author.name)}
                        />
                        <h3 className="mb-1 text-md font-bold tracking-tight text-gray-900 dark:text-white">
                          {capitalizeTitle(author.name)}
                        </h3>
                        <p className="text-sm">{author.designation}</p>
                      </div>
                    </Link>
                  </SwiperSlide>
                );
              })
            ) : (
              <Loading />
            )}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default AuthorsContainer;
