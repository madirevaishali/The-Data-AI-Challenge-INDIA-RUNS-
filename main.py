from rank_candidates import rank_candidates, save_results


def main():

    print("=" * 60)
    print("      AI RECRUITER - CANDIDATE RANKING SYSTEM")
    print("=" * 60)

    ranked_candidates = rank_candidates(limit=100)

    save_results(ranked_candidates)

    print("\n========== TOP 10 CANDIDATES ==========\n")

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

    print("\nResults saved successfully in outputs/ranked_candidates.csv")


if __name__ == "__main__":
    main()