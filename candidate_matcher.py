from sentence_transformers import SentenceTransformer, util

print("Loading Semantic AI model...")

model = SentenceTransformer("all-MiniLM-L6-v2")

print("Model loaded successfully!")


def match_candidate(job_description, resume_text):
    """
    Compares a resume against a job description.

    Parameters:
        job_description -> output from parse_job_description()
        resume_text -> output from parse_resume()

    Returns:
        Dictionary containing matching results.
    """

    # ---------------------------------
    # Semantic Similarity
    # ---------------------------------

    jd_embedding = model.encode(
        str(job_description),
        convert_to_tensor=True
    )

    resume_embedding = model.encode(
        resume_text,
        convert_to_tensor=True
    )

    similarity = util.cos_sim(
        jd_embedding,
        resume_embedding
    ).item()

    semantic_score = round(similarity * 100, 2)

    # ---------------------------------
    # Skill Matching
    # ---------------------------------

    required_skills = job_description.get(
        "required_skills",
        []
    )

    matched_skills = []

    missing_skills = []

    resume_lower = resume_text.lower()

    for skill in required_skills:

        if skill.lower() in resume_lower:
            matched_skills.append(skill)
        else:
            missing_skills.append(skill)

    # ---------------------------------
    # Skill Score
    # ---------------------------------

    if len(required_skills) > 0:

        skill_score = (
            len(matched_skills)
            / len(required_skills)
        ) * 100

    else:

        skill_score = 0

    # ---------------------------------
    # Final Score
    # ---------------------------------

    final_score = round(
        (semantic_score * 0.6) +
        (skill_score * 0.4),
        2
    )

    # ---------------------------------
    # Recommendation
    # ---------------------------------

    if final_score >= 80:
        recommendation = "Strong Shortlist"

    elif final_score >= 60:
        recommendation = "Shortlist"

    else:
        recommendation = "Reject"

    return {

        "semantic_score": semantic_score,

        "skill_score": round(skill_score, 2),

        "overall_score": final_score,

        "matched_skills": matched_skills,

        "missing_skills": missing_skills,

        "recommendation": recommendation
    }