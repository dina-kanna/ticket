import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clapperboard, Film, Popcorn, Ticket, Sparkles } from "lucide-react";

export default function LoadingScreen({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (onLoadingComplete) onLoadingComplete();
          return 100;
        }
        return prev + 2;
      });
    }, 35);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-[#08080d] text-white"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.03 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(153,27,27,0.2),_transparent_60%)]" />

        <motion.div
          className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-red-600/10 blur-[100px]"
          animate={{ x: [0, 80, 0], y: [0, 50, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        <motion.div
          className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-orange-500/10 blur-[110px]"
          animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
        />

        <div className="absolute inset-x-0 top-0 flex h-5 justify-around overflow-hidden border-b border-white/10 bg-black/40">
          {Array.from({ length: 32 }, (_, i) => (
            <span
              key={i}
              className="my-1 h-2.5 w-4 shrink-0 rounded-sm bg-white/10"
            />
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-0 flex h-5 justify-around overflow-hidden border-t border-white/10 bg-black/40">
          {Array.from({ length: 32 }, (_, i) => (
            <span
              key={i}
              className="my-1 h-2.5 w-4 shrink-0 rounded-sm bg-white/10"
            />
          ))}
        </div>

        <div className="relative z-10 flex w-full max-w-xl flex-col items-center px-6 py-12 text-center">
          <motion.div
            className="relative mb-8 flex h-28 w-28 items-center justify-center rounded-[2rem] border border-red-500/30 bg-gradient-to-br from-red-500/20 to-black shadow-[0_0_70px_rgba(239,68,68,0.16)]"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            >
              <Clapperboard
                size={56}
                strokeWidth={1.4}
                className="text-red-500"
              />
            </motion.div>

            <motion.span
              className="absolute -right-2 -top-2 rounded-full bg-red-500 p-2 text-white shadow-lg"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Sparkles size={15} />
            </motion.span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-black tracking-[0.12em] sm:text-6xl">
              CINE
              <span className="text-red-500">BOOK</span>
            </h1>

            <p className="mt-4 text-[10px] font-semibold tracking-[0.35em] text-gray-400 sm:text-xs">
              YOUR MOVIE. YOUR MOMENT.
            </p>
          </motion.div>

          <div className="mt-8 flex items-center gap-7 text-gray-500">
            {[Film, Ticket, Popcorn].map((Icon, index) => (
              <motion.div
                key={index}
                animate={{
                  opacity: [0.35, 1, 0.35],
                  y: [0, -4, 0],
                }}
                transition={{
                  duration: 1.6,
                  delay: index * 0.25,
                  repeat: Infinity,
                }}
              >
                <Icon
                  size={23}
                  className={index === 1 ? "text-red-500" : ""}
                />
              </motion.div>
            ))}
          </div>

          <motion.p
            className="mt-8 text-xs font-medium tracking-[0.15em] text-gray-300 sm:text-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            LIGHTS. CAMERA. CINEBOOK.
          </motion.p>

          <div className="mt-6 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-red-700 via-red-500 to-orange-400"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between w-full max-w-xs px-1">
            <p className="text-[10px] tracking-widest text-gray-400">
              PREPARING YOUR CINEMA EXPERIENCE...
            </p>
            <p className="text-[10px] font-bold text-red-400">
              {progress}%
            </p>
          </div>

          <div className="mt-5 flex gap-2">
            {[0, 1, 2].map((dot) => (
              <motion.span
                key={dot}
                className="h-1.5 w-1.5 rounded-full bg-red-500"
                animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.4, 1] }}
                transition={{
                  duration: 1.2,
                  delay: dot * 0.2,
                  repeat: Infinity,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}