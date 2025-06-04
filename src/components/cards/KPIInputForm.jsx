import React, { useState } from "react";
import { toast } from "react-toastify";

const fakeAIResponse = (kpi) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Recommendation for "${kpi}": Focus on reducing time-to-fill by optimizing interview rounds.`);
    }, 1500);
  });
};

export const KPIInputForm = () => {
  const [kpi, setKpi] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!kpi.trim()) {
      toast.error("KPI name cannot be empty");
      return;
    }

    setLoading(true);
    setResponse("");

    try {
      const result = await fakeAIResponse(kpi);
      setResponse(result);
      toast.success("AI recommendation ready");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Enter KPI name
        </label>
        <input
          type="text"
          value={kpi}
          onChange={(e) => setKpi(e.target.value)}
          className="w-full p-2 border rounded-md text-sm"
          placeholder="e.g., Time to Fill"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Thinking..." : "Get Recommendation"}
        </button>
      </form>

      {response && (
        <div className="mt-4 p-3 bg-blue-50 text-blue-900 rounded-md text-sm border border-blue-200">
          {response}
        </div>
      )}
    </div>
  );
};
