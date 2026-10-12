import { Armchair, Check } from "lucide-react";

export default function Seat({
  seatId,
  status = "available",
  selected = false,
  onClick,
}) {
  const unavailable = status === "booked";

  const seatStyle = unavailable
    ? "cursor-not-allowed border-gray-600 bg-gray-800 text-gray-500 opacity-60"
    : selected
      ? "border-red-300 bg-gradient-to-br from-red-400 to-red-700 text-white shadow-lg shadow-red-500/30 ring-2 ring-red-400/40"
      : "border-emerald-500/40 bg-gradient-to-b from-emerald-600 to-emerald-900 text-emerald-100 shadow-[0_4px_0_#064e3b] hover:-translate-y-1 hover:border-emerald-300 hover:from-emerald-400 hover:to-emerald-700 hover:text-white hover:shadow-[0_5px_0_#065f46] active:translate-y-0";

  const displayId = seatId.includes("-") ? seatId.replace("-", "") : seatId;

  return (
    <button
      type="button"
      disabled={unavailable}
      onClick={() => {
        if (!unavailable) onClick?.(displayId);
      }}
      aria-pressed={!unavailable ? selected : undefined}
      aria-label={`Seat ${displayId}, ${
        unavailable ? "booked" : selected ? "selected" : "available"
      }`}
      title={`Seat ${displayId} - ${
        unavailable ? "Booked" : selected ? "Selected" : "Available"
      }`}
      className={`group relative flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-200 sm:h-10 sm:w-10 ${seatStyle}`}
    >
      {selected && !unavailable ? (
        <Check
          size={17}
          strokeWidth={3}
          className="drop-shadow-sm"
        />
      ) : (
        <Armchair
          size={18}
          strokeWidth={1.8}
          className={`transition-transform duration-200 ${
            unavailable ? "" : "group-hover:scale-110"
          }`}
        />
      )}

      {/* Seat number */}
      <span className="absolute -bottom-3.5 text-[8px] font-semibold text-gray-500">
        {displayId}
      </span>
    </button>
  );
}

// Helper utility to generate rows A to L, with numbers 1 to 20 formatted cleanly without hyphens
export function generateTheaterSeats() {
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
  const cols = Array.from({ length: 20 }, (_, i) => i + 1);

  return rows.map((row) => ({
    rowLetter: row,
    seats: cols.map((col) => `${row}${col}`),
  }));
}