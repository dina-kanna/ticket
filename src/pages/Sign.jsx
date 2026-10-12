
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Auth from "./Auth";
import { useAuth } from "../context/AuthContext";

export default function Sign() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    const result = signup(name, email, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/profile", { replace: true });
  }

  return (
    <Auth
      title="Create Account"
      subtitle="Join CineBook and start booking your favorite movies."
      footer={
        <>
          Already registered?{" "}
          <Link to="/login" className="font-semibold text-red-400">
            Login
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <p role="alert" className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
            {error}
          </p>
        )}

        <label className="block text-sm text-gray-700">
          Full name
          <input
            type="text"
            autoComplete="name"
            required
            minLength={2}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
            className="mt-2 w-full rounded-xl border border-white/10 bg-[#ececf1] p-3 text-black outline-none focus:border-red-500"
          />
        </label>

        <label className="block text-sm text-gray-700">
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

        <label className="block text-sm text-gray-700">
          Password
          <input
            type="password"
            autoComplete="new-password"
            required
            minLength={6}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="At least 6 characters"
           className="mt-2 w-full rounded-xl border border-white/10 bg-[#ececf1] p-3 text-black outline-none focus:border-red-500"
          />
        </label>

        <button
          type="submit"
          className="w-full rounded-xl bg-red-600 py-3 font-bold hover:bg-red-700"
        >
          Create Account
        </button>
      </form>
    </Auth>
  );
}
