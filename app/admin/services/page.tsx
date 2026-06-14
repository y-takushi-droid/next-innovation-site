'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Service = { id: string; icon: string; title: string; description: string; features: string[] };
const empty = (): Omit<Service, 'id'> => ({ icon: '', title: '', description: '', features: [''] });

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [form, setForm] = useState(empty());
  const [editing, setEditing] = useState<string | null>(null);
  const [msg, setMsg] = useState('');

  const load = () => fetch('/api/services').then((r) => r.json()).then(setServices);
  useEffect(() => { load(); }, []);

  const flash = (m: string) => { setMsg(m); setTimeout(() => setMsg(''), 3000); };

  const save = async () => {
    const method = editing ? 'PUT' : 'POST';
    const body = editing ? { ...form, id: editing } : form;
    await fetch('/api/services', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    await load();
    setForm(empty());
    setEditing(null);
    flash(editing ? '更新しました' : '追加しました');
  };

  const del = async (id: string) => {
    if (!confirm('削除しますか？')) return;
    await fetch('/api/services', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    await load();
    flash('削除しました');
  };

  const edit = (s: Service) => { setEditing(s.id); setForm({ icon: s.icon, title: s.title, description: s.description, features: s.features }); };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="text-gray-500 hover:text-white text-sm transition-colors">← ダッシュボード</Link>
          <h1 className="text-2xl font-black text-white">サービス管理</h1>
        </div>
        {msg && <div className="mb-4 px-4 py-2 bg-blue-500/20 border border-blue-500/40 rounded-xl text-blue-300 text-sm">{msg}</div>}

        {/* form */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-white font-bold mb-4">{editing ? '編集' : '新規追加'}</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="アイコン（絵文字）" className="col-span-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60" />
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="サービス名" className="col-span-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60" />
          </div>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="説明文" rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60 mb-4 resize-none" />
          <div className="mb-4">
            <div className="text-gray-400 text-sm mb-2">特徴（1行1項目）</div>
            <textarea value={form.features.join('\n')} onChange={(e) => setForm({ ...form, features: e.target.value.split('\n') })} rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60 resize-none" />
          </div>
          <div className="flex gap-3">
            <button onClick={save} className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-sm hover:shadow-[0_0_15px_rgba(0,102,255,0.5)] transition-all">
              {editing ? '更新する' : '追加する'}
            </button>
            {editing && <button onClick={() => { setEditing(null); setForm(empty()); }} className="px-6 py-3 rounded-full border border-white/20 text-white text-sm hover:bg-white/5 transition-colors">キャンセル</button>}
          </div>
        </div>

        {/* list */}
        <div className="space-y-4">
          {services.map((s) => (
            <div key={s.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <span className="text-3xl">{s.icon}</span>
                <div>
                  <div className="text-white font-bold">{s.title}</div>
                  <div className="text-gray-400 text-sm mt-1">{s.description.slice(0, 60)}...</div>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => edit(s)} className="px-4 py-2 rounded-full border border-white/20 text-white text-xs hover:bg-white/10 transition-colors">編集</button>
                <button onClick={() => del(s.id)} className="px-4 py-2 rounded-full border border-red-500/30 text-red-400 text-xs hover:bg-red-500/10 transition-colors">削除</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
