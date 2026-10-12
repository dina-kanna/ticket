
import { useEffect, useState } from "react";
import {BrowserRouter,Routes, Route,Navigate,Link, useLocation,} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Clapperboard } from "lucide-react";
import { AuthProvider } from "./context/AuthContext";
import { BookingProvider } from "./context/BookingContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import SeatSelection from "./pages/SeatSelection";
import Confirmation from "./pages/Confirmation";
import Login from "./pages/Login";
import Sign from "./pages/Sign";
import Profile from "./pages/Profile";

function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#09090f] text-white">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [location.pathname, location.hash]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname + location.search}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Routes location={location}>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            } />

          <Route
            path="/movie/:id"
            element={
              <Layout>
                <MovieDetails />
              </Layout>
            }/>

          <Route
            path="/seats/:id"
            element={
              <Layout>
                <SeatSelection />
              </Layout>
            } />

          <Route
            path="/confirmation"
            element={
              <Layout>
                <Confirmation />
              </Layout>
            }/>

          <Route path="/auth" element={<Navigate to="/login" replace />} />

          <Route
            path="/login"
            element={
              <Layout>
                <Login />
              </Layout>
            } />

          <Route
            path="/signup"
            element={
              <Layout>
                <Sign />
              </Layout>
            }/>

          <Route
            path="/profile"
            element={
              <Layout>
                <Profile />
              </Layout>
            }/>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function NotFound() {
  return (
    <Layout>
      <section className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }} >
          <Clapperboard
            size={58}
            className="mx-auto mb-5 text-red-500"
          />

          <h1 className="text-7xl font-black text-red-500 sm:text-9xl">
            404
          </h1>

          <h2 className="mt-5 text-2xl font-bold sm:text-3xl">
            Oops! Wrong Screen
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-400 sm:text-base">
            This scene is not available. Return to CineBook and
            discover your next favorite movie.
          </p>

          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-red-600 px-7 py-3 font-bold transition hover:-translate-y-1 hover:bg-red-500"
          >
            <Clapperboard size={18} />
            Back to CineBook
          </Link>
        </motion.div>
      </section>
    </Layout>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoading(false);
    }, 2400);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <BookingProvider>
          <AnimatePresence mode="wait">
            {loading && <LoadingScreen key="loading-screen" />}
          </AnimatePresence>

          {!loading && <AnimatedRoutes />}
        </BookingProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
