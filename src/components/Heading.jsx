const Heading = ({ left, middle, right }) => {
  return (
    <section className="bg-white dark:bg-gray-900 py-4 px-4 mx-auto max-w-screen-xl lg:py-4 lg:px-6 flex flex-wrap gap-4 justify-center mt-10">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
          {left}
        </span>{" "}
        {middle}{" "}
        <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
          {right}
        </span>
      </h1>
    </section>
  );
};

export default Heading;
