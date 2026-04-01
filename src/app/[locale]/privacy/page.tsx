export default function PrivacyPage() {
  return (
    <div>
      <div className="bg-[var(--teal)] text-white py-20 text-center">
        <h1 className="font-serif text-4xl font-light tracking-[0.25em]">PRIVACY POLICY</h1>
      </div>
      <section className="py-20 px-4 max-w-2xl mx-auto prose prose-sm text-gray-600">
        <h2>個人情報の取り扱いについて</h2>
        <p>Royal Legato（以下「当店」）は、お客様の個人情報を適切に管理し、以下の方針に従って取り扱います。</p>
        <h3>収集する情報</h3>
        <p>メルマガ登録時のメールアドレス、お問い合わせ・応募フォームに入力された情報。</p>
        <h3>利用目的</h3>
        <p>サービスのご提供、ご連絡、メルマガ配信のみに使用します。第三者への提供は行いません。</p>
        <h3>お問い合わせ</h3>
        <p>個人情報に関するお問い合わせは、LINEまたはお電話にてご連絡ください。</p>
      </section>
    </div>
  );
}
