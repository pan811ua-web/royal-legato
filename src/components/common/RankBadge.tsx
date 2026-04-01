const rankStyles: Record<string, string> = {
  DIAMOND: "bg-[#b9f2ff] text-[#006070] border-[#4ECDC4]",
  PLATINUM: "bg-[#e8e0ff] text-[#4a3080] border-[#9b8ec4]",
  GOLD: "bg-[var(--gold-light)] text-[var(--gold-dark)] border-[var(--gold)]",
  SILVER: "bg-gray-100 text-gray-600 border-gray-300",
};

const rankLabels: Record<string, string> = {
  DIAMOND: "◆ DIAMOND",
  PLATINUM: "◆ PLATINUM",
  GOLD: "◆ GOLD",
  SILVER: "◆ SILVER",
};

export default function RankBadge({ rank }: { rank: string }) {
  return (
    <span className={`inline-block text-[10px] tracking-widest px-2 py-0.5 border ${rankStyles[rank] ?? "bg-gray-100 text-gray-500 border-gray-300"}`}>
      {rankLabels[rank] ?? rank}
    </span>
  );
}
