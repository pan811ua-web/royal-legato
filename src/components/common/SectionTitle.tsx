interface SectionTitleProps {
  en: string;
  ja: string;
  light?: boolean;
}

export default function SectionTitle({ en, ja, light }: SectionTitleProps) {
  return (
    <div className="text-center mb-12">
      <p className={`text-xs tracking-[0.3em] mb-2 ${light ? "text-white/60" : "text-gray-400"}`}>{ja}</p>
      <h2 className={`font-serif text-4xl md:text-5xl font-light tracking-[0.2em] ${light ? "text-white" : "text-[var(--teal)]"}`}>
        {en}
      </h2>
      <div className="orn-divider max-w-xs mx-auto mt-4">
        <span className="text-[var(--gold)] text-lg">✦</span>
      </div>
    </div>
  );
}
