export default function FixedContactBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 flex lg:hidden border-t border-white/20 shadow-lg">
      <a href="https://line.me/R/ti/p/@royallegato" target="_blank" rel="noopener noreferrer"
        className="flex-1 bg-[#06C755] text-white text-[10px] tracking-widest py-3 flex flex-col items-center gap-0.5">
        <span className="text-base">💬</span>
        LINE
      </a>
      <a href="https://wa.me/810000000000" target="_blank" rel="noopener noreferrer"
        className="flex-1 bg-[#25D366] text-white text-[10px] tracking-widest py-3 flex flex-col items-center gap-0.5">
        <span className="text-base">📱</span>
        WhatsApp
      </a>
      <a href="tel:090-0000-0000"
        className="flex-1 bg-[var(--teal)] text-white text-[10px] tracking-widest py-3 flex flex-col items-center gap-0.5">
        <span className="text-base">📞</span>
        TEL
      </a>
    </div>
  );
}
