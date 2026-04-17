import Link from "next/link";

export function CtaBanner() {
  return (
    <section className="border-b border-(--border-soft) bg-(--page) py-16 sm:py-20" data-reveal>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-4xl border border-(--border) bg-[linear-gradient(135deg,rgba(255,255,255,1),rgba(248,248,248,1))] px-6 py-12 text-(--text) shadow-[0_28px_100px_rgba(15,23,42,0.08)] sm:px-10 lg:px-14 lg:py-16 transition duration-300 hover:scale-[1.01]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(247,247,247,0.95),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.92),transparent_33%)]" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-(--muted)">
                Final CTA
              </p>
              <h2 className="mt-4 font-display text-4xl leading-[0.96] sm:text-5xl lg:text-6xl">
                Build your reading stack around outcomes, not noise.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-(--muted)">
                ZoeAbode gives readers a premium way to discover books, save what matters, and turn
                curiosity into a repeatable knowledge habit.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full bg-(--text) px-6 py-3.5 text-sm font-semibold text-white transition duration-300 hover:scale-[1.03]"
              >
                Sign up to start
              </Link>
              <Link
                href="/guides"
                className="inline-flex items-center justify-center rounded-full border border-(--border) bg-white px-6 py-3.5 text-sm font-semibold text-(--text) transition duration-300 hover:scale-[1.03] hover:border-(--border-strong)"
              >
                See the flow
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
