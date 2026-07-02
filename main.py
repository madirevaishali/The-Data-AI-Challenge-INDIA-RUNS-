from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from excel_manager import save_candidate

import os
import shutil

from ai.data_loader import load_candidates
from ai.candidate_matcher import match_candidate
from ai.jd_parser import parse_job_description
from ai.resume_parser import parse_resume

print("RUNNING BACKEND MAIN.PY")
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class CompareRequest(BaseModel):
    ids: list[int]

# -------------------------------
# Home API
# -------------------------------
@app.get("/")
def home():
    return {
        "message": "AI Recruitment Backend is Running!"
    }


# -------------------------------
# Analytics API
# -------------------------------
@app.get("/analytics")
def get_analytics():
    return {
        "total_candidates": 15,
        "shortlisted": 5,
        "average_match": 87,
        "top_candidate": "Rahul Sharma"
    }


# -------------------------------
# Candidates API
# -------------------------------
@app.get("/candidates")
def get_candidates():
    return [
        {
            "id": 1,
            "name": "Rahul Sharma",
            "match": 94,
            "role": "AI Engineer",
            "shortlisted": True,
            "experience": "2 Years",
            "confidence": 92,
            "skills": [
                "Python",
                "FastAPI",
                "Machine Learning"
            ],
            "projects": [
                "AI Resume Screener",
                "Chatbot using NLP"
            ]
        },
        {
            "id": 2,
            "name": "Priya Reddy",
            "match": 89,
            "role": "Data Scientist",
            "shortlisted": True,
            "experience": "3 Years",
            "confidence": 88,
            "skills": [
                "Python",
                "Pandas",
                "TensorFlow"
            ],
            "projects": [
                "Sales Prediction",
                "Image Classification"
            ]
        },
        {
            "id": 3,
            "name": "Arjun Kumar",
            "match": 76,
            "role": "Backend Developer",
            "shortlisted": False,
            "experience": "1 Year",
            "confidence": 75,
            "skills": [
                "Java",
                "Spring Boot",
                "MySQL"
            ],
            "projects": [
                "Inventory Management System"
            ]
        }
    ]

# -------------------------------
# Candidate Details API
# -------------------------------
@app.get("/candidate/{candidate_id}")
def get_candidate(candidate_id: int):

    candidates = [
        {
            "id": 1,
            "name": "Rahul Sharma",
            "match": 94,
            "role": "AI Engineer",
            "shortlisted": True,
            "skills": [
                "Python",
                "FastAPI",
                "Machine Learning"
            ],
            "experience": "2 Years",
            "confidence": 92,
            "projects": [
                "AI Resume Screener",
                "Chatbot using NLP"
            ]
        },
        {
            "id": 2,
            "name": "Priya Reddy",
            "match": 89,
            "role": "Data Scientist",
            "shortlisted": True,
            "skills": [
                "Python",
                "Pandas",
                "TensorFlow"
            ],
            "experience": "3 Years",
            "confidence": 88,
            "projects": [
                "Sales Prediction",
                "Image Classification"
            ]
        },
        {
            "id": 3,
            "name": "Arjun Kumar",
            "match": 76,
            "role": "Backend Developer",
            "shortlisted": False,
            "skills": [
                "Java",
                "Spring Boot",
                "MySQL"
            ],
            "experience": "1 Year",
            "confidence": 75,
            "projects": [
                "Inventory Management System"
            ]
        }
    ]

    for candidate in candidates:
        if candidate["id"] == candidate_id:
            return candidate
    return {
        "message": "Candidate not found"
    }
@app.post("/compare")
def compare_candidates(request: CompareRequest):

    candidates = [
        {
            "id": 1,
            "name": "Rahul Sharma",
            "match": 94,
            "role": "AI Engineer"
        },
        {
            "id": 2,
            "name": "Priya Reddy",
            "match": 89,
            "role": "Data Scientist"
        },
        {
            "id": 3,
            "name": "Arjun Kumar",
            "match": 76,
            "role": "Backend Developer"
        }
    ]

    selected = []

    for candidate in candidates:
        if candidate["id"] in request.ids:
            selected.append(candidate)

    return {
        "comparison": selected
    }

# -------------------------------
# Upload API
# -------------------------------
@app.post("/upload")
async def upload_files(
    jd: UploadFile = File(...),
    resume: UploadFile = File(...)
):
    try:
        os.makedirs("uploads/jd", exist_ok=True)
        os.makedirs("uploads/resumes", exist_ok=True)

        # Save JD
        jd_path = os.path.join("uploads", "jd", jd.filename)
        with open(jd_path, "wb") as buffer:
            shutil.copyfileobj(jd.file, buffer)

        # Save Resume
        resume_path = os.path.join("uploads", "resumes", resume.filename)
        with open(resume_path, "wb") as buffer:
            shutil.copyfileobj(resume.file, buffer)

        # Parse and analyze
        jd_data = parse_job_description(jd_path)
        resume_text = parse_resume(resume_path)
        analysis = match_candidate(jd_data, resume_text)

        # Save shortlisted candidates to Excel
        if analysis["recommendation"] in ["Shortlist", "Strong Shortlist"]:
            candidate = {
                "name": os.path.splitext(resume.filename)[0],
                "resume": resume.filename,
                "overall_score": analysis["overall_score"],
                "semantic_score": analysis["semantic_score"],
                "skill_score": analysis["skill_score"],
                "recommendation": analysis["recommendation"]
            }

            save_candidate(candidate)

        return {
            "message": "Files uploaded successfully",
            "resume": resume.filename,
            "analysis": analysis
        }

    except Exception as e:
        return {
            "error": str(e),
            "type": type(e).__name__
        }