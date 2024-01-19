const HeadSection = ({ heading, subheading, image }) => {
  return (
    <section className="bg-center bg-no-repeat bg-cover bg-[url('https://cdn.britannica.com/42/163042-131-6AC5D943/greeting-guests-Agathon-canvas-oil-Platos-Symposium-1869.jpg')] bg-gray-700 bg-blend-multiply">
      <div className="px-4 mx-auto max-w-screen-xl text-center py-8 lg:py-10">
        <h1 className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-white md:text-3xl lg:text-4xl">
          {heading}
        </h1>
        <p className="mb-8 text-base font-normal text-gray-300 lg:text-lg sm:px-16 lg:px-48">
          {subheading}
        </p>
      </div>
    </section>
  );
};

export default HeadSection;
