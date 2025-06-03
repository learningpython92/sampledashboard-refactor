import React from "react";
import { motion } from "framer-motion";

export const KPICard = ({ kpi, index }) => {
  const isOffTrack = kpi.unit === "%" ? kpi.current < kpi.target : kpi.current > kpi.target;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`rounded-2xl shadow-md p-4 bg-white border-l-4 ${
        kpi.color === "blue"
          ? "border-blue-400"
          : kpi.color === "green"
          ? "border-green-400"
          : "border-red-400"
      }`}
    >
      <div className="text-sm text-gray-500 mb-1">{kpi.name}</div>
      <div className="text-3xl font-semibold text-gray-900">
        {kpi.current}
        {kpi.unit}
      </div>
      <div className="mt-2 text-sm text-gray-600">
        Target: <span className="font-medium">{kpi.target}{kpi.unit}</span>
      </div>

      {isOffTrack && (
        <div className="mt-1 text-sm text-red-500">⚠️ Below target</div>
      )}
    </motion.div>
  );
};
