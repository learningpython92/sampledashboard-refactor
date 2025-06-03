import React from "react";
import { motion } from "framer-motion";

export const SummaryCard = ({ label, value, color }) => {
  const borderColor = {
    blue: "border-blue-500",
    green: "border-green-500",
    red: "border-red-500",
  }[color];

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`bg-white shadow-md p-4 rounded-lg border-l-4 ${borderColor}`}
    >
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
    </motion.div>
  );
};
