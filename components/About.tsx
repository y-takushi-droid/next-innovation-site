export default function About() {
  return (
    <section id="about" className="py-24 bg-[#060610] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-blue-400 text-sm tracking-widest uppercase font-semibold">About Us</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-4">
            会社<span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">概要</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
          <div>
            {/* 代表挨拶 */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-gradient-to-r from-blue-500 to-transparent" />
              <span className="text-blue-400 text-xs tracking-widest uppercase font-semibold">代表挨拶</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-6 leading-snug">
              3Kと呼ばれる仕事を、<br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                社会が誇れる仕事へ。
              </span>
            </h3>

            <p className="text-gray-300 leading-relaxed mb-5">
              前職では企業の運営部部長として、新規事業の一つに清掃業を立ち上げました。
              そこで初めて、現実と向き合うことになります。
            </p>
            <p className="text-gray-300 leading-relaxed mb-5">
              清掃業は「3K（きつい・きたない・危険）」と呼ばれ、敬遠されがちな職業です。
              しかし実態は、建物・施設・街の清潔を守る、社会インフラの土台を支える重要な仕事です。
              それにもかかわらず、低賃金であることが多く、なかなか人が集まらない——
              その現実に、強い違和感を覚えました。
            </p>
            <p className="text-gray-300 leading-relaxed mb-5">
              重要な仕事だからこそ、待遇も良くしたい。
              しっかりとした報酬があってこそ、しっかりとしたサービスが生まれる。
              その思いが、Next Innovation を立ち上げた出発点です。
            </p>
            <p className="text-gray-300 leading-relaxed mb-5">
              また、前職では飲食業にも携わり、管理職として約15年マネジメントに関わってきました。
              そこで目にしてきたのは、現場の忙しさを理由に清掃や衛生管理が後回しになっていく光景でした。
              何が問題で、どこを改善すればいいのか——清掃を知っているからこそ、見えてくることがあります。
              そういった現場の支えになりたいという思いから、Next Innovation では飲食事業への参入も準備しています。
            </p>
            <p className="text-gray-300 leading-relaxed">
              清掃のプロが飲食の現場も自ら回す。その二つをしっかり運営している姿の先に、
              はじめて説得力のある言葉が生まれると思っています。
              数値管理・衛生管理・人材育成——自分たちが現場を走り続けながら、
              同じ課題に向き合う方々へ、本音で語れる言葉を届けていく。
              それが、Next Innovationのコンサルティングにかける想いです。
            </p>

            <div className="mt-6 flex items-center gap-4">
              <div className="w-px h-10 bg-blue-500/40" />
              <div>
                <div className="text-white font-bold text-sm">登川 直樹</div>
                <div className="text-gray-500 text-xs mt-0.5">代表 / Next Innovation</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                label: 'ミッション',
                text: '清掃・飲食業界を、働く人もお客様も誇れる仕事へ。品質と人への敬意を両立し、業界の新しいスタンダードをつくる。',
              },
              {
                label: 'ビジョン',
                text: '沖縄から、清潔で誠実なサービスのモデルケースを発信する。清掃・飲食・コンサルの相乗効果で、地域に根ざした多角経営を確立する。',
              },
              {
                label: 'バリュー',
                text: '誠実・現場主義・人への敬意。私たちが大切にするのは、働く人が誇れる環境と、お客様への嘘のないサービス。言葉ではなく、日々の仕事で示す。',
              },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-blue-500/30 transition-colors"
              >
                <div className="text-blue-400 font-bold text-sm uppercase tracking-wider mb-2">{item.label}</div>
                <div className="text-gray-300 text-sm leading-relaxed">{item.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* company info table */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
          <h3 className="text-xl font-bold text-white mb-6">会社情報</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: '屋号', value: 'Next Innovation' },
              { label: '所在地', value: '沖縄県（詳細は別途ご連絡）' },
              { label: '代表', value: '登川 直樹' },
              { label: '事業内容', value: '清掃業 / 飲食業（準備中） / 経営コンサル業 / EC物販' },
              { label: '対応エリア', value: '沖縄県内全域（法人・個人どちらも歓迎）' },
              { label: 'お問い合わせ', value: 'フォームまたはお電話にてご連絡ください' },
            ].map((row) => (
              <div key={row.label} className="flex gap-4 py-3 border-b border-white/5">
                <span className="text-gray-500 text-sm w-32 flex-shrink-0">{row.label}</span>
                <span className="text-gray-200 text-sm">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
