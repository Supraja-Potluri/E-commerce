// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// import banner1 from "../assets/hero/airpods.jpg";
// import banner2 from "../assets/hero/headphone.jpg";
// import banner3 from "../assets/hero/smart-watch.jpg";
// import banner4 from "../assets/hero/SOUNDPEATS_PearlClip_02.jpg";
// import banner5 from "../assets/hero/wireless-headphones.jpg";

// const images = [banner1, banner2, banner3, banner4, banner5];

// export default function HeroCarousel() {
//   const [index, setIndex] = useState(0);

//   const nextSlide = () => {
//     setIndex((prev) => (prev + 1) % images.length);
//   };

//   const prevSlide = () => {
//     setIndex((prev) => (prev - 1 + images.length) % images.length);
//   };

//   useEffect(() => {
//     const interval = setInterval(nextSlide, 3000);
//     return () => clearInterval(interval);
//     // eslint-disable-next-line
//   }, []);

//   return (
//     <div className="relative w-full h-80 md:h-96 overflow-hidden rounded-xl shadow-lg bg-black flex items-center justify-center">
//       {/* Image Transition */}
//       <AnimatePresence>
//         <motion.img
//           key={index}
//           src={images[index]}
//           alt="Hero Banner"
//           className="w-full h-full object-contain"
//           style={{ backgroundColor: "#000" }}
//           initial={{ opacity: 0, scale: 1.1 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 1.1 }}
//           transition={{ duration: 0.0 }}
//         />
//       </AnimatePresence>

//       {/* Overlay Text */}
//       <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-white text-center pointer-events-none">
//         <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Welcome to Our Store</h1>
//         <p className="text-lg md:text-xl">Discover amazing gadgets at great prices!</p>
//       </div>

//       {/* Left Arrow */}
//       <button
//         onClick={prevSlide}
//         className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-70 text-white p-3 rounded-full transition-all z-10"
//         aria-label="Previous Slide"
//       >
//         <ChevronLeft size={24} />
//       </button>

//       {/* Right Arrow */}
//       <button
//         onClick={nextSlide}
//         className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-70 text-white p-3 rounded-full transition-all z-10"
//         aria-label="Next Slide"
//       >
//         <ChevronRight size={24} />
//       </button>

//       {/* Dots Navigation */}
//       <div className="absolute bottom-4 w-full flex justify-center space-x-2 z-10">
//         {images.map((_, i) => (
//           <button
//             key={i}
//             onClick={() => setIndex(i)}
//             className={`w-3 h-3 rounded-full ${
//               index === i ? "bg-white" : "bg-gray-400"
//             } transition-all`}
//             aria-label={`Go to slide ${i + 1}`}
//           ></button>
//         ))}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import banner1 from "../assets/hero/airpods.jpg";
import banner2 from "../assets/hero/headphone.jpg";
import banner3 from "../assets/hero/smart-watch.jpg";
import banner4 from "../assets/hero/SOUNDPEATS_PearlClip_02.jpg";
import banner5 from "../assets/hero/wireless-headphones.jpg";

const images = [banner1, banner2, banner3, banner4, banner5];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const nextSlide = () => setIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  // Auto-slide with pause on hover and when user interacts (resets timer)
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(nextSlide, 3000);
    return () => clearInterval(timerRef.current);
  }, [index, paused]);

  // Preload images (nice-to-have)
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <div
      className="relative w-full h-80 md:h-96 overflow-hidden rounded-xl shadow-lg bg-black flex items-center justify-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slide */}
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          alt={`Hero Banner ${index + 1}`}
          className="w-full h-full object-contain"
          style={{ backgroundColor: "#000" }}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Overlay Text */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-black/40 flex flex-col items-center justify-center text-white text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 drop-shadow">
          Welcome to Our Store
        </h1>
        <p className="text-lg md:text-xl opacity-95">Discover amazing gadgets at great prices!</p>
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full transition z-10"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full transition z-10"
        aria-label="Next Slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2.5 w-2.5 rounded-full transition ${
              index === i ? "bg-white" : "bg-white/60 hover:bg-white"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
