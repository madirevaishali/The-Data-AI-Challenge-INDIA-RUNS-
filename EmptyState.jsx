function RiskCard({ risk }) {
  return (
    <div className="bg-red-50 border border-red-300 rounded-xl p-4">
      ⚠ {risk}
    </div>
  );
}

export default RiskCard;