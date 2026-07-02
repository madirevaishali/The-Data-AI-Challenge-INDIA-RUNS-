import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Dashboard from "./pages/Dashboard";
import Ranking from "./pages/Ranking";
import CandidateDetails from "./pages/CandidateDetails";
import Compare from "./pages/Compare";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/candidate/:id" element={<CandidateDetails />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/analytics" element={<Analytics />} />

        <Route
          path="*"
          element={
            <div className="p-10 text-center text-gray-500">
              404 - Page Not Found
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;