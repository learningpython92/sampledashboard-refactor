import React from "react";
import { motion } from "framer-motion";

export const InsightCard = ({ insight, index }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="rounded-xl p-4 shadow-lg bg-white border-l-4 border-indigo-400"
    >
      <h3 className="text-md font-semibold mb-1">{insight.title}</h3>
      <p className="text-sm text-gray-600">{insight.description}</p>
    </motion.div>
  );
};
