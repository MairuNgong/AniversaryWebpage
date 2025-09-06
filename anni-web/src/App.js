import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Example memory dict
const memories = [
  {
    img: "/mems/mem1.png",
    date: "2023-05-14",
    desc: "The day we had our first trip together ❤️",
  },
  {
    img: "/mems/mem2.png",
    date: "2023-08-20",
    desc: "Our lovely coffee date ☕💘",
  },
  {
    img: "/mems/mem3.png",
    date: "2024-02-14",
    desc: "Valentine’s surprise dinner 💕",
  },
];

export default function AnniversarySurprise() {
  const [authenticated, setAuthenticated] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [current, setCurrent] = useState(
    Math.floor(Math.random() * memories.length)
  );
  const [password, setPassword] = useState("");

  const handleAuth = () => {
    if (password === "loveu") {
      setAuthenticated(true);
      setTimeout(() => setShowHearts(true), 300);
    }
  };

  const shuffleMemory = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * memories.length);
    } while (newIndex === current);
    setCurrent(newIndex);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-pink-100 overflow-hidden">
      {!authenticated && (
        <div className="text-center">
          <div className="text-6xl text-red-500 animate-pulse">❤</div>
          <input
            type="password"
            placeholder="Enter password"
            className="mt-4 p-2 rounded-lg border text-center"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
              onClick={handleAuth}
              className="ml-2 px-4 py-2 bg-red-500 text-white rounded-xl shadow hover:bg-red-600 transition"
            >
              Unlock
          </button>
        </div>
      )}

      {authenticated && (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          {/* Heart Zoom Transition */}
          <AnimatePresence>
            {showHearts &&
              Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [0, 40, 0], 
                    opacity: [0.05, 0, 0] 
                  }}
                  transition={{ 
                    delay: i * 0.5,
                    duration: 6,
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="absolute text-red-400 z-0"
                >
                  <div className="text-6xl text-red-500">❤</div>
                </motion.div>
                )
              )
            }
          </AnimatePresence>

          {/* Memory Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ 
                duration: 1 }}
              className="relative z-10"
            >
              <div className="max-w-sm bg-white shadow-2xl rounded-2xl overflow-hidden">
                <img src={memories[current].img} className="w-full h-56 object-cover" />
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-lg text-pink-600">
                    {memories[current].date}
                  </h3>
                  <p className="text-gray-700 mt-2">{memories[current].desc}</p>
                  <button
                    onClick={shuffleMemory}
                    className="mt-4 w-full bg-pink-500 text-white py-2 rounded-xl shadow hover:bg-pink-600 transition"
                  >
                    Next Memory 💌
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
