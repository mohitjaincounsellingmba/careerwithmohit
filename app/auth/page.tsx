import type { Metadata } from "next";
import AuthClient from "./AuthClient";

export const metadata: Metadata = {
  title: "Sign Up & Login | Career & MBA Admissions Hub - CareerWithMohit",
  description: "Log in or sign up to your CareerWithMohit admissions portal. Access expert counselling tools, track recommendations, and prepare for top MBA and engineering colleges.",
  alternates: {
    canonical: "/auth",
  },
};

export default function AuthPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 sm:px-12">
      <AuthClient />
    </div>
  );
}
