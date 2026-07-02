import dummyCandidates from "../../data/dummyCandidates";

function TopCandidates() {

  const sortedCandidates = [...dummyCandidates].sort(
    (a, b) => b.match - a.match
  );

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-xl font-bold mb-5">
        🏆 Top Ranked Candidates
      </h2>

      {sortedCandidates.map((candidate) => (

        <div
          key={candidate.id}
          className="flex justify-between border-b py-3"
        >

          <div>

            <h3 className="font-semibold">
              {candidate.name}
            </h3>

            <p className="text-sm text-gray-500">
              {candidate.role}
            </p>

          </div>

          <span className="font-bold text-blue-600">
            {candidate.match}%
          </span>

        </div>

      ))}

    </div>
  );
}

export default TopCandidates;