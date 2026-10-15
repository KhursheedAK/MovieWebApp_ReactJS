import { useState } from 'react';

export interface MovieData {
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
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-linear-to-br from-slate-800 to-slate-900 p-4">
      <p className="text-5xl">🎬</p>
      <p className="text-center text-sm leading-snug text-gray-300 line-clamp-3">{title}</p>
      <p className="text-xs text-gray-500">No Poster Available</p>
    </div>
  );
}

export default function Card({ movie }: CardProps) {
  const [imgFailed, setImgFailed] = useState(
    !movie.Poster || movie.Poster === 'N/A'
  );

  return (
    <a
      href={`https://www.imdb.com/title/${movie.imdbID}/`}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-800/40 shadow-lg shadow-black/30 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-sky-400/40 hover:shadow-sky-500/20 focus-visible:outline-2 focus-visible:outline-sky-400"
    >
      <div className="relative aspect-2/3 overflow-hidden bg-slate-900">
        {imgFailed ? (
          <NoPoster title={movie.Title} />
        ) : (
          <img
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            src={movie.Poster}
            onError={() => setImgFailed(true)}
            alt={movie.Title}
            loading="lazy"
          />
        )}
        <span className="absolute left-2 top-2 rounded-md bg-slate-900/80 px-2 py-0.5 text-xs font-medium capitalize text-sky-300 backdrop-blur">
          {movie.Type}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3 sm:p-4">
        <h3 className="font-semibold leading-snug text-white line-clamp-2 sm:text-lg">
          {movie.Title}
        </h3>
        <p className="mt-auto text-sm text-gray-400">{movie.Year}</p>
      </div>
    </a>
  );
}

export function CardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <div className="aspect-2/3 bg-white/10" />
      <div className="flex flex-col gap-2 p-3 sm:p-4">
        <div className="h-4 w-3/4 rounded bg-white/10" />
        <div className="h-3 w-1/4 rounded bg-white/10" />
      </div>
    </div>
  );
}
