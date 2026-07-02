from sentence_transformers import SentenceTransformer, util

# Import project modules
from ai.data_loader import load_candidates
from ai.candidate_profile import build_candidate_profile
from ai.jd_parser import parse_job_description
# Load embedding model only once
print("Loading Semantic AI model...")
model = SentenceTransformer("all-MiniLM-L6-v2")
print("Model loaded successfully!\n")


def candidate_to_text(profile):
    """
    Convert a candidate profile into one long text for semantic comparison.
    """

    skills = " ".join(profile.get("skills", []))

    education = " ".join(profile.get("education", []))

    experience = ""

    for job in profile.get("career_history", []):
        experience += f"""
        Company: {job.get("company", "")}
        Title: {job.get("title", "")}
        Description: {job.get("description", "")}
        """

    certifications = " ".join(profile.get("certifications", []))

    languages = " ".join(profile.get("languages", []))

    return f"""
    Skills:
    {skills}

    Education:
    {education}

    Experience:
    {experience}

    Certifications:
    {certifications}

    Languages:
    {languages}
    """


def jd_to_text(job):
    """
    Convert parsed Job Description into one long text.
    """

    required = " ".join(job.get("required_skills", []))

    preferred = " ".join(job.get("preferred_skills", []))

    responsibilities = " ".join(job.get("responsibilities", []))

    traits = " ".join(job.get("behavior_traits", []))

    locations = " ".join(job.get("locations", []))

    return f"""
    Role:
    {job.get("role","")}

    Company:
    {job.get("company","")}

    Required Skills:
    {required}

    Preferred Skills:
    {preferred}

    Responsibilities:
    {responsibilities}

    Behaviour:
    {traits}

    Locations:
    {locations}
    """


def semantic_similarity(profile, job):
    """
    Returns semantic similarity score between candidate and JD.
    """

    candidate_text = candidate_to_text(profile)

    jd_text = jd_to_text(job)

    candidate_embedding = model.encode(
        candidate_text,
        convert_to_tensor=True
    )

    jd_embedding = model.encode(
        jd_text,
        convert_to_tensor=True
    )

    similarity = util.cos_sim(candidate_embedding, jd_embedding)

    score = float(similarity[0][0])

    score = round(score * 100, 2)

    if score < 0:
        score = 0

    if score > 100:
        score = 100

    return score


# ---------------- TEST ---------------- #

if __name__ == "__main__":

    print("Loading candidates...\n")

    candidates = load_candidates()

    candidate = candidates[0]

    profile = build_candidate_profile(candidate)

    job_profile = parse_job_description()

    score = semantic_similarity(profile, job_profile)
    print("========== SEMANTIC MATCH ==========\n")

    print("Candidate ID :", profile["candidate_id"])

    print("Headline     :", profile.get("headline"))

    print("Semantic Score :", score)

    print("\nDone!")