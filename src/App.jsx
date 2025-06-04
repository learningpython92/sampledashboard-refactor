import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import DashboardLayout from "./components/Dashboard/DashboardLayout";
import { BU_LIST, kpiData, getRagSummary, filteredKpis, generateExecutiveInsights } from "./data/kpiData";

import { KPICard } from "./components/cards/KPICard";
import { InsightCard } from "./components/cards/InsightCard";
import { SummaryCard } from "./components/cards/SummaryCard";
import KPIChart from "./components/cards/KPIChart";
import { KPIInputForm } from "./components/cards/KPIInputForm";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [selectedBU, setSelectedBU] = useState("All");
  const [selectedTab, setSelectedTab] = useState("KPIs");
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
      className="min-h-screen bg-gradient-to-br from-slate-100 to-gray-200"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <DashboardLayout
        buOptions={BU_LIST}
        selectedBU={selectedBU}
        onBUChange={setSelectedBU}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
      >
        <div className="space-y-8">
          <motion.h1
            className="text-4xl font-extrabold text-center text-blue-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Talent Acquisition Dashboard
          </motion.h1>

          <motion.p
            className="text-center text-gray-600 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Strategic Recruitment Metrics
          </motion.p>

          {selectedTab === "KPIs" && (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SummaryCard label="Total Positions" value={summary.total} color="blue" />
                <SummaryCard label="Available" value={summary.available} color="green" />
                <SummaryCard label="Critical Gap" value={summary.gap} color="red" />
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

              {/* KPI Chart */}
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
            </>
          )}

          {selectedTab === "Insights" && (
            <div className="space-y-8">
              <KPIInputForm />

              <div>
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
            </div>
          )}
        </div>
      </DashboardLayout>

      <ToastContainer position="bottom-right" />
    </motion.div>
  );
};

export default App;
