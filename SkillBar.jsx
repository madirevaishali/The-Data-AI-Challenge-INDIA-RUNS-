import { Link } from "react-router-dom";

function CandidateCard({ candidate }) {
  return (
    <div className="p-4 border rounded-lg bg-white hover:shadow-lg transition duration-200">

      <div className="flex justify-between items-center">

        <div>
          <h2 className="text-xl font-semibold">
            {candidate.name}
          </h2>

          <p className="text-gray-500">
            {candidate.role}
          </p>

          <p className="text-sm text-gray-400">
            {candidate.experience} yrs experience
          </p>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold text-blue-600">
            {candidate.match}%
          </p>

          {candidate.shortlisted && (
            <span className="text-green-600 text-sm">
              Shortlisted
            </span>
          )}
        </div>

      </div>

      <div className="mt-4 flex gap-3">

        <Link
          to={`/candidate/${candidate.id}`}
          className="text-blue-600 text-sm hover:underline"
        >
          View Details
        </Link>

      </div>

    </div>
  );
}

export default CandidateCard;