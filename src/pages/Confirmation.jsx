import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { CheckCircle2, Ticket, CalendarDays, Clock, MapPin, Printer, Film, ReceiptIndianRupee, QrCode, CreditCard, Landmark, Banknote } from "lucide-react";
import { useBooking } from "../context/BookingContext";

const GST_RATE = 0.18;

export default function Confirmation() {
  const { latestBooking } = useBooking();
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isPaid, setIsPaid] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  if (!latestBooking) {
    return <Navigate to="/" replace />;
  }

  const movie = latestBooking.movie;
  const seats = latestBooking.seats || [];
  const bookingId = latestBooking.id;

  const subtotal = Number(latestBooking.total || 0);
  const gstAmount = Math.round(subtotal * GST_RATE * 100) / 100;
  const totalWithGST = subtotal + gstAmount;

  function handlePaymentAndConfirm(e) {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
    }, 1200);
  }

  function handlePrint() {
    window.print();
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-gray-50 px-4 py-10 text-gray-900 dark:bg-[#09090f] dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <CheckCircle2
            size={68}
            className="mx-auto text-emerald-500 dark:text-emerald-400"
          />

          <p className="mt-4 text-sm font-bold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-400">
            {isPaid ? "Payment Successful & Confirmed" : "Complete Your Payment"}
          </p>

          <h1 className="mt-3 text-3xl font-black sm:text-4xl">
            {isPaid ? "Enjoy the Show!" : "Choose Payment Method"}
          </h1>

          <p className="mt-3 text-gray-600 dark:text-gray-400">
            {isPaid
              ? "Your movie ticket is ready. Please keep your booking details."
              : "Select your preferred payment option below to generate your ticket."}
          </p>
        </div>

        {/* PAYMENT METHOD SELECTION FORM (Appears before confirmation if not paid) */}
        {!isPaid ? (
          <form onSubmit={handlePaymentAndConfirm} className="space-y-6">
            
            {/* BILL SUMMARY BOX */}
            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-[#18181f] sm:p-8">
              <h2 className="text-xl font-black">Booking Payment Summary</h2>
              
              <div className="mt-4 flex items-center justify-between text-sm border-b border-gray-100 pb-3 dark:border-white/10">
                <span className="text-gray-600 dark:text-gray-400">Movie</span>
                <span className="font-bold">{movie?.title}</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm border-b border-gray-100 pb-3 dark:border-white/10">
                <span className="text-gray-600 dark:text-gray-400">Seats ({seats.length})</span>
                <span className="font-bold">{seats.join(", ")}</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm border-b border-gray-100 pb-3 dark:border-white/10">
                <span className="text-gray-600 dark:text-gray-400">Ticket Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm border-b border-gray-100 pb-3 dark:border-white/10">
                <span className="text-gray-600 dark:text-gray-400">GST (18%)</span>
                <span>₹{gstAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="mt-4 flex items-center justify-between text-lg font-black">
                <span>Total Payable Amount</span>
                <span className="text-red-500 text-2xl">₹{totalWithGST.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
              </div>
            </section>

            {/* PAYMENT OPTIONS SELECTOR */}
            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-[#18181f] sm:p-8">
              <h3 className="text-lg font-bold">Select Payment Option</h3>

              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                
                {/* UPI / QR */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("upi")}
                  className={`flex flex-col items-center justify-center gap-2 rounded-2xl border p-4 text-center transition ${
                    paymentMethod === "upi"
                      ? "border-red-500 bg-red-500/10 text-red-500 shadow-md"
                      : "border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 dark:border-white/10 dark:bg-white/5 dark:text-gray-300"
                  }`}
                >
                  <QrCode size={24} />
                  <span className="text-xs font-bold">UPI / QR Code</span>
                </button>

                {/* Card */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`flex flex-col items-center justify-center gap-2 rounded-2xl border p-4 text-center transition ${
                    paymentMethod === "card"
                      ? "border-red-500 bg-red-500/10 text-red-500 shadow-md"
                      : "border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 dark:border-white/10 dark:bg-white/5 dark:text-gray-300"
                  }`}
                >
                  <CreditCard size={24} />
                  <span className="text-xs font-bold">Credit / Debit Card</span>
                </button>

                {/* Net Banking */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("netbanking")}
                  className={`flex flex-col items-center justify-center gap-2 rounded-2xl border p-4 text-center transition ${
                    paymentMethod === "netbanking"
                      ? "border-red-500 bg-red-500/10 text-red-500 shadow-md"
                      : "border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 dark:border-white/10 dark:bg-white/5 dark:text-gray-300"
                  }`}
                >
                  <Landmark size={24} />
                  <span className="text-xs font-bold">Net Banking</span>
                </button>

                {/* Cash */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cash")}
                  className={`flex flex-col items-center justify-center gap-2 rounded-2xl border p-4 text-center transition ${
                    paymentMethod === "cash"
                      ? "border-red-500 bg-red-500/10 text-red-500 shadow-md"
                      : "border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 dark:border-white/10 dark:bg-white/5 dark:text-gray-300"
                  }`}
                >
                  <Banknote size={24} />
                  <span className="text-xs font-bold">Cash at Counter</span>
                </button>

              </div>

              {/* DYNAMIC PAYMENT METHOD DETAILS */}
              <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50 p-5 dark:border-white/10 dark:bg-black/20">
                {paymentMethod === "upi" && (
                  <div className="text-center space-y-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Scan QR Code using GPay, PhonePe, or Paytm</p>
                    <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-2xl bg-white border border-gray-200 p-2 shadow-sm dark:bg-white/90">
                      <QrCode size={110} className="text-gray-900" />
                    </div>
                    <p className="text-xs text-gray-500">UPI ID: cinebook@oksbi</p>
                  </div>
                )}

                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Enter Card Details</p>
                    <input type="text" placeholder="Card Number (4532 •••• •••• 9821)" className="w-full rounded-xl border border-gray-300 bg-white p-3 text-sm dark:border-white/10 dark:bg-[#15151e] dark:text-white" />
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" placeholder="MM / YY" className="rounded-xl border border-gray-300 bg-white p-3 text-sm dark:border-white/10 dark:bg-[#15151e] dark:text-white" />
                      <input type="password" placeholder="CVV" maxLength={4} className="rounded-xl border border-gray-300 bg-white p-3 text-sm dark:border-white/10 dark:bg-[#15151e] dark:text-white" />
                    </div>
                  </div>
                )}

                {paymentMethod === "netbanking" && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Select Bank</p>
                    <select className="w-full rounded-xl border border-gray-300 bg-white p-3 text-sm dark:border-white/10 dark:bg-[#15151e] dark:text-white">
                      <option>State Bank of India (SBI)</option>
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>Axis Bank</option>
                    </select>
                  </div>
                )}

                {paymentMethod === "cash" && (
                  <div className="text-center py-2">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Pay cash directly at the cinema box office counter within 30 minutes of booking.</p>
                  </div>
                )}
              </div>

              {/* PAY & CONFIRM BUTTON */}
              <button
                type="submit"
                disabled={isProcessing}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 py-4 text-base font-black text-white shadow-lg shadow-red-600/30 transition hover:bg-red-700 disabled:opacity-50"
              >
                {isProcessing ? "Processing Payment..." : `Pay ₹${totalWithGST.toLocaleString("en-IN", { minimumFractionDigits: 2 })} & Confirm`}
              </button>
            </section>

          </form>
        ) : (
          /* FINAL GENERATED TICKET VIEW (Once payment is successful) */
          <>
            <section
              id="final-ticket"
              className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl dark:border-white/10 dark:bg-[#18181f] dark:shadow-2xl"
            >
              <div className="flex items-center justify-between bg-red-600 px-5 py-4 text-white sm:px-7">
                <div className="flex items-center gap-3">
                  <Ticket size={27} />
                  <div>
                    <p className="text-lg font-black">CineBook</p>
                    <p className="text-xs text-red-100">
                      Your Movie Ticket
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs text-red-100">Booking ID</p>
                  <p className="font-bold">{bookingId}</p>
                </div>
              </div>

              <div className="grid gap-5 p-5 sm:grid-cols-[140px_1fr] sm:p-7">
                <img
                  src={movie?.poster}
                  alt={movie?.title || "Movie poster"}
                  className="mx-auto h-48 w-36 rounded-xl object-cover shadow-lg shadow-black/10 dark:shadow-black/40 sm:mx-0"
                />

                <div className="flex flex-col justify-center">
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-500 dark:text-red-400">
                    <Film size={15} />
                    Movie Ticket
                  </p>

                  <h2 className="mt-2 text-2xl font-black">
                    {movie?.title || "Movie"}
                  </h2>

                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {Array.isArray(movie?.genre)
                      ? movie.genre.join(" • ")
                      : movie?.genre || "Movie screening"}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <CalendarDays size={17} className="text-red-500 dark:text-red-400" />
                    <span>
                      {latestBooking.bookingDate || "Date not available"}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <Clock size={17} className="text-red-500 dark:text-red-400" />
                    <span>
                      {latestBooking.showtime || "Time not available"}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <MapPin size={17} className="text-red-500 dark:text-red-400" />
                    <span>
                      {latestBooking.selectedTheater || "CineBook Demo Cinema"}
                      {latestBooking.theaterArea ? ` (${latestBooking.theaterArea})` : ""}
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative border-t-2 border-dashed border-gray-200 dark:border-white/15">
                <span className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-gray-50 dark:bg-[#09090f]" />
                <span className="absolute -right-3 -top-3 h-6 w-6 rounded-full bg-gray-50 dark:bg-[#09090f]" />
              </div>

              <div className="p-5 sm:p-7">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-gray-100 p-4 dark:bg-white/5">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Number of Tickets</p>
                    <p className="mt-1 text-xl font-black">{seats.length}</p>
                  </div>

                  <div className="rounded-xl bg-gray-100 p-4 dark:bg-white/5">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Selected Seats</p>
                    <p className="mt-1 break-words text-lg font-black">
                      {seats.length ? seats.join(", ") : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-3 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-white/10 dark:bg-black/20">
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-800 dark:text-gray-300">
                    <ReceiptIndianRupee size={18} className="text-red-500 dark:text-red-400" />
                    Bill Summary & Paid
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Ticket Subtotal</span>
                    <span>₹{subtotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      GST ({GST_RATE * 100}%)
                    </span>
                    <span>₹{gstAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-200 pt-3 dark:border-white/10">
                    <div>
                      <p className="font-bold">Total Paid</p>
                      <p className="mt-1 text-xs text-gray-500">
                        {seats.length} ticket(s), via {paymentMethod.toUpperCase()}
                      </p>
                    </div>

                    <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                      ₹{totalWithGST.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Actions */}
            <div className="mt-6 grid gap-3 sm:grid-cols-3 print:hidden">
              <button
                type="button"
                onClick={handlePrint}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-3 font-bold transition hover:bg-gray-100 dark:border-white/20 dark:hover:bg-white/5"
              >
                <Printer size={18} />
                Print Ticket
              </button>

              <Link
                to="/profile"
                className="rounded-xl border border-gray-300 px-4 py-3 text-center font-bold transition hover:bg-gray-100 dark:border-white/20 dark:hover:bg-white/5"
              >
                My Bookings
              </Link>

              <Link
                to="/"
                className="rounded-xl bg-red-600 px-4 py-3 text-center font-bold text-white transition hover:bg-red-700"
              >
                Browse Movies
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Print styling */}
      <style>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          body * {
            visibility: hidden;
          }
          #final-ticket,
          #final-ticket * {
            visibility: visible;
          }
          #final-ticket {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            color: black !important;
            background: white !important;
            border: 1px solid #ddd;
            box-shadow: none;
          }
        }
      `}</style>
    </main>
  );
}