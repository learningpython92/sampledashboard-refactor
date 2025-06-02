import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TestComponent } from "./components/TestComponent";

import { BU_LIST, kpiData } from "./data/kpiData";
import { KPICard } from "./components/KPICard";
import { InsightCard } from "./components/InsightCard";
import { SummaryCard } from "./components/SummaryCard";
import {
  generateExecutiveInsights,
  filteredKpis,
  getRagSummary,
} from "./data/kpiData";
import KPIChart from "./components/KPIChart";

const App = () => {
  const [selectedBU, setSelectedBU] = useState("All");
  const [selectedKPIName, setSelectedKPIName] = useState("Offer to Join Ratio");

  const summary = useMemo(() => getRagSummary(selectedBU), [selectedBU]);
  const kpis = useMemo(() => filteredKpis(selectedBU), [selectedBU]);
  const insights = useMemo(() => generateExecutiveInsights(kpis), [kpis]);

  const selectedKPI = kpiData.find((kpi) => kpi.name === selectedKPIName);

  const sampleChartData = useMemo(() => {
    if (!selectedKPI) return [];
    if (selectedBU === "All") {
      return Object.entries(selectedKPI.buBreakdown).map(([bu, value]) => ({
        bu,
        value,
      }));
    }
    const value = selectedKPI.buBreakdown[selectedBU];
    return value !== undefined ? [{ bu: selectedBU, value }] : [];
  }, [selectedKPI, selectedBU]);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-100 to-gray-200 px-4 py-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <TestComponent />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.h1
          className="text-4xl font-extrabold text-center text-blue-900 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Talent Acquisition Dashboard
        </motion.h1>
        <motion.p
          className="text-center text-gray-600 mb-8 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Strategic Recruitment Metrics
        </motion.p>

        {/* BU Selector */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {BU_LIST.map((bu) => (
            <motion.button
              key={bu}
              onClick={() => setSelectedBU(bu)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 text-sm rounded-full font-medium transition-all duration-300 ${
                selectedBU === bu
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {bu}
            </motion.button>
          ))}
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <SummaryCard label="Total Positions" value={summary.total} color="blue" />
          <SummaryCard label="Available" value={summary.available} color="green" />
          <SummaryCard label="Critical Gap" value={summary.gap} color="red" />
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {kpis.map((kpi, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <KPICard kpi={kpi} index={index} />
            </motion.div>
          ))}
        </div>

        {/* Executive Insights */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Executive Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <InsightCard insight={insight} index={index} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* KPI Chart Card with Dropdown */}
        <motion.div
          layout
          className="bg-white rounded-xl shadow-md p-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {selectedKPIName} by BU
            </h2>
            <select
              value={selectedKPIName}
              onChange={(e) => setSelectedKPIName(e.target.value)}
              className="p-2 border border-gray-300 rounded text-sm"
            >
              {kpiData.map((kpi) => (
                <option key={kpi.name} value={kpi.name}>
                  {kpi.name}
                </option>
              ))}
            </select>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedKPIName + selectedBU}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <KPIChart data={sampleChartData} />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default App;
