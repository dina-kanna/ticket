import { X, Play } from "lucide-react";

export default function TrailerModal({ movie, isOpen, onClose }) {
  if (!isOpen || !movie) return null;

  const getEmbedUrl = (url) => {
    if (!url) return "https://www.youtube.com/embed/dQw4w9WgXcQ";
    const videoIdMatch = url.match(/(?:v=|youtu\.be\/)([^&]+)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : "dQw4w9WgXcQ";
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-[#14141b] border border-white/10 shadow-2xl">
        
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2 text-white">
            <Play size={18} className="text-red-500 fill-current" />
            <h3 className="font-bold">{movie.title} - Official Trailer</h3>
          </div>
          
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 hover:bg-white/10 hover:text-white transition"
            aria-label="Close trailer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={getEmbedUrl(movie.trailer)}
            title={`${movie.title} Trailer`}
            className="absolute inset-0 h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

      </div>
    </div>
  );
}