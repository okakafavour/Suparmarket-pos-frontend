import type { ReactNode } from "react";
import LoginHero from "@/components/auth/LoginHero";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({
  children,
}: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* Left Side */}

        <LoginHero />

        {/* Right Side */}

        <section className="flex items-center justify-center p-6 sm:p-10 lg:p-16">
          <div className="w-full max-w-md">
            {children}
          </div>
        </section>

      </div>
    </main>
  );
}