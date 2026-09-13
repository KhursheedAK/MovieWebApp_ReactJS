import { useState } from 'react';

interface MovieData {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
  Type: string;
}

interface CardProps {
  movie: MovieData;
}

function NoPoster({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center w-60 h-88 bg-gray-800 border border-gray-600 rounded-2xl gap-3">
      <p className="text-6xl">🎬</p>
      <p className="text-gray-400 text-sm text-center px-4 leading-snug">{title}</p>
      <p className="text-gray-600 text-xs">No Poster Available</p>
    </div>
  );
}

export default function Card({ movie }: CardProps) {
  const [imgFailed, setImgFailed] = useState(
    !movie.Poster || movie.Poster === 'N/A'
  );

  return (
    <div className="flex flex-col gap-4.5 items-center justify-center max-w-90 bg-gray-600/30 border-none rounded-4xl">
      <div className="pt-5">
        {imgFailed ? (
          <NoPoster title={movie.Title} />
        ) : (
          <img
            className="md:max-w-110 lg:max-w-80 border rounded-2xl cursor-pointer transition-all duration-205 hover:scale-105"
            src={movie.Poster}
            onError={() => setImgFailed(true)}
            alt={movie.Title}
          />
        )}
      </div>
      <div className="text-white text-3xl flex flex-col gap-1.5 justify-center pb-5 text-pretty px-4">
        <p>Title: {movie.Title}</p>
        <p>Year: {movie.Year}</p>
        <p>Type: {movie.Type}</p>
      </div>
    </div>
  );
}
