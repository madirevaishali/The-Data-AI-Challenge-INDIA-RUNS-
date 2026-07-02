import json
import os

# --------------------------------------------------
# Project Paths
# --------------------------------------------------

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CANDIDATE_FILE = os.path.join(BASE_DIR, "datasets", "candidates.jsonl")


# --------------------------------------------------
# Load Candidates
# --------------------------------------------------

def load_candidates():
    """
    Load all candidates from candidates.jsonl
    """

    candidates = []

    with open(CANDIDATE_FILE, "r", encoding="utf-8") as file:

        for line in file:

            line = line.strip()

            if line:
                candidates.append(json.loads(line))

    return candidates


# --------------------------------------------------
# Build Candidate Profile
# --------------------------------------------------

def build_candidate_profile(candidate):
    """
    Build a clean candidate profile.
    """

    profile = candidate.get("profile", {})

    # -----------------------------
    # GitHub Score (Safe)
    # -----------------------------

    github_score = candidate.get(
        "redrob_signals", {}
    ).get(
        "github_activity_score",
        0
    )

    if github_score is None:
        github_score = 0

    github_score = max(0, min(github_score, 100))

    # -----------------------------
    # Candidate Profile
    # -----------------------------

    candidate_profile = {

        "candidate_id": candidate.get("candidate_id", ""),

        "name": profile.get("name", ""),

        "headline": profile.get("headline", ""),

        "location": profile.get("location", ""),

        "education": [],

        "skills": [],

        "career_history": [],

        "certifications": [],

        "languages": [],

        "experience_years": 0,

        "github_score": github_score,

        "profile_score": candidate.get(
            "redrob_signals", {}
        ).get(
            "profile_completeness_score",
            0
        ),

        "connection_count": candidate.get(
            "redrob_signals", {}
        ).get(
            "connection_count",
            0
        ),

        "redrob_signals": candidate.get(
            "redrob_signals",
            {}
        ),
    }

    # --------------------------------------------------
    # Education
    # --------------------------------------------------

    for edu in candidate.get("education", []):

        degree = edu.get("degree")

        if degree:
            candidate_profile["education"].append(
                degree.strip()
            )

    # --------------------------------------------------
    # Skills
    # --------------------------------------------------

    for skill in candidate.get("skills", []):

        if skill.get("name"):

            candidate_profile["skills"].append(
                skill["name"].lower().strip()
            )

    # --------------------------------------------------
    # Certifications
    # --------------------------------------------------

    for cert in candidate.get("certifications", []):

        if isinstance(cert, dict):

            candidate_profile["certifications"].append(
                cert.get("name", "").strip()
            )

        else:

            candidate_profile["certifications"].append(
                str(cert).strip()
            )

    # --------------------------------------------------
    # Languages
    # --------------------------------------------------

    for lang in candidate.get("languages", []):

        if isinstance(lang, dict):

            candidate_profile["languages"].append(
                lang.get("language", "").strip()
            )

        else:

            candidate_profile["languages"].append(
                str(lang).strip()
            )

    # --------------------------------------------------
    # Career History
    # --------------------------------------------------

    total_months = 0

    for job in candidate.get("career_history", []):

        duration = job.get("duration_months", 0)

        total_months += duration

        candidate_profile["career_history"].append({

            "company": job.get("company", ""),

            "title": job.get("title", ""),

            "duration_months": duration,

            "industry": job.get("industry", ""),

            "is_current": job.get(
                "is_current",
                False
            )

        })

    candidate_profile["experience_years"] = round(
        total_months / 12,
        1
    )

    return candidate_profile


# --------------------------------------------------
# Test Module
# --------------------------------------------------

if __name__ == "__main__":

    print("\nLoading Candidates...\n")

    candidates = load_candidates()

    print(f"Loaded {len(candidates)} candidates\n")

    profile = build_candidate_profile(candidates[0])

    print("========== Candidate Profile ==========\n")

    for key, value in profile.items():

        print(f"{key}: {value}")