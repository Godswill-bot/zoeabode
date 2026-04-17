import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin-dashboard";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Admin | ZoeAbode",
  description: "Admin dashboard for uploading books, tracking users, and managing ZoeAbode tasks.",
};

export default function AdminPage() {
  return (
    <main className="bg-(--page)">
      <PageHeader />
      <section className="border-b border-(--border-soft) py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Admin"
            title="A real control room for books, users, and site operations."
            description="This dashboard holds the actions that belong to an admin: uploading books, reviewing signups, managing content, and keeping the catalog organized."
          />
          <div className="mt-12">
            <AdminDashboard />
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
