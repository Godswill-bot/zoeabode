import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PublicProfile } from "@/components/public-profile";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";

type ProfilePageProps = {
  params: Promise<{
    username: string;
  }>;
};

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const resolved = await params;
  return {
    title: `${resolved.username} | Zoe's BookSphere`,
    description: `Public profile for ${resolved.username} on Zoe's BookSphere.`,
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const resolved = await params;

  return (
    <main className="bg-(--page)">
      <PageHeader />
      <section className="border-b border-(--border-soft) py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Public profile"
            title="Reader identity, shelves, and recent community activity."
            description="Profiles, posts, and shelf actions stay connected across the same Zoe's BookSphere account identity."
          />
          <div className="mt-12">
            <PublicProfile username={resolved.username} />
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
