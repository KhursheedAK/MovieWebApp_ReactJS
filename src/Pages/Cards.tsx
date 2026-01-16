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

  const fetchMovies = async () => {
    if (search !== '') {
      try {
        setLoader(true);

        const response = await fetch(
          `https://imdb.iamidiotareyoutoo.com/search?q=${search}`,
        );

        if (response.ok) {
          const data = await response.json();
          setFilm(data.description);
          setSearch('');
          setLoader(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const loadMovies = async () => {
      await fetchMovies();
    };

    loadMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Search
        search={search}
        onSearchClick={fetchMovies}
        handleSearch={handleSearch}
      />

      {loader ? (
        <h1 className="text-4xl text-white"> LOADING DATA... </h1>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-10 mb-2">
            {currentPost.map((movie) => (
              <Card key={movie['#IMDB_ID']} movie={movie} />
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
