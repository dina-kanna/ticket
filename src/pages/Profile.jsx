import { useEffect, useMemo } from "react";
import { Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {ArrowLeft,  ArrowRight,CalendarDays, CheckCircle2, Clock,Clapperboard, Film, LogOut,Mail,MapPin,Popcorn,ShieldCheck, Sparkles,Ticket, Wallet,} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useBooking } from "../context/BookingContext";

const formatCurrency = (amount) =>
  `₹${Number(amount || 0).toLocaleString("en-IN")}`;

export default function Profile() {
  const { user, logout } = useAuth();
  const { bookings = [] } = useBooking();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const myBookings = useMemo(
    () =>
      bookings.filter(
        (booking) =>
          booking.userEmail?.toLowerCase() === user.email?.toLowerCase()
      ),
    [bookings, user.email]
  );

  const totalSpent = myBookings.reduce(
    (total, booking) => total + Number(booking.total || 0),
    0
  );

  const totalTickets = myBookings.reduce(
    (total, booking) => total + (booking.seats?.length || 0),
    0
  );

  const profileName = "Dinesh";
  const initials = "DH";

  return (
    <main className="min-h-screen bg-gray-50 p-4 text-gray-900 transition-colors dark:bg-[#09090f] dark:text-white sm:px-6 sm:py-12 lg:px-8">
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-red-600/15 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 top-[32rem] h-96 w-96 rounded-full bg-rose-600/10 blur-[150px]" />
      <div className="pointer-events-none absolute left-1/3 top-[60vh] h-[30rem] w-[30rem] rounded-full bg-purple-900/10 blur-[160px]" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-wrap items-center justify-between gap-4"
        >
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <ArrowLeft
              size={18}
              className="transition group-hover:-translate-x-1"
            />
            Back to movies
          </Link>

          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-black tracking-tight"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-700 text-white shadow-lg shadow-red-600/20">
              <Clapperboard size={20} />
            </span>
            Cine<span className="text-red-500">Book</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-red-500/25 bg-red-500/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-red-600 dark:text-red-300 backdrop-blur-md">
            <Sparkles size={14} />
            Your personal cinema
          </div>

          <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-red-500 via-rose-500 to-orange-400 bg-clip-text text-transparent dark:from-red-400 dark:via-rose-400 dark:to-orange-300">
              {profileName}
            </span>
            <span className="text-red-500">.</span>
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600 dark:text-gray-400 sm:text-base">
            Your movie nights, tickets, and account details — all in one place.
          </p>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl dark:border-white/10 dark:bg-[#0d0d12] dark:shadow-2xl dark:shadow-black/60 dark:backdrop-blur-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/[0.08] via-transparent to-purple-600/[0.03] dark:from-red-600/[0.12] dark:to-purple-600/[0.05]" />
          <div className="absolute -right-10 -top-24 h-64 w-64 rounded-full border border-gray-200 dark:border-white/[0.04]" />
          <div className="absolute -right-2 -top-16 h-48 w-48 rounded-full border border-gray-200 dark:border-white/[0.04]" />

          <div className="relative flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-9">
            <div className="relative shrink-0">
              <div className="flex h-24 w-24 items-center justify-center rounded-[1.8rem] bg-gradient-to-br from-red-500 via-rose-600 to-purple-800 text-3xl font-black text-white shadow-2xl shadow-red-950/30 ring-4 ring-gray-100 dark:shadow-red-950/50 dark:ring-white/10 sm:h-28 sm:w-28 sm:text-4xl">
                {initials}
              </div>
              <span
                className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-4 border-white bg-emerald-500 shadow-md dark:border-[#0d0d12] dark:bg-emerald-400"
                title="Account active"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">
                  {profileName}
                </h2>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck size={13} />
                  Active account
                </span>
              </div>

              <p className="mt-2 flex items-center gap-2 break-all text-sm text-gray-600 dark:text-gray-400">
                <Mail size={15} className="shrink-0 text-red-500 dark:text-red-400/80" />
                {user.email}
              </p>

              <p className="mt-4 max-w-lg text-sm leading-6 text-gray-600 dark:text-gray-400">
                Every great story deserves a big screen. Discover your next
                favorite and keep your bookings close.
              </p>
            </div>

            <button
              type="button"
              onClick={logout}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-bold text-gray-700 transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-300 dark:hover:text-red-300"
            >
              <LogOut size={17} />
              Logout
            </button>
          </div>
        </motion.section>

        <section className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              label: "Total bookings",
              value: myBookings.length,
              icon: Ticket,
              color: "text-red-500 dark:text-red-400",
              glow: "bg-red-500/10",
              border: "border-red-500/20",
            },
            {
              label: "Tickets booked",
              value: totalTickets,
              icon: Film,
              color: "text-purple-600 dark:text-purple-400",
              glow: "bg-purple-500/10",
              border: "border-purple-500/20",
            },
            {
              label: "Total spent",
              value: formatCurrency(totalSpent),
              icon: Wallet,
              color: "text-emerald-600 dark:text-emerald-400",
              glow: "bg-emerald-500/10",
              border: "border-emerald-500/20",
            },
          ].map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.article
                key={stat.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.08 }}
                whileHover={{ y: -4 }}
                className={`rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-colors hover:${stat.border} dark:border-white/[0.08] dark:bg-[#0d0d12] dark:shadow-lg dark:shadow-black/40 sm:p-6`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </p>
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.glow} ${stat.color}`}
                  >
                    <Icon size={21} />
                  </div>
                </div>
                <p className="mt-4 break-words text-3xl font-black tracking-tight text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                  Based on your saved bookings
                </p>
              </motion.article>
            );
          })}
        </section>

        <div className="mb-6 mt-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-red-500 dark:text-red-400">
              <Ticket size={17} />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">
                Your tickets
              </span>
            </div>
            <h2 className="text-2xl font-black sm:text-3xl">My Bookings</h2>
            <p className="mt-2 text-sm text-gray-500">
              {myBookings.length === 1
                ? "1 booking in your account"
                : `${myBookings.length} bookings in your account`}
            </p>
          </div>

          <Link
            to="/"
            className="group inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-red-950/50 transition hover:bg-red-500"
          >
            <Popcorn size={17} />
            Book a movie
            <ArrowRight
              size={16}
              className="transition group-hover:translate-x-1"
            />
          </Link>
        </div>

        {myBookings.length === 0 ? (
          <motion.section
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative overflow-hidden rounded-3xl border border-dashed border-gray-300 bg-white px-5 py-14 text-center shadow-sm dark:border-white/15 dark:bg-[#0d0d12] dark:shadow-xl sm:py-20"
          >
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/[0.08] blur-3xl" />

            <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-red-500/25 bg-red-500/10 text-red-500 dark:text-red-400 shadow-inner">
              <Clapperboard size={36} />
            </div>

            <h3 className="relative mt-6 text-2xl font-black">
              Your next movie night starts here
            </h3>
            <p className="relative mx-auto mt-3 max-w-md text-sm leading-6 text-gray-600 dark:text-gray-400">
              You haven't booked any movies yet. Find a film you love, choose
              your seats, and your tickets will appear here.
            </p>

            <Link
              to="/"
              className="relative mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-6 py-3.5 font-bold text-black shadow-lg shadow-red-950/40 transition hover:from-red-500 hover:to-rose-500"
            >
              Explore movies
              <ArrowRight size={18} />
            </Link>
          </motion.section>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {myBookings.map((booking, index) => (
              <motion.article
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.07, 0.35) }}
                className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:border-red-500/35 hover:shadow-xl dark:border-white/[0.08] dark:bg-[#0d0d12] dark:shadow-xl dark:shadow-black/50"
              >
                {/* Ticket header */}
                <div className="flex items-center justify-between gap-3 border-b border-dashed border-gray-200 bg-gray-50 px-5 py-4 dark:border-white/10 dark:bg-black/20">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500 dark:text-red-400">
                      <Ticket size={18} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">
                        Booking reference
                      </p>
                      <p className="truncate text-sm font-bold text-gray-800 dark:text-gray-200">
                        #{booking.id}
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 size={14} />
                    Confirmed
                  </span>
                </div>

                {/* Movie details */}
                <div className="flex gap-4 p-5 sm:gap-5">
                  <div className="relative h-44 w-28 shrink-0 overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 dark:border-white/10 dark:bg-black/40 sm:h-48 sm:w-32">
                    <img
                      src={booking.movie?.poster}
                      alt={booking.movie?.title || "Movie poster"}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-[10px] font-bold text-white backdrop-blur">
                      <Film size={11} />
                      CineBook
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-black leading-snug text-gray-900 transition group-hover:text-red-600 dark:text-white dark:group-hover:text-red-300 sm:text-xl">
                      {booking.movie?.title || "Movie"}
                    </h3>

                    <p className="mt-2 text-xs text-gray-500">
                      Your reservation details
                    </p>

                    <div className="mt-5 space-y-3">
                      <div className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                        <CalendarDays
                          size={16}
                          className="mt-0.5 shrink-0 text-red-500 dark:text-red-400"
                        />
                        <span>{booking.bookingDate || "Date not available"}</span>
                      </div>

                      <div className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                        <Clock
                          size={16}
                          className="mt-0.5 shrink-0 text-red-500 dark:text-red-400"
                        />
                        <span>{booking.showtime || "Time not available"}</span>
                      </div>

                      <div className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                        <MapPin
                          size={16}
                          className="mt-0.5 shrink-0 text-red-500 dark:text-red-400"
                        />
                        <span className="break-words">
                          Seats: {booking.seats?.length
                            ? booking.seats.join(", ")
                            : "Not available"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-gray-200 bg-gray-50 px-5 py-4 dark:border-white/10 dark:bg-black/30">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">
                      Total paid
                    </p>
                    <p className="mt-1 text-2xl font-black text-gray-900 dark:text-white">
                      {formatCurrency(booking.total)}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      {booking.seats?.length || 0}{" "}
                      {(booking.seats?.length || 0) === 1
                        ? "ticket"
                        : "tickets"}
                    </p>
                    <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 size={13} />
                      Booking saved
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-14 border-t border-gray-200 py-6 dark:border-white/[0.08]">
          <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
            <Link to="/" className="text-lg font-black text-gray-900 dark:text-white">
              Cine<span className="text-red-500">Book</span>
            </Link>
            <p className="text-xs text-gray-500">
              Made for movie lovers. Enjoy the show!
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}