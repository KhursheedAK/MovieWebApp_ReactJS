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
    <div className="flex items-center justify-center gap-10">
      <input
        type="text"
        placeholder="Search Movie"
        className="bg-blue-200 w-100 p-3 text-2xl border-none rounded-2xl my-10"
        value={search}
        onChange={handleSearch}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSearchClick();
          }
        }}
      />
      <button
        className="bg-amber-100 p-4 rounded-2xl w-50 cursor-pointer transition-all ease-in duration-205 hover:bg-amber-200 active:bg-amber-300"
        onClick={onSearchClick}
      >
        Search
      </button>
    </div>
  );
}
