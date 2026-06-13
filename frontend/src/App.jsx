import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AppPage from "./pages/AppPage";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route
        path="/app"
        element={user ? <AppPage /> : <Navigate to="/login" />}
      />

      <Route
        path="*"
        element={<Navigate to={user ? "/app" : "/login"} />}
      />
    </Routes>
  );
}


export default App;