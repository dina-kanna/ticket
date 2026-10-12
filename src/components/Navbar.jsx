import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Clapperboard, Menu, X, UserRound, ChevronDown, Film, Ticket, UserCircle, Search, Moon, Sun } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useAuth();
  const { darkMode, toggleTheme } = useTheme();

  const isLoggedIn = Boolean(user);

  const isMoviesActive =
    location.hash === "#movies" ||
    location.pathname.startsWith("/movie/") ||
    location.pathname.startsWith("/seats/");

  const links = [
    { name: "Home", path: "/", icon: Film },
    { name: "Movies", path: "/#movies", icon: Clapperboard },
    { name: "My Bookings", path: "/profile", icon: Ticket },
  ];

  function closeMenu() {
    setMenuOpen(false);
  }

  function isLinkActive(link) {
    if (link.name === "Home") {
      return location.pathname === "/" && !isMoviesActive;
    }

    if (link.name === "Movies") {
      return isMoviesActive;
    }

    return location.pathname === link.path;
  }

  function handleHomeClick(event) {
    event.preventDefault();
    closeMenu();

    if (location.pathname === "/") {
      if (location.hash || location.search) {
        navigate("/", { replace: true });
      } else {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
      return;
    }

    navigate("/");
  }

  function handleMoviesClick(event) {
    event.preventDefault();
    closeMenu();

    if (
      location.pathname !== "/" ||
      location.hash !== "#movies" ||
      location.search
    ) {
      navigate("/#movies");
      return;
    }

    document.getElementById("movies")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function handleSearchSubmit(event) {
    event.preventDefault();

    const query = searchQuery.trim();
    if (!query) return;

    closeMenu();
    navigate(`/?search=${encodeURIComponent(query)}#movies`);
  }

  useEffect(() => {
    if (location.pathname !== "/" || location.hash !== "#movies") {
      return;
    }

    const timer = window.setTimeout(() => {
      document.getElementById("movies")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 150);

    return () => window.clearTimeout(timer);
  }, [location.pathname, location.hash, location.search]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.search, location.hash]);

  function renderNavigationLinks(mobile = false) {
    return links.map((link) => {
      const Icon = link.icon;
      const active = isLinkActive(link);

      const className = `
        relative flex items-center gap-1.5 lg:gap-2 rounded-xl px-2.5 lg:px-3.5 py-2
        text-xs lg:text-sm font-semibold whitespace-nowrap transition-all duration-300
        ${
          active
            ? "bg-red-500/10 text-red-500 dark:text-red-400"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-650 dark:text-gray-400 dark:hover:bg-white/[0.06] dark:hover:text-white"
        }
        ${
          mobile
            ? "w-full border border-transparent px-4 py-3 text-sm"
            : "rounded-full"
        }
      `;

      const commonProps = {
        key: link.name,
        className,
        "aria-current": active ? "page" : undefined,
      };

      const children = (
    
        <>
          <Icon size={mobile ? 19 : 15} className="shrink-0" />
          <span>{link.name}</span>
          {active && mobile && (
            <span className="ml-auto h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
          )}
        </>
      );

      if (link.name === "Home") {
        return (
          <a {...commonProps} href="/" onClick={handleHomeClick}>
            {children}
          </a>
        );
      }

      if (link.name === "Movies") {
        return (
          <a {...commonProps} href="/#movies" onClick={handleMoviesClick}>
            {children}
          </a>
        );
      }

      return (
        <Link {...commonProps} to={link.path} onClick={closeMenu}>
          {children}
        </Link>
      );
    });
  }

  function renderAccountLink(mobile = false) {
    return (
      <Link
        to={isLoggedIn ? "/profile" : "/login"}
        onClick={closeMenu}
        className={`
          group flex items-center justify-center gap-1.5 lg:gap-2 whitespace-nowrap
          rounded-xl bg-gradient-to-r from-red-600 to-rose-600
          font-bold text-white shadow-lg shadow-red-600/20
          transition duration-300 hover:-translate-y-0.5
          hover:from-red-500 hover:to-rose-500
          ${
            mobile
              ? "w-full px-4 py-3.5"
              : "rounded-full px-3 lg:px-4 py-2 text-xs lg:text-sm"
          }
        `}
      >
        {isLoggedIn ? (
          <UserCircle size={mobile ? 19 : 15} className="shrink-0" />
        ) : (
          <UserRound size={mobile ? 19 : 15} className="shrink-0" />
        )}
        <span>
          {isLoggedIn ? "My Profile" : mobile ? "Login / Sign Up" : "Login"}
        </span>
        {!mobile && (
          <ChevronDown
            size={13}
            className="shrink-0 transition-transform group-hover:translate-y-0.5"
          />
        )}
      </Link>
    );
  }

  function renderThemeButton(mobile = false) {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        className={`
          flex shrink-0 items-center justify-center gap-2
          rounded-xl border border-gray-200 bg-white text-gray-800
          transition duration-300 hover:border-red-400 hover:bg-red-50
          dark:border-white/10 dark:bg-white/[0.04]
          dark:text-gray-100 dark:hover:border-red-500/40
          dark:hover:bg-red-500/10
          ${mobile ? "w-full px-4 py-3" : "h-9 w-9"}
        `}
      >
        {darkMode ? (
          <Sun size={17} className="text-amber-500" />
        ) : (
          <Moon size={17} className="text-indigo-600 dark:text-indigo-300" />
        )}
        {mobile && (
          <span className="text-sm font-semibold">
            {darkMode ? "Light Mode" : "Dark Mode"}
          </span>
        )}
      </button>
    );
  }

  function renderSearchForm(mobile = false) {
    return (
      <form
        onSubmit={handleSearchSubmit}
        className={`relative flex items-center ${
          mobile ? "w-full" : "hidden w-32 sm:w-36 md:flex lg:w-44 xl:w-56"
        }`}
      >
        <input
          type="search"
          aria-label="Search movies"
          placeholder="Search..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className={`
            w-full border border-gray-200 bg-gray-50
            text-gray-900 placeholder-gray-500
            transition focus:border-red-500/50 focus:outline-none
            dark:border-white/10 dark:bg-white
            dark:text-white dark:placeholder-gray-500
            ${
              mobile
                ? "rounded-xl py-3 pl-10 pr-4 text-sm"
                : "rounded-full py-1.5 pl-8 pr-3 text-xs"
            }
          `}
        />
        <Search
          size={mobile ? 16 : 13}
          className="pointer-events-none absolute left-2.5 text-gray-500 dark:text-gray-400"
        />
      </form>
    );
  }

  function renderDropdownContent() {
    return (
      <div className="space-y-3 border-t border-gray-200 bg-white px-4 py-4 dark:border-white/[0.08] dark:bg-[#0b0b10] sm:px-6">
        {renderSearchForm(true)}
        {renderNavigationLinks(true)}
        {renderThemeButton(true)}
        {renderAccountLink(true)}
        <p className="pt-2 text-center text-xs text-gray-500 dark:text-gray-600">
          Your next favorite movie awaits on Screen 1, 2, or 3.
        </p>
      </div>
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 text-gray-950 shadow-xl shadow-black/5 backdrop-blur-2xl transition-colors duration-300 dark:border-white/[0.08] dark:bg-[#0b0b10]/95 dark:text-white dark:shadow-black/20">
      <div className="h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent" />

      <nav className="mx-auto flex max-w-fu8l items-center justify-between gap-2 px-3 py-2.5 sm:px-4 md:px-6 lg:px-8">
        <Link
          to="/"
          onClick={handleHomeClick}
          aria-label="CineBook home"
          className="group flex shrink-0 items-center gap-2"
        >
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-700 shadow-lg shadow-red-600/20 transition duration-300 group-hover:rotate-[-6deg] group-hover:scale-110 sm:h-10 sm:w-10">
            <Clapperboard size={20} strokeWidth={2.2} />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400 dark:border-[#0b0b10]" />
          </div>
          <div className="min-w-0">
            <span className="block text-lg font-black tracking-tight sm:text-xl">
              Cine<span className="text-red-500">Book</span>
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-0.5 rounded-full border border-gray-200 bg-gray-50 p-0.5 dark:border-white/[0.07] dark:bg-white/[0.03] md:flex">
          {renderNavigationLinks()}
        </div>

        {renderSearchForm()}

        <div className="hidden items-center gap-2 md:flex">
          {renderThemeButton()}
          {renderAccountLink()}
        </div>

        <div className="flex items-center gap-1.5 md:hidden">
          {renderThemeButton()}
          <button
            type="button"
            onClick={() => setMenuOpen((previous) => !previous)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 transition hover:border-red-500/40 hover:bg-red-50 dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-red-500/10"
          >
            {menuOpen ? <X size={20} className="text-red-500" /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <div
        className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-in-out md:hidden ${
          menuOpen
            ? "grid-rows-[1fr] opacity-100"
            : "pointer-events-none grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          {renderDropdownContent()}
        </div>
      </div>
    </header>
  );
}