import { comparisonRows, valuePropositions } from "@/data/site";
import { SectionHeading } from "@/components/section-heading";

export function ValueProp() {
  return (
    <section id="value" className="scroll-mt-24 border-b border-(--border-soft) bg-(--page) py-16 sm:py-20" data-reveal>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why ZoeAbode"
          title="Squareblack-style conversion flow, reimagined for books and knowledge."
          description="The structure is deliberate: headline, proof, comparison, then a strong product explanation. That order keeps the page persuasive without feeling manipulative."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-6 rounded-4xl border border-(--border) bg-(--surface) p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]" data-reveal data-reveal-delay="1">
            {comparisonRows.map((row) => (
              <div key={row.label} className="grid gap-4 rounded-3xl border border-(--border) bg-(--surface-soft) p-5 sm:grid-cols-[0.3fr_0.85fr_0.95fr]">
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-(--muted)">
                  {row.label}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-(--muted)">
                    Typical reading app
                  </p>
                  <p className="mt-2 text-sm leading-6 text-(--text)">{row.traditional}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-(--muted)">
                    ZoeAbode
                  </p>
                  <p className="mt-2 text-sm leading-6 text-(--text)">{row.zoeabode}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-6" data-reveal data-reveal-delay="2">
            {valuePropositions.map((item) => (
              <article key={item.title} className="rounded-4xl border border-(--border) bg-(--surface) p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] transition duration-300 hover:scale-[1.03]">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--muted)">
                  {item.eyebrow}
                </p>
                <h3 className="mt-3 font-display text-3xl leading-tight text-(--text)">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-(--muted)">{item.description}</p>
                <div className="mt-5 rounded-3xl border border-(--border) bg-(--surface-soft) px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-(--muted)">
                    Conversion signal
                  </p>
                  <p className="mt-2 font-semibold text-(--text)">{item.metric}</p>
                </div>
                <div className="mt-5 space-y-3">
                  {item.points.map((point) => (
                    <div key={point} className="flex items-start gap-3 text-sm leading-6 text-(--text)">
                      <span className="mt-2 h-2 w-2 rounded-full bg-(--text)" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
