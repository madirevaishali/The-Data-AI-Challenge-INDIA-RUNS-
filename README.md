# Explainable AI Talent Matching & Candidate Analysis
An Explainable AI-powered Talent Matching platform that analyzes Job Descriptions and resumes using LLMs, NLP, and semantic similarity to rank candidates, generate AI Match Scores, and provide transparent "Why Selected" and "Why Rejected" insights for smarter, faster hiring.

## ✨ Features

- AI-based Job Description Analysis
- Resume Parsing & Information Extraction
- Semantic Skill Matching
- AI Match Score Generation
- Candidate Ranking
- Explainable AI Recommendations
- Matching & Missing Skills Analysis

## 🛠️ Tech Stack

- Python
- FastAPI
- OpenAI GPT / Google Gemini
- spaCy
- Sentence Transformers
- PostgreSQL
- React.js (Frontend)
- Tailwind CSS

## 🔄 Workflow

1. Recruiter uploads Job Description.
2. AI extracts required skills and experience.
3. Candidate resumes are parsed.
4. Semantic matching compares candidates with the JD.
5. AI generates match scores and explanations.
6. Candidates are ranked based on overall suitability.

## 📂 Project Structure

```
backend/
├── app.py
├── main.py
├── jd_parser.py
├── resume_parser.py
├── semantic_matcher.py
├── candidate_matcher.py
├── rank_candidates.py
├── evidence_verifier.py
├── requirements.txt
```

## ⚙️ Installation

```bash
pip install -r requirements.txt
python main.py
```

## 👥 Team

Developed for the **India.Runs – Data & AI Challenge**.
