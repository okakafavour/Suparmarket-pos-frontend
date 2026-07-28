import LoginHero from "@/components/auth/LoginHero";
import LoginForm from "@/components/auth/LoginForm";

export default function Login() {
  return (
    <main className="min-h-screen bg-slate-100">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* Left Side */}
        <LoginHero />

        {/* Right Side */}
        <section className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 px-6 py-10 lg:px-12">

          {/* Background Glow */}
          <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-blue-300/30 blur-[120px]" />

          <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-indigo-300/30 blur-[120px]" />

          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `
                linear-gradient(to right, #64748b 1px, transparent 1px),
                linear-gradient(to bottom, #64748b 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 w-full max-w-lg">

            {/* Login Card */}
            <div className="rounded-[36px] border border-white/70 bg-white/90 p-10 shadow-[0_30px_80px_rgba(15,23,42,0.15)] backdrop-blur-xl">

              <LoginForm />

            </div>

            {/* Footer */}
            <div className="mt-8 text-center">

              <p className="text-sm text-slate-500">
                © 2026 <span className="font-semibold text-slate-700">TheftGuard POS</span>
              </p>

              <p className="mt-2 text-xs text-slate-400">
                Secure • Reliable • Built for Modern Retail
              </p>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}