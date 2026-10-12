import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Clock, Ticket, Play, ArrowUpRight, CalendarDays } from "lucide-react";
import SeatCountModal from "./SeatCountModal";
import TrailerModal from "./TrailerModal";

export default function MovieCard({ movie }) {
  const [isSeatModalOpen, setIsSeatModalOpen] = useState(false);
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);

  const genres = Array.isArray(movie.genre)
    ? movie.genre
    : movie.genre
      ? [movie.genre]
      : [];

  return (
    <>
      <article className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#14141b] transition-all duration-500 hover:-translate-y-2 hover:border-red-500/40 hover:shadow-2xl hover:shadow-red-950/30">
        <Link
          to={`/movie/${movie.id}`}
          aria-label={`View ${movie.title} details`}
          className="relative block aspect-[2/3] overflow-hidden"
        >
          <img
            src={movie.poster}
            alt={movie.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/20 opacity-80 transition-opacity duration-300 group-hover:opacity-95" />

          <div className="absolute left-3 right-3 top-3 flex items-center justify-between gap-2 z-10">
            <span className="rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
              {movie.language || "Movie"}
            </span>

            <span className="inline-flex items-center gap-1 rounded-full border border-yellow-400/20 bg-black/65 px-2.5 py-1.5 text-xs font-bold text-yellow-400 backdrop-blur-md">
              <Star size={13} className="fill-yellow-400" />
              {movie.rating ?? "N/A"}
            </span>
          </div>

          <div className="absolute inset-0 flex items-center justify-center z-10">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault(); 
                setIsTrailerModalOpen(true);
              }}
              aria-label={`Play trailer for ${movie.title}`}
              className="flex h-14 w-14 translate-y-3 items-center justify-center rounded-full border border-white/30 bg-red-600/90 text-white opacity-0 shadow-xl shadow-red-600/30 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:scale-110 hover:bg-red-600 cursor-pointer"
            >
              <Play size={23} className="ml-1 fill-current" />
            </button>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 z-10 pointer-events-none">
            <div className="mb-3 flex flex-wrap gap-2">
              {genres.slice(0, 2).map((genre) => (
                <span
                  key={genre}
                  className="rounded-md border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-medium text-gray-200 backdrop-blur-md"
                >
                  {genre}
                </span>
              ))}
            </div>

            <h3 className="line-clamp-2 text-xl font-extrabold leading-tight text-white transition-colors group-hover:text-red-300 sm:text-2xl">
              {movie.title}
            </h3>

            <div className="mt-3 flex items-center gap-2 text-xs text-gray-300">
              <Clock size={14} className="text-red-400" />
              <span>{movie.duration || "Duration TBA"}</span>
              <span className="text-gray-600">•</span>
              <span>{movie.language || "Language TBA"}</span>
            </div>
          </div>
        </Link>

        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                Ticket price
              </p>
              <p className="mt-1 text-2xl font-black text-white">
                <span className="mr-0.5 text-sm font-semibold text-red-400">
                  ₹
                </span>
                {Number(movie.price ?? 0).toLocaleString("en-IN")}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsSeatModalOpen(true)}
              className="group/button inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-red-950/30 transition-all duration-300 hover:-translate-y-0.5 hover:from-red-500 hover:to-rose-500 hover:shadow-red-600/20 active:translate-y-0 cursor-pointer"
            >
              <Ticket size={16} />
              Book Now
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
              />
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5 text-[11px]">
            <span className="rounded-md border border-red-500/20 bg-red-500/10 px-2 py-0.5 font-semibold text-red-300">
              Screen 1, 2, 3 Available
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-white/[0.08] pt-3 text-xs text-gray-300">
            <span className="flex items-center gap-1.5">
              <CalendarDays size={13} />
              Available for booking
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
          </div>
        </div>
      </article>
      <SeatCountModal
        movie={movie}
        isOpen={isSeatModalOpen}
        onClose={() => setIsSeatModalOpen(false)}
      />

      <TrailerModal
        movie={movie}
        isOpen={isTrailerModalOpen}
        onClose={() => setIsTrailerModalOpen(false)}
      />
    </>
  );
}