import type { Metadata } from "next";
import Image from "next/image";
import oipImage from "../../../OIP.webp";
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
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="Sign up"
                title="Create your reading account before you start exploring."
                description="A verified account unlocks saved books, profiles, posts, chat, and all other reader actions."
              />
              <div className="mt-8 overflow-hidden rounded-4xl border border-(--border) bg-(--surface) shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
                <Image
                  src={oipImage}
                  alt="Reader and book inspiration"
                  width={1200}
                  height={800}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
            <div className="lg:pt-6">
              <AuthPanelContent initialMode="signup" />
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
