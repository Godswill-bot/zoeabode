import Image from "next/image";
import { stats, testimonials } from "@/data/site";
import { SectionHeading } from "@/components/section-heading";
import peepsPortrait from "../../peeps.webp";
import peoplePortrait from "../../people.webp";
import girlPortrait from "../../girl.jpg";

const socialTiles = [
  { kind: "portrait" as const, testimonial: testimonials[0], portrait: peepsPortrait, className: "lg:row-span-2" },
  { kind: "quote" as const, testimonial: testimonials[0], className: "lg:col-span-1" },
  { kind: "portrait" as const, testimonial: testimonials[1], portrait: peoplePortrait, className: "lg:row-span-2" },
  { kind: "quote" as const, testimonial: testimonials[1], className: "lg:col-span-1" },
  { kind: "quote" as const, testimonial: testimonials[2], className: "lg:col-span-1" },
  { kind: "portrait" as const, testimonial: testimonials[2], portrait: girlPortrait, className: "lg:row-span-2" },
];

export function SocialProof() {
  return (
    <section id="proof" className="border-b border-(--border-soft) bg-(--page) py-16 sm:py-20" data-reveal>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Social proof"
          title="Built for readers who expect clarity, not clutter."
          description="Squareblack's homepage works because it repeats proof in different forms. ZoeAbode does the same with reader outcomes, testimonials, and usage metrics."
          align="center"
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <article key={stat.label} className="rounded-3xl border border-(--border) bg-(--surface) p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] transition duration-300 hover:scale-[1.03]" data-reveal data-reveal-delay={String((index % 3) + 1)}>
              <p className="font-display text-4xl leading-none text-(--text)">{stat.value}</p>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.22em] text-(--muted)">
                {stat.label}
              </p>
              <p className="mt-3 text-sm leading-6 text-(--muted)">{stat.detail}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4 xl:auto-rows-[210px]">
          {socialTiles.map((tile, index) => {
            const testimonial = tile.testimonial;

            if (tile.kind === "portrait") {
              return (
                <article
                  key={`${testimonial.name}-social-portrait-${index}`}
                  className={`group relative overflow-hidden rounded-4xl border border-(--border) bg-(--surface) shadow-[0_24px_80px_rgba(15,23,42,0.08)] ${tile.className}`}
                  data-reveal
                  data-reveal-delay={String((index % 3) + 1)}
                >
                  <div className="absolute inset-0">
                    <Image src={tile.portrait} alt={testimonial.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
                  </div>
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(15,23,42,0.9),rgba(15,23,42,0.12)_55%,rgba(15,23,42,0.25))]" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/70">{testimonial.name}</p>
                    <p className="mt-2 text-xl font-display font-bold leading-[1.14] tracking-[-0.04em] sm:text-[1.65rem]">
                      {testimonial.quote}
                    </p>
                    <p className="mt-3 text-sm text-white/80">{testimonial.role}</p>
                  </div>
                </article>
              );
            }

            return (
              <article
                key={`${testimonial.name}-social-quote-${index}`}
                className={`flex min-h-80 flex-col justify-between rounded-4xl border border-(--border) bg-(--surface) p-7 shadow-[0_24px_80px_rgba(15,23,42,0.06)] ${tile.className}`}
                data-reveal
                data-reveal-delay={String((index % 3) + 1)}
              >
                <p className="max-w-2xl text-[1.25rem] leading-[1.28] tracking-[-0.035em] text-(--text) sm:text-[1.45rem]">
                  {testimonial.quote}
                </p>
                <div className="mt-10 border-t border-(--border) pt-5">
                  <p className="font-semibold text-(--text)">{testimonial.name}</p>
                  <p className="mt-1 text-sm text-(--muted)">{testimonial.role}</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-(--muted)">
                    {testimonial.context}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}


