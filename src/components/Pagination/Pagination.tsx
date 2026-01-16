export default function Pagination({
  totalPosts,
  postsPerPage,
  setCurrentPage,
}) {
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="flex gap-5 items-center justify-center">
      {pages.map((page, index) => {
        return (
          <button
            className="text-black text-3xl px-7 py-4 bg-cyan-200 cursor-pointer transition-all ease-in duration-200 hover:bg-blue-600 active:bg-blue-800 rounded-2xl mt-4"
            key={index}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}
