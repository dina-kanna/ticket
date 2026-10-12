import { Link } from "react-router-dom";
import {Clapperboard,Film, Popcorn, ShieldCheck,Sparkles,Ticket,} from "lucide-react";

export default function Auth({
  title,
  subtitle,
  children,
  footer,
}) {
  return (
    <main className="relative flex min-h-screen overflow-hidden bg-gray-50 text-gray-900 dark:bg-[#08080c] dark:text-white">
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-red-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-purple-600/10 blur-[120px]" />

      <section className="relative hidden min-h-screen w-1/2 overflow-hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1400&q=90"
          alt="Cinematic movie theater"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#08080c] via-[#08080c]/65 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/40 to-transparent" />

        <div className="relative z-10 flex min-h-screen flex-col justify-between p-10 text-white xl:p-16">
          <Link to="/" className="flex w-fit items-center gap-3">
            <span className="rounded-2xl bg-red-600 p-3 shadow-lg shadow-red-950/50">
              <Clapperboard size={27} />
            </span>

            <span className="text-3xl font-black tracking-tight">
              Cine<span className="text-red-500">Book</span>
            </span>
          </Link>

          <div className="max-w-xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-md">
              <Sparkles size={15} className="text-red-400" />
              Your movie experience starts here
            </div>

            <h2 className="text-5xl font-black leading-[1.1] xl:text-7xl">
              Feel the
              <span className="block text-red-500">story.</span>
              Live the
              <span className="block">moment.</span>
            </h2>

            <p className="mt-6 max-w-md text-base leading-8 text-gray-300 xl:text-lg">
              Discover unforgettable movies, choose your favorite
              seats, and turn every movie night into an experience
              worth remembering.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-black/35 px-4 py-3 backdrop-blur-md">
                <Ticket size={19} className="text-red-400" />
                <span className="text-sm font-semibold">
                  Easy booking
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-black/35 px-4 py-3 backdrop-blur-md">
                <ShieldCheck size={19} className="text-emerald-400" />
                <span className="text-sm font-semibold">
                  Secure experience
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/15 pt-6 text-sm text-gray-400">
            <span>Made for movie lovers.</span>
            <span className="flex items-center gap-2">
              <Film size={16} />
              Your seat awaits
            </span>
          </div>
        </div>
      </section>

      <section className="relative flex min-h-screen w-full items-center justify-center px-5 py-10 sm:px-8 lg:w-1/2 lg:px-12 xl:px-20">
        <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-red-600/[0.06] blur-[100px]" />

        <div className="relative z-10 w-full max-w-md">
          <Link
            to="/"
            className="mx-auto flex w-fit items-center gap-3 lg:hidden"
          >
            <span className="rounded-xl bg-red-600 p-2.5 text-white">
              <Clapperboard size={25} />
            </span>

            <span className="text-2xl font-black">
              Cine<span className="text-red-500">Book</span>
            </span>
          </Link>

          <div className="mt-9 rounded-3xl border border-gray-200 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-[#141419]/90 dark:shadow-2xl dark:shadow-black/40 dark:backdrop-blur-xl sm:p-9 lg:mt-0">
            <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-500 dark:text-red-400">
              <Popcorn size={28} />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-500 dark:text-red-400">
              Welcome to CineBook
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              {title}
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400 sm:text-base">
              {subtitle}
            </p>

            <div className="mt-8 space-y-5">
              {children}
            </div>

            <div className="my-7 border-t border-gray-200 dark:border-white/10" />

            <div className="text-center text-sm leading-6 text-gray-600 dark:text-gray-400">
              {footer}
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-600">
            By continuing, you agree to use CineBook responsibly.
          </p>

          <Link
            to="/"
            className="mt-5 block text-center text-sm text-gray-500 transition hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
          >
            ← Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}