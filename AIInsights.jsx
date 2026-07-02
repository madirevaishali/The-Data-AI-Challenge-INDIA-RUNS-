import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import { experienceData } from "../../data/analyticsData";

function ExperienceChart() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-xl font-bold mb-5">
        Experience Distribution
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={experienceData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line dataKey="candidates" stroke="#16a34a" />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default ExperienceChart;