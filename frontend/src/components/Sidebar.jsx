
export default function Sidebar({
  reports = [],
  onNewReport,
  darkMode,
  setDarkMode
}) {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (

    <aside className="sidebar">

      <div>

        <button
          className="new-report-btn"
          onClick={onNewReport}
        >
          + New Report
        </button>

        <button
          className="theme-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>

        <div className="sidebar-section">

          <h3>Recent Reports</h3>

          {
            reports.length === 0 ? (

              <p className="empty-history">
                No reports generated yet
              </p>

            ) : (

              reports.map((report, index) => (

                <a
                  href={report.pdf}
                  target="_blank"
                  rel="noreferrer"
                  key={index}
                  className="history-link"
                >

                  <div className="report-item">

                    <span
                      className={`report-badge ${report.type.toLowerCase()}`}
                    >
                      {report.type}
                    </span>

                    <h4>{report.title}</h4>

                    <p>{report.time}</p>

                  </div>

                </a>

              ))

            )
          }

        </div>

      </div>

      <div className="user-card">

        <h4>{user?.name || "User"}</h4>

        <p>{user?.email || "user@gmail.com"}</p>

        <span className="plan-badge">
          Professional
        </span>

      </div>

    </aside>
  );
}
