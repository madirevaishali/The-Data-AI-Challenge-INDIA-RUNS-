# The-Data-AI-Challenge-INDIA-RUNS-
An Explainable AI-powered Talent Matching platform that analyzes Job Descriptions and resumes using LLMs, NLP, and semantic similarity to rank candidates, generate AI Match Scores, and provide transparent "Why Selected" and "Why Rejected" insights for smarter, faster hiring.
# The Data & AI Challenge – INDIA.RUNS

## AI Talent Matching & Candidate Analysis

Finding the right candidate from hundreds of resumes is a time-consuming task for recruiters. Most existing Applicant Tracking Systems (ATS) rely mainly on keyword matching, which can miss qualified candidates and doesn't explain why someone was selected or rejected.

Our project aims to make this process smarter using AI.

The system analyzes both the **Job Description (JD)** and **candidate resumes** using Large Language Models (LLMs) and Natural Language Processing (NLP). Instead of simply searching for keywords, it understands the context of skills and experience, compares them with the job requirements, and ranks candidates based on how well they match.

One of the key features of our solution is **Explainable AI**. Along with the AI Match Score, recruiters can also see:
- Why a candidate was selected
- Why a candidate was not selected
- Matching skills
- Missing skills

This makes the hiring process more transparent and helps recruiters make better decisions.

---

## Features

- Job Description Analysis
- Resume Parsing
- Semantic Skill Matching
- AI Match Score Generation
- Candidate Ranking
- Why Selected / Why Rejected Analysis
- Matching & Missing Skills Detection
- Recruiter-Friendly Dashboard

---

## Tech Stack

**Backend**
- Python
- FastAPI

**Artificial Intelligence**
- Google Gemini / OpenAI
- Sentence Transformers
- spaCy (NLP)

**Resume Processing**
- PyMuPDF
- pdfplumber

**Database**
- PostgreSQL

**Frontend**
- React.js
- Tailwind CSS

---

## How it Works

1. Recruiter uploads a Job Description.
2. The AI extracts the required skills, experience, education, and other requirements.
3. Candidate resumes are uploaded and parsed.
4. The AI compares resumes with the Job Description using semantic matching.
5. Each candidate receives an AI Match Score.
6. The system explains why each candidate is selected or rejected.
7. Candidates are ranked based on their overall suitability.

---

## Project Structure

```
.
├── app.py
├── main.py
├── routes.py
├── resume_parser.py
├── jd_parser.py
├── semantic_matcher.py
├── candidate_matcher.py
├── rank_candidates.py
├── requirements.txt
└── README.md
```

---

## Getting Started

Clone the repository:

```bash
git clone https://github.com/madirevaishali/The-Data-AI-Challenge-INDIA-RUNS-.git
```

Install the required packages:

```bash
pip install -r requirements.txt
```

Run the project:

```bash
python main.py
```

---

## Future Improvements

- AI-generated interview questions
- Voice interview analysis
- Skill gap recommendations
- Learning path suggestions
- Multi-language resume support

---

## Team

Developed as part of the **India.Runs – Data & AI Challenge**.

Team Members:
- Madire Vaishali
- Your teammate's name

Thanks for checking out our project!
