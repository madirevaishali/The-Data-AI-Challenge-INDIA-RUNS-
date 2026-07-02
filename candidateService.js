const BASE_URL = "http://127.0.0.1:8000";

// ==============================
// Get Dashboard Analytics
// ==============================
export async function fetchAnalytics() {
  const res = await fetch(`${BASE_URL}/analytics`);

  if (!res.ok) {
    throw new Error("Failed to fetch analytics");
  }

  return await res.json();
}

// ==============================
// Get All Candidates
// ==============================
export async function fetchCandidates() {
  const res = await fetch(`${BASE_URL}/candidates`);

  console.log("Candidates Status:", res.status);

  if (!res.ok) {
    throw new Error("Failed to fetch candidates");
  }

  const data = await res.json();

  console.log("Candidates Data:", data);

  return data;
}

// ==============================
// Get Candidate Details
// ==============================
export async function fetchCandidateById(id) {
  const res = await fetch(`${BASE_URL}/candidate/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch candidate");
  }

  return await res.json();
}

// ==============================
// Compare Candidates
// ==============================
export async function compareCandidates(ids) {
  const res = await fetch(`${BASE_URL}/compare`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ids }),
  });

  if (!res.ok) {
    throw new Error("Compare failed");
  }

  return await res.json();
}