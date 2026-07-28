import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
} from "lucide-react";

import { login } from "@/services/auth.service";
import { useAuth } from "@/contexts/AuthContext";


export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const { login: signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 async function handleSubmit(
  e: React.FormEvent<HTMLFormElement>
) {
  e.preventDefault();

  setLoading(true);
  setError("");

  try {
    console.log("Sending:", {
      email: email.trim(),
      password: password.trim(),
    });

    const response = await login({
      email: email.trim(),
      password: password.trim(),
    });

      signIn(
        response.token,
        response.user
      );

    navigate("/dashboard", {
      replace: true,
    });

  } catch (err: any) {
    console.log("Full Error:", err);
    console.log("Response:", err.response);
    console.log("Response Data:", err.response?.data);

    setError(
      err.response?.data?.message ||
      "Invalid email or password."
    );

  } finally {
    setLoading(false);
  }
}

  return (
    <div className="w-full max-w-md">

      {/* Header */}

      <div className="mb-10">

        <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
          Secure Access
        </span>

        <h1 className="mt-5 text-5xl font-bold tracking-tight text-slate-900">
          Welcome Back 👋
        </h1>

        <p className="mt-4 leading-7 text-slate-500">
          Sign in to continue managing your supermarket with TheftGuard POS.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Email */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Email Address
          </label>

          <div className="flex items-center rounded-2xl border border-slate-200 bg-white px-4 shadow-sm transition-all duration-300 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

            <Mail
              size={20}
              className="text-slate-400"
            />

            <input
              type="email"
              placeholder="admin@theftguard.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
              autoComplete="email"
              className="h-14 w-full bg-transparent px-3 outline-none"
            />

          </div>

        </div>

        {/* Password */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Password
          </label>

          <div className="flex items-center rounded-2xl border border-slate-200 bg-white px-4 shadow-sm transition-all duration-300 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

            <Lock
              size={20}
              className="text-slate-400"
            />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="••••••••"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
              autoComplete="current-password"
              className="h-14 w-full bg-transparent px-3 outline-none"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="text-slate-400 transition hover:text-blue-600"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

        </div>

        {/* Error */}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {/* Login Button */}

        <button
          type="submit"
          disabled={loading}
          className="
            flex
            h-14
            w-full
            items-center
            justify-center
            gap-3
            rounded-2xl
            bg-blue-600
            text-lg
            font-semibold
            text-white
            transition-all
            duration-300
            hover:-translate-y-1
            hover:bg-blue-700
            hover:shadow-xl
            hover:shadow-blue-500/30
            active:scale-[0.98]
            disabled:cursor-not-allowed
            disabled:opacity-70
          "
        >
          {loading ? (
            <>
              <Loader2
                className="h-5 w-5 animate-spin"
              />

              Signing In...
            </>
          ) : (
            <>
              Sign In

              <ArrowRight
                size={20}
              />
            </>
          )}
        </button>

      </form>

      {/* Footer */}

      <div className="mt-10 border-t border-slate-200 pt-6">

        <p className="text-center text-sm text-slate-400">
          TheftGuard POS • Version 2.0
        </p>

      </div>

    </div>
  );
}