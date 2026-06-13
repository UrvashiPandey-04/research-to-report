# Research-to-Report AI Agent

An AI-powered research assistant that generates professional, structured reports on any topic using Claude Sonnet (Anthropic). Enter a topic, choose your format settings, and get a downloadable PDF and DOCX report in seconds.

---

## Features

- AI-generated research reports via Claude 3.5 Sonnet
- Customizable report type (Academic, Business, Technical, News)
- Configurable page count, font family, and font sizes
- Exports to **PDF** (via ReportLab) and **DOCX** (via python-docx)
- React frontend with login/signup flow and report history
- FastAPI backend with CORS support

---

## Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React 19, Vite, React Router DOM  |
| Backend   | Python 3, FastAPI, Uvicorn        |
| AI        | Anthropic Claude 3.5 Sonnet       |
| PDF       | ReportLab                         |
| DOCX      | python-docx                       |

---

## Project Structure

```
research-to-report/
├── app/
│   ├── main.py              # FastAPI app entry point
│   ├── claude_generator.py  # Claude AI report generation
│   └── document_generator.py# PDF + DOCX export
├── frontend/
│   ├── src/
│   │   ├── pages/           # Login, Signup, App pages
│   │   ├── components/      # Header, Sidebar, SearchCard, etc.
│   │   └── context/         # ThemeContext
│   └── package.json
├── generated_reports/       # Output files (gitignored)
├── requirements.txt
└── .env                     # API keys (gitignored — see .env.example)
```

---

## Setup & Installation

### Prerequisites

- Python 3.10+
- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com/)

### 1. Clone the repo

```bash
git clone https://github.com/UrvashiPandey-04/research-to-report.git
cd research-to-report
```

### 2. Backend setup

```bash
# Create and activate virtual environment (optional but recommended)
python -m venv venv
venv\Scripts\activate      # Windows
source venv/bin/activate   # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Copy env file and add your keys
cp .env.example .env
# Edit .env and fill in ANTHROPIC_API_KEY
```

### 3. Start the backend

```bash
uvicorn app.main:app --reload
# Runs on http://localhost:8000
```

### 4. Frontend setup

```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

---

## Environment Variables

Copy `.env.example` to `.env` and fill in your keys:

```
ANTHROPIC_API_KEY=your_anthropic_key_here
TAVILY_API_KEY=your_tavily_key_here   # optional, for web search
```

---

## API Endpoints

| Method | Endpoint    | Description                          |
|--------|-------------|--------------------------------------|
| GET    | `/`         | Health check                         |
| POST   | `/research` | Generate a report for a given topic  |

### POST `/research` — Request Body

```json
{
  "query": "What is Artificial Intelligence?",
  "reportType": "Academic",
  "pages": 5,
  "fontFamily": "Times-Roman",
  "headingSize": 30,
  "subheadingSize": 20,
  "paragraphSize": 12
}
```

### Response

```json
{
  "status": "success",
  "pdf_url": "http://127.0.0.1:8000/generated_reports/<id>.pdf",
  "docx_url": "http://127.0.0.1:8000/generated_reports/<id>.docx"
}
```

---

## License

MIT
