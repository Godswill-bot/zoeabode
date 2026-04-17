import { steps } from "@/data/site";
import { SectionHeading } from "@/components/section-heading";

export function HowItWorks() {
  return (
    <section id="process" className="border-b border-[color:var(--border-soft)] bg-[color:var(--page)] py-16 sm:py-20" data-reveal>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How it works"
          title="A simple journey from intent to action."
          description="The structure stays minimal on purpose: pick a shelf, inspect the book, and save what matters. That keeps the experience easy to understand on the first visit."
          align="center"
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.number} className="rounded-[32px] border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] transition duration-300 hover:scale-[1.02]" data-reveal data-reveal-delay={String(index + 1)}>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[color:var(--muted)]">
                Step {step.number}
              </p>
              <h3 className="mt-4 font-display text-3xl leading-tight text-[color:var(--text)]">
                {step.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
