interface SearchProps {
  search: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchClick: () => void;
}

export default function Search({
  search,
  handleSearch,
  onSearchClick,
}: SearchProps) {
  return (
    <form
      className="flex w-full max-w-xl flex-col gap-3 sm:flex-row"
      onSubmit={(e) => {
        e.preventDefault();
        onSearchClick();
      }}
    >
      <div className="relative flex-1">
        <svg
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          placeholder="Search movies, series..."
          aria-label="Search movies"
          className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-base text-white placeholder-gray-400 outline-none backdrop-blur transition focus:border-sky-400/70 focus:bg-white/10 focus:ring-2 focus:ring-sky-400/30"
          value={search}
          onChange={handleSearch}
        />
      </div>
      <button
        type="submit"
        className="cursor-pointer rounded-xl bg-linear-to-r from-indigo-500 to-sky-500 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:from-indigo-400 hover:to-sky-400 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
      >
        Search
      </button>
    </form>
  );
}
