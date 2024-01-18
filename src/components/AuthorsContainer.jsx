import { FaFacebook, FaGithub, FaTwitter } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Autoplay, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { useRef } from "react";

const AuthorsContainer = ({ authors }) => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

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
            {authors.map((author) => {
              return (
                <SwiperSlide key={author.name}>
                  <Link to={generateAuthorLink(author.name)}>
                    <div className="text-center text-gray-500 dark:text-gray-400">
                      <img
                        className="mx-auto mb-4 rounded-full w-24 h-24 object-cover"
                        src={author.avatar}
                        alt="Bonnie Avatar"
                      />
                      <h3 className="mb-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {capitalizeTitle(author.name)}
                      </h3>
                      <p>{author.designation}</p>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default AuthorsContainer;
