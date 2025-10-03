# AI-Powered Resume Assistant

A full-stack intelligent resume optimization platform leveraging OpenAI's API and Natural Language Processing for automated resume enhancement and document parsing.


## Table of Contents
- [Final Result](#final-result)
- [Project Overview](#project-overview)
- [Technical Stack](#technical-stack)
- [Key Features](#key-features)
- [AI/ML Implementation](#aiml-implementation)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Future Enhancements](#future-enhancements)
- [About Author](#about-author)


## Final Result
### File Upload Interface
![File Upload](./screenshots/file_upload.png)

### AI Text Editor
![AI Text Editor](./screenshots/ai_text_editor.png)


## Project Overview

Full-stack application demonstrating practical Generative AI integration for resume optimization. Built to showcase expertise in AI/ML integration, full-stack development, and modern web technologies.

## Technical Stack

**Backend**: Django 5.2.6, Django REST Framework, OpenAI GPT-4o-mini API, PyPDF2, python-docx, SQLite/PostgreSQL, django-cors-headers, python-dotenv

**Frontend**: React 19.1.1, Vite 7.1.7, TailwindCSS 4.1.13, React Router DOM, Axios, Lucide React, ESLint

**AI/ML**: OpenAI GPT-4o-mini, Prompt Engineering, Document Processing (PDF/DOCX/TXT), NLP-based text enhancement

## Key Features

**Intelligent Document Processing**
- Multi-format resume upload (PDF, DOCX, TXT) with drag-and-drop interface
- Automated text extraction using PyPDF2 and python-docx
- Real-time file validation and metadata tracking

**AI-Powered Enhancement**
- OpenAI GPT-4o-mini integration for resume optimization
- Advanced prompt engineering for professional content generation
- Grammar correction, formatting improvements, and clarity enhancement
- Comprehensive error handling (RateLimitError, APIError, ConnectionError)

**Real-Time Editor**
- In-browser editing with live character/word count
- Multiple export formats: PDF, TXT, HTML, Markdown
- Responsive design for cross-device compatibility

**Modern UI/UX**
- Beautiful landing page with animated gradients
- Intuitive upload interface with visual feedback
- Mobile-first responsive design using TailwindCSS

## AI/ML Implementation

### Generative AI Pipeline

1. **Document Ingestion**: Multi-format parser extracts text while preserving structure
2. **Prompt Engineering**: Custom prompts guide LLM to produce professional resume content
3. **API Integration**: OpenAI API calls with `gpt-4o-mini` model (1200 max tokens)
4. **Error Handling**: Comprehensive exception handling for production reliability

### API Endpoints
```
POST /api/resume_upload/  - Upload and extract text from resume files
POST /api/edit_resume/    - AI-powered resume enhancement
```

## Setup Instructions

### Prerequisites
- Python 3.10+
- Node.js 18+
- OpenAI API Key from https://platform.openai.com

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

pip install django==5.2.6 djangorestframework djangorestframework-simplejwt
pip install django-cors-headers python-dotenv openai PyPDF2 python-docx

python manage.py migrate
python manage.py runserver  # Runs on http://localhost:8000
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev  # Runs on http://localhost:5173
```

### Environment Configuration
Create `.env` in `backend/` directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

## Usage

1. **Start servers**: Run backend (`python manage.py runserver`) and frontend (`npm run dev`)
2. **Upload resume**: Navigate to Documents page, drag-and-drop or browse for file (PDF/DOCX/TXT)
3. **Edit**: Click "Edit-Text" for manual editing or "Ai-Help" for AI-powered enhancement
4. **Download**: Export in preferred format (PDF, TXT, HTML, MD)

## Project Structure
```
resume-ai-assistant/
├── backend/
│   ├── backend/          # Django settings, URLs, WSGI
│   ├── resumes/          # Resume processing (models, views, URLs)
│   ├── users/            # User management (future)
│   └── manage.py
├── frontend/
│   ├── Pages/            # Home, DocumentUpload, TextEditor, ai_editor
│   ├── src/              # App.jsx, main.jsx, styles
│   └── vite.config.js
└── screenshots/
```

## Future Enhancements

**AI/ML Features**
- ATS compatibility scoring using NLP metrics
- Job description matching with semantic similarity
- Domain-specific fine-tuning (tech, healthcare, finance)
- Multi-language support and skills gap analysis

**Platform Features**
- User authentication and profile management
- Resume version control and history
- Cover letter generation with GPT-4
- Interview preparation assistance
- Job application tracking dashboard

**Infrastructure**
- Microservices architecture with FastAPI for AI processing
- Cloud deployment (AWS, GCP, Azure)
- Redis caching for API responses
- Celery for async background processing
- CI/CD pipeline and comprehensive test suite

## About Author

Developed by **Parth**, 3rd-year Computer Science student at **IIT (BHU) Varanasi**, specializing in Artificial Intelligence and Full-Stack Development.

**Key Skills Demonstrated**:
- Large Language Model (LLM) integration in production applications
- Full-stack web development with Python (Django) and Javascript (React)
- Prompt engineering and NLP document processing
- RESTful API design and error handling
- Scalable architecture and software engineering best practices

This project showcases practical expertise in leveraging Generative AI technologies to solve real-world problems with clean, maintainable code.


---

**Keywords**: Generative AI, Large Language Models, OpenAI GPT-4, Natural Language Processing, Full-Stack Development, Django, React, REST API, Machine Learning, Document Processing, AI Integration, Software Engineering, Python, JavaScript, TailwindCSS, Prompt Engineering, Resume Optimization, ATS
