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

const PLACEHOLDER = 'https://placehold.co/300x445?text=No+Image';

export default function Card({ movie }: CardProps) {
  const [imgSrc, setImgSrc] = useState(
    movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : PLACEHOLDER
  );

  return (
    <div className="flex flex-col gap-4.5 items-center justify-center max-w-90 bg-gray-600/30 border-none rounded-4xl">
      <div className="pt-5">
        <img
          className="md:max-w-110 lg:max-w-80 border rounded-2xl cursor-pointer transition-all duration-205 hover:scale-105"
          src={imgSrc}
          onError={() => setImgSrc(PLACEHOLDER)}
          alt={movie.Title}
        />
      </div>
      <div className="text-white text-3xl flex flex-col gap-1.5 justify-center pb-5 text-pretty px-4">
        <p>Title: {movie.Title}</p>
        <p>Year: {movie.Year}</p>
        <p>Type: {movie.Type}</p>
      </div>
    </div>
  );
}
