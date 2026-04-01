export default function LegalPage() {
  return (
    <div>
      <div className="bg-[var(--teal)] text-white py-20 text-center">
        <h1 className="font-serif text-4xl font-light tracking-[0.25em]">特定商取引法に基づく表記</h1>
      </div>
      <section className="py-20 px-4 max-w-2xl mx-auto">
        <table className="w-full text-sm border-collapse">
          <tbody>
            {[
              ["サービス名", "Royal Legato"],
              ["所在地", "東京都（詳細はお問い合わせください）"],
              ["電話番号", "090-0000-0000"],
              ["メールアドレス", "info@royal-legato.jp"],
              ["サービス内容", "デリバリーヘルスサービス"],
              ["料金", "各コースページをご参照ください"],
              ["支払方法", "現金"],
              ["サービス提供時期", "ご予約確定後、指定時刻"],
            ].map(([label, value]) => (
              <tr key={label} className="border-b border-gray-100">
                <td className="py-3 pr-4 text-gray-400 text-[10px] tracking-widest w-32 align-top">{label}</td>
                <td className="py-3 text-gray-700">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
