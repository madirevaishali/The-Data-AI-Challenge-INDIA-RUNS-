import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { fetchCandidateById } from "../services/api";

import ScoreCard from "../components/candidate/ScoreCard";
import SkillBar from "../components/candidate/SkillBar";
import EvidenceCard from "../components/candidate/EvidenceCard";
import BehaviorCard from "../components/candidate/BehaviorCard";
import RiskCard from "../components/candidate/RiskCard";

function CandidateDetails() {
  const { id } = useParams();

  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCandidate() {
      try {
        const data = await fetchCandidateById(id);
        console.log("Candidate:", data);
        setCandidate(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load candidate");
      } finally {
        setLoading(false);
      }
    }

    loadCandidate();
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <h2 className="text-center mt-20 text-2xl">
          Loading Candidate...
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

  if (!candidate) {
    return (
      <MainLayout>
        <h2 className="text-center mt-20 text-2xl">
          Candidate Not Found
        </h2>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto p-6">

        <h1 className="text-4xl font-bold mb-2">
          {candidate.name}
        </h1>

        <p className="text-gray-500 text-lg mb-6">
          {candidate.role}
        </p>

        <ScoreCard score={candidate.match} />

        <div className="grid lg:grid-cols-2 gap-10 mt-10">

          {/* Skills */}
          <div>
            <h2 className="text-2xl font-bold mb-6">
              Skill Confidence
            </h2>

            {(candidate.skills || []).map((skill) => (
              <SkillBar
                key={skill}
                skill={skill}
                score={candidate.confidence}
              />
            ))}
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-2xl font-bold mb-6">
              Projects
            </h2>

            <div className="space-y-3">
              {(candidate.projects || []).map((project) => (
                <EvidenceCard
                  key={project}
                  evidence={project}
                />
              ))}
            </div>
          </div>

        </div>

        {/* Behavioral Traits */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-5">
            Behavioral Traits
          </h2>

          <div className="flex gap-3 flex-wrap">
            {[
              "Teamwork",
              "Communication",
              "Problem Solving",
            ].map((item) => (
              <BehaviorCard
                key={item}
                trait={item}
              />
            ))}
          </div>
        </div>

        {/* Risk Detection */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-5">
            Risk Detection
          </h2>

          <div className="space-y-3">
            {candidate.id === 1 ? (
              <RiskCard risk="No major risks detected." />
            ) : candidate.id === 2 ? (
              <RiskCard risk="Resume has limited project evidence." />
            ) : (
              <RiskCard risk="Experience is below the preferred requirement." />
            )}
          </div>
        </div>

        {/* Candidate Summary */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-5">
            Candidate Summary
          </h2>

          <ul className="list-disc ml-6 space-y-3">
            <li>Experience: {candidate.experience}</li>
            <li>AI Match Score: {candidate.match}%</li>
            <li>Confidence Score: {candidate.confidence}%</li>
            <li>Recommended Role: {candidate.role}</li>
          </ul>

        </div>

      </div>
    </MainLayout>
  );
}

export default CandidateDetails;