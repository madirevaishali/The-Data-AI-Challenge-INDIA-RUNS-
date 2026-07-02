import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import { skillData } from "../../data/analyticsData";

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626"];

function SkillDistributionChart() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-xl font-bold mb-5">
        Skill Distribution
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>

          <Pie
            data={skillData}
            dataKey="value"
            outerRadius={100}
            label
          >

            {skillData.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}

          </Pie>

          <Tooltip />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
}

export default SkillDistributionChart;