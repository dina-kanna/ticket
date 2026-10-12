import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Ticket, X } from "lucide-react";

export default function SeatCountModal({ movie, isOpen, onClose }) {
  const [selectedCount, setSelectedCount] = useState(2);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const ticketPrice = movie?.price || 190;
  const totalPrice = selectedCount * ticketPrice;

  const handleSelectSeats = () => {
    navigate(`/seats/${movie.id}`, { state: { ticketCount: selectedCount } });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 sm:p-6">
      <div className="relative w-full max-w-sm sm:max-w-md max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-5 text-gray-900 shadow-2xl dark:bg-[#15151e] dark:text-white sm:p-8">
        
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 transition"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <h3 className="text-center text-lg sm:text-xl font-black">How many seats?</h3>

        <div className="my-5 flex justify-center">
          <div className="flex h-16 w-24 sm:h-20 sm:w-28 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
            <Ticket size={40} />
          </div>
        </div>

        <div className="flex justify-start sm:justify-center gap-1.5 overflow-x-auto pb-2 px-1 scrollbar-none">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => {
            const isSelected = selectedCount === num;
            return (
              <button
                key={num}
                type="button"
                onClick={() => setSelectedCount(num)}
                className={`flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full text-xs sm:text-sm font-bold transition-all ${
                  isSelected
                    ? "bg-red-500 text-white shadow-lg shadow-red-500/40 scale-110"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-white/10"
                }`}
              >
                {num}
              </button>
            );
          })}
        </div>

        {/* Category Pricing Section */}
        <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-2 border-t border-b border-gray-100 py-4 text-center dark:border-white/10">
          <div>
            <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-400">BOX</p>
            <p className="mt-1 text-sm sm:text-base font-black">₹180</p>
            <span className="text-[9px] sm:text-[10px] font-semibold text-emerald-500">AVAILABLE</span>
          </div>
          <div className="border-x border-gray-100 dark:border-white/10 px-1">
            <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-400">GOLD</p>
            <p className="mt-1 text-sm sm:text-base font-black">₹{ticketPrice}</p>
            <span className="text-[9px] sm:text-[10px] font-semibold text-emerald-500">AVAILABLE</span>
          </div>
          <div>
            <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-400">SILVER</p>
            <p className="mt-1 text-sm sm:text-base font-black">₹150</p>
            <span className="text-[9px] sm:text-[10px] font-semibold text-emerald-500">AVAILABLE</span>
          </div>
        </div>

        <p className="mt-3 sm:mt-4 text-center text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">
          Book the <span className="inline-block h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-sm bg-amber-400 align-middle" /> <span className="font-semibold text-gray-800 dark:text-gray-200">Bestseller Seats</span> in this cinema at no extra cost!
        </p>

        <button
          type="button"
          onClick={handleSelectSeats}
          className="mt-5 sm:mt-6 flex w-full items-center justify-between rounded-2xl bg-red-500 px-5 sm:px-6 py-3.5 text-center font-black text-white shadow-lg shadow-red-500/30 transition hover:bg-red-600 active:scale-[0.98]"
        >
          <span className="text-sm sm:text-base">Select Seats</span>
          <span className="text-xs sm:text-sm font-bold opacity-95">₹{totalPrice}</span>
        </button>

      </div>
    </div>
  );
}