import { useState, useEffect } from 'react';
import Card from '../components/Card/Card';
import Search from '../components/Search/Search';
import Pagination from '../components/Pagination/Pagination';

export default function Cards() {
  const [search, setSearch] = useState('spiderman');
  const [film, setFilm] = useState([]);
  const [loader, setLoader] = useState(true);

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

        const apiUrl = `https://www.omdbapi.com/?s=${query}&apikey=6df7d7f`;

        const response = await fetch(apiUrl);

        if (response.ok) {
          const data = await response.json();
          setFilm(data.Response === 'True' ? data.Search : []);
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
    fetchMovies('spiderman');
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
