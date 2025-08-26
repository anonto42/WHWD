/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useMemo, useState } from "react";

const UserGrowthAreaChart = ({ selectedYear, overviewData }) => {
  // safe read + defaults so hooks always run
  const userBlocks = overviewData?.userGrowthByMonth ?? [];

  const initialChartData = useMemo(() => {
    const block = userBlocks.find((b) => b.year === Number(selectedYear));
    return block ? block.monthlyUserGrowth : [];
  }, [userBlocks, selectedYear]);

  const [chartData, setChartData] = useState(initialChartData);

  useEffect(() => {
    setChartData(initialChartData);
  }, [initialChartData]);

  // Hooks still run even if there's no data yet
  const yMax = useMemo(
    () => Math.max(0, ...chartData.map((d) => d.userCount || 0)),
    [chartData]
  );
  const yDomainMax = Math.max(5, yMax + 5);

  const loading = !overviewData || !overviewData.userGrowthByMonth;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "#FCB917",
            padding: "10px",
            borderRadius: "5px",
            color: "white",
          }}
        >
          <p>{`Month: ${label}`}</p>
          <p>{`Users: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      {/* Optional lightweight loading UI without early-return */}
      {loading && <div>Loading...</div>}

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={loading ? [] : chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="20%" stopColor="#F1CC47" stopOpacity={1} />
              <stop offset="70%" stopColor="#FCB917" stopOpacity={1} />
              <stop offset="95%" stopColor="#946227" stopOpacity={1} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" stroke="#fff" />
          <YAxis stroke="#fff" allowDecimals={false} domain={[0, yDomainMax]} />

          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#334161" }} />

          <Area
            name="Users"
            type="monotone"
            dataKey="userCount"
            stroke="#F1CC47"
            fill="url(#usersGradient)"
            strokeWidth={3}
            activeDot={{ r: 6 }}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserGrowthAreaChart;
