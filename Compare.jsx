import MainLayout from "../layouts/MainLayout";
import useCandidates from "../hooks/useCandidates";
import {
  FiAward,
  FiUser,
  FiBriefcase,
  FiTrendingUp,
} from "react-icons/fi";

function Compare() {
  const { candidates, loading, error } = useCandidates();

  if (loading) {
    return (
      <MainLayout>
        <h2 className="text-center mt-20 text-2xl">
          Loading Candidates...
        </h2>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <h2 className="text-center mt-20 text-red-600">
          {error}
        </h2>
      </MainLayout>
    );
  }

  const sorted = [...(candidates || [])].sort(
    (a, b) => b.match - a.match
  );

  const best = sorted[0];
  const second = sorted[1];
  const third = sorted[2];

  if (!best || !second) {
    return (
      <MainLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold">
            Not enough candidates to compare.
          </h2>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HERO */}

        <div className="rounded-3xl bg-gradient-to-r from-indigo-700 via-blue-700 to-cyan-600 p-10 text-white shadow-xl">

          <h1 className="text-4xl font-bold">
            Compare Top Candidates
          </h1>

          <p className="mt-4 text-blue-100">
            AI comparison of the highest ranked candidates.
          </p>

        </div>

        {/* WINNER */}

        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 text-white shadow-xl flex justify-between items-center">

          <div>

            <div className="flex items-center gap-3">

              <FiAward size={34} />

              <h2 className="text-3xl font-bold">
                Recommended Candidate
              </h2>

            </div>

            <p className="mt-3 text-xl">
              {best.name} • {best.role}
            </p>

            <p className="mt-2">
              Highest AI Match Score ({best.match}%)
            </p>

          </div>

          <div className="text-7xl hidden lg:block">
            🏆
          </div>

        </div>

        {/* TOP CARDS */}

        <div className="grid lg:grid-cols-3 gap-5">

          {[best, second, third]
            .filter(Boolean)
            .map((candidate) => (

              <div
                key={candidate.id}
                className="bg-white rounded-3xl shadow-lg p-4"
              >

                <h2 className="text-2xl font-bold">
                  {candidate.name}
                </h2>

                <p className="text-gray-500">
                  {candidate.role}
                </p>

                <div className="mt-6 space-y-4">

                  <div className="flex justify-between">

                    <span className="flex items-center gap-2">
                      <FiBriefcase />
                      Experience
                    </span>

                    <span>
                      {candidate.experience}
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span>Match</span>

                    <span className="font-bold text-blue-600">
                      {candidate.match}%
                    </span>

                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3">

                    <div
                      className="bg-blue-600 h-3 rounded-full"
                      style={{
                        width: `${candidate.match}%`,
                      }}
                    />

                  </div>

                </div>

              </div>

            ))}

        </div>

        {/* TABLE */}

        <div className="bg-white rounded-3xl shadow-lg p-8 overflow-x-auto">

          <h2 className="text-2xl font-bold mb-6">
            Candidate Comparison
          </h2>

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-justify py-4">
                  Attribute
                </th>

                <th>{best.name}</th>

                <th>{second.name}</th>

                {third && <th>{third.name}</th>}

              </tr>

            </thead>

            <tbody>

              <tr className="border-b">
                <td className="py-4 font-semibold">Role</td>
                <td>{best.role}</td>
                <td>{second.role}</td>
                {third && <td>{third.role}</td>}
              </tr>

              <tr className="border-b">
                <td className="py-4 font-semibold">Experience</td>
                <td>{best.experience || "-"}</td>
                <td>{second.experience || "-"}</td>

                {third && (
                <td>{third.experience || "-"}</td>
                )}
              </tr>

              <tr className="border-b">
                <td className="py-4 font-semibold">Match Score</td>
                <td>{best.match}%</td>
                <td>{second.match}%</td>
                {third && <td>{third.match}%</td>}
              </tr>

              <tr className="border-b">
                <td className="py-4 font-semibold">Confidence</td>

                <td>{best.confidence ? `${best.confidence}%` : "-"}</td>

                <td>{second.confidence ? `${second.confidence}%` : "-"}</td>

                {third && (
                <td>{third.confidence ? `${third.confidence}%` : "-"}</td>
            )}

              </tr>

              <tr className="border-b">
                <td className="py-4 font-semibold">Projects</td>
                <td>{best.projects?.join(", ") || "-"}</td>

                <td>{second.projects?.join(", ") || "-"}</td>

                {third && (
                <td>{third.projects?.join(", ") || "-"}</td>
                )}

              </tr>

              <tr className="border-b">
                <td className="py-4 font-semibold">Status</td>

                <td>
                  {best.shortlisted ? "✅ Shortlisted" : "❌ Rejected"}
                </td>

                <td>
                  {second.shortlisted ? "✅ Shortlisted" : "❌ Rejected"}
                </td>

                {third && (
                  <td>
                    {third.shortlisted
                      ? "✅ Shortlisted"
                      : "❌ Rejected"}
                  </td>
                )}

              </tr>

              <tr>
                <td className="py-4 font-semibold">AI Verdict</td>
                <td>
  {best.match >= 90
    ? "🏆 Highly Recommended"
    : "✅ Recommended"}
</td>

<td>
  {second.match >= 85
    ? "👍 Good Candidate"
    : "✅ Recommended"}
</td>

{third && (
  <td>
    {third.match >= 75
      ? "⚠️ Average Match"
      : "❌ Not Recommended"}
  </td>
)}


              </tr>

            </tbody>

          </table>

        </div>

        {/* AI Recommendation */}

        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white">

          <div className="flex items-center gap-3">

            <FiTrendingUp size={28} />

            <h2 className="text-2xl font-bold">
              AI Recommendation
            </h2>

          </div>

          <p className="mt-5 leading-8">

            Based on AI analysis, skills, projects, experience and
            confidence score,

            <span className="font-bold">
              {" "}
              {best.name}
            </span>

            {" "}is the strongest candidate for the current role.

          </p>

        </div>

      </div>
    </MainLayout>
  );
}

export default Compare;