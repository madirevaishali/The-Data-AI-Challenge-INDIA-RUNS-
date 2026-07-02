import json
import os

# -----------------------------------------
# Project Paths
# -----------------------------------------
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

CANDIDATE_FILE = os.path.join(
    BASE_DIR,
    "datasets",
    "candidates.jsonl"
)


def load_candidates():
    """
    Load all candidates from candidates.jsonl

    Returns:
        list : List of candidate dictionaries
    """

    candidates = []

    try:

        with open(CANDIDATE_FILE, "r", encoding="utf-8") as file:

            for line in file:

                line = line.strip()

                if line:

                    candidates.append(json.loads(line))

        return candidates

    except FileNotFoundError:

        print("Error: candidates.jsonl not found.")
        return []

    except json.JSONDecodeError:

        print("Error: Invalid JSON format.")
        return []


def get_candidate_by_id(candidate_id):
    """
    Find candidate by candidate_id

    Returns:
        dict or None
    """

    candidates = load_candidates()

    for candidate in candidates:

        if candidate.get("candidate_id") == candidate_id:

            return candidate

    return None


def total_candidates():
    """
    Return total number of candidates.
    """

    return len(load_candidates())


# -----------------------------------------
# Test Module
# -----------------------------------------
if __name__ == "__main__":

    candidates = load_candidates()

    print("\n========== DATA LOADER ==========\n")

    print("Total Candidates:", len(candidates))

    if candidates:

        print("\nFirst Candidate ID:")
        print(candidates[0]["candidate_id"])

        print("\nAvailable Fields:")

        for key in candidates[0]:

            print("-", key)