import re

from ai.data_loader import load_candidates
from ai.candidate_profile import build_candidate_profile
from ai.jd_parser import parse_job_description

# Related technologies / synonyms for each JD skill
SKILL_EVIDENCE = {
    "Python": [
        "python", "flask", "fastapi", "django"
    ],

    "Embeddings": [
        "embedding", "embeddings",
        "sentence-transformers",
        "bge",
        "e5",
        "openai embeddings"
    ],

    "Vector Databases": [
        "milvus",
        "pinecone",
        "qdrant",
        "faiss",
        "weaviate",
        "vector database"
    ],

    "Retrieval": [
        "retrieval",
        "rag",
        "search",
        "information retrieval",
        "retriever"
    ],

    "Ranking": [
        "ranking",
        "recommendation",
        "recommender",
        "learning to rank"
    ],

    "Evaluation Frameworks": [
        "evaluation",
        "ndcg",
        "mrr",
        "map",
        "a/b test",
        "benchmark"
    ],

    "LLMs": [
        "llm",
        "large language model",
        "gpt",
        "transformer",
        "lora",
        "qlora",
        "peft",
        "fine-tuning",
        "fine tuning"
    ]
}


def build_candidate_text(profile):
    """
    Convert the complete candidate profile into one searchable string.
    """

    text = []

    # Basic fields
    text.append(profile.get("headline", ""))
    text.append(profile.get("location", ""))

    # Skills
    text.extend(profile.get("skills", []))

    # Education
    text.extend(profile.get("education", []))

    # Certifications
    text.extend(profile.get("certifications", []))

    # Languages
    text.extend(profile.get("languages", []))

    # Career history
    for job in profile.get("career_history", []):

        if isinstance(job, dict):

            text.append(job.get("title", ""))

            text.append(job.get("company", ""))

            text.append(job.get("description", ""))

        else:
            text.append(str(job))

    return " ".join(text).lower()


def verify_skill(skill, candidate_text):

    keywords = SKILL_EVIDENCE.get(skill, [skill])

    matched_terms = []

    for keyword in keywords:

        if re.search(r"\b" + re.escape(keyword.lower()) + r"\b", candidate_text):

            matched_terms.append(keyword)

    count = len(matched_terms)

    if count >= 5:
        confidence = 100

    elif count == 4:
        confidence = 90

    elif count == 3:
        confidence = 80

    elif count == 2:
        confidence = 70

    elif count == 1:
        confidence = 55

    else:
        confidence = 10

    return {
        "skill": skill,
        "found": count > 0,
        "matched_terms": matched_terms,
        "confidence": confidence
    }


def verify_candidate(profile, job):

    candidate_text = build_candidate_text(profile)

    evidence = []

    total = 0

    for skill in job["required_skills"]:

        result = verify_skill(skill, candidate_text)

        evidence.append(result)

        total += result["confidence"]

    overall = round(total / len(evidence), 2)

    return overall, evidence


if __name__ == "__main__":

    print("\nLoading Candidate...")

    candidates = load_candidates()

    profile = build_candidate_profile(candidates[0])

    job = parse_job_description()

    overall_score, evidence = verify_candidate(profile, job)

    print("\n========== Evidence Verification ==========\n")

    print("Candidate :", profile["candidate_id"])

    print()

    for item in evidence:

        print(item["skill"])

        print("  Found        :", item["found"])

        print("  Matched Terms:", ", ".join(item["matched_terms"]) if item["matched_terms"] else "None")

        print("  Confidence   :", f'{item["confidence"]}%')

        print("-" * 50)

    print()

    print("Overall Evidence Score :", overall_score)