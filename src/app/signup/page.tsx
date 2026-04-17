import type { Metadata } from "next";
import { AuthPanelContent } from "@/components/auth-panel";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Sign Up | ZoeAbode",
  description: "Create a verified ZoeAbode account to start reading, saving, and posting.",
};

export default function SignupPage() {
  return (
    <main className="bg-(--page)">
      <PageHeader />
      <section className="border-b border-(--border-soft) py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Sign up"
            title="Create your reading account before you start exploring."
            description="A verified account unlocks saved books, profiles, posts, chat, and all other reader actions."
          />
          <div className="mt-12">
            <AuthPanelContent initialMode="signup" />
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
