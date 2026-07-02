function EvidenceCard({ evidence }) {
  return (
    <div className="bg-green-50 border border-green-300 rounded-xl p-4">
      ✅ {evidence}
    </div>
  );
}

export default EvidenceCard;