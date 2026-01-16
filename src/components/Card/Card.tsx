interface MovieData {
  '#TITLE': string;
  '#YEAR': number;
  '#IMDB_ID': string;
  '#RANK': number;
  '#IMG_POSTER': string;
}

// 2. Define the Props for the Card component
interface CardProps {
  movie: MovieData;
}

export default function Card({ movie }: CardProps) {
  return (
    <>
      <div className="flex flex-col gap-4.5 items-center justify-center max-w-90 bg-gray-600/30 border-none rounded-4xl">
        <div className="pt-5">
          <img
            className=" md:max-w-110 lg:max-w-80 border rounded-2xl cursor-pointer transition-all duration-205 hover:scale-105"
            src={movie['#IMG_POSTER']}
            alt="Spider-Man"
          ></img>
        </div>
        <div className="text-white text-3xl flex flex-col gap-1.5 justify-center pb-5 text-pretty px-4">
          <p>Title: {movie['#TITLE']}</p>
          <p>Year: {movie['#YEAR']}</p>
          <p>Rank: {movie['#RANK']}</p>
        </div>
      </div>
    </>
  );
}
