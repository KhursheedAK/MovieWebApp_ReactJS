import { useState, useEffect } from 'react';
import Card from '../components/Card/Card';
import Search from '../components/Search/Search';
import Pagination from '../components/Pagination/Pagination';

export default function Cards() {
  const [search, setSearch] = useState('Batman');
  const [film, setFilm] = useState([]);
  const [loader, setLoader] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Pagination Parts
  const [currentpage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);

  // Pagination Logic
  const lastPostIndex = currentpage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPost = film.slice(firstPostIndex, lastPostIndex);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const fetchMovies = async (query: string) => {
    if (query !== '') {
      try {
        setLoader(true);

        const apiUrl = `https://www.omdbapi.com/?s=${query}&apikey=${import.meta.env.VITE_OMDB_KEY}`;

        const response = await fetch(apiUrl);

        if (response.ok) {
          const data = await response.json();
          const found = data.Response === 'True';
          setFilm(found ? data.Search : []);
          setNotFound(!found);
          setSearch('');
          setLoader(false);
        } else {
          setLoader(false);
        }
      } catch (err) {
        console.log(err);
        setLoader(false);
      }
    }
  };

  useEffect(() => {
    const initialFetch = async () => {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?s=batman&apikey=${import.meta.env.VITE_OMDB_KEY}`,
        );
        if (response.ok) {
          const data = await response.json();
          const found = data.Response === 'True';
          setFilm(found ? data.Search : []);
          setNotFound(!found);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoader(false);
      }
    };
    initialFetch();
  }, []);

  return (
    <>
      <Search
        search={search}
        onSearchClick={() => fetchMovies(search)}
        handleSearch={handleSearch}
      />

      {loader ? (
        <h1 className="text-4xl text-white"> LOADING DATA... </h1>
      ) : notFound ? (
        <div className="flex flex-col items-center justify-center gap-4 mt-10">
          <p className="text-6xl">🎬</p>
          <h2 className="text-3xl text-white">
            No movies found for{' '}
            <span className="text-amber-300">your search</span>
          </h2>
          <p className="text-gray-400 text-xl">Try a different title</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-10 mb-2">
            {currentPost.map((movie) => (
              <Card key={movie['imdbID']} movie={movie} />
            ))}
          </div>
          <Pagination
            totalPosts={film.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </>
  );
}
