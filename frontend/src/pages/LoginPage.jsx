import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";

export default function LoginPage() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = (e) => {

    e.preventDefault();

    const savedUser = JSON.parse(
      localStorage.getItem("user")
    );

    console.log(savedUser);

    if (!savedUser) {

      alert(
        "User not found. Please sign up first."
      );

      return;
    }

    if (

      savedUser.email === email &&

      savedUser.password === password

    ) {

      localStorage.setItem(
        "loggedIn",
        "true"
      );

      alert("Login successful!");

      navigate("/app");

    } else {

      alert("Invalid credentials");
    }
  };

  return (

    <AuthLayout>

      <form
        onSubmit={handleLogin}
        className="auth-form"
      >

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

        <div className="remember-row">

          <input type="checkbox" />

          <span>Remember me</span>

        </div>

        <button className="primary-btn">

          Sign In

        </button>

        <button
          type="button"
          className="google-btn"
        >

          Continue with Google

        </button>

        <p>

          Don’t have an account?{" "}

          <Link to="/signup">

            Sign up

          </Link>

        </p>

      </form>

    </AuthLayout>
  );
}