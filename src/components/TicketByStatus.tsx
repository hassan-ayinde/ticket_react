import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

interface TicketData {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number;
}

const TicketsByStatus: React.FC = () => {
  const data: TicketData[] = [
    { name: "Resolved", value: 1000, color: "#4ade80" }, // green
    { name: "Open", value: 250, color: "#facc15" }, // yellow
  ];

  const total = data.reduce((acc, cur) => acc + cur.value, 0);

  return (
    <div className="rounded-lg border border-gray-200 p-6 bg-white shadow-sm dark:bg-gray-800">
      <p className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Tickets by Status
      </p>

      <div className="flex justify-center items-center">
        <ResponsiveContainer width={200} height={180}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={90}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center text */}
        <div className="absolute flex flex-col items-center justify-center">
          <p className="text-xl font-semibold text-gray-900 dark:text-white">
            {total >= 1000 ? `${(total / 1000).toFixed(1)}k` : total}
          </p>
          <p className="text-gray-500 text-sm">Total</p>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#4ade80]" />
          <span className="text-gray-700 dark:text-gray-300">
            Resolved <b>{data[0].value}</b>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#facc15]" />
          <span className="text-gray-700 dark:text-gray-300">
            Open <b>{data[1].value}</b>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TicketsByStatus;
