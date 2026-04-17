import { stats, testimonials } from "@/data/site";
import { SectionHeading } from "@/components/section-heading";

export function SocialProof() {
  return (
    <section id="proof" className="border-b border-[color:var(--border-soft)] bg-[color:var(--page)] py-16 sm:py-20" data-reveal>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Social proof"
          title="Built for readers who expect clarity, not clutter."
          description="Squareblack's homepage works because it repeats proof in different forms. ZoeAbode does the same with reader outcomes, testimonials, and usage metrics."
          align="center"
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <article key={stat.label} className="rounded-[28px] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] transition duration-300 hover:scale-[1.03]" data-reveal data-reveal-delay={String((index % 3) + 1)}>
              <p className="font-display text-4xl leading-none text-[color:var(--text)]">{stat.value}</p>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">
                {stat.label}
              </p>
              <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">{stat.detail}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <article key={testimonial.name} className="rounded-[32px] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] transition duration-300 hover:scale-[1.03]" data-reveal data-reveal-delay={String((index % 3) + 1)}>
              <p className="text-base leading-7 text-[color:var(--text)]">“{testimonial.quote}”</p>
              <div className="mt-6 border-t border-[color:var(--border)] pt-5">
                <p className="font-semibold text-[color:var(--text)]">{testimonial.name}</p>
                <p className="text-sm text-[color:var(--muted)]">{testimonial.role}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">
                  {testimonial.context}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
