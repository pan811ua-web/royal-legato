"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

type Campaign = {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  note?: string;
  price?: string;
  priceUnit?: string;
  href: string;
  imgSrc?: string;
};

const CAMPAIGNS: Campaign[] = [
  {
    id: "shinki",
    title: "新規割",
    titleEn: "Discount For New Customers",
    description: "ご新規様限定",
    note: "指名料・交通費最大7,000円が無料に",
    price: "37,000",
    priceUnit: "円〜",
    href: "/reservation",
  },
  {
    id: "takuomi",
    title: "宅飲みプラン",
    titleEn: "Home Party Plan",
    description: "お部屋でゆったり楽しむ特別プラン",
    note: "ドリンク持参でさらにお得",
    price: "39,000",
    priceUnit: "円〜",
    href: "/system",
  },
  {
    id: "regular",
    title: "リピーター割",
    titleEn: "Repeater Discount",
    description: "2回目以降のご利用でお得に",
    note: "ご利用回数に応じて特典アップ",
    price: "35,000",
    priceUnit: "円〜",
    href: "/reservation",
  },
  {
    id: "hotel",
    title: "ホテル出張",
    titleEn: "Hotel Visit",
    description: "都内主要ホテルへ出張対応",
    note: "交通費別途・詳細はお問い合わせ",
    href: "/reservation",
  },
  {
    id: "midnight",
    title: "深夜割増なし",
    titleEn: "No Late Night Surcharge",
    description: "深夜0時以降も追加料金なし",
    note: "翌朝6:00まで同一料金でご案内",
    href: "/system",
  },
];

// card width in vw + gap in px
const CARD_VW = 68;
const GAP_PX = 16;

export default function CampaignSlider({ locale }: { locale: string }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = CAMPAIGNS.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % count), [count]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + count) % count), [count]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [paused, next]);

  // translateX: start at 16vw so first card is centered (16vw left margin), then each step moves by cardWidth+gap
  const translateX = `calc(${(100 - CARD_VW) / 2}vw - ${current} * (${CARD_VW}vw + ${GAP_PX}px))`;

  return (
    <section
      className="py-12 bg-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Heading */}
      <div className="text-center mb-8">
        <p className="text-[10px] tracking-[0.4em] text-[var(--teal)] mb-1">CAMPAIGN</p>
        <h2 className="font-serif text-xl tracking-[0.3em] text-gray-800">キャンペーン・割引</h2>
      </div>

      {/* Slider outer — clips overflow */}
      <div className="relative overflow-hidden">
        {/* Track */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(${translateX})`, gap: `${GAP_PX}px` }}
        >
          {CAMPAIGNS.map((campaign, i) => {
            const isActive = i === current;
            return (
              <div
                key={campaign.id}
                className="flex-shrink-0 transition-opacity duration-500"
                style={{ width: `${CARD_VW}vw`, opacity: isActive ? 1 : 0.45 }}
              >
                <Link href={`/${locale}${campaign.href}`} className="block group">
                  <div
                    className={`flex overflow-hidden border h-56 transition-shadow duration-500 ${
                      isActive ? "border-gray-200 shadow-lg" : "border-gray-100"
                    }`}
                  >
                    {/* Left: text */}
                    <div className="flex-1 bg-white p-8 flex flex-col justify-between">
                      <div>
                        <p className="text-[10px] tracking-[0.3em] text-gray-400 mb-1">{campaign.titleEn}</p>
                        <h3 className="font-serif font-light tracking-wider text-[var(--teal)] leading-tight"
                          style={{ fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)" }}>
                          {campaign.title}
                        </h3>
                        <p className="text-xs tracking-widest text-gray-500 mt-2">{campaign.description}</p>
                      </div>
                      <div>
                        {campaign.price && (
                          <p>
                            <span className="font-serif text-2xl text-gray-800 tracking-wider">{campaign.price}</span>
                            <span className="text-sm text-gray-400 ml-1">{campaign.priceUnit}</span>
                          </p>
                        )}
                        {campaign.note && (
                          <p className="text-[10px] text-gray-400 tracking-wide mt-1">{campaign.note}</p>
                        )}
                      </div>
                    </div>

                    {/* Right: photo / deco */}
                    <div
                      className="flex-shrink-0 relative bg-[var(--teal-light)] flex items-center justify-center overflow-hidden"
                      style={{ width: "36%" }}
                    >
                      {campaign.imgSrc ? (
                        <img src={campaign.imgSrc} alt={campaign.title} className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-serif select-none text-[var(--teal)]/10 leading-none"
                          style={{ fontSize: "7rem" }}>
                          {campaign.title[0]}
                        </span>
                      )}
                      <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white/50 to-transparent" />
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Prev / Next */}
        <button onClick={prev} aria-label="前へ"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white border border-gray-200 shadow flex items-center justify-center text-lg text-gray-400 hover:text-[var(--teal)] hover:border-[var(--teal)] transition-colors">
          ‹
        </button>
        <button onClick={next} aria-label="次へ"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white border border-gray-200 shadow flex items-center justify-center text-lg text-gray-400 hover:text-[var(--teal)] hover:border-[var(--teal)] transition-colors">
          ›
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {CAMPAIGNS.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} aria-label={`スライド ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "bg-[var(--teal)] w-6" : "bg-gray-300 w-2"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
