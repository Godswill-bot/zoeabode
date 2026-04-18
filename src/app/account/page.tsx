import type { Metadata } from "next";
import { AuthPanel } from "@/components/auth-panel";
import { PageHeader } from "@/components/page-header";
import { ProfileWorkspace } from "@/components/profile-workspace";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Account | Zoe's BookSphere",
  description: "Manage your Zoe's BookSphere reader profile and saved stack.",
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
            description="Manage your verified account, edit your identity, switch themes, and handle books, posts, and chat from one hub."
          />
          <div className="mt-12">
            <AuthPanel />
          </div>
          <div className="mt-12">
            <ProfileWorkspace />
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
