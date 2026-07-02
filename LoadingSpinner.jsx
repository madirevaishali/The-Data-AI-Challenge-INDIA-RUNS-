function ScoreCard({ score }) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-8 text-center">
      <h2 className="text-xl mb-3">
        Overall Match Score
      </h2>

      <h1 className="text-6xl font-bold">
        {score}%
      </h1>
    </div>
  );
}

export default ScoreCard;