import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {ArrowLeft, ArrowRight, Clapperboard, Play,ShieldCheck, TrendingUp,Star,Ticket,} from "lucide-react";
import movies from "../data/movies";
import MovieCard from "../components/MovieCard";
import MovieFilters from "../components/MovieFilters";

const heroSlides = [
  {
    title: "Spider-Man: Brand New Day",
    subtitle: "A new chapter. A new beginning.",
    tag: "TRENDING NOW",
    year: "2026",
    image:
      "https://r2-media.wdwnt.com/2026/04/spider-man-brand-new-day-poster-1.jpg",
  },
  {
    title: "Dune: Part Three",
    subtitle: "Enter a world beyond imagination.",
    tag: "UPCOMING",
    year: "2026",
    image:
      "https://tse1.explicit.bing.net/th/id/OIP.ep5FVqAdiOpxF01dg62qzwHaLK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    title: "Avengers: Doomsday",
    subtitle: "Heroes rise. The universe awaits.",
    tag: "MOST ANTICIPATED",
    year: "2026",
    image:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2e317a1c-f1ce-4a5f-90db-d88cc01db2d0/djyh7h2-d0dd3eb7-ade6-4245-ad14-f843b4cf7df2.png/v1/fill/w_1280,h_2027,q_80,strp/avengers_doomsday_poster_hd_2027_4k_by_mrandrew7w7_djyh7h2-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjAyNyIsInBhdGgiOiJcL2ZcLzJlMzE3YTFjLWYxY2UtNGE1Zi05MGRiLWQ4OGNjMDFkYjJkMFwvZGp5aDdoMi1kMGRkM2ViNy1hZGU2LTQyNDUtYWQxNC1mODQzYjRjZjdkZjIucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.F0tPUEt8UhfhosZKOzP0IZAPNtpsQKR-ZKR0RKiukQQ",
  },
  {
    title: "Messy Murukku 2",
    subtitle: "The fun continues on the big screen.",
    tag: "TAMIL MOVIE",
    year: "2026",
    image:
      "https://cdn.district.in/movies-assets/images/cinema/_Poster%20%288%29-2565bbf0-a053-11f1-bb2c-abde23f195f5.jpg?im=Resize%2Cwidth%3D400",
  },
  {
    title: "Bathaa",
    subtitle: "A new story. An unforgettable experience.",
    tag: "TAMIL MOVIE",
    year: "2026",
    image:
      "https://ram-cinemas.s3.amazonaws.com/images/1790570621931_movie-image-460-x-660-px.jpg",
  },
  {
    title: "Anbil Avan",
    subtitle: "A story of love, emotions, and relationships.",
    tag: "TAMIL MOVIE",
    year: "2026",
    image:
      "https://cdn.district.in/movies-assets/images/cinema/Anbil-Avan_Poster-Untitled-4-ed8c5890-9703-11f1-9511-b94b91d711e0.jpg?im=Resize%2Cwidth%3D400",
  },
  {
    title: "The Paradise",
    subtitle: "Enter a world of action and adventure.",
    tag: "UPCOMING",
    year: "2026",
    image:
      "https://stat4.bollywoodhungama.in/wp-content/uploads/2025/08/The-Paradise-01.jpg",
  },
];

