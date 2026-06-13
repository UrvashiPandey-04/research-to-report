import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";

export default function SignupPage() {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const handleSignup = (e) => {

    e.preventDefault();

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {

      alert("Please fill all fields");

      return;
    }

    if (password !== confirmPassword) {

      alert("Passwords do not match");

      return;
    }

    // SAVE USER

    const user = {

      name,

      email,

      password,

    };

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    localStorage.setItem(
      "loggedIn",
      "true"
    );

    alert("Account created successfully!");

    navigate("/app");
  };

  return (

    <AuthLayout>

      <form
        onSubmit={handleSignup}
        className="auth-form"
      >

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
        />

        <button className="primary-btn">

          Create Account

        </button>

        <p>

          Already have an account?{" "}

          <Link to="/login">

            Login

          </Link>

        </p>

      </form>

    </AuthLayout>
  );
}