interface PaginationProps {
  totalPosts: number;
  postsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export default function Pagination({
  totalPosts,
  postsPerPage,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  if (totalPages <= 1) return null;

  const baseBtn =
    'min-w-10 h-10 px-3 rounded-lg text-sm font-medium transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-40';

  return (
    <nav
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
      aria-label="Pagination"
    >
      <button
        className={`${baseBtn} border border-white/10 bg-white/5 text-gray-200 hover:bg-white/10`}
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        ‹
      </button>
      {pages.map((page) => (
        <button
          className={`${baseBtn} ${
            page === currentPage
              ? 'bg-linear-to-r from-indigo-500 to-sky-500 text-white shadow-md shadow-indigo-500/30'
              : 'border border-white/10 bg-white/5 text-gray-200 hover:bg-white/10'
          }`}
          key={page}
          onClick={() => setCurrentPage(page)}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}
      <button
        className={`${baseBtn} border border-white/10 bg-white/5 text-gray-200 hover:bg-white/10`}
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        ›
      </button>
    </nav>
  );
}
