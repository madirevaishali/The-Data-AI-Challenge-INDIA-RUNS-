function CompareCard({ candidate }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold text-center">
        {candidate.name}
      </h2>

      <div className="text-center mt-4">

        <h1 className="text-5xl font-bold text-blue-600">
          {candidate.match}%
        </h1>

        <p className="text-gray-500">
          Match Score
        </p>

      </div>

      <hr className="my-6" />

      <div className="space-y-4">

        <div>
          <h3 className="font-semibold">
            Experience
          </h3>

          <p>{candidate.experience}</p>
        </div>

        <div>
          <h3 className="font-semibold">
            Verified Skills
          </h3>

          <div className="flex flex-wrap gap-2 mt-2">

            {candidate.verifiedSkills.map(skill => (

              <span
                key={skill.name}
                className="bg-green-100 text-green-700 px-3 py-1 rounded-full"
              >
                {skill.name}
              </span>

            ))}

          </div>
        </div>

        <div>

          <h3 className="font-semibold">
            Behavioral Traits
          </h3>

          <div className="flex flex-wrap gap-2 mt-2">

            {candidate.behavior.map(item => (

              <span
                key={item}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
              >
                {item}
              </span>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default CompareCard;