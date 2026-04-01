"use client";

type Cast = {
  id: string;
  name: string;
  rank: string;
  cast_photos?: { url: string; is_main: boolean }[];
};

export default function CastRibbon({ casts }: { casts: Cast[] }) {
  if (casts.length === 0) return null;
  // duplicate for seamless loop
  const items = [...casts, ...casts, ...casts];

  return (
    <div className="overflow-hidden bg-white border-y border-[var(--border)] py-4">
      <div
        className="flex gap-4"
        style={{
          width: "max-content",
          animation: `ribbonScroll ${casts.length * 3}s linear infinite`,
        }}
      >
        {items.map((cast, i) => {
          const photo = cast.cast_photos?.find((p) => p.is_main) ?? cast.cast_photos?.[0];
          return (
            <a
              key={`${cast.id}-${i}`}
              href={`/ja/models/${cast.id}`}
              className="flex-shrink-0 flex flex-col items-center gap-1 group"
            >
              <div className="w-16 h-20 overflow-hidden bg-[var(--teal-light)]">
                {photo ? (
                  <img
                    src={photo.url}
                    alt={cast.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-serif text-xl text-[var(--teal)]/40">{cast.name[0]}</span>
                  </div>
                )}
              </div>
              <p className="text-[10px] tracking-widest text-gray-500 group-hover:text-[var(--teal)] transition-colors">
                {cast.name}
              </p>
            </a>
          );
        })}
      </div>
    </div>
  );
}
