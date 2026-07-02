function SkillBar({ skill, score }) {
  return (
    <div className="mb-5">
      <div className="flex justify-between mb-2">
        <span className="font-medium">{skill}</span>
        <span>{score}%</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-blue-600 h-3 rounded-full"
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );
}

export default SkillBar;