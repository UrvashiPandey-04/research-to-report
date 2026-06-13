export default function ProgressCard() {
  return (
    <div className="progress-card">
      <h2>Generating Report...</h2>

      <div className="steps">
        <div>1. Searching...</div>
        <div>2. Synthesizing...</div>
        <div>3. Formatting...</div>
        <div>4. Done</div>
      </div>
    </div>
  );
}