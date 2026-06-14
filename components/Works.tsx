'use client';

import { useState } from 'react';

type Work = {
  id: string;
  category: string;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  date: string;
};

const CATEGORIES = ['すべて', '業務用エアコン洗浄', '家庭用エアコン洗浄', '賃貸退去後清掃', 'ハウスワイド', '定期清掃', '経営コンサル', 'その他'];

function WorkCard({ work }: { work: Work }) {
  const [showAfter, setShowAfter] = useState(true);
  const hasImages = work.beforeImage || work.afterImage;

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-300 group">
      {/* 画像エリア */}
      {hasImages && (
        <div className="relative aspect-video bg-white/5 overflow-hidden">
          {/* After画像（デフォルト表示） */}
          {work.afterImage && (
            <img
              src={work.afterImage}
              alt={`${work.title} After`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${showAfter ? 'opacity-100' : 'opacity-0'}`}
            />
          )}
          {/* Before画像 */}
          {work.beforeImage && (
            <img
              src={work.beforeImage}
              alt={`${work.title} Before`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${showAfter ? 'opacity-0' : 'opacity-100'}`}
            />
          )}
          {/* Before/After 切り替えボタン */}
          {work.beforeImage && work.afterImage && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex rounded-full overflow-hidden border border-white/20 text-xs font-bold shadow-lg">
              <button
                onClick={() => setShowAfter(false)}
                className={`px-3 py-1.5 transition-colors ${!showAfter ? 'bg-white text-black' : 'bg-black/50 text-white'}`}
              >
                Before
              </button>
              <button
                onClick={() => setShowAfter(true)}
                className={`px-3 py-1.5 transition-colors ${showAfter ? 'bg-blue-500 text-white' : 'bg-black/50 text-white'}`}
              >
                After
              </button>
            </div>
          )}
          {/* 画像が片方だけの場合のラベル */}
          {(work.afterImage && !work.beforeImage) && (
            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-blue-500/80 text-white text-xs font-bold">After</span>
          )}
          {(work.beforeImage && !work.afterImage) && (
            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white/60 text-black text-xs font-bold">Before</span>
          )}
        </div>
      )}

      {/* テキストエリア */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-medium">
            {work.category}
          </span>
          <span className="text-gray-600 text-xs">{work.date}</span>
        </div>
        <h3 className="text-white font-bold text-sm mb-1">{work.title}</h3>
        {work.description && (
          <p className="text-gray-400 text-xs leading-relaxed">{work.description}</p>
        )}
      </div>
    </div>
  );
}

export default function Works({ works }: { works: Work[] }) {
  const [activeCategory, setActiveCategory] = useState('すべて');

  const usedCategories = ['すべて', ...Array.from(new Set(works.map((w) => w.category)))];
  const filtered = activeCategory === 'すべて' ? works : works.filter((w) => w.category === activeCategory);

  if (works.length === 0) return null;

  return (
    <section id="works" className="py-24 bg-[#060610] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/8 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-blue-400 text-sm tracking-widest uppercase font-semibold">Works</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-4">
            施工<span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">実績</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            実際の施工事例をご覧ください。Before / After でビフォーアフターを確認できます。
          </p>
        </div>

        {/* カテゴリフィルター */}
        {works.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {usedCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_15px_rgba(0,102,255,0.3)]'
                    : 'bg-white/5 border border-white/10 text-gray-400 hover:border-blue-500/30 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* グリッド */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      </div>
    </section>
  );
}
