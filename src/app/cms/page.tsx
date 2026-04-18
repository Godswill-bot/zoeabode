import type { Metadata } from "next";
import { CmsEditor } from "@/components/cms-editor";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { books } from "@/data/books";

export const metadata: Metadata = {
  title: "CMS | Zoe's BookSphere",
  description: "Local content management preview for the Zoe's BookSphere homepage and book shelf.",
};

export default function CmsPage() {
  return (
    <main className="bg-(--page)">
      <PageHeader />
      <section className="border-b border-(--border-soft) py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="CMS-ready"
            title="Edit homepage content and featured shelf data locally."
            description="The editor is designed around a real CMS workflow: change copy, switch the spotlight, and preview the result before wiring a backend."
          />
          <div className="mt-12">
            <CmsEditor books={books} />
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
