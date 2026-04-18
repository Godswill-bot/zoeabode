import Link from "next/link";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Library", href: "/library" },
  { label: "Guides", href: "/guides" },
  { label: "Sign Up", href: "/signup" },
];

export function SiteFooter() {
  return (
    <footer className="bg-(--page) py-12">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_auto] lg:px-8">
        <div>
          <Link href="/" className="font-display text-3xl text-(--text)">
            Zoe's BookSphere
          </Link>
          <p className="mt-3 max-w-xl text-sm leading-6 text-(--muted)">
            A premium knowledge ecosystem for readers, students, and self-development audiences
            who want better discovery, stronger habits, and more useful reading outcomes.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-(--muted)">
              Explore
            </p>
            <div className="mt-4 flex flex-col gap-3">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-(--text) transition hover:text-(--muted)"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-(--muted)">
              Contact
            </p>
            <div className="mt-4 space-y-3 text-sm text-(--text)">
              <p>hello@zoesbooksphere.com</p>
              <p>Curated for premium digital reading experiences.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
