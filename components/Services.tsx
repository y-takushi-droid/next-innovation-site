type Service = {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  comingSoon?: boolean;
};

export default function Services({ services }: { services: Service[] }) {
  return (
    <section id="services" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-blue-400 text-sm tracking-widest uppercase font-semibold">Our Services</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-4">
            私たちの<span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">サービス</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            4つの事業を通じて、多様なニーズにお応えします。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            service.comingSoon ? (
              /* COMING SOON カード — 他カードと統一レイアウト */
              <div
                key={service.id}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(0,102,255,0.15)] transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  {/* キッチンカーアイコン（絵文字と同テイストのフラットSVG） */}
                  <div className="mb-4 w-12 h-12">
                    <svg viewBox="0 0 48 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* body */}
                      <rect x="2" y="14" width="32" height="18" rx="3" fill="#F59E0B"/>
                      {/* cab */}
                      <path d="M34 14 L40 14 L45 19 L45 32 L34 32 Z" fill="#D97706"/>
                      {/* windshield */}
                      <path d="M36 17 L39 17 L43 21 L43 27 L36 27 Z" fill="#BAE6FD" opacity="0.9"/>
                      {/* roof */}
                      <rect x="1" y="10" width="33" height="5" rx="2" fill="#FBBF24"/>
                      {/* awning */}
                      <path d="M6 10 L6 5 L26 5 L26 10 Z" fill="#EF4444"/>
                      {/* awning stripes */}
                      {[10,14,18,22].map((x, i) => (
                        <line key={i} x1={x} y1="5" x2={x-3} y2="10" stroke="#fff" strokeWidth="1" opacity="0.4"/>
                      ))}
                      <line x1="6" y1="5" x2="26" y2="5" stroke="#DC2626" strokeWidth="0.8"/>
                      {/* service window */}
                      <rect x="7" y="17" width="16" height="10" rx="1.5" fill="#FEF3C7" stroke="#D97706" strokeWidth="0.8"/>
                      {/* counter shelf */}
                      <rect x="6" y="26" width="18" height="2" rx="1" fill="#D97706"/>
                      {/* window frame top */}
                      <path d="M7 17 L23 17 L23 12 L7 12 Z" fill="#F59E0B" opacity="0.6"/>
                      {/* body bottom stripe */}
                      <rect x="2" y="28" width="32" height="4" rx="0" fill="#D97706" opacity="0.5"/>
                      {/* wheels */}
                      <circle cx="11" cy="33" r="5" fill="#374151"/>
                      <circle cx="11" cy="33" r="2.5" fill="#6B7280"/>
                      <circle cx="11" cy="33" r="1" fill="#374151"/>
                      <circle cx="37" cy="33" r="5" fill="#374151"/>
                      <circle cx="37" cy="33" r="2.5" fill="#6B7280"/>
                      <circle cx="37" cy="33" r="1" fill="#374151"/>
                      {/* steam / food vibes */}
                      <path d="M12 14 Q13 11 12 9" stroke="#fff" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
                      <path d="M16 14 Q17 11 16 9" stroke="#fff" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
                    </svg>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>

                  {/* COMING SOON バッジ */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 rounded-full border border-blue-500/50 bg-blue-500/10 text-blue-300 text-xs font-bold tracking-[0.2em] uppercase">
                      Coming Soon
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
                </div>
              </div>
            ) : (
              /* 通常カード */
              <div
                key={service.id}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(0,102,255,0.15)] transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-400 mb-5 leading-relaxed text-sm">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-gray-300 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
}
