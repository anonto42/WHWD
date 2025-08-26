/* eslint-disable react/prop-types */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

const RevenueBarChart = ({ selectedYear, overviewData }) => {
  // console.log("bar chart overview", overviewData);
  const yearData = overviewData.subscriptionsByMonth.find(
    (item) => item.year === Number(selectedYear)
  );

  const initialChartData = yearData ? yearData.monthlySales : [];

  const [chartData, setChartData] = useState(initialChartData);

  useEffect(() => {
    const yearData = overviewData.subscriptionsByMonth.find(
      (item) => item.year === Number(selectedYear)
    );
    setChartData(yearData ? yearData.monthlySales : []);
  }, [selectedYear, overviewData]);

  if (!overviewData || !overviewData.subscriptionsByMonth) {
    return <div>Loading...</div>;
  }

  // Custom tooltip style with white text
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "#334161",
            padding: "10px",
            borderRadius: "5px",
            color: "white",
          }}
        >
          <p>{`Month: ${label}`}</p>
          <p>{`Revenue: ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#334161" }} />
          <Bar
            name="Revenue"
            dataKey="totalSales"
            fill="#F1CC47"
            background={{ fill: "#586FA2" }}
            barSize={20}
            radius={[10, 10, 0, 0]}
            isAnimationActive={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueBarChart;
