'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Work = {
  id: string;
  category: string;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  date: string;
};

const CATEGORIES = ['業務用エアコン洗浄', '家庭用エアコン洗浄', '賃貸退去後清掃', 'ハウスワイド', '定期清掃', '経営コンサル', 'その他'];

const empty = (): Omit<Work, 'id'> => ({
  category: CATEGORIES[0],
  title: '',
  description: '',
  beforeImage: '',
  afterImage: '',
  date: new Date().toISOString().slice(0, 7), // YYYY-MM
});

export default function AdminWorks() {
  const [works, setWorks] = useState<Work[]>([]);
  const [form, setForm] = useState(empty());
  const [editing, setEditing] = useState<string | null>(null);
  const [msg, setMsg] = useState('');

  const load = () => fetch('/api/works').then((r) => r.json()).then(setWorks);
  useEffect(() => { load(); }, []);
  const flash = (m: string) => { setMsg(m); setTimeout(() => setMsg(''), 3000); };

  const save = async () => {
    const method = editing ? 'PUT' : 'POST';
    const body = editing ? { ...form, id: editing } : form;
    await fetch('/api/works', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    await load();
    setForm(empty());
    setEditing(null);
    flash(editing ? '更新しました' : '追加しました');
  };

  const del = async (id: string) => {
    if (!confirm('削除しますか？')) return;
    await fetch('/api/works', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    await load();
    flash('削除しました');
  };

  const edit = (w: Work) => {
    setEditing(w.id);
    setForm({ category: w.category, title: w.title, description: w.description, beforeImage: w.beforeImage, afterImage: w.afterImage, date: w.date });
  };

  const inp = 'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60';

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="text-gray-500 hover:text-white text-sm transition-colors">← ダッシュボード</Link>
          <h1 className="text-2xl font-black text-white">施工実績管理</h1>
        </div>

        {msg && <div className="mb-4 px-4 py-2 bg-blue-500/20 border border-blue-500/40 rounded-xl text-blue-300 text-sm">{msg}</div>}

        {/* フォーム */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-white font-bold mb-4">{editing ? '編集' : '新規追加'}</h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-gray-400 text-xs mb-1 block">カテゴリ</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className={inp}
              >
                {CATEGORIES.map((c) => <option key={c} value={c} className="bg-gray-900">{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-gray-400 text-xs mb-1 block">施工年月（YYYY-MM）</label>
              <input
                type="month"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className={inp}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-gray-400 text-xs mb-1 block">タイトル（例：〇〇市の飲食店様・天井カセット型3台）</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="タイトル"
              className={inp}
            />
          </div>

          <div className="mb-4">
            <label className="text-gray-400 text-xs mb-1 block">説明（任意）</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="施工の詳細・ポイントなど"
              rows={2}
              className={inp + ' resize-none'}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Before 画像URL（任意）</label>
              <input
                value={form.beforeImage}
                onChange={(e) => setForm({ ...form, beforeImage: e.target.value })}
                placeholder="https://..."
                className={inp}
              />
              {form.beforeImage && (
                <img src={form.beforeImage} alt="before preview" className="mt-2 w-full aspect-video object-cover rounded-lg opacity-70" onError={(e) => (e.currentTarget.style.display = 'none')} />
              )}
            </div>
            <div>
              <label className="text-gray-400 text-xs mb-1 block">After 画像URL（任意）</label>
              <input
                value={form.afterImage}
                onChange={(e) => setForm({ ...form, afterImage: e.target.value })}
                placeholder="https://..."
                className={inp}
              />
              {form.afterImage && (
                <img src={form.afterImage} alt="after preview" className="mt-2 w-full aspect-video object-cover rounded-lg opacity-70" onError={(e) => (e.currentTarget.style.display = 'none')} />
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={save}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
            >
              {editing ? '更新する' : '追加する'}
            </button>
            {editing && (
              <button
                onClick={() => { setEditing(null); setForm(empty()); }}
                className="px-6 py-2.5 border border-white/20 text-gray-400 rounded-xl hover:bg-white/5 transition-colors"
              >
                キャンセル
              </button>
            )}
          </div>
        </div>

        {/* 一覧 */}
        <div className="space-y-4">
          {works.length === 0 && (
            <div className="text-center text-gray-600 py-12">まだ実績がありません。上のフォームから追加してください。</div>
          )}
          {works.map((w) => (
            <div key={w.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-start gap-5">
              {/* サムネ */}
              {(w.afterImage || w.beforeImage) && (
                <img
                  src={w.afterImage || w.beforeImage}
                  alt={w.title}
                  className="w-24 h-16 object-cover rounded-lg flex-shrink-0 opacity-80"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs">{w.category}</span>
                  <span className="text-gray-600 text-xs">{w.date}</span>
                </div>
                <div className="text-white font-bold text-sm">{w.title}</div>
                {w.description && <div className="text-gray-500 text-xs mt-1 truncate">{w.description}</div>}
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => edit(w)} className="px-3 py-1.5 text-xs text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/10 transition-colors">編集</button>
                <button onClick={() => del(w.id)} className="px-3 py-1.5 text-xs text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/10 transition-colors">削除</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
