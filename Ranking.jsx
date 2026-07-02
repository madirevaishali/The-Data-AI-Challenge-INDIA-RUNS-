import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import CandidateCard from "../components/candidate/CandidateCard";
import useCandidates from "../hooks/useCandidates";

function Ranking() {
  const { candidates, loading, error } = useCandidates();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("desc");

  if (loading) {
    return (
      <MainLayout>
        <div className="text-center mt-20 text-xl font-semibold">
          Loading Candidates...
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="text-center mt-20 text-red-600 text-xl">
          {error}
        </div>
      </MainLayout>
    );
  }

  let filtered = candidates.filter((candidate) =>
    candidate.name.toLowerCase().includes(search.toLowerCase())
  );

  filtered.sort((a, b) =>
    sort === "desc" ? b.match - a.match : a.match - b.match
  );

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-6 py-8">

        <h1 className="text-3xl font-bold mb-6">
          Candidate Rankings
        </h1>

        {/* Search + Sort */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">

          <input
            type="text"
            placeholder="Search Candidate..."
            className="border rounded-lg p-3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border rounded-lg p-3"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="desc">Highest Match</option>
            <option value="asc">Lowest Match</option>
          </select>

        </div>

        {/* Candidate List */}
        {filtered.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No candidates found.
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
              />
            ))}
          </div>
        )}

      </div>
    </MainLayout>
  );
}

export default Ranking;