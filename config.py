from fastapi import APIRouter, UploadFile, File
import shutil
import os

from ai.data_loader import load_candidates
from ai.candidate_matcher import match_candidate
from ai.jd_parser import parse_job_description
from ai.resume_parser import parse_resume

router = APIRouter()


@router.get("/analyze")
def analyze():
    candidates = load_candidates()

    result = match_candidate(candidates[0])

    return result


@router.post("/upload")
async def upload_files(
    jd: UploadFile = File(...),
    resumes: list[UploadFile] = File(...)
):
    try:

        # ----------------------------
        # Save Job Description
        # ----------------------------

        jd_path = os.path.join(
            "uploads",
            "jd",
            jd.filename
        )

        with open(jd_path, "wb") as buffer:
            shutil.copyfileobj(jd.file, buffer)

        uploaded_resumes = []

        # ----------------------------
        # Save Resume Files
        # ----------------------------

        for resume in resumes:

            resume_path = os.path.join(
                "uploads",
                "resumes",
                resume.filename
            )

            with open(resume_path, "wb") as buffer:
                shutil.copyfileobj(resume.file, buffer)

            uploaded_resumes.append(resume.filename)

        # ----------------------------
        # Parse Job Description
        # ----------------------------

        jd_data = parse_job_description(jd_path)

        parsed_resumes = []

        # ----------------------------
        # Parse + Analyze Every Resume
        # ----------------------------

        for resume_name in uploaded_resumes:

            resume_path = os.path.join(
                "uploads",
                "resumes",
                resume_name
            )

            resume_text = parse_resume(resume_path)

            analysis = match_candidate(
                jd_data,
                resume_text
            )

            parsed_resumes.append({
                "filename": resume_name,
                "analysis": analysis
            })

        # ----------------------------
        # Final Response
        # ----------------------------

        return {

            "message": "Files uploaded successfully",

            "job_description": jd_data,

            "parsed_resumes": parsed_resumes

        }

    except Exception as e:

        return {

            "error": str(e),

            "type": str(type(e))

        }