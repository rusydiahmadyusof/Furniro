"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 py-12">
      {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
        const page = i + 1;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-[60px] h-[60px] rounded font-medium text-base transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
              currentPage === page
                ? "bg-primary text-white"
                : "bg-white border border-gray-5 text-black hover:border-primary hover:text-primary"
            }`}
            aria-label={`Go to page ${page}`}
          >
            {page}
          </button>
        );
      })}

      {totalPages > 3 && (
        <>
          {currentPage > 3 && <span className="px-2 text-gray-3">...</span>}
          {currentPage > 3 && currentPage < totalPages - 2 && (
            <button
              onClick={() => onPageChange(currentPage)}
              className="w-[60px] h-[60px] rounded bg-primary text-white font-medium text-base"
            >
              {currentPage}
            </button>
          )}
          {currentPage < totalPages - 2 && <span className="px-2 text-gray-3">...</span>}
          {totalPages > 3 && (
            <button
              onClick={() => onPageChange(totalPages)}
              className={`w-[60px] h-[60px] rounded font-medium text-base transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                currentPage === totalPages
                  ? "bg-primary text-white"
                  : "bg-white border border-gray-5 text-black hover:border-primary hover:text-primary"
              }`}
            >
              {totalPages}
            </button>
          )}
        </>
      )}

      <button
        onClick={handleNext}
        disabled={currentPage >= totalPages}
        className="w-[98px] h-[60px] rounded bg-white border border-gray-5 text-black font-medium text-base hover:border-primary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-5 disabled:hover:text-black"
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

