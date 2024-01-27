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

  const visiblePages = () => {
    const maxVisiblePages = 10;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= halfVisiblePages) {
      return Array.from({ length: maxVisiblePages }, (_, index) => index + 1);
    }

    if (currentPage >= totalPages - halfVisiblePages) {
      return Array.from(
        { length: maxVisiblePages },
        (_, index) => totalPages - maxVisiblePages + index + 1
      );
    }

    return Array.from(
      { length: maxVisiblePages },
      (_, index) => currentPage - halfVisiblePages + index
    );
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
          {visiblePages().map((page) => (
            <li key={page}>
              <button
                onClick={() => handlePageClick(page)}
                className={`flex items-center justify-center px-4 h-10 ${
                  currentPage === page
                    ? "text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                }`}
              >
                {page}
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
