import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Example memory dict
const memories = [
  {
    img: "/mems/first.jpg",
    date: "01-10-2022",
    desc: "First Date 💕",
  },
  {
    img: "/mems/second.jpg",
    date: "03-05-2023",
    desc: "ได้ปุยเมฆมาแล้ว",
  },
  {
    img: "/mems/third.jpg",
    date: "26-08-2023",
    desc: "My Birthday 🎂",
  },
  {
    img: "/mems/forth.jpg",
    date: "11-09-2023",
    desc: "พาปุ๊กกุมาอยู่ด้วยกัน",
  },
  {
    img: "/mems/fifth.jpg",
    date: "30-10-2023",
    desc: "วันเกิดคนน่ารัก 🎂",
  },
  {
    img: "/mems/sixth.jpg",
    date: "4-11-2023",
    desc: "ไปหา totoro 🐈",
  },
  {
    img: "/mems/seven.jpg",
    date: "02-12-2023",
    desc: "ไปนอนบ้านแฟน",
  },
  {
    img: "/mems/eight.jpg",
    date: "21-09-2024",
    desc: "ไปเที่ยวววว",
  },
  { img: "/mems/eight2.jpg",
    date: "25-12-2024",
    desc: "merry xmas 🎄",
  },
  { img: "/mems/nine.jpg",
    date: "14-02-2025",
    desc: "valentine's day 💘",
  },
  { img: "/mems/tenth.jpg",
    date: "27-02-2025",
    desc: "Aquarium date🐠",
  },
  { img: "/mems/eleventh.jpg",
    date: "27-07-2025",
    desc: "เที่ยวagain + เลี้ยงเด็ก",
  },
  { img: "/mems/twelfth.jpg",
    date: "26-08-2025",
    desc: "my birthday with lego ด้วย ⭐",
  },

];

export default function AnniversarySurprise() {
  const [authenticated, setAuthenticated] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [current, setCurrent] = useState(0);
  const [password, setPassword] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [step, setStep] = useState(0);
  const [last, setLast] = useState(false);


  const handleAuth = () => {
    if (password === "loveu") {
      setAuthenticated(true);
      setTimeout(() => setShowHearts(true), 300);
    }
  };

  const shuffleMemory = () => {
    if (current === memories.length - 1) {
      setLast(true);
    }
    else {
      setCurrent(current + 1);
    }
    if (firstLoad) setFirstLoad(false);
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
        <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden">
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
          
          <AnimatePresence>
            <motion.div
              key="title"
              initial={{ opacity: 0, scale: 0, y: 0 }}
              animate={
                step === 0
                  ? { opacity: 1, scale: 1.2 } 
                  : { y: -300, opacity: 1, scale: 1.2} 
              }
              transition={
                step === 0
                  ? { duration: 1, ease: "easeInOut"}
                  : { delay: 0.5, duration: 1, ease: "easeInOut" }
              }
              onAnimationComplete={() => {
                if (step === 0) setStep(1); 
                
                else setShowCard(true);   
              }}
              className="absolute z-10"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-pink-600 text-center p-4 rounded-xl">
                Happy 3rd Years Anniversary! 🎉
              </h1>
              
            </motion.div>
          </AnimatePresence>

          {/* Memory Card */}
          {showCard && (
          <AnimatePresence mode="wait">
            <motion.div
              key={last ? "last" : current}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 , transition: { duration: firstLoad ? 6 : 0.8, ease: "easeInOut" } }}
              exit={{ opacity: 0, scale: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
              
              className="relative z-10"
            >
              <div className="max-w-sm bg-white shadow-2xl rounded-2xl overflow-hidden">
                {last ? (
                  <div className="p-8 text-center">
                    <h3 className="font-semibold text-lg text-pink-600">
                      Let's take our new memory from now! 🎉
                    </h3>
                  </div>
                ) : (
                      <>
                      <img src={memories[current].img} alt="memory" className="w-full h-56 object-cover" />
                      <div className="p-4 text-center">
                        <h3 className="font-semibold text-lg text-pink-600">
                          {memories[current].date}
                        </h3>
                        <p className="text-gray-700 mt-2">{memories[current].desc}</p>
                        <button
                          onClick={shuffleMemory}
                          className="mt-4 w-full bg-pink-500 text-white py-2 rounded-xl shadow hover:bg-pink-600 transition"
                        >
                          Next 
                        </button>
                      </div>
                      </>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
          )}
        </div>
      )}
    </div>
  );
}
