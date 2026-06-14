import Link from 'next/link';
import { readData } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default function AdminDashboard() {
  const services = readData<unknown[]>('services.json');
  const plans = readData<unknown[]>('pricing.json');
  const jobs = readData<unknown[]>('jobs.json');
  const works = readData<unknown[]>('works.json');

  const sections = [
    { href: '/admin/services', label: 'サービス管理', count: services.length, icon: '🛠️', desc: 'サービス内容の追加・編集・削除' },
    { href: '/admin/pricing', label: '料金プラン管理', count: plans.length, icon: '💴', desc: '料金プランの追加・編集・削除' },
    { href: '/admin/works', label: '施工実績管理', count: works.length, icon: '📸', desc: 'Before/After写真・実績の追加・編集' },
    { href: '/admin/jobs', label: '採用情報管理', count: jobs.length, icon: '👥', desc: '求人情報の追加・編集・削除' },
    { href: '/admin/settings', label: 'SNS設定', count: null, icon: '📲', desc: 'Instagram・X・LINE等のURL設定' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-black text-white mb-2">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              管理ダッシュボード
            </span>
          </h1>
          <p className="text-gray-400">Next Innovation — コンテンツ管理</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(0,102,255,0.1)] transition-all duration-300 group"
            >
              <div className="text-3xl mb-3">{s.icon}</div>
              <div className="text-white font-bold mb-1">{s.label}</div>
              <div className="text-gray-500 text-sm mb-3">{s.desc}</div>
              {s.count !== null ? (
                <>
                  <div className="text-blue-400 font-black text-2xl">{s.count}</div>
                  <div className="text-gray-600 text-xs">登録件数</div>
                </>
              ) : (
                <div className="text-gray-500 text-xs mt-1">アカウント設定</div>
              )}
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="text-gray-500 hover:text-white text-sm transition-colors"
          >
            ← ホームページに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
