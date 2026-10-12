import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, CheckCircle2, Clock, Film, ShieldCheck, Ticket } from "lucide-react";
import movies from "../data/movies";
import { useBooking } from "../context/BookingContext";
import { useAuth } from "../context/AuthContext";

const rows = ["F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T"];
const bookedSeats = ["G7", "G8", "G9", "G10", "G12", "G13", "H11", "H12", "I13", "J13", "K12", "K13", "L11", "L12", "S7", "S8", "S9", "S20"];

function getToday() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function SeatSelection() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [id]);

  const {
    selectedMovie,
    showtime,
    setShowtime,
    bookingDate,
    setBookingDate,
    selectedSeats,
    toggleSeat,
    startBooking,
    confirmBooking,
  } = useBooking();

  const movie = movies.find((item) => item.id === Number(id));

  useEffect(() => {
    if (movie && selectedMovie?.id !== movie.id) {
      startBooking(movie);
    }
  }, [movie, selectedMovie?.id, startBooking]);

  if (!movie) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#09090d] px-5 text-center text-white">
        <Film size={55} className="mb-5 text-red-500" />
        <h1 className="text-3xl font-black">Movie not found</h1>
        <Link to="/" className="mt-5 text-red-400 hover:text-red-300">
          Return to CineBook
        </Link>
      </main>
    );
  }

  function getSeatPrice(row) {
    if (row === "S" || row === "T") return 150; // ₹150 SILVER Section at front
    if (["F", "G", "H", "I", "J", "K", "L"].includes(row)) return Math.round(movie.price * 1.4); // Recliners/Club
    return movie.price; // Standard
  }

  const total = selectedSeats.reduce((sum, seatId) => {
    const row = seatId.charAt(0);
    return sum + getSeatPrice(row);
  }, 0);

  const totalSeats = rows.length * 22;
  const availableSeats = totalSeats - bookedSeats.length;

  function handleSeatClick(seatId, isBooked) {
    if (isBooked) {
      window.alert(`Seat ${seatId} is already booked. Please choose an available seat.`);
      return;
    }
    toggleSeat(seatId);
  }

  function handleConfirm() {
    if (!user) {
      navigate("/login", {
        state: { from: `/seats/${movie.id}` },
      });
      return;
    }

    if (!bookingDate || bookingDate < getToday()) {
      window.alert("Please select a valid booking date.");
      return;
    }

    if (!showtime) {
      window.alert("Please select a showtime.");
      return;
    }

    if (!selectedSeats.length) {
      window.alert("Please select at least one seat.");
      return;
    }

    const booking = confirmBooking(user);

    if (booking) {
      navigate("/confirmation");
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#09090d] dark:text-white pb-16">
      {/* TOP NAVIGATION */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-md dark:border-white/10 dark:bg-[#101014]/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="rounded-xl bg-red-600 p-2 text-white shadow-md shadow-red-600/20">
              <Ticket size={20} />
            </span>
            <span className="text-lg font-black tracking-tight sm:text-xl">
              Cine<span className="text-red-500">Book</span>
            </span>
          </Link>

          <div className="hidden items-center gap-2 text-xs text-gray-500 dark:text-gray-400 sm:flex">
            <ShieldCheck size={16} className="text-emerald-500 dark:text-emerald-400" />
            Secure seat selection
          </div>

          <Link
            to={`/movie/${movie.id}`}
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white sm:text-sm"
          >
            <ArrowLeft size={16} />
            <span>Back to Movie</span>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-3 py-6 sm:px-6 sm:py-10 lg:px-8">
        {/* PAGE HEADING */}
        <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#15151e] sm:p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-red-500">
            Step 2 of 3 · Booking
          </p>

          <h1 className="mt-2 text-2xl font-black sm:text-3xl lg:text-4xl">
            Select Your Seats
          </h1>

          <p className="mt-2 text-xs leading-5 text-gray-600 dark:text-gray-400 sm:text-sm">
            Swipe left/right on the seating grid to explore all columns. Silver section is located at the front.
          </p>
        </section>

        {/* MOVIE INFO HEADER */}
        <section className="mb-6 overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-100 to-white dark:border-white/10 dark:from-[#1b1519] dark:to-[#15151c]">
          <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-6">
            <img
              src={movie.poster}
              alt={movie.title}
              className="h-28 w-20 rounded-xl object-cover shadow-md sm:h-32 sm:w-24"
            />

            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-500">
                Now booking
              </p>

              <h2 className="mt-1 text-xl font-black sm:text-2xl">{movie.title}</h2>

              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                <span>
                  <Clock className="mr-1 inline" size={14} />
                  {movie.duration}
                </span>
                <span>
                  <Film className="mr-1 inline" size={14} />
                  {movie.language}
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-3 sm:min-w-32">
              <p className="text-xs text-gray-600 dark:text-gray-400">Available</p>
              <p className="mt-0.5 text-2xl font-black text-red-500 sm:text-3xl">
                {availableSeats}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-white/10 dark:bg-[#141419] sm:p-5">
            <label htmlFor="booking-date" className="flex items-center gap-2 text-sm sm:text-base font-bold">
              <span className="rounded-lg bg-red-500/10 p-1.5 text-red-500">
                <CalendarDays size={18} />
              </span>
              Select date
            </label>
            <input
              id="booking-date"
              type="date"
              min={getToday()}
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              className="mt-3 w-full rounded-xl border border-gray-300 bg-gray-50 p-3 text-xs sm:text-sm text-gray-900 outline-none transition focus:border-red-500 dark:border-white/10 dark:bg-[#202027] dark:text-white"
            />
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-white/10 dark:bg-[#141419] sm:p-5">
            <label htmlFor="booking-showtime" className="flex items-center gap-2 text-sm sm:text-base font-bold">
              <span className="rounded-lg bg-red-500/10 p-1.5 text-red-500">
                <Clock size={18} />
              </span>
              Select showtime
            </label>
            <select
              id="booking-showtime"
              value={showtime}
              onChange={(e) => setShowtime(e.target.value)}
              className="mt-3 w-full rounded-xl border border-gray-300 bg-gray-50 p-3 text-xs sm:text-sm text-gray-900 outline-none transition focus:border-red-500 dark:border-white/10 dark:bg-[#202027] dark:text-white"
            >
              <option value="">Choose a showtime</option>
              {movie.showtimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </section>

        <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl dark:border-white/10 dark:bg-[#141419] dark:shadow-black/20">
          <div className="border-b border-gray-200 px-4 py-4 dark:border-white/10 sm:px-6">
            <h2 className="text-lg font-black sm:text-xl">Auditorium Layout</h2>
            <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
              Scroll horizontally to view all seat columns. Tap to select.
            </p>
          </div>

          <div className="p-3 sm:p-6">
            <div className="w-full overflow-x-auto pb-4 [-webkit-overflow-scrolling:touch]">
              <div className="min-w-[680px] px-2">
                {rows.map((row) => {
                  const isSilver = row === "S" || row === "T";
                  const showSilverHeader = row === "S";

                  return (
                    <div key={row}>
                      {showSilverHeader && (
                        <div className="my-5 text-center">
                          <span className="inline-block border-b-2 border-gray-400 pb-1 text-[11px] font-black tracking-widest text-gray-400">
                            ₹150 SILVER
                          </span>
                        </div>
                      )}

                      <div className="mb-2 flex items-center justify-center gap-1.5">
                        {/* Row Label Left */}
                        <span className="w-5 text-center text-[11px] font-bold text-gray-400">
                          {row}
                        </span>

                        {/* 22 Seats per row */}
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 22 }, (_, index) => {
                            const seatNum = index + 1;
                            const seatId = `${row}${seatNum}`;
                            const isBooked = bookedSeats.includes(seatId);
                            const isSelected = selectedSeats.includes(seatId);

                            const isAisleGap = seatNum === 5 || seatNum === 19;

                            let btnStyle = "";
                            if (isBooked) {
                              btnStyle = "border-gray-300 bg-gray-200 text-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-600 opacity-60";
                            } else if (isSelected) {
                              btnStyle = "border-red-400 bg-red-500 text-white shadow-sm scale-105";
                            } else if (isSilver) {
                              btnStyle = "border-amber-400/60 bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 dark:text-amber-300";
                            } else {
                              btnStyle = "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 dark:text-emerald-300";
                            }

                            return (
                              <div key={seatId} className="flex items-center">
                                {isAisleGap && <div className="w-4 sm:w-5" />}
                                <button
                                  type="button"
                                  onClick={() => handleSeatClick(seatId, isBooked)}
                                  title={`Seat ${seatId}`}
                                  className={`flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded border text-[9px] sm:text-[10px] font-bold transition ${btnStyle}`}
                                >
                                  {seatNum < 10 ? `0${seatNum}` : seatNum}
                                </button>
                              </div>
                            );
                          })}
                        </div>

                        <span className="w-5 text-center text-[11px] font-bold text-gray-400">
                          {row}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SCREEN */}
            <div className="mx-auto mt-6 max-w-xs sm:max-w-md text-center">
              <div className="mx-auto max-w-[90%] rounded-t-[50%] border-t-2 border-red-400/40 py-2.5 text-center text-[10px] font-bold tracking-[0.5em] text-gray-400">
                SCREEN
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-2 border-t border-gray-200 pt-5 text-[11px] text-gray-600 dark:border-white/10 dark:text-gray-300">
              <Legend color="bg-emerald-500/20 border-emerald-500/40" label="Available" />
              <Legend color="bg-amber-500/20 border-amber-500/40" label="Silver (₹150)" />
              <Legend color="bg-red-500 border-red-400" label="Selected" />
              <Legend color="bg-gray-200 border-gray-300 dark:bg-gray-800 dark:border-gray-700" label="Booked" />
            </div>
          </div>
        </section>

        <section className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-100 to-white dark:border-white/10 dark:from-[#1b171c] dark:to-[#131319]">
          <div className="grid gap-5 p-4 sm:p-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="flex items-center gap-2 text-base font-black sm:text-lg">
                <Ticket size={19} className="text-red-500" />
                Booking Summary
              </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2 text-xs sm:text-sm">
                <div>
                  <p className="uppercase tracking-wider text-gray-500">Selected Seats</p>
                  <p className="mt-1 break-words font-bold text-gray-900 dark:text-white">
                    {selectedSeats.length ? selectedSeats.join(", ") : "No seats selected"}
                  </p>
                  <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                    {selectedSeats.length} ticket(s) selected
                  </p>
                </div>

                <div>
                  <p className="uppercase tracking-wider text-gray-500">Date & Showtime</p>
                  <p className="mt-1 font-bold text-gray-900 dark:text-white">
                    {bookingDate || "Select a date"}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-600 dark:text-gray-400">
                    {showtime || "Select a showtime"}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 dark:border-white/10 lg:min-w-64 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
              <p className="text-xs text-gray-600 dark:text-gray-400">Total Amount</p>
              <p className="mt-0.5 text-3xl font-black tracking-tight text-red-500 sm:text-4xl">
                ₹{total.toLocaleString("en-IN")}
              </p>

              <button
                type="button"
                onClick={handleConfirm}
                disabled={
                  !selectedSeats.length ||
                  !bookingDate ||
                  !showtime ||
                  bookingDate < getToday()
                }
                className="mt-4 w-full rounded-xl bg-gradient-to-r from-red-600 to-red-500 px-5 py-3.5 text-sm sm:text-base font-black text-white shadow-lg shadow-red-950/30 transition hover:from-red-500 hover:to-orange-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <CheckCircle2 className="mr-2 inline" size={17} />
                Confirm Booking
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Legend({ color, label }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`h-3.5 w-3.5 rounded border ${color}`} />
      {label}
    </span>
  );
}