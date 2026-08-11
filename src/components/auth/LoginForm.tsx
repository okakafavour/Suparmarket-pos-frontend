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

const MAX_LOGIN_ATTEMPTS = 3;
const RETRY_DELAY = 3000;

function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default function LoginForm() {
  const navigate = useNavigate();

  const { login: signIn } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (loading) {
      return;
    }

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    setError("");
    setAttempt(0);

    for (
      let currentAttempt = 1;
      currentAttempt <= MAX_LOGIN_ATTEMPTS;
      currentAttempt++
    ) {
      try {
        setAttempt(currentAttempt);

        console.log(
          `Login attempt ${currentAttempt}/${MAX_LOGIN_ATTEMPTS}`
        );

        const response = await login({
          email: cleanEmail,
          password: cleanPassword,
        });

        console.log("Login successful");

        signIn(response.token, response.user);

        navigate("/dashboard", {
          replace: true,
        });

        return;
      } catch (err: any) {
        console.error(
          `Login attempt ${currentAttempt} failed:`,
          err
        );

        const status = err?.response?.status;

        const responseMessage =
          err?.response?.data?.message;

        /*
         * 401 means the backend received the request
         * and rejected the credentials.
         *
         * Do NOT retry invalid credentials.
         */
        if (status === 401) {
          setError(
            responseMessage ||
              "Invalid email or password."
          );

          setLoading(false);
          setAttempt(0);

          return;
        }

        /*
         * 403 can also mean the account/request was
         * explicitly rejected by the backend.
         *
         * Don't repeatedly send the same request.
         */
        if (status === 403) {
          setError(
            responseMessage ||
              "You are not authorized to sign in."
          );

          setLoading(false);
          setAttempt(0);

          return;
        }

        /*
         * If this wasn't the final attempt,
         * assume it may be a temporary network,
         * Render cold-start, timeout, or server problem.
         */
        if (currentAttempt < MAX_LOGIN_ATTEMPTS) {
          setError(
            `Server is waking up or temporarily unavailable. Retrying... (${currentAttempt}/${MAX_LOGIN_ATTEMPTS})`
          );

          await wait(RETRY_DELAY);

          continue;
        }

        /*
         * All attempts failed.
         */
        setError(
          "Unable to connect to the server. Please check your internet connection and try again."
        );

        setLoading(false);
        setAttempt(0);

        return;
      }
    }

    setLoading(false);
    setAttempt(0);
  }

  return (
    <div>
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="mb-10">
        <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
          Secure Access
        </span>

        <h1 className="mt-5 text-5xl font-bold tracking-tight text-slate-900">
          Welcome Back 👋
        </h1>

        <p className="mt-4 leading-7 text-slate-500">
          Sign in to continue managing your supermarket
          with TheftGuard POS.
        </p>
      </div>

      {/* =====================================================
          LOGIN FORM
      ====================================================== */}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* =================================================
            EMAIL
        ================================================== */}

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
              disabled={loading}
              className="h-14 w-full bg-transparent px-3 outline-none disabled:cursor-not-allowed disabled:opacity-70"
            />
          </div>
        </div>

        {/* =================================================
            PASSWORD
        ================================================== */}

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
              disabled={loading}
              className="h-14 w-full bg-transparent px-3 outline-none disabled:cursor-not-allowed disabled:opacity-70"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword((previous) => !previous)
              }
              disabled={loading}
              className="text-slate-400 transition hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>

        {/* =================================================
            ERROR / STATUS
        ================================================== */}

        {error && (
          <div
            className={`rounded-2xl border px-4 py-3 text-sm font-medium ${
              loading
                ? "border-blue-200 bg-blue-50 text-blue-600"
                : "border-red-200 bg-red-50 text-red-600"
            }`}
          >
            <div className="flex items-center gap-3">
              {loading && (
                <Loader2
                  size={17}
                  className="shrink-0 animate-spin"
                />
              )}

              <span>{error}</span>
            </div>
          </div>
        )}

        {/* =================================================
            LOGIN BUTTON
        ================================================== */}

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
              <Loader2 className="h-5 w-5 animate-spin" />

              {attempt > 1
                ? `Retrying... (${attempt}/${MAX_LOGIN_ATTEMPTS})`
                : "Signing In..."}
            </>
          ) : (
            <>
              Sign In

              <ArrowRight size={20} />
            </>
          )}
        </button>
      </form>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <div className="mt-10 border-t border-slate-200 pt-6">
        <p className="text-center text-sm text-slate-400">
          TheftGuard POS • Version 2.0
        </p>
      </div>
    </div>
  );
}