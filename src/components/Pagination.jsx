const Pagination = ({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <section className="flex justify-center py-4">
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-base">
          <li>
            <button
              onClick={() => handlePageClick(currentPage - 1)}
              className={`flex items-center justify-center px-4 h-10 ${
                currentPage === 1
                  ? "text-gray-500"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }`}
            >
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }).map((_, index) => (
            <li key={index}>
              <button
                onClick={() => handlePageClick(index + 1)}
                className={`flex items-center justify-center px-4 h-10 ${
                  currentPage === index + 1
                    ? "text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                }`}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => handlePageClick(currentPage + 1)}
              className={`flex items-center justify-center px-4 h-10 ${
                currentPage === totalPages
                  ? "text-gray-500"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }`}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Pagination;
