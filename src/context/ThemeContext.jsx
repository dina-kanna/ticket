
import {createContext, useContext,useEffect,useState,} from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem("cinebook-theme");

      if (saved !== null) {
        return saved === "dark";
      }

      return window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      darkMode
    );

    document.documentElement.style.colorScheme =
      darkMode ? "dark" : "light";

    try {
      localStorage.setItem(
        "cinebook-theme",
        darkMode ? "dark" : "light"
      );
    } catch {
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((previous) => !previous);
  };

  return (
    <ThemeContext.Provider
      value={{ darkMode, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
}
