import type { Metadata } from "next";
import { AuthPanel } from "@/components/auth-panel";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Account | ZoeAbode",
  description: "Manage your ZoeAbode reader profile and saved stack.",
};

export default function AccountPage() {
  return (
    <main className="bg-(--page)">
      <PageHeader />
      <section className="border-b border-(--border-soft) py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Account"
            title="Sign in, save your stack, and keep your reading profile in one place."
            description="This mock auth surface gives ZoeAbode a production-style account flow without needing a live backend yet."
          />
          <div className="mt-12">
            <AuthPanel />
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
