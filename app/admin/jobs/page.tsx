'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Job = { id: string; title: string; type: string; location: string; salary: string; description: string; requirements: string[]; active: boolean };
const empty = (): Omit<Job, 'id'> => ({ title: '', type: 'パート・アルバイト', location: '', salary: '', description: '', requirements: [''], active: true });

export default function AdminJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [form, setForm] = useState(empty());
  const [editing, setEditing] = useState<string | null>(null);
  const [msg, setMsg] = useState('');

  const load = () => fetch('/api/jobs').then((r) => r.json()).then(setJobs);
  useEffect(() => { load(); }, []);
  const flash = (m: string) => { setMsg(m); setTimeout(() => setMsg(''), 3000); };

  const save = async () => {
    const method = editing ? 'PUT' : 'POST';
    const body = editing ? { ...form, id: editing } : form;
    await fetch('/api/jobs', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    await load(); setForm(empty()); setEditing(null); flash(editing ? '更新しました' : '追加しました');
  };
  const del = async (id: string) => {
    if (!confirm('削除しますか？')) return;
    await fetch('/api/jobs', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    await load(); flash('削除しました');
  };
  const edit = (j: Job) => { setEditing(j.id); setForm({ title: j.title, type: j.type, location: j.location, salary: j.salary, description: j.description, requirements: j.requirements, active: j.active }); };

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="text-gray-500 hover:text-white text-sm transition-colors">← ダッシュボード</Link>
          <h1 className="text-2xl font-black text-white">採用情報管理</h1>
        </div>
        {msg && <div className="mb-4 px-4 py-2 bg-blue-500/20 border border-blue-500/40 rounded-xl text-blue-300 text-sm">{msg}</div>}

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-white font-bold mb-4">{editing ? '編集' : '新規追加'}</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="求人タイトル" className="col-span-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60" />
            <input value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} placeholder="雇用形態" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60" />
            <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="勤務地" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60" />
            <input value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} placeholder="給与" className="col-span-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60" />
          </div>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="仕事内容" rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60 mb-4 resize-none" />
          <div className="mb-4">
            <div className="text-gray-400 text-sm mb-2">応募要件（1行1項目）</div>
            <textarea value={form.requirements.join('\n')} onChange={(e) => setForm({ ...form, requirements: e.target.value.split('\n') })} rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/60 resize-none" />
          </div>
          <label className="flex items-center gap-3 text-gray-300 text-sm mb-4 cursor-pointer">
            <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="w-4 h-4" />
            募集中として表示する
          </label>
          <div className="flex gap-3">
            <button onClick={save} className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-sm hover:shadow-[0_0_15px_rgba(0,102,255,0.5)] transition-all">{editing ? '更新する' : '追加する'}</button>
            {editing && <button onClick={() => { setEditing(null); setForm(empty()); }} className="px-6 py-3 rounded-full border border-white/20 text-white text-sm hover:bg-white/5 transition-colors">キャンセル</button>}
          </div>
        </div>

        <div className="space-y-4">
          {jobs.map((j) => (
            <div key={j.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-bold">{j.title}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${j.active ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-400'}`}>{j.active ? '募集中' : '非表示'}</span>
                </div>
                <div className="text-gray-400 text-sm">{j.type} — {j.location} — {j.salary}</div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => edit(j)} className="px-4 py-2 rounded-full border border-white/20 text-white text-xs hover:bg-white/10 transition-colors">編集</button>
                <button onClick={() => del(j.id)} className="px-4 py-2 rounded-full border border-red-500/30 text-red-400 text-xs hover:bg-red-500/10 transition-colors">削除</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
