
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from app.claude_generator import generate_research_content
from app.document_generator import create_pdf, create_docx

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount(
    "/generated_reports",
    StaticFiles(directory="generated_reports"),
    name="generated_reports"
)

class ReportRequest(BaseModel):
    query: str
    reportType: str
    pages: int
    fontFamily: str
    headingSize: int
    subheadingSize: int
    paragraphSize: int

@app.get("/")
def root():
    return {"status": "ResearchAgent Backend Running"}

@app.post("/research")
def research(request: ReportRequest):

    try:

        report_content = generate_research_content(
            topic=request.query,
            report_type=request.reportType,
            pages=request.pages
        )

        pdf_path = create_pdf(
            topic=request.query,
            report_content=report_content,
            font_name=request.fontFamily,
            heading_size=request.headingSize,
            subheading_size=request.subheadingSize,
            paragraph_size=request.paragraphSize
        )

        docx_path = create_docx(
            topic=request.query,
            report_content=report_content,
            font_name=request.fontFamily,
            heading_size=request.headingSize,
            subheading_size=request.subheadingSize,
            paragraph_size=request.paragraphSize
        )

        return {
            "status": "success",
            "pdf_url": f"http://127.0.0.1:8000/generated_reports/{pdf_path}",
            "docx_url": f"http://127.0.0.1:8000/generated_reports/{docx_path}"
        }

    except Exception as e:

        print("ERROR:", str(e))

        return {
            "status": "error",
            "message": str(e)
        }
