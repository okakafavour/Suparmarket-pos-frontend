import { useState } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
} from "lucide-react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-md">

      <div className="mb-10">

        <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
          Secure Access
        </span>

        <h1 className="text-5xl font-bold tracking-tight">
            Welcome Back 👋
        </h1>

        <p className="mt-4 text-slate-500 leading-7">
            Sign in to continue managing your store with TheftGuard POS.
        </p>

      </div>

      <form className="space-y-6">

        {/* Email */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Email Address
          </label>

          <div className="flex items-center rounded-2xl border border-slate-200 bg-white px-4 shadow-sm transition-all focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

            <Mail
              size={20}
              className="text-slate-400"
            />

            <input
              type="email"
              placeholder="admin@theftguard.com"
              className="h-14 w-full bg-transparent px-3 outline-none"
            />

          </div>

        </div>

        {/* Password */}

        <div>

          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Password
          </label>

          <div className="flex items-center rounded-2xl border border-slate-200 bg-white px-4 shadow-sm transition-all focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

            <Lock
              size={20}
              className="text-slate-400"
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••"
              className="h-14 w-full bg-transparent px-3 outline-none"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <EyeOff
                  size={20}
                  className="text-slate-400"
                />
              ) : (
                <Eye
                  size={20}
                  className="text-slate-400"
                />
              )}
            </button>

          </div>

        </div>

        {/* Remember */}

        <div className="flex items-center justify-between">

          <label className="flex items-center gap-3 text-sm text-slate-600">

            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 accent-blue-600"
            />

            Remember me

          </label>

          <button
            type="button"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            Forgot Password?
          </button>

        </div>

        {/* Login */}

        <button
          className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 text-lg font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-300"
        >
          Sign In

          <ArrowRight size={20} />

        </button>

      </form>

      <p className="mt-10 text-center text-sm text-slate-400">
        TheftGuard POS • Version 2.0
      </p>

    </div>
  );
}