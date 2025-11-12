import React from "react";
import { motion } from "framer-motion";

const Map = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="p-6 sm:p-8 w-full"
    >
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-500 mb-1">My Location</h2>
        <p className="text-sm sm:text-base text-[#c4c5c5]">find us easily on this map.</p>
      </div>

      {/* Responsive Map Embed */}
      <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
        {/* Embed uses q= address query which works well for simple address embeds */}
        <iframe
          title="Map - 23 Wexham Cl, Luton"
          src="https://www.google.com/maps?q=23+Wexham+Cl,+Luton+LU3+3TU,+UK&output=embed"
          className="w-full h-64 sm:h-80 md:h-96 lg:h-[520px] border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="mt-5 text-center text-gray-300 text-sm sm:text-base">
        <p className="font-semibold text-gray-400">23 Wexham Cl</p>
        <p>Luton LU3 3TU, United Kingdom</p>
      </div>
    </motion.div>
  );
};

export default Map;
