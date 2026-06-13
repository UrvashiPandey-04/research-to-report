import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function AppPage() {

  const [topic, setTopic] = useState("");

  const [reportType, setReportType] =
    useState("Academic");

  const [pages, setPages] = useState(5);

  const [fontFamily, setFontFamily] =
    useState("Times-Roman");

  const [headingSize, setHeadingSize] =
    useState(32);

  const [subheadingSize, setSubheadingSize] =
    useState(20);

  const [paragraphSize, setParagraphSize] =
    useState(14);

  const [loading, setLoading] =
    useState(false);

  const [pdfUrl, setPdfUrl] =
    useState("");

  const [docxUrl, setDocxUrl] =
    useState("");

  const [recentReports, setRecentReports] =
    useState(
      JSON.parse(
        localStorage.getItem("recentReports")
      ) || []
    );

  // FONT SIZES

  const fontSizes = Array.from(
    { length: 31 },
    (_, i) => i + 10
  );

  // GENERATE REPORT

  const generateReport = async () => {

    if (!topic.trim()) {

      alert("Please enter a topic");

      return;
    }

    setLoading(true);

    try {

      console.log("SENDING REQUEST");

      const response = await fetch(

        "http://127.0.0.1:8000/research",

        {

          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({

            query: topic,

            reportType: reportType,

            pages: Number(pages),

            fontFamily: fontFamily,

            headingSize: Number(headingSize),

            subheadingSize: Number(subheadingSize),

            paragraphSize: Number(paragraphSize),

          }),

        }
      );

      console.log("RESPONSE:", response);

      const data = await response.json();

      console.log("DATA:", data);

      if (data.status === "success") {

        setPdfUrl(data.pdf_url);

        setDocxUrl(data.docx_url);

        // SAVE REPORT HISTORY

        const newReport = {

          title: topic,

          type: reportType,

          time: "Just now",

          pdf: data.pdf_url,

        };

        const updatedReports = [

          newReport,

          ...recentReports,

        ].slice(0, 10);

        setRecentReports(updatedReports);

        localStorage.setItem(

          "recentReports",

          JSON.stringify(updatedReports)

        );

        alert(
          "Professional report generated successfully!"
        );

      } else {

        alert(data.message || "Failed to generate report");
      }

    } catch (error) {

      console.log("ERROR:", error);

      alert("Backend connection failed");

    }

    setLoading(false);
  };

  // NEW REPORT

  const handleNewReport = () => {

    setTopic("");

    setPdfUrl("");

    setDocxUrl("");

  };

  return (

    <div className="dashboard">

      <Sidebar reports={recentReports} onNewReport={handleNewReport} darkMode={false} setDarkMode={() => {}} />

      <div className="main-content">

        <Header />

        <div className="hero-section">

          <div className="badge">

            AI Powered Professional Research Reports

          </div>

          <h1>

            Research Anything.
            <br />
            Get Instant Structured Reports.

          </h1>

          <p>

            Stop reading 20 tabs.
            Get one comprehensive report instead.

          </p>

          <div className="search-card">

            <div className="settings-row">

              {/* REPORT TYPE */}

              <div className="setting-group">

                <label>Report Type</label>

                <select
                  value={reportType}
                  onChange={(e) =>
                    setReportType(e.target.value)
                  }
                >

                  <option>Academic</option>

                  <option>Business</option>

                  <option>Technical</option>

                  <option>News</option>

                </select>

              </div>

              {/* PAGES */}

              <div className="setting-group">

                <label>Pages</label>

                <select
                  value={pages}
                  onChange={(e) =>
                    setPages(e.target.value)
                  }
                >

                  <option value={3}>3</option>

                  <option value={5}>5</option>

                  <option value={10}>10</option>

                  <option value={15}>15</option>

                </select>

              </div>

              {/* FONT */}

              <div className="setting-group">

                <label>Font Family</label>

                <select
                  value={fontFamily}
                  onChange={(e) =>
                    setFontFamily(e.target.value)
                  }
                >

                  <option value="Times-Roman">
                    Times Roman
                  </option>

                  <option value="Helvetica">
                    Helvetica
                  </option>

                  <option value="Courier">
                    Courier
                  </option>

                </select>

              </div>

              {/* HEADING */}

              <div className="setting-group">

                <label>Main Heading Size</label>

                <select
                  value={headingSize}
                  onChange={(e) =>
                    setHeadingSize(e.target.value)
                  }
                >

                  {

                    fontSizes.map((size) => (

                      <option
                        key={size}
                        value={size}
                      >

                        {size}

                      </option>

                    ))

                  }

                </select>

              </div>

              {/* SUBHEADING */}

              <div className="setting-group">

                <label>Subheading Size</label>

                <select
                  value={subheadingSize}
                  onChange={(e) =>
                    setSubheadingSize(e.target.value)
                  }
                >

                  {

                    fontSizes.map((size) => (

                      <option
                        key={size}
                        value={size}
                      >

                        {size}

                      </option>

                    ))

                  }

                </select>

              </div>

              {/* PARAGRAPH */}

              <div className="setting-group">

                <label>Paragraph Size</label>

                <select
                  value={paragraphSize}
                  onChange={(e) =>
                    setParagraphSize(e.target.value)
                  }
                >

                  {

                    fontSizes.map((size) => (

                      <option
                        key={size}
                        value={size}
                      >

                        {size}

                      </option>

                    ))

                  }

                </select>

              </div>

            </div>

            {/* TEXTAREA */}

            <textarea

              placeholder="Enter your research topic..."

              value={topic}

              onChange={(e) =>
                setTopic(e.target.value)
              }

            />

            {/* BUTTON */}

            <button

              className="generate-btn"

              onClick={generateReport}

            >

              {

                loading

                  ? "Generating Research Report..."

                  : "Generate Report"

              }

            </button>

            {/* DOWNLOAD BUTTONS */}

            {

              pdfUrl && (

                <div className="download-buttons">

                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                  >

                    <button className="generate-btn">

                      Download PDF

                    </button>

                  </a>

                  {

                    docxUrl && (

                      <a
                        href={docxUrl}
                        target="_blank"
                        rel="noreferrer"
                      >

                        <button className="secondary-btn">

                          Download DOCX

                        </button>

                      </a>

                    )

                  }

                </div>

              )

            }

          </div>

        </div>

      </div>

    </div>
  );
}