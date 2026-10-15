import { useState, useEffect } from 'react';
import Card, { CardSkeleton, type MovieData } from '../components/Card/Card';
import Search from '../components/Search/Search';
import Pagination from '../components/Pagination/Pagination';

const DEFAULT_SEARCH = 'Batman';
const API_KEY = import.meta.env.VITE_OMDB_KEY;

// Returns the matching movies ([] when none), or throws a user-facing error message
async function searchMovies(query: string): Promise<MovieData[]> {
  if (!API_KEY) {
    throw new Error(
      'OMDb API key is missing. Add VITE_OMDB_KEY to a .env.local file and restart the dev server.',
    );
  }

  const response = await fetch(
    `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${API_KEY}`,
  );
  const data = await response.json().catch(() => null);

  if (response.status === 401) {
    throw new Error(data?.Error ?? 'Invalid OMDb API key.');
  }
  if (!response.ok || !data) {
    throw new Error('Something went wrong while fetching movies. Please try again.');
  }
  if (data.Response === 'True') return data.Search;
  if (data.Error === 'Movie not found!') return [];
  throw new Error(data.Error ?? 'Something went wrong while fetching movies.');
}

export default function Cards() {
  const [search, setSearch] = useState(DEFAULT_SEARCH);
  const [lastQuery, setLastQuery] = useState(DEFAULT_SEARCH);
  const [film, setFilm] = useState<MovieData[]>([]);
  const [loader, setLoader] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState('');

  // Pagination Parts
  const [currentpage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  // Pagination Logic
  const lastPostIndex = currentpage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPost = film.slice(firstPostIndex, lastPostIndex);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const changePage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const applyResults = (movies: MovieData[]) => {
    setFilm(movies);
    setNotFound(movies.length === 0);
    setError('');
    setCurrentPage(1);
  };

  const applyError = (err: unknown) => {
    console.error(err);
    setFilm([]);
    setNotFound(false);
    setError(err instanceof Error ? err.message : 'Something went wrong.');
  };

  const fetchMovies = async (query: string) => {
    query = query.trim();
    if (query !== '') {
      setLoader(true);
      try {
        applyResults(await searchMovies(query));
        setLastQuery(query);
        setSearch('');
      } catch (err) {
        applyError(err);
      } finally {
        setLoader(false);
      }
    }
  };

  useEffect(() => {
    const initialFetch = async () => {
      try {
        applyResults(await searchMovies(DEFAULT_SEARCH));
      } catch (err) {
        applyError(err);
      } finally {
        setLoader(false);
      }
    };
    initialFetch();
  }, []);

  return (
    <>
      <header className="flex flex-col items-center gap-6 pb-8 pt-10 text-center sm:pb-10 sm:pt-14">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            🎬 Movie<span className="bg-linear-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent">Finder</span>
          </h1>
          <p className="mt-2 text-sm text-gray-400 sm:text-base">
            Search millions of movies and series from OMDb
          </p>
        </div>
        <Search
          search={search}
          onSearchClick={() => fetchMovies(search)}
          handleSearch={handleSearch}
        />
      </header>

      <main>
        {loader ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
            {Array.from({ length: postsPerPage }, (_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div
            role="alert"
            className="mx-auto mt-6 flex max-w-md flex-col items-center gap-3 rounded-2xl border border-red-400/30 bg-red-500/10 p-10 text-center backdrop-blur"
          >
            <p className="text-5xl">⚠️</p>
            <h2 className="text-xl font-semibold text-white sm:text-2xl">
              Couldn't load movies
            </h2>
            <p className="text-gray-300">{error}</p>
          </div>
        ) : notFound ? (
          <div className="mx-auto mt-6 flex max-w-md flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur">
            <p className="text-6xl">🍿</p>
            <h2 className="text-xl font-semibold text-white sm:text-2xl">
              No movies found for{' '}
              <span className="text-sky-400">“{lastQuery}”</span>
            </h2>
            <p className="text-gray-400">Try a different title</p>
          </div>
        ) : (
          <>
            <p className="mb-4 text-sm text-gray-400">
              Showing results for{' '}
              <span className="font-medium text-gray-200">“{lastQuery}”</span>
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
              {currentPost.map((movie) => (
                <Card key={movie['imdbID']} movie={movie} />
              ))}
            </div>
            <Pagination
              totalPosts={film.length}
              postsPerPage={postsPerPage}
              currentPage={currentpage}
              setCurrentPage={changePage}
            />
          </>
        )}
      </main>
    </>
  );
}
