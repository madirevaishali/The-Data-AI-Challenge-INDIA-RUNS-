import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { useNavigate } from "react-router-dom";

function Processing() {
  const navigate = useNavigate();

  const messages = [
    "Parsing Resume Data...",
    "Extracting Skills...",
    "Analyzing Job Description...",
    "Matching Candidate Profiles...",
    "Running AI Scoring Model...",
    "Ranking Candidates...",
    "Finalizing Results..."
  ];

  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    // 🚀 progress animation (smooth)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // 🔄 change messages over time
    const msgTimer = setInterval(() => {
      setMessageIndex((prev) =>
        prev < messages.length - 1 ? prev + 1 : prev
      );
    }, 900);

    return () => clearInterval(msgTimer);
  }, []);

  useEffect(() => {
    // 🎯 redirect when done
    if (progress === 100) {
      setTimeout(() => {
        navigate("/ranking");
      }, 800);
    }
  }, [progress, navigate]);

  return (
    <MainLayout>
      <div className="flex items-center justify-center h-[70vh]">
        <div className="w-full max-w-md text-center">

          {/* Title */}
          <h1 className="text-3xl font-bold mb-6">
            AI Analysis Engine
          </h1>

          {/* Message */}
          <p className="text-gray-600 text-lg mb-6">
            {messages[messageIndex]}
          </p>

          {/* Progress Bar */}
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Percentage */}
          <p className="mt-3 text-sm text-gray-500">
            {progress}% Completed
          </p>

          {/* Fake AI “thinking dots” */}
          <div className="mt-6 text-blue-600 text-xl">
            ● ● ●
          </div>

        </div>
      </div>
    </MainLayout>
  );
}

export default Processing;