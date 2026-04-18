import type { Metadata } from "next";
import { GuideGrid } from "@/components/guide-grid";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { guidePaths } from "@/data/guides";

export const metadata: Metadata = {
  title: "Guides | Zoe's BookSphere",
  description: "Editorial reading paths and knowledge journeys for Zoe's BookSphere readers.",
};

export default function GuidesPage() {
  return (
    <main className="bg-(--page)">
      <PageHeader />
      <section className="border-b border-(--border-soft) py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Guides"
            title="Turn reading into a path instead of a pile of books."
            description="These editorial tracks help readers move from interest to action with a clear sequence of books and outcomes."
          />
          <div className="mt-12">
            <GuideGrid guides={guidePaths} />
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
