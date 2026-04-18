import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ProfileDirectory } from "@/components/profile-directory";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Profiles | Zoe's BookSphere",
  description: "Browse reader profiles, shelves, and community activity.",
};

export default function ProfilesPage() {
  return (
    <main className="bg-(--page)">
      <PageHeader />
      <section className="border-b border-(--border-soft) py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Profiles"
            title="See who is reading, saving, posting, and chatting on Zoe's BookSphere."
            description="Every signed-in reader gets a public profile page with shelves and recent community activity."
          />
          <div className="mt-12">
            <ProfileDirectory />
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
