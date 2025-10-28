import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { TrendingUp } from "lucide-react"; // optional icon (shadcn/lucide-react)

interface TicketData {
  day: string;
  tickets: number;
}

const TicketVolume: React.FC = () => {
  const data: TicketData[] = [
    { day: "Mon", tickets: 120 },
    { day: "Tue", tickets: 60 },
    { day: "Wed", tickets: 100 },
    { day: "Thu", tickets: 80 },
    { day: "Fri", tickets: 110 },
    { day: "Sat", tickets: 40 },
    { day: "Sun", tickets: 55 },
  ];

  const highlightDay = "Wed"; // The bar to highlight
  const percentageChange = +5; // 5% increase

  return (
    <div className="rounded-lg border border-gray-200 bg-white dark:bg-gray-800 p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            Ticket Volume
          </p>
          <p className="text-sm text-gray-500">Last 7 days</p>
        </div>

        <div className="flex items-center text-green-500 font-medium text-sm">
          +{percentageChange}%
          <TrendingUp size={16} className="ml-1" />
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 12 }}
          />
          <Tooltip
            cursor={{ fill: "rgba(11, 8, 8, 0.05)" }}
            contentStyle={{
              borderRadius: "10px",
              border: "none",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          />
          <Bar
            dataKey="tickets"
            radius={[6, 6, 0, 0]}
            barSize={35}
            fill="#bfdbfe" // default blue-200
            className="cursor-pointer"
          >
            {/* {data.map((entry, index) => (
              <rect
                key={index}
                x={index * 60}
                y={180 - entry.tickets}
                width={35}
                height={entry.tickets}
                rx={6}
                fill={entry.day === highlightDay ? "#3b82f6" : "#dbeafe"} // highlight color
              />
            ))} */}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TicketVolume;
