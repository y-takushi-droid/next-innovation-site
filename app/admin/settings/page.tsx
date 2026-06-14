'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Settings = {
  instagram: string;
  twitter: string;
  facebook: string;
  line: string;
};

const empty = (): Settings => ({ instagram: '', twitter: '', facebook: '', line: '' });

const SNS_FIELDS = [
  { key: 'instagram' as const, label: 'Instagram', placeholder: 'https://www.instagram.com/アカウント名', note: 'プロフィールページのURLを入力' },
  { key: 'twitter' as const, label: 'X (Twitter)', placeholder: 'https://twitter.com/アカウント名', note: 'プロフィールページのURLを入力' },
  { key: 'facebook' as const, label: 'Facebook', placeholder: 'https://www.facebook.com/ページ名', note: 'FacebookページのURLを入力' },
  { key: 'line' as const, label: 'LINE公式アカウント', placeholder: 'https://line.me/R/ti/p/@アカウントID', note: 'LINE公式アカウントの友達追加URLを入力' },
];

export default function AdminSettings() {
  const [form, setForm] = useState(empty());
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch('/api/settings').then((r) => r.json()).then((data) => {
      setForm({ instagram: data.instagram || '', twitter: data.twitter || '', facebook: data.facebook || '', line: data.line || '' });
    });
  }, []);

  const save = async () => {
    await fetch('/api/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setMsg('保存しました');
    setTimeout(() => setMsg(''), 3000);
  };

  const inp = 'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60 transition-colors';

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="text-gray-500 hover:text-white text-sm transition-colors">← ダッシュボード</Link>
          <h1 className="text-2xl font-black text-white">SNS設定</h1>
        </div>

        {msg && <div className="mb-4 px-4 py-2 bg-blue-500/20 border border-blue-500/40 rounded-xl text-blue-300 text-sm">{msg}</div>}

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <p className="text-gray-400 text-sm mb-6">
            URLを入力したSNSのみ、ホームページ上のSNSセクションに表示されます。
            アカウントがまだない場合は空欄のままにしてください。
          </p>

          <div className="space-y-6">
            {SNS_FIELDS.map(({ key, label, placeholder, note }) => (
              <div key={key}>
                <label className="text-white font-semibold text-sm mb-1 block">{label}</label>
                <p className="text-gray-600 text-xs mb-2">{note}</p>
                <input
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={placeholder}
                  className={inp}
                />
                {form[key] && (
                  <a href={form[key]} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-xs mt-1 inline-block hover:underline">
                    → リンクを確認する
                  </a>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={save}
            className="mt-8 w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
          >
            保存する
          </button>
        </div>
      </div>
    </div>
  );
}
