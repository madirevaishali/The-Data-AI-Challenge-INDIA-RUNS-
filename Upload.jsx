import { useState } from "react";
import MainLayout from "../layouts/MainLayout";


function Upload() {
  const [jd, setJd] = useState(null);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);


  const handleAnalyze = async () => {
    if (!jd || !resume) {
      alert("Please upload both Job Description and Resume");
      return;
    }


    const formData = new FormData();
    formData.append("jd", jd);
    formData.append("resume", resume);


    try {
      setLoading(true);


      const response = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      });


      const data = await response.json();


      console.log("Response:", data);


      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Failed to connect to backend.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto px-6 py-10">


        <h1 className="text-3xl font-bold mb-6">
          📤 Upload Job & Resume
        </h1>


        {/* Job Description */}
        <div className="card mb-5">
          <label className="font-semibold block mb-2">
            📄 Job Description
          </label>


          <label className="flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-50">


            <span className="text-blue-600 font-medium">
              Choose File
            </span>


            <span className="text-sm text-gray-500">
              {jd ? jd.name : "No file chosen"}
            </span>


            <input
              type="file"
              className="hidden"
              onChange={(e) => setJd(e.target.files[0])}
            />
          </label>
        </div>


        {/* Resume */}
        <div className="card mb-5">
          <label className="font-semibold block mb-2">
            📎 Resume
          </label>


          <label className="flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-50">


            <span className="text-green-600 font-medium">
              Choose File
            </span>


            <span className="text-sm text-gray-500">
              {resume ? resume.name : "No file chosen"}
            </span>


            <input
              type="file"
              className="hidden"
              onChange={(e) => setResume(e.target.files[0])}
            />
          </label>
        </div>


        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Analyzing..." : "🧠 Analyze Candidate"}
        </button>


        {/* Result Section */}
        {result && result.analysis && (
          <div className="mt-8 p-6 border rounded-lg shadow bg-white">


            <h2 className="text-2xl font-bold mb-4">
              Analysis Result
            </h2>


            <p className="mb-2">
              <strong>Resume:</strong> {result.resume}
            </p>


            <p className="mb-2">
              <strong>Overall Score:</strong>{" "}
              {result.analysis.overall_score}%
            </p>


            <p className="mb-2">
              <strong>Semantic Score:</strong>{" "}
              {result.analysis.semantic_score}%
            </p>


            <p className="mb-2">
              <strong>Skill Score:</strong>{" "}
              {result.analysis.skill_score}%
            </p>


            <p className="mb-4">
              <strong>Recommendation:</strong>{" "}
              {result.analysis.recommendation}
            </p>


            <h3 className="font-bold text-green-600">
              ✅ Matched Skills
            </h3>


            <ul className="list-disc ml-6 mb-4">
              {result.analysis.matched_skills.length > 0 ? (
                result.analysis.matched_skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))
              ) : (
                <li>No matched skills</li>
              )}
            </ul>


            <h3 className="font-bold text-red-600">
              ❌ Missing Skills
            </h3>


            <ul className="list-disc ml-6">
              {result.analysis.missing_skills.length > 0 ? (
                result.analysis.missing_skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))
              ) : (
                <li>No missing skills</li>
              )}
            </ul>


          </div>
        )}


      </div>
    </MainLayout>
  );
}


export default Upload;