import Image from "next/image";
import { stats, testimonials } from "@/data/site";
import { SectionHeading } from "@/components/section-heading";
import peepsPortrait from "../../peeps.webp";
import peoplePortrait from "../../people.webp";
import girlPortrait from "../../girl.jpg";

const socialCards = [
  {
    testimonial: testimonials[0],
    portrait: peepsPortrait,
    accent: "from-[#191919] via-[#313131] to-[#575757]",
  },
  {
    testimonial: testimonials[1],
    portrait: peoplePortrait,
    accent: "from-[#fafafa] via-[#f0f0f0] to-[#dedede]",
  },
  {
    testimonial: testimonials[2],
    portrait: girlPortrait,
    accent: "from-[#1e1e1e] via-[#2f2f2f] to-[#505050]",
  },
];

export function SocialProof() {
  return (
    <section id="proof" className="border-b border-(--border-soft) bg-(--page) py-16 sm:py-20" data-reveal>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Social proof"
          title="Built for readers who expect clarity, not clutter."
          description="Squareblack's homepage works because it repeats proof in different forms. Zoe's BookSphere does the same with reader outcomes, testimonials, and usage metrics."
          align="center"
        />

        <div className="mt-10 overflow-x-auto pb-8 scrollbar-hide">
          <div className="flex gap-6 pb-4">
            {stats.map((stat, index) => (
              <article 
                key={stat.label} 
                className="w-70 shrink-0 rounded-3xl border border-(--border) bg-(--surface) p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] transition duration-300 hover:scale-[1.03]" 
                data-reveal 
                data-reveal-delay={String((index % 3) + 1)}
              >
                <p className="font-display text-4xl leading-none text-(--text)">{stat.value}</p>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.22em] text-(--muted)">{stat.label}</p>
                <p className="mt-3 text-sm leading-6 text-(--muted)">{stat.detail}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex w-max gap-5 pr-4 snap-x snap-mandatory">
            {socialCards.map((card, index) => (
              <article
                key={card.testimonial.name}
                className="group relative h-105 w-80 shrink-0 snap-center overflow-hidden rounded-4xl border border-(--border) bg-(--surface) shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:h-115 sm:w-95"
                data-reveal
                data-reveal-delay={String((index % 3) + 1)}
              >
                <div className="absolute inset-0">
                  <Image src={card.portrait} alt={card.testimonial.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
                </div>
                <div className={`absolute inset-0 bg-linear-to-t ${card.accent} via-black/30 to-transparent opacity-90`} />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/70">
                    {card.testimonial.name}
                  </p>
                  <p className="mt-3 max-w-md text-[1.4rem] leading-[1.16] tracking-[-0.04em] sm:text-[1.8rem]">
                    {card.testimonial.quote}
                  </p>
                  <div className="mt-5 border-t border-white/15 pt-4 text-sm text-white/80">
                    <p className="font-semibold text-white">{card.testimonial.role}</p>
                    <p className="mt-1">{card.testimonial.context}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
