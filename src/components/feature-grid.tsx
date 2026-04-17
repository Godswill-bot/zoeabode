import { features } from "@/data/site";
import { SectionHeading } from "@/components/section-heading";

export function FeatureGrid() {
  return (
    <section className="border-b border-[color:var(--border-soft)] bg-[color:var(--page)] py-16 sm:py-20" data-reveal>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Core features"
          title="A premium reading product with enough structure to scale."
          description="These features are intentionally practical. They support acquisition, retention, and repeat usage without cluttering the interface."
          align="center"
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {features.map((feature, index) => (
            <article key={feature.title} className="rounded-[32px] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] transition duration-300 hover:scale-[1.03]" data-reveal data-reveal-delay={String((index % 3) + 1)}>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
                {feature.eyebrow}
              </p>
              <h3 className="mt-3 font-display text-3xl leading-tight text-[color:var(--text)]">
                {feature.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">{feature.description}</p>
              <div className="mt-5 rounded-[24px] border border-[color:var(--border)] bg-[color:var(--surface-soft)] px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">
                  Outcome
                </p>
                <p className="mt-2 font-semibold text-[color:var(--text)]">{feature.metric}</p>
              </div>
              <div className="mt-5 space-y-3">
                {feature.points.map((point) => (
                  <div key={point} className="flex items-start gap-3 text-sm leading-6 text-[color:var(--text)]">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[color:var(--text)]" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
