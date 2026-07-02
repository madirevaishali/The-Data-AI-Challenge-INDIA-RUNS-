import MainLayout from "../layouts/MainLayout";
import useCandidates from "../hooks/useCandidates";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  FiUsers,
  FiAward,
  FiTrendingUp,
  FiActivity,
} from "react-icons/fi";

function Analytics() {
  const { candidates } = useCandidates();
  const data = Array.isArray(candidates) ? candidates : [];

  const total = data.length;

  const avgMatch =
    total > 0
      ? Math.round(
          data.reduce((a, c) => a + (c.match || 0), 0) / total
        )
      : 0;

  const shortlisted = data.filter((c) => c.shortlisted).length;
  const rejected = total - shortlisted;

  const pieData = [
    { name: "Shortlisted", value: shortlisted },
    { name: "Rejected", value: rejected },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  const barData = data.map((c) => ({
    name: c.name,
    match: c.match || 0,
  }));

  return (
    <MainLayout>
      <div className="space-y-8">

        {/* HERO */}

        <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 p-10 text-white shadow-xl">

          <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
            📊 Recruitment Intelligence
          </span>

          <h1 className="text-4xl font-bold mt-5">
            Analytics Dashboard
          </h1>

          <p className="mt-4 text-blue-100 max-w-2xl">
            Monitor hiring performance, AI rankings,
            candidate insights and recruitment statistics
            from one executive dashboard.
          </p>

        </div>

        {/* KPI CARDS */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl transition">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Total Candidates
                </p>

                <h2 className="text-4xl font-bold mt-3">
                  {total}
                </h2>

              </div>

              <FiUsers
                size={42}
                className="text-blue-600"
              />

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl transition">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Average Match
                </p>

                <h2 className="text-4xl font-bold text-green-600 mt-3">
                  {avgMatch}%
                </h2>

              </div>

              <FiTrendingUp
                size={42}
                className="text-green-600"
              />

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl transition">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  Shortlisted
                </p>

                <h2 className="text-4xl font-bold text-indigo-600 mt-3">
                  {shortlisted}
                </h2>

              </div>

              <FiAward
                size={42}
                className="text-indigo-600"
              />

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl transition">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500">
                  AI Status
                </p>

                <h2 className="text-2xl font-bold text-green-600 mt-3">
                  Active
                </h2>

              </div>

              <FiActivity
                size={42}
                className="text-green-600"
              />

            </div>

          </div>

        </div>

        {/* CHARTS */}

        <div className="grid lg:grid-cols-2 gap-8">

          {/* PIE */}

          <div className="bg-white rounded-3xl shadow-md p-8">

            <h2 className="text-xl font-bold mb-6">
              🥧 Hiring Outcome
            </h2>

            <ResponsiveContainer width="100%" height={320}>

              <PieChart>

                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={110}
                  label
                >

                  {pieData.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />

                  ))}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

          {/* BAR */}

          <div className="bg-white rounded-3xl shadow-md p-8">

            <h2 className="text-xl font-bold mb-6">
              📈 Candidate Match Scores
            </h2>

            <ResponsiveContainer width="100%" height={320}>

              <BarChart data={barData}>

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="match"
                  fill="#3b82f6"
                  radius={[8, 8, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* AI SUMMARY */}

        <div className="bg-gradient-to-r from-indigo-600 to-blue-700 rounded-3xl p-8 text-white shadow-xl">

          <h2 className="text-2xl font-bold">
            🧠 AI Recruitment Summary
          </h2>

          <p className="mt-5 leading-8 text-blue-100">

            {avgMatch > 75
              ? "The AI analysis indicates a strong candidate pool with excellent skill alignment. Recruiters can confidently proceed with shortlisted applicants for the next hiring stage."
              : "The current candidate pool has moderate alignment with the job requirements. Consider refining the job description or expanding the candidate search for better results."}

          </p>

        </div>

      </div>
    </MainLayout>
  );
}

export default Analytics;