import json
import os

# -----------------------------
# Project Paths
# -----------------------------
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CANDIDATE_FILE = os.path.join(BASE_DIR, "datasets", "candidates.jsonl")


def load_candidates():
    """
    Load all candidates.
    """
    candidates = []

    with open(CANDIDATE_FILE, "r", encoding="utf-8") as file:
        for line in file:
            if line.strip():
                candidates.append(json.loads(line))

    return candidates


def calculate_skill_confidence(skill, redrob_signals, career_history):
    """
    Calculate confidence score for one skill.
    """

    confidence = 0

    # -----------------------------
    # Proficiency
    # -----------------------------
    proficiency = skill.get("proficiency", "").lower()

    if proficiency == "advanced":
        confidence += 35

    elif proficiency == "intermediate":
        confidence += 20

    elif proficiency == "beginner":
        confidence += 10

    # -----------------------------
    # Endorsements
    # -----------------------------
    endorsements = skill.get("endorsements", 0)

    confidence += min(endorsements, 20)

    # -----------------------------
    # Experience Duration
    # -----------------------------
    duration = skill.get("duration_months", 0)

    confidence += min(duration / 2, 20)

    # -----------------------------
    # Assessment Score
    # -----------------------------
    assessment_scores = redrob_signals.get(
        "skill_assessment_scores", {}
    )

    assessment = assessment_scores.get(skill["name"])

    if assessment is not None:
        confidence += assessment / 5

    # -----------------------------
    # Career Evidence
    # -----------------------------
    career_evidence = False

    skill_name = skill["name"].lower()

    for job in career_history:

        description = job.get(
            "description", ""
        ).lower()

        if skill_name in description:

            confidence += 15
            career_evidence = True
            break

    confidence = min(round(confidence), 100)

    return {

        "skill": skill["name"],

        "confidence": confidence,

        "endorsements": endorsements,

        "duration_months": duration,

        "assessment": assessment,

        "career_evidence": career_evidence,

        "proficiency": proficiency
    }


def verify_skills(candidate):
    """
    Verify all skills of a candidate.
    """

    verified = []

    skills = candidate.get("skills", [])

    signals = candidate.get(
        "redrob_signals", {}
    )

    career = candidate.get(
        "career_history", []
    )

    for skill in skills:

        verified.append(

            calculate_skill_confidence(
                skill,
                signals,
                career
            )

        )

    return verified


# -------------------------------------------------
# Test
# -------------------------------------------------
if __name__ == "__main__":

    candidates = load_candidates()

    candidate = candidates[0]

    verified = verify_skills(candidate)

    print("\n========== Skill Verification ==========\n")

    for skill in verified:

        print(f"{skill['skill']}")

        print(f"  Confidence      : {skill['confidence']}%")

        print(f"  Endorsements    : {skill['endorsements']}")

        print(f"  Duration        : {skill['duration_months']} months")

        print(f"  Assessment      : {skill['assessment']}")

        print(f"  Career Evidence : {skill['career_evidence']}")

        print(f"  Proficiency     : {skill['proficiency']}")

        print("-" * 45)