export default function AuthLayout({ children }) {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>ResearchAgent</h1>

        <p>
          Turn any topic into a structured research report — in seconds.
        </p>

        {children}
      </div>
    </div>
  );
}