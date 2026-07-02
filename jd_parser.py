import os
import re
from docx import Document

# ------------------------------------
# Project Paths
# ------------------------------------
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

JD_FILE = os.path.join(
    BASE_DIR,
    "datasets",
    "job_description.docx"
)


def read_job_description(file_path=None):

    if file_path is None:
        file_path = JD_FILE

    document = Document(file_path)

    text = ""

    for paragraph in document.paragraphs:
        text += paragraph.text + "\n"

    return text


def parse_job_description(file_path=None):

    text = read_job_description(file_path)

    job_profile = {

        "role": "",

        "company": "",

        "experience": (0, 0),

        "locations": [],

        "required_skills": [],

        "preferred_skills": [],

        "behavior_traits": [],

        "responsibilities": [],

        "disqualifiers": []
    }

    # ------------------------------------
    # Role
    # ------------------------------------
    role = re.search(
        r"Job Description:\s*(.*)",
        text
    )

    if role:
        job_profile["role"] = role.group(1).strip()

    # ------------------------------------
    # Company
    # ------------------------------------
    company = re.search(
        r"Company:\s*(.*)",
        text
    )

    if company:
        job_profile["company"] = company.group(1).strip()

    # ------------------------------------
    # Experience
    # ------------------------------------
    experience = re.search(
        r"Experience Required:\s*(\d+)[–-](\d+)",
        text
    )

    if experience:

        job_profile["experience"] = (

            int(experience.group(1)),
            int(experience.group(2))
        )

    # ------------------------------------
    # Locations
    # ------------------------------------
    cities = [

        "Pune",
        "Noida",
        "Hyderabad",
        "Mumbai",
        "Delhi NCR",
        "Bangalore",
        "Chennai"
    ]

    for city in cities:

        if city.lower() in text.lower():

            job_profile["locations"].append(city)

    # ------------------------------------
    # Required Skills
    # ------------------------------------

    required = [

        "Python",
        "Embeddings",
        "Vector Databases",
        "Retrieval",
        "Ranking",
        "Evaluation Frameworks",
        "LLMs",
        "Milvus",
        "Pinecone",
        "Qdrant",
        "FAISS",
        "OpenSearch",
        "Elasticsearch",
        "NDCG",
        "MRR",
        "MAP"
    ]

    for skill in required:

        if skill.lower() in text.lower():

            job_profile["required_skills"].append(skill)

    # ------------------------------------
    # Preferred Skills
    # ------------------------------------

    preferred = [

        "LoRA",

        "QLoRA",

        "PEFT",

        "Learning-to-Rank",

        "Distributed Systems",

        "Open Source",

        "HR-Tech"
    ]

    for skill in preferred:

        if skill.lower() in text.lower():

            job_profile["preferred_skills"].append(skill)

    # ------------------------------------
    # Behavior Traits
    # ------------------------------------

    behavior = [

        "Leadership",

        "Product Mindset",

        "Communication",

        "Fast Shipping",

        "Mentoring",

        "Recruiter Workflows",

        "Ownership"
    ]

    for item in behavior:

        if item.lower() in text.lower():

            job_profile["behavior_traits"].append(item)

    # ------------------------------------
    # Responsibilities
    # ------------------------------------

    responsibilities = [

        "Ranking",

        "Retrieval",

        "Matching",

        "Mentor",

        "Evaluation",

        "A/B Testing",

        "Embeddings"
    ]

    for task in responsibilities:

        if task.lower() in text.lower():

            job_profile["responsibilities"].append(task)

    # ------------------------------------
    # Disqualifiers
    # ------------------------------------

    disqualifiers = [

        "Pure Research",

        "Consulting",

        "No Production",

        "Computer Vision",

        "Speech",

        "Robotics"
    ]

    for item in disqualifiers:

        if item.lower() in text.lower():

            job_profile["disqualifiers"].append(item)

    return job_profile


# ------------------------------------
# Test
# ------------------------------------

if __name__ == "__main__":

    job = parse_job_description()

    print("\n========== Parsed Job ==========\n")

    for key, value in job.items():

        print(f"{key}: {value}")