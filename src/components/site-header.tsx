import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Library", href: "/library" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Visual stories", href: "/#visual-stories" },
  { label: "Profiles", href: "/profiles" },
  { label: "Guides", href: "/guides" },
  { label: "Account", href: "/account" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-(--border) bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-(--border) bg-white text-sm font-semibold tracking-[0.24em] text-(--text) shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
            ZA
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-2xl text-(--text)">ZoeAbode</span>
            <span className="text-[11px] uppercase tracking-[0.32em] text-(--muted)">
              Knowledge ecosystem
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-3 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="tab-chip inline-flex items-center rounded-full px-3 py-2 text-sm font-medium text-(--muted) hover:bg-(--surface) hover:text-(--text)"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-full bg-(--text) px-5 py-2.5 text-sm font-semibold text-white transition duration-300 hover:scale-[1.03]"
          >
            Sign up to start
          </Link>
        </div>
      </div>
    </header>
  );
}
