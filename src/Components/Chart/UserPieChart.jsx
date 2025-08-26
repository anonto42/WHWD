/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { PieChart, Pie, Cell, Text, Rectangle } from "recharts";

export default function UserPieChart({ userEngagement }) {
  console.log("userEngagement", userEngagement);
  const data = [
    { name: "Active", value: userEngagement },
    { name: "Inactive", value: 100 - userEngagement },
  ];

  const COLORS = {
    Active: "#A020F0",
    Inactive: "#586FA2",
  };

  const renderCustomLabel = ({ cx, cy }) => {
    const textX = cx;
    const textY = cy;

    const backgroundWidth = 90;
    const backgroundHeight = 90;

    return (
      <>
        <Rectangle
          x={textX - backgroundWidth / 2} // Horizontal center for the background
          y={textY - backgroundHeight / 2} // Vertical center for the background
          width={backgroundWidth}
          height={backgroundHeight}
          fill="#586FA2" // White background color
          radius={9999} // Optional, rounded corners
          // stroke="#ddd"
          strokeWidth={1} // Border width
        />
        <Text
          x={textX}
          y={textY + 8}
          fill="#fff"
          textAnchor="middle"
          style={{ fontWeight: "500", fontSize: 25 }}
        >
          {userEngagement + "%"}
        </Text>
      </>
    );
  };

  return (
    <div className="">
      <PieChart width={350} height={275}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          labelLine={false}
          label={renderCustomLabel}
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}
