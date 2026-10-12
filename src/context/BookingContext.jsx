
import { createContext, useContext, useState } from "react";

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showtime, setShowtime] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [latestBooking, setLatestBooking] = useState(null);
  const [bookings, setBookings] = useState([]);

  function startBooking(movie) {
    setSelectedMovie(movie);
    setShowtime(movie.showtimes[0]);
    setBookingDate(new Date().toLocaleDateString("en-CA"));
    setSelectedSeats([]);
    setLatestBooking(null);
  }

  function toggleSeat(seatId) {
    setSelectedSeats((current) =>
      current.includes(seatId)
        ? current.filter((seat) => seat !== seatId)
        : current.length < 8
          ? [...current, seatId]
          : current
    );
  }

  function confirmBooking(user) {
    if (!selectedMovie || !showtime || !bookingDate || !selectedSeats.length) {
      return null;
    }

    const booking = {
      id: `CB${Date.now().toString().slice(-8)}`,
      movie: selectedMovie,
      showtime,
      bookingDate,
      seats: [...selectedSeats],
      total: selectedSeats.length * selectedMovie.price,
      userEmail: user.email,
      createdAt: new Date().toISOString(),
    };

    setBookings((current) => [booking, ...current]);
    setLatestBooking(booking);
    return booking;
  }

  return (
    <BookingContext.Provider
      value={{
        selectedMovie,
        setSelectedMovie,
        showtime,
        setShowtime,
        bookingDate,
        setBookingDate,
        selectedSeats,
        toggleSeat,
        startBooking,
        confirmBooking,
        latestBooking,
        bookings,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("useBooking must be used inside BookingProvider");
  }

  return context;
}