export default function Home() {
  const location = useLocation();

  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [minRating, setMinRating] = useState(0);
  const [state, setState] = useState("All States");
  const [district, setDistrict] = useState("All Districts");
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search");

    if (searchQuery) {
      setSearch(searchQuery);
    }
  }, [location.search]);

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setActiveSlide((current) => (current + 1) % heroSlides.length);
  };

  const previousSlide = () => {
    setActiveSlide(
      (current) =>
        (current - 1 + heroSlides.length) % heroSlides.length
    );
  };

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        !query ||
        movie.title.toLowerCase().includes(query) ||
        (movie.genre &&
          movie.genre.some((item) =>
            item.toLowerCase().includes(query)
          ));

      const matchesGenre =
        genre === "All" ||
        (movie.genre && movie.genre.includes(genre));

      const matchesRating = movie.rating >= minRating;

      const matchesState =
        state === "All States" ||
        (movie.state && movie.state === state) ||
        true; 

      const matchesDistrict =
        district === "All Districts" ||
        (movie.district && movie.district === district) ||
        true;

      return (
        matchesSearch &&
        matchesGenre &&
        matchesRating &&
        matchesState &&
        matchesDistrict
      );
    });
  }, [search, genre, minRating, state, district]);

  const trendingMovies = useMemo(() => {
    return [...movies]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);
  }, []);

  const slide = heroSlides[activeSlide];

  const hasActiveFilters =
    search.trim() !== "" ||
    genre !== "All" ||
    minRating > 0 ||
    state !== "All States" ||
    district !== "All Districts";

  return (
    <main className="min-h-screen overflow-x-hidden bg-gray-50 text-gray-900 transition-colors duration-300 dark:bg-[#09090f] dark:text-white">
      {/* CINEMATIC HERO */}
      <section className="relative flex min-h-[650px] items-center overflow-hidden bg-gray-900 sm:min-h-[750px] lg:min-h-[85vh]">
        {heroSlides.map((item, index) => (
          <div
            key={item.title}
            aria-hidden="true"
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === activeSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={item.image}
              alt=""
              className="h-full w-full scale-100 object-cover object-center lg:scale-105"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090f] via-transparent to-black/30" />

        <div className="relative z-10 mx-auto w-full max-w-full px-4 pb-16 pt-24 sm:px-6 md:pb-24 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/15 px-3.5 py-1.5 text-xs font-bold tracking-[0.2em] text-red-200 backdrop-blur-md sm:px-4 sm:py-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
              {slide.tag} · {slide.year}
            </div>

            <h1
              key={slide.title}
              className="animate-[fadeIn_0.7s_ease-out] text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              EXPERIENCE
              <span className="mt-1 block bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300 bg-clip-text text-transparent">
                THE MAGIC.
              </span>
            </h1>

            <h2 className="mt-4 text-xl font-bold text-white sm:text-2xl lg:text-3xl">
              {slide.title}
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-200 sm:text-base sm:leading-7">
              {slide.subtitle} Discover incredible stories, explore
              the latest releases, and book your favorite cinema seats
              with CineBook.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 sm:gap-4">
              <a
                href="#movies"
                className="inline-flex items-center justify-center rounded-xl bg-red-600 px-5 py-3 font-bold text-white shadow-lg shadow-red-950/40 transition hover:-translate-y-1 hover:bg-red-500 sm:px-6 sm:py-3.5"
              >
                <Ticket className="mr-2" size={18} />
                Book Tickets
                <ArrowRight className="ml-2" size={17} />
              </a>

              <Link
                to="/signup"
                className="inline-flex items-center justify-center rounded-xl bg-red-400 px-5 py-3 font-bold text-white shadow-lg shadow-red-950/40 transition hover:-translate-y-1 hover:bg-red-500 sm:px-6 sm:py-3.5"
              >
                Join CineBook
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-200 sm:text-sm">
              <span className="flex items-center">
                <ShieldCheck className="mr-1.5 text-emerald-400" size={17} />
                Secure booking
              </span>
              <span className="flex items-center">
                <Clapperboard className="mr-1.5 text-red-400" size={17} />
                Latest releases
              </span>
              <span className="flex items-center">
                <Star className="mr-1.5 text-yellow-400" size={17} />
                Cinematic experience
              </span>
            </div>
          </div>

          {/* Slider controls */}
          <div className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={previousSlide}
              aria-label="Previous slide"
              className="rounded-full border border-white/20 bg-black/40 p-2.5 text-white transition hover:bg-red-600 sm:p-3"
            >
              <ArrowLeft size={18} />
            </button>

            <div className="flex items-center gap-1.5 sm:gap-2">
              {heroSlides.map((item, index) => (
                <button
                  type="button"
                  key={item.title}
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Show ${item.title}`}
                  aria-pressed={index === activeSlide}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === activeSlide
                      ? "w-8 bg-red-500 sm:w-12"
                      : "w-3 bg-white/40 hover:bg-white sm:w-5"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next slide"
              className="rounded-full border border-white/20 bg-black/40 p-2.5 text-white transition hover:bg-red-600 sm:p-3"
            >
              <ArrowRight size={18} />
            </button>

            <span className="ml-1 text-xs text-gray-200 sm:text-sm">
              {String(activeSlide + 1).padStart(2, "0")} /{" "}
              {String(heroSlides.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Featured card */}
        <div className="absolute bottom-8 right-6 z-10 hidden w-60 rounded-2xl border border-white/15 bg-black/50 p-4 text-white shadow-2xl backdrop-blur-xl lg:block">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-red-600/20 p-2.5 text-red-400">
              <Play size={22} fill="currentColor" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-gray-300">
                YOUR NEXT MOVIE NIGHT
              </p>
              <p className="mt-0.5 text-sm font-bold">
                Starts with CineBook
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRENDING MOVIES */}
      <section className="mx-auto max-w-full px-4 py-12 transition-colors sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-red-600 dark:text-red-400 sm:text-sm">
              <TrendingUp size={16} />
              Audience favorites
            </p>

            <h2 className="text-2xl font-black text-gray-900 dark:text-white sm:text-3xl lg:text-4xl">
              Trending Movies
              <span className="ml-1 text-red-500">.</span>
            </h2>

            <p className="mt-2 text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
              Discover the highest-rated movies in your collection.
            </p>
          </div>

          <a
            href="#movies"
            className="text-xs font-semibold text-red-600 transition hover:text-red-500 dark:text-red-400 dark:hover:text-red-300 sm:text-sm"
          >
            Explore all <ArrowRight className="ml-1 inline" size={16} />
          </a>
        </div>

        {trendingMovies.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trendingMovies.map((movie, index) => (
              <div
                key={movie.id}
                className="relative transition duration-300 hover:-translate-y-1.5"
              >
                <span className="absolute left-3 top-3 z-10 rounded-lg border border-white/10 bg-black/80 px-2.5 py-1 text-[10px] font-black tracking-wider text-red-400 backdrop-blur">
                  TOP {index + 1}
                </span>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            Add movies to your collection to see trending picks.
          </p>
        )}
      </section>

      <section
        id="movies"
        className="mx-auto max-w-full scroll-mt-24 px-4 py-12 transition-colors sm:px-6 sm:py-16 lg:px-8"
      >
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-600 dark:text-red-400 sm:text-sm">
            Find your next favorite
          </p>

          <h2 className="mt-2 text-2xl font-black text-gray-900 dark:text-white sm:text-3xl lg:text-4xl">
            Explore Movies
          </h2>

          <p className="mt-2 text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
            Search movies, filter genres, and discover your next cinema
            experience.
          </p>
        </div>

        <MovieFilters
          search={search}
          setSearch={setSearch}
          genre={genre}
          setGenre={setGenre}
          minRating={minRating}
          setMinRating={setMinRating}
          state={state}
          setState={setState}
          district={district}
          setDistrict={setDistrict}
        />

        <div className="mb-5 mt-6 flex items-center justify-between text-xs sm:text-sm">
          <p className="text-gray-600 dark:text-gray-400">
            {filteredMovies.length} movie(s) found
          </p>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setGenre("All");
                setMinRating(0);
                setState("All States");
                setDistrict("All Districts");
              }}
              className="font-semibold text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300"
            >
              Clear filters
            </button>
          )}
        </div>

        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white py-16 text-center transition-colors dark:border-white/10 dark:bg-white/[0.02]">
            <Clapperboard
              className="mx-auto text-gray-500"
              size={36}
            />
            <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
              No movies found
            </h3>
            <p className="mt-1 text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
              Try another search, genre, or rating.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}