import { useState } from "react";

export default function SearchCard({
  generateReport,
  loading,
}) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("Academic");

  const handleSubmit = () => {
    if (!query.trim()) return;

    generateReport(query, type);
  };

  return (
    <div className="search-card">
      <div className="type-selector">
        {["Academic", "Business", "News"].map((item) => (
          <button
            key={item}
            className={
              type === item ? "type-btn active" : "type-btn"
            }
            onClick={() => setType(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <textarea
        placeholder="Enter your research topic..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button
        className="generate-btn"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Report"}
      </button>

      <p className="estimate">~45 seconds</p>
    </div>
  );
}
