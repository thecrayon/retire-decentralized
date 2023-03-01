import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

const InvestmentGraph = ({ principal, apy }) => {
  // calculate investment data for 40 years
  const years = Array.from({ length: 40 }, (_, i) => i + 1);
  const data = years.map((year) => {
    const balance = principal * Math.pow(1 + apy / 100, year);
    return { year, balance };
  });

  return (
    <div className="overflow-x-auto min-w-min">
      <LineChart height={400} data={data}>
        <XAxis
          dataKey="year"
          label={{
            value: "Year",
            position: "insideBottomLeft",
            offset: -5,
          }}
        />
        <YAxis
          label={{ value: "Balance", angle: -90, position: "insideLeft" }}
        />
        <Tooltip
          labelFormatter={(label) => `Year ${label}`}
          formatter={(value) => `$${value.toFixed(2)}`}
        />
        <Legend />
        <Line type="monotone" dataKey="balance" stroke="#2563eb" />
      </LineChart>
    </div>
  );
};

export default InvestmentGraph;
