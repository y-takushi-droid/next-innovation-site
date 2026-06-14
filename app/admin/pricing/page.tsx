'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Plan = { id: string; service: string; name: string; price: string; unit: string; description: string; features: string[]; recommended: boolean };
const empty = (): Omit<Plan, 'id'> => ({ service: '', name: '', price: '', unit: '回〜', description: '', features: [''], recommended: false });

export default function AdminPricing() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [form, setForm] = useState(empty());
  const [editing, setEditing] = useState<string | null>(null);
  const [msg, setMsg] = useState('');

  const load = () => fetch('/api/pricing').then((r) => r.json()).then(setPlans);
  useEffect(() => { load(); }, []);
  const flash = (m: string) => { setMsg(m); setTimeout(() => setMsg(''), 3000); };

  const save = async () => {
    const method = editing ? 'PUT' : 'POST';
    const body = editing ? { ...form, id: editing } : form;
    await fetch('/api/pricing', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    await load(); setForm(empty()); setEditing(null); flash(editing ? '更新しました' : '追加しました');
  };
  const del = async (id: string) => {
    if (!confirm('削除しますか？')) return;
    await fetch('/api/pricing', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    await load(); flash('削除しました');
  };
  const edit = (p: Plan) => { setEditing(p.id); setForm({ service: p.service, name: p.name, price: p.price, unit: p.unit, description: p.description, features: p.features, recommended: p.recommended }); };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="text-gray-500 hover:text-white text-sm transition-colors">← ダッシュボード</Link>
          <h1 className="text-2xl font-black text-white">料金プラン管理</h1>
        </div>
        {msg && <div className="mb-4 px-4 py-2 bg-blue-500/20 border border-blue-500/40 rounded-xl text-blue-300 text-sm">{msg}</div>}

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-white font-bold mb-4">{editing ? '編集' : '新規追加'}</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} placeholder="事業名（例：清掃業）" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60" />
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="プラン名" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60" />
            <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="価格（例：15,000）" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60" />
            <input value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} placeholder="単位（例：回〜）" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60" />
          </div>
          <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="説明" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60 mb-4" />
          <div className="mb-4">
            <div className="text-gray-400 text-sm mb-2">特徴（1行1項目）</div>
            <textarea value={form.features.join('\n')} onChange={(e) => setForm({ ...form, features: e.target.value.split('\n') })} rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60 resize-none" />
          </div>
          <label className="flex items-center gap-3 text-gray-300 text-sm mb-4 cursor-pointer">
            <input type="checkbox" checked={form.recommended} onChange={(e) => setForm({ ...form, recommended: e.target.checked })} className="w-4 h-4" />
            おすすめプランとして表示する
          </label>
          <div className="flex gap-3">
            <button onClick={save} className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-sm hover:shadow-[0_0_15px_rgba(0,102,255,0.5)] transition-all">{editing ? '更新する' : '追加する'}</button>
            {editing && <button onClick={() => { setEditing(null); setForm(empty()); }} className="px-6 py-3 rounded-full border border-white/20 text-white text-sm hover:bg-white/5 transition-colors">キャンセル</button>}
          </div>
        </div>

        <div className="space-y-4">
          {plans.map((p) => (
            <div key={p.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-bold">{p.name}</span>
                  {p.recommended && <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs">おすすめ</span>}
                </div>
                <div className="text-gray-400 text-sm">{p.service} — ¥{p.price}/{p.unit}</div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => edit(p)} className="px-4 py-2 rounded-full border border-white/20 text-white text-xs hover:bg-white/10 transition-colors">編集</button>
                <button onClick={() => del(p.id)} className="px-4 py-2 rounded-full border border-red-500/30 text-red-400 text-xs hover:bg-red-500/10 transition-colors">削除</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
