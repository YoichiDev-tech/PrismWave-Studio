import { useState } from "react";

export default function ReviewPopup({ onClose }: { onClose: () => void }) {
  const [rating, setRating] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#0f0f11] border border-white/10 p-8 rounded-xl w-full max-w-md text-white">
        <h2 className="text-2xl font-semibold mb-4">Lascia una recensione</h2>

        <p className="text-white/70 mb-4">
          Com'è stata la tua esperienza con PrismWave?
        </p>

        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`text-2xl ${
                rating && rating >= star ? "text-yellow-400" : "text-white/30"
              }`}
            >
              ⭐
            </button>
          ))}
        </div>

        <textarea
          className="w-full p-3 rounded bg-white/10 border border-white/20 text-white mb-4"
          rows={4}
          placeholder="Raccontaci la tua esperienza..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white"
          >
            Magari più tardi
          </button>

          <button
            onClick={() => {
              console.log("Review submitted:", { rating, message });
              onClose();
            }}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-white"
          >
            Invia la recensione
          </button>
        </div>
      </div>
    </div>
  );
}