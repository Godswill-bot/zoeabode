import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin-dashboard";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Admin Console | ZoeAbode",
  description: "Hidden admin console for ZoeAbode operations.",
  robots: { index: false, follow: false },
};

export default function AdminConsolePage() {
  return (
    <main className="bg-(--page)">
      <PageHeader />
      <section className="border-b border-(--border-soft) py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Admin console"
            title="Private operational access for ZoeAbode staff."
            description="This route is intentionally hidden from the public navigation and reserved for catalog, user, and content operations."
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
