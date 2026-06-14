'use client';

import { setContactPreset } from '@/lib/contactPreset';

type Job = {
  id: string;
  title: string;
  type: string;
  location: string;
  salary: string;
  workHours?: string;
  description: string;
  requirements: string[];
  active: boolean;
};

export default function Recruitment({ jobs }: { jobs: Job[] }) {
  const activeJobs = jobs.filter((j) => j.active);

  return (
    <section id="recruitment" className="py-24 bg-[#060610] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-blue-400 text-sm tracking-widest uppercase font-semibold">Recruitment</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-4">
            採用<span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">情報</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            一緒に沖縄から新しい価値を生み出す仲間を募集しています。
          </p>
        </div>

        {activeJobs.length === 0 ? (
          <div className="text-center text-gray-500 py-12">現在募集中のポジションはありません。</div>
        ) : (
          <div className="space-y-6">
            {activeJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(0,102,255,0.1)] transition-all duration-300"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300 text-xs font-medium">
                        {job.type}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white/10 text-gray-300 text-xs">
                        📍 {job.location}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-400 text-xs mb-1">給与</div>
                    <div className="text-white font-bold text-sm leading-relaxed">{job.salary}</div>
                  </div>
                </div>

                {/* 勤務時間 */}
                {job.workHours && (
                  <div className="flex items-center gap-2 mb-4 px-4 py-2.5 rounded-xl bg-white/5 border border-white/8 w-fit">
                    <span className="text-gray-400 text-xs">🕐 勤務時間</span>
                    <span className="text-gray-200 text-sm font-medium">{job.workHours}</span>
                  </div>
                )}

                <p className="text-gray-400 text-sm mb-5 leading-relaxed">{job.description}</p>

                <div className="mb-6">
                  <div className="text-gray-500 text-xs uppercase tracking-wider mb-3">応募要件</div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {job.requirements.map((r) => (
                      <li key={r} className="flex items-center gap-2 text-gray-300 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#contact"
                  onClick={() => setContactPreset({
                    subject: '採用について',
                    detail: job.title,
                  })}
                  className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-sm hover:shadow-[0_0_20px_rgba(0,102,255,0.5)] transition-all duration-300"
                >
                  この求人に応募する
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
