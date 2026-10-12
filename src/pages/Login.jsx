import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Auth from "./Auth";
import { useAuth } from "../context/AuthContext";

const DEMO_EMAIL = "demo@example.com";
const DEMO_PASSWORD = "123456";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleDemoLogin() {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const result = login(email.trim(), password);

    if (!result?.success) {
      setError(result?.message || "Invalid email or password.");
      return;
    }

    navigate(location.state?.from || "/profile", {
      replace: true,
    });
  }

  return (
    <Auth
      title="Welcome Back"
      subtitle="Sign in to continue your movie journey."
      footer={
        <>
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-red-400 hover:text-red-300"
          >
            Create one
          </Link>
        </>
      }
    >
      <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
        <p className="font-bold text-red-400">Demo Account</p>

        <p className="mt-2 text-sm text-gray-700">
          Email: <span className="text-blue-500">{DEMO_EMAIL}</span>
        </p>

        <p className="mt-1 text-sm text-gray-700">
          Password: <span className="text-blue-500">{DEMO_PASSWORD}</span>
        </p>

        <button
          type="button"
          onClick={handleDemoLogin}
          className="mt-3 w-full rounded-lg border border-red-700/40 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-300"
        >
          Use Demo Credentials
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <p
            role="alert"
            className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400"
          >
            {error}
          </p>
        )}

        <label className="block text-sm text-gray-300">
          Email address
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
             className="mt-2 w-full rounded-xl border border-white/10 bg-[#ececf1] p-3 text-black outline-none focus:border-red-500"
          />
        </label>

        <label className="block text-sm text-gray-300">
          Password
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
              className="mt-2 w-full rounded-xl border border-white/10 bg-[#ececf1] p-3 text-black outline-none focus:border-red-500"
          />
        </label>

        <button
          type="submit"
          className="w-full rounded-xl bg-red-600 py-3 font-bold transition hover:bg-red-700"
        >
          Login
        </button>
      </form>
    </Auth>
  );
}

