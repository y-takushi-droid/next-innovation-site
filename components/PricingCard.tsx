'use client';

import { useState } from 'react';
import { setContactPreset } from '@/lib/contactPreset';

const SERVICE_SUBJECT: Record<string, string> = {
  '清掃業': '清掃業のご相談',
  '経営コンサル業': '経営コンサルのご相談',
};

type PriceRow = { label: string; price: string };

type Plan = {
  id: string;
  service: string;
  name: string;
  price: string;
  unit: string;
  description: string;
  features: string[];
  allPrices: PriceRow[];
  options: PriceRow[];
  recommended: boolean;
};

export default function PricingCard({ plan }: { plan: Plan }) {
  const [showAll, setShowAll] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const hasAllPrices = plan.allPrices && plan.allPrices.length > 0;
  const hasOptions = plan.options && plan.options.length > 0;

  return (
    <div
      className={`relative rounded-3xl p-7 border transition-all duration-300 flex flex-col ${
        plan.recommended
          ? 'bg-gradient-to-br from-blue-900/40 to-cyan-900/20 border-blue-500/60 shadow-[0_0_40px_rgba(0,102,255,0.2)]'
          : 'bg-white/5 border-white/10 hover:border-blue-500/30'
      }`}
    >
      {plan.recommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold whitespace-nowrap">
          おすすめ
        </div>
      )}

      {/* ヘッダー */}
      <div className="text-gray-400 text-xs mb-1">{plan.description}</div>
      <div className="text-white font-bold text-lg mb-2">{plan.name}</div>
      <div className="flex items-end gap-1 mb-4">
        {plan.price === 'FREE' ? (
          <>
            <span className="text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              無料
            </span>
            <span className="text-gray-400 text-sm mb-1 ml-1">{plan.unit}</span>
          </>
        ) : (
          <>
            <span className="text-gray-400 text-sm">¥</span>
            <span className="text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              {plan.price}
            </span>
            <span className="text-gray-400 text-sm mb-1">/{plan.unit}</span>
          </>
        )}
      </div>

      {/* 基本特徴 */}
      <ul className="space-y-2 mb-4">
        {plan.features.map((f) => {
          const isNote = f.startsWith('※');
          return (
            <li key={f} className={`flex items-start gap-3 text-sm ${isNote ? 'text-gray-500' : 'text-gray-300'}`}>
              <span className={`flex-shrink-0 mt-0.5 ${isNote ? 'text-gray-600' : 'text-blue-400'}`}>
                {isNote ? '─' : '✓'}
              </span>
              {f}
            </li>
          );
        })}
      </ul>

      {/* 全料金一覧（展開） */}
      {hasAllPrices && (
        <div className="mb-4">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 text-blue-400 text-xs font-semibold hover:text-blue-300 transition-colors"
          >
            <span
              className="text-lg leading-none transition-transform duration-200"
              style={{ transform: showAll ? 'rotate(90deg)' : 'rotate(0deg)', display: 'inline-block' }}
            >
              ›
            </span>
            {showAll ? '料金一覧を閉じる' : '全ての料金を見る'}
          </button>
          {showAll && (
            <div className="mt-3 rounded-xl overflow-hidden border border-white/10">
              {plan.allPrices.map((row, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-[1fr_auto] items-baseline gap-x-4 px-4 py-2.5 text-sm ${
                    i % 2 === 0 ? 'bg-white/5' : 'bg-transparent'
                  }`}
                >
                  <span className="text-gray-300">{row.label}</span>
                  <span className="text-white font-bold whitespace-nowrap text-right">{row.price}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* オプション（展開） */}
      {hasOptions && (
        <div className="mb-5">
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="flex items-center gap-2 text-cyan-400 text-xs font-semibold hover:text-cyan-300 transition-colors"
          >
            <span
              className="text-lg leading-none transition-transform duration-200"
              style={{ transform: showOptions ? 'rotate(90deg)' : 'rotate(0deg)', display: 'inline-block' }}
            >
              ›
            </span>
            {showOptions ? 'オプションを閉じる' : 'オプションを見る'}
          </button>
          {showOptions && (
            <div className="mt-3 rounded-xl overflow-hidden border border-cyan-500/20">
              {plan.options.map((row, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-[1fr_auto] items-baseline gap-x-4 px-4 py-2.5 text-sm ${
                    i % 2 === 0 ? 'bg-cyan-500/5' : 'bg-transparent'
                  }`}
                >
                  <span className="text-gray-300">{row.label}</span>
                  <span className="text-cyan-300 font-bold whitespace-nowrap text-right">{row.price}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* CTA */}
      <div className="mt-auto">
        <a
          href="#contact"
          onClick={() => setContactPreset({
            subject: SERVICE_SUBJECT[plan.service] ?? 'その他',
            detail: plan.name,
          })}
          className={`block text-center py-3 rounded-full font-bold text-sm transition-all duration-300 ${
            plan.recommended
              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-[0_0_20px_rgba(0,102,255,0.5)]'
              : 'border border-white/20 text-white hover:border-blue-500/50 hover:bg-white/5'
          }`}
        >
          このプランで相談する
        </a>
      </div>
    </div>
  );
}
