import type { Metadata } from "next";
import { AdminLoginPanel } from "@/components/admin-login-panel";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Admin Login | Zoe's BookSphere",
  description: "Private login page for Zoe's BookSphere administrators.",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="bg-(--page)">
      <PageHeader />
      <section className="border-b border-(--border-soft) py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Admin login"
            title="Secure sign in for existing administrators only."
            description="This page is not linked in the public navigation and is only for admin accounts created in Supabase or by another admin."
          />
          <div className="mt-12">
            <AdminLoginPanel />
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
