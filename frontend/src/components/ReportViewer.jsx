import jsPDF from "jspdf";

export default function ReportViewer({ report }) {
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("Research Report", 20, 20);

    doc.setFontSize(14);

    const lines = doc.splitTextToSize(report.summary, 170);

    doc.text(lines, 20, 40);

    doc.addPage();

    doc.text("Detailed Analysis", 20, 20);

    const detailedText = `
Artificial Intelligence (AI) is rapidly changing industries globally.

1. Healthcare
AI improves diagnostics, predictive healthcare, and robotic surgery.

2. Education
AI enables personalized learning and smart tutoring systems.

3. Finance
Fraud detection, algorithmic trading, and automation are key applications.

4. Cybersecurity
AI strengthens security systems using intelligent threat detection.

5. Future Impact
AI will continue driving innovation, automation, and economic transformation.

Conclusion:
AI represents one of the most important technological revolutions of the modern era.
    `;

    const detailedLines = doc.splitTextToSize(detailedText, 170);

    doc.text(detailedLines, 20, 40);

    doc.save("research-report.pdf");
  };

  return (
    <div className="report-viewer">
      <div className="toolbar">
        <button className="primary-btn" onClick={downloadPDF}>
          Download PDF
        </button>
      </div>

      <div className="report-card">
        <h2>Summary</h2>
        <p>{report.summary}</p>
      </div>

      <div className="report-card">
        <h2>Conclusion</h2>
        <p>{report.conclusion}</p>
      </div>
    </div>
  );
}