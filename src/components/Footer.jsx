import { Link, useNavigate } from "react-router-dom";
import { Clapperboard, Heart, ArrowUpRight, Ticket, Film, CirclePlay, Mail, MoveUpRight, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const navigate = useNavigate();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Explore Movies", path: "/#movies" },
    { name: "My Bookings", path: "/profile" },
    { name: "My Profile", path: "/profile" },
  ];

  const accountLinks = [
    { name: "Login", path: "/login" },
    { name: "Create Account", path: "/signup" },
    { name: "Booking History", path: "/profile" },
  ];

  function handleHomeClick(event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/");
  }

  return (
    <footer className="relative overflow-hidden border-t border-gray-200 bg-gray-50 text-gray-600 transition-colors dark:border-white/10 dark:bg-[#09090d] dark:text-gray-400">
      <div className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-red-600/[0.08] blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-purple-600/[0.07] blur-[100px]" />

      <div className="relative mx-auto max-w-full px-5 pb-6 pt-14 sm:px-8 lg:pt-16">
        
        <div className="mb-14 flex flex-col gap-6 rounded-3xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur-xl sm:p-8 dark:border-white/10 dark:bg-gradient-to-br dark:from-white/[0.07] dark:to-white/[0.02] dark:shadow-none md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-red-600 dark:text-red-400">
              <CirclePlay size={14} />
              Your next movie night
            </span>

            <h2 className="text-2xl font-black leading-tight text-gray-900 dark:text-white sm:text-3xl">
              Great movies.
              <span className="block text-red-600 dark:text-red-500">
                Unforgettable moments.
              </span>
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-700 dark:text-gray-700">
              Discover your favorites, reserve your seats across screens 1, 2, and 3, and make every movie night special with CineBook.
            </p>
          </div>

          <Link
            to="/#movies"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-red-600/20 transition duration-300 hover:-translate-y-1 hover:shadow-red-600/30"
          >
            Explore Movies
            <ArrowUpRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          
          <div>
            <Link
              to="/"
              onClick={handleHomeClick}
              aria-label="CineBook home"
              className="group inline-flex items-center gap-2"
            >
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-700 text-white shadow-lg shadow-red-600/20 transition duration-300 group-hover:rotate-[-6deg] group-hover:scale-105">
                <Clapperboard size={22} strokeWidth={2.2} />
                <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400 dark:border-[#0b0b10]" />
              </div>
              <span className="text-xl font-black tracking-tight text-gray-900 dark:text-white">
                Cine<span className="text-red-500">Book</span>
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-gray-500 dark:text-gray-300">
              Your personal destination for discovering movies and planning memorable cinema experiences.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-pink-500/40 hover:bg-pink-500/10 hover:text-pink-500 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none dark:hover:text-pink-400"
              >
                <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-500 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none dark:hover:text-blue-400"
              >
                <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.5 5 15.5 5H18V0h-3.808C10.59 0 9 1.589 9 4.75V8z"/>
                </svg>
              </a>

              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-600 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none dark:hover:text-red-400"
              >
                <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-5 flex items-center gap-2 font-bold text-gray-900 dark:text-white">
              <Film size={17} className="text-red-600 dark:text-red-500" />
              Discover
            </h3>

            <ul className="space-y-4 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="group inline-flex items-center gap-2 transition hover:text-gray-900 dark:hover:text-white"
                  >
                    <span className="h-1 w-1 rounded-full bg-gray-400 transition group-hover:bg-red-600 dark:bg-gray-600 dark:group-hover:bg-red-500" />
                    {link.name}
                    <MoveUpRight
                      size={13}
                      className="opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 flex items-center gap-2 font-bold text-gray-900 dark:text-white">
              <Ticket size={17} className="text-red-600 dark:text-red-500" />
              Your Account
            </h3>

            <ul className="space-y-4 text-sm">
              {accountLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="group inline-flex items-center gap-2 transition hover:text-gray-900 dark:hover:text-white"
                  >
                    <span className="h-1 w-1 rounded-full bg-gray-400 transition group-hover:bg-red-600 dark:bg-gray-600 dark:group-hover:bg-red-500" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Support */}
          <div>
            <h3 className="mb-5 flex items-center gap-2 font-bold text-gray-900 dark:text-white">
              <Mail size={17} className="text-red-600 dark:text-red-500" />
              Contact & Support
            </h3>

            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-red-500 shrink-0" />
                <a href="mailto:support@cinebook.example" className="hover:text-gray-900 dark:hover:text-white transition">
                  repo@cinebook.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-red-500 shrink-0" />
                <span>+91 90045 45673</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={15} className="text-red-500 shrink-0 mt-0.5" />
                <span>CineBook Multiplex, Screens 1-3, Main Avenue, Chennai</span>
              </li>
            </ul>

            <a
              href="mailto:support@cinebook.example"
              className="group mt-4 flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm shadow-sm transition hover:border-red-500/30 hover:bg-red-50/50 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none dark:hover:bg-red-500/[0.06]"
            >
              <span className="truncate text-gray-800 dark:text-gray-200">Contact Support</span>
              <ArrowUpRight
                size={17}
                className="shrink-0 text-red-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-red-400"
              />
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-14 flex flex-col gap-4 border-t border-gray-200 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between dark:border-white/[0.08]">
          <p className="text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} CineBook. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
            Crafted with
            <Heart size={13} className="fill-red-500 text-red-500" />
            for movie lovers
          </p>

          <Link
            to="/"
            onClick={handleHomeClick}
            className="inline-flex items-center gap-2 transition hover:text-gray-900 dark:hover:text-white"
          >
            Back to home
            <ArrowUpRight size={15} />
          </Link>
        </div>

      </div>
    </footer>
  );
}