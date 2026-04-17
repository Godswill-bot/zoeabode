type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`mx-auto flex max-w-3xl flex-col gap-4 ${alignment}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.42em] text-(--muted)">
        {eyebrow}
      </p>
      <div className="space-y-3">
        <h2 className="font-display text-4xl font-semibold leading-[1.02] tracking-[-0.055em] text-(--text) sm:text-5xl lg:text-6xl">
          {title}
        </h2>
        <p className="max-w-2xl text-base leading-7 tracking-[-0.02em] text-(--muted) sm:text-lg">
          {description}
        </p>
      </div>
    </div>
  );
}
