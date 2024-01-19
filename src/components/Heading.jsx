const Heading = ({ left, middle, right }) => {
  return (
    <section className="bg-white dark:bg-gray-900 flex flex-wrap gap-4">
      <h1 className="text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">
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
