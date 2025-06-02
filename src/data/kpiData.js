import {
    Users,
    Clock,
    Target,
    TrendingUp,
    Zap,
    Brain,
    Eye,
  } from "lucide-react";
  
  export const BU_LIST = ["All", "Hydrocarbons", "Jio", "Media", "Retail"];
  
  export const IMPACT_COLORS = {
    High: "text-red-600",
    Medium: "text-yellow-600",
    Low: "text-green-600",
  };
  
  export const ragColors = {
    Green: "from-emerald-400 to-green-500",
    Amber: "from-yellow-400 to-orange-500",
    Red: "from-red-400 to-pink-500",
  };
  
  export const kpiData = [
    {
      id: 1,
      name: "Key Positions Manned",
      current: 85,
      target: 95,
      buBreakdown: { Hydrocarbons: 78, Jio: 82, Media: 92, Retail: 88 },
      unit: "%",
      icon: Users,
      color: "from-blue-500 to-cyan-400",
    },
    {
      id: 2,
      name: "Time to Fill",
      current: 45,
      target: 30,
      buBreakdown: { Hydrocarbons: 52, Jio: 48, Media: 38, Retail: 42 },
      unit: " days",
      icon: Clock,
      color: "from-purple-500 to-pink-400",
    },
    {
      id: 3,
      name: "Gender Diversity",
      current: 42,
      target: 50,
      buBreakdown: { Hydrocarbons: 35, Jio: 38, Media: 45, Retail: 48 },
      unit: "%",
      icon: Target,
      color: "from-green-500 to-teal-400",
    },
    {
      id: 4,
      name: "Internal Movement (IJP)",
      current: 25,
      target: 40,
      buBreakdown: { Hydrocarbons: 28, Jio: 30, Media: 18, Retail: 24 },
      unit: "%",
      icon: TrendingUp,
      color: "from-orange-500 to-red-400",
    },
    {
      id: 5,
      name: "Assessment Adherence",
      current: 88,
      target: 95,
      buBreakdown: { Hydrocarbons: 85, Jio: 90, Media: 92, Retail: 86 },
      unit: "%",
      icon: Zap,
      color: "from-indigo-500 to-purple-400",
    },
    {
      id: 6,
      name: "Offer to Join Ratio",
      current: 78,
      target: 90,
      buBreakdown: { Hydrocarbons: 72, Jio: 75, Media: 82, Retail: 84 },
      unit: "%",
      icon: Eye,
      color: "from-yellow-500 to-orange-400",
    }
  ];
  
  export const getRagStatus = (current, target, isHigher = true) => {
    const ratio = isHigher ? current / target : target / current;
    if (ratio >= 0.95) return "Green";
    if (ratio >= 0.8) return "Amber";
    return "Red";
  };
  
  export const isHigherBetter = (name) => {
    const lowerIsBetter = ["Time to Fill"];
    return !lowerIsBetter.some((metric) => name.includes(metric));
  };
  
  export const filteredKpis = (selectedBU) => {
    if (selectedBU === "All") return kpiData;
    return kpiData.map((kpi) => ({
      ...kpi,
      current: kpi.buBreakdown[selectedBU] ?? kpi.current,
    }));
  };
  
  export const getRagSummary = (selectedBU) => {
    const summaryByBU = {
      Hydrocarbons: { available: 1800, gap: 400 },
      Jio: { available: 2200, gap: 300 },
      Media: { available: 2600, gap: 100 },
      Retail: { available: 1400, gap: 200 },
    };
    if (selectedBU === "All") return { total: 10000, available: 8000, gap: 2000 };
    const { available, gap } = summaryByBU[selectedBU];
    return { total: available + gap, available, gap };
  };
  
  export const generateExecutiveInsights = (kpis) => {
    const insights = [];
  
    const timeToFill = kpis.find((kpi) => kpi.name.includes("Time to Fill"));
    const diversity = kpis.find((kpi) => kpi.name.includes("Gender Diversity"));
    const ijp = kpis.find((kpi) => kpi.name.includes("Internal Movement"));
    const keyPositions = kpis.find((kpi) => kpi.name.includes("Key Positions"));
  
    const performanceGaps = kpis.filter((kpi) => {
      const rag = getRagStatus(kpi.current, kpi.target, isHigherBetter(kpi.name));
      return rag === "Red";
    });
  
    if (performanceGaps.length > 0) {
      insights.push({
        type: "critical",
        title: "Performance Gaps Identified",
        description: `${performanceGaps.length} critical KPIs require immediate attention. Focus on ${performanceGaps[0].name.toLowerCase()} as priority intervention.`,
        impact: "High",
      });
    }
  
    if (ijp && ijp.current < ijp.target * 0.7) {
      insights.push({
        type: "strategic",
        title: "Internal Talent Pipeline at Risk",
        description: `IJP performance at ${ijp.current}% signals succession risk. Accelerate internal movements.`,
        impact: "Medium",
      });
    }
  
    if (timeToFill && timeToFill.current > timeToFill.target * 1.3) {
      insights.push({
        type: "competitive",
        title: "Hiring Cycle Too Slow",
        description: `${timeToFill.current} days to fill vs ${timeToFill.target}. Top talent may be lost to faster firms.`,
        impact: "High",
      });
    }
  
    if (diversity && diversity.current < diversity.target) {
      insights.push({
        type: "governance",
        title: "Diversity Behind Target",
        description: `Gender diversity at ${diversity.current}% (target: ${diversity.target}%). Continue targeted initiatives.`,
        impact: "Medium",
      });
    }
  
    if (keyPositions && keyPositions.current < keyPositions.target) {
      insights.push({
        type: "operational",
        title: "Critical Role Coverage Gap",
        description: `${keyPositions.target - keyPositions.current}% gap in key roles. Prioritize critical hiring.`,
        impact: "High",
      });
    }
  
    return insights.slice(0, 4);
  };
  