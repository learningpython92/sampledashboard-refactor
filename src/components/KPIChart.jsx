import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
  } from "recharts";
  
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  
  const renderCustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { bu, value } = payload[0].payload;
      return (
        <div className="bg-white border rounded shadow-md px-3 py-2 text-sm">
          <strong>{bu}</strong>: {value}%
        </div>
      );
    }
    return null;
  };
  
  const KPIChart = ({ data }) => {
    return (
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="bu"
            cx="50%"
            cy="50%"
            outerRadius={70}
            label={({ bu, percent }) =>
              `${bu}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={renderCustomTooltip} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    );
  };
  
  export default KPIChart;
  