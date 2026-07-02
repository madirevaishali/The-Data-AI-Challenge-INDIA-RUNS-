import os
import csv

from data_loader import load_candidates
from candidate_matcher import match_candidate


OUTPUT_FOLDER = "outputs"
OUTPUT_FILE = os.path.join(OUTPUT_FOLDER, "ranked_candidates.csv")


def rank_candidates(limit=100):

    print(f"\nProcessing {limit} candidates...\n")

    candidates = load_candidates()

    ranked = []

    total = min(limit, len(candidates))

    for i, candidate in enumerate(candidates[:total], start=1):

        ranked.append(match_candidate(candidate))

        if i == 1 or i % 10 == 0:
            print(f"Processed {i}/{total}")

    ranked.sort(
        key=lambda x: x["final_score"],
        reverse=True
    )

    return ranked


def save_results(results):

    os.makedirs(OUTPUT_FOLDER, exist_ok=True)

    with open(OUTPUT_FILE, "w", newline="", encoding="utf-8") as file:

        writer = csv.writer(file)

        writer.writerow([
            "Rank",
            "Candidate ID",
            "Headline",
            "Experience",
            "Skill Score",
            "Semantic Score",
            "Evidence Score",
            "Experience Score",
            "Location Score",
            "GitHub Score",
            "Profile Score",
            "Final Score",
            "Recommendation"
        ])

        for rank, candidate in enumerate(results, start=1):

            writer.writerow([
                rank,
                candidate["candidate_id"],
                candidate["headline"],
                candidate["experience_years"],
                candidate["skill_score"],
                candidate["semantic_score"],
                candidate["evidence_score"],
                candidate["experience_score"],
                candidate["location_score"],
                candidate["github_score"],
                candidate["profile_score"],
                candidate["final_score"],
                candidate["recommendation"]
            ])


if __name__ == "__main__":

    ranked_candidates = rank_candidates(limit=100)

    print("\n========== TOP CANDIDATES ==========\n")

    for rank, candidate in enumerate(ranked_candidates[:10], start=1):

        print(f"Rank #{rank}")

        print(f"Candidate ID      : {candidate['candidate_id']}")
        print(f"Headline          : {candidate['headline']}")
        print(f"Experience        : {candidate['experience_years']} years")

        print("\nScores")
        print(f"Skill Score       : {candidate['skill_score']}")
        print(f"Semantic Score    : {candidate['semantic_score']}")
        print(f"Evidence Score    : {candidate['evidence_score']}")
        print(f"Experience Score  : {candidate['experience_score']}")
        print(f"Location Score    : {candidate['location_score']}")
        print(f"GitHub Score      : {candidate['github_score']}")
        print(f"Profile Score     : {candidate['profile_score']}")

        print(f"\nFinal Score       : {candidate['final_score']}")
        print(f"Recommendation    : {candidate['recommendation']}")

        print("-" * 60)

    save_results(ranked_candidates)

    print("\nResults saved to:")
    print(os.path.abspath(OUTPUT_FILE))

    print("\nRanking completed successfully!")