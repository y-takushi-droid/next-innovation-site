'use client';
import LogoImage from '@/components/LogoImage';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a] pt-16 pb-36">
      {/* animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#001133] to-[#0a0a0a]" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-3xl" />
      </div>

      {/* grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,102,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,102,255,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Hero ロゴ — ナビバーと社名テキストの中間に配置 */}
        <div
          className="flex justify-center"
          style={{ marginBottom: '0' }}
        >
          <LogoImage
            width={264}
            height={264}
            className="w-56 md:w-64"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(0,170,255,0.7)) drop-shadow(0 0 40px rgba(0,170,255,0.35)) brightness(1.1)',
              animation: 'heroFloat 4s ease-in-out infinite',
            }}
          />
        </div>
        <style>{`
          @keyframes heroFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        `}</style>

        <h1 className="text-6xl md:text-8xl font-black text-white mb-4 leading-tight tracking-tight -mt-8">
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
            Next Innovation
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-blue-300/80 tracking-[0.3em] uppercase font-light mb-10">
          〜 革新的な未来を 〜
        </p>

        <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto mb-10 leading-loose tracking-wide">
          Transforming Okinawa through vision, service, and innovation.<br />
          <span className="text-gray-500 text-sm">多角経営で、地域に新しい価値を。</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#services"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg shadow-[0_0_30px_rgba(0,102,255,0.5)] hover:shadow-[0_0_50px_rgba(0,102,255,0.8)] transition-all duration-300 hover:scale-105"
          >
            サービスを見る
          </a>
          <a
            href="#contact"
            className="px-8 py-4 rounded-full border border-blue-500/50 bg-white/5 backdrop-blur-sm text-white font-bold text-lg hover:bg-white/10 hover:border-blue-400 transition-all duration-300"
          >
            お問い合わせ
          </a>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
          {[
            { num: '4', label: '事業領域' },
            { num: '沖縄', label: '拠点' },
            { num: '24h', label: 'お問い合わせ受付' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(0,102,255,0.2)] transition-all duration-300"
            >
              <div className="text-2xl font-black bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                {stat.num}
              </div>
              <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 z-20">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-gray-500 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
