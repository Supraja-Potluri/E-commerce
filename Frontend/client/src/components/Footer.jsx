// import React from "react";

// export default function Footer() {
//   return (
//     <footer className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white text-center py-6 mt-10 shadow-inner">
//       <p className="text-lg font-semibold">
//         © {new Date().getFullYear()}{" "}
//         <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-white animate-pulse">
//           E-Commerce
//         </span>
//         . All rights reserved.
//       </p>
//     </footer>
//   );
// }


import React from "react";

export default function Footer() {
  return (
    <footer className="mt-16 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white">
      <div className="h-[3px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
      <div className="container mx-auto px-6 py-6 text-center">
        <p className="text-sm opacity-80">
          © {new Date().getFullYear()} <span className="font-semibold text-white">ElectroSpace</span> • Crafted with ❤️ using React + Tailwind + Firebase
        </p>
        <div className="flex justify-center gap-6 mt-4 text-lg">
          <a href="#" className="hover:text-blue-400 transition">Facebook</a>
          <a href="#" className="hover:text-purple-400 transition">Instagram</a>
          <a href="#" className="hover:text-pink-400 transition">GitHub</a>
        </div>
      </div>
    </footer>
  );
}

