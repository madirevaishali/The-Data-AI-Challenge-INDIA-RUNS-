import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import { matchData } from "../../data/analyticsData";

function MatchScoreChart() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-xl font-bold mb-5">
        Candidate Match Scores
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={matchData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="score" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default MatchScoreChart;