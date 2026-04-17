type FloatingBooksBackdropProps = {
  className?: string;
};

const floatingBooks = [
  { icon: "✦", size: "text-6xl", position: "left-[6%] top-[14%] [animation:float_9s_ease-in-out_infinite] [animation-delay:0.2s] text-black/20" },
  { icon: "✺", size: "text-4xl", position: "left-[14%] top-[58%] [animation:float_10s_ease-in-out_infinite] [animation-delay:1.2s] text-black/24" },
  { icon: "◆", size: "text-7xl", position: "left-[32%] top-[20%] [animation:float_11s_ease-in-out_infinite] [animation-delay:2s] text-black/16" },
  { icon: "◌", size: "text-3xl", position: "left-[52%] top-[12%] [animation:float_8s_ease-in-out_infinite] [animation-delay:0.8s] text-black/20" },
  { icon: "✧", size: "text-7xl", position: "left-[68%] top-[26%] [animation:float_12s_ease-in-out_infinite] [animation-delay:1.8s] text-black/18" },
  { icon: "⬢", size: "text-5xl", position: "left-[82%] top-[62%] [animation:float_9.5s_ease-in-out_infinite] [animation-delay:0.4s] text-black/22" },
  { icon: "●", size: "text-3xl", position: "left-[88%] top-[10%] [animation:float_10.5s_ease-in-out_infinite] [animation-delay:2.4s] text-black/20" },
  { icon: "✢", size: "text-5xl", position: "left-[44%] top-[68%] [animation:float_11.5s_ease-in-out_infinite] [animation-delay:1.5s] text-black/24" },
  { icon: "◇", size: "text-6xl", position: "left-[24%] top-[76%] [animation:float_13s_ease-in-out_infinite] [animation-delay:2.2s] text-black/16" },
  { icon: "✤", size: "text-4xl", position: "left-[58%] top-[44%] [animation:float_8.5s_ease-in-out_infinite] [animation-delay:1s] text-black/22" },
  { icon: "⬟", size: "text-6xl", position: "left-[11%] top-[31%] [animation:float_12.5s_ease-in-out_infinite] [animation-delay:2.6s] text-black/14" },
  { icon: "✹", size: "text-3xl", position: "left-[40%] top-[46%] [animation:float_7.5s_ease-in-out_infinite] [animation-delay:0.6s] text-black/20" },
];

export function FloatingBooksBackdrop({ className = "" }: FloatingBooksBackdropProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 z-10 overflow-hidden ${className}`} aria-hidden="true">
      {floatingBooks.map((book) => (
        <span
          key={`${book.icon}-${book.position}`}
          className={`absolute select-none drop-shadow-[0_10px_24px_rgba(0,0,0,0.08)] ${book.size} ${book.position}`}
        >
          {book.icon}
        </span>
      ))}
    </div>
  );
}
