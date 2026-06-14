'use client';

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { getAndClearContactPreset } from '@/lib/contactPreset';

type FormData = {
  company: string;
  name: string;
  email: string;
  subject: string;
  detail: string;
  message: string;
};

export default function Contact() {
  const { register, handleSubmit, reset, setValue, watch, formState: { errors, isSubmitting } } = useForm<FormData>();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const detailValue = watch('detail', '');

  useEffect(() => {
    const applyPreset = () => {
      if (window.location.hash === '#contact') {
        const preset = getAndClearContactPreset();
        if (preset) {
          if (preset.subject) setValue('subject', preset.subject);
          if (preset.detail) setValue('detail', preset.detail);
        }
      }
    };
    // 初回マウント時（直接#contactで開いた場合）
    applyPreset();
    // ハッシュ遷移で#contactに来た場合
    window.addEventListener('hashchange', applyPreset);
    return () => window.removeEventListener('hashchange', applyPreset);
  }, [setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus('success');
        reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-blue-400 text-sm tracking-widest uppercase font-semibold">Contact</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-4">
            お問い合わせ
          </h2>
          <p className="text-gray-400">
            サービスのご相談・お見積もりはお気軽にどうぞ。24時間以内にご返信します。
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
          {status === 'success' ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">✅</div>
              <div className="text-white font-bold text-xl mb-2">送信完了しました！</div>
              <div className="text-gray-400">24時間以内にご返信いたします。</div>
              <button
                onClick={() => setStatus('idle')}
                className="mt-6 px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/5 transition-colors"
              >
                別のメッセージを送る
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* 会社名（任意） */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  会社名・屋号
                  <span className="ml-2 text-xs text-gray-600">（任意）</span>
                </label>
                <input
                  {...register('company')}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60 focus:bg-white/8 transition-colors"
                  placeholder="株式会社〇〇 / 個人の方は空欄でOK"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">お名前 *</label>
                  <input
                    {...register('name', { required: 'お名前を入力してください' })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60 focus:bg-white/8 transition-colors"
                    placeholder="山田 太郎"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2">メールアドレス *</label>
                  <input
                    {...register('email', {
                      required: 'メールアドレスを入力してください',
                      pattern: { value: /^\S+@\S+\.\S+$/, message: '正しいメールアドレスを入力してください' },
                    })}
                    type="email"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60 transition-colors"
                    placeholder="example@email.com"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">件名 *</label>
                <select
                  {...register('subject', { required: '件名を選択してください' })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/60 transition-colors"
                >
                  <option value="" className="bg-gray-900">選択してください</option>
                  <option value="清掃業のご相談" className="bg-gray-900">清掃業のご相談</option>
                  <option value="キッチンカーのご依頼" className="bg-gray-900">キッチンカーのご依頼</option>
                  <option value="経営コンサルのご相談" className="bg-gray-900">経営コンサルのご相談</option>
                  <option value="EC物販について" className="bg-gray-900">EC物販について</option>
                  <option value="採用について" className="bg-gray-900">採用について</option>
                  <option value="その他" className="bg-gray-900">その他</option>
                </select>
                {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
              </div>

              {/* 選択されたプラン・求人（自動入力） */}
              <input type="hidden" {...register('detail')} />
              {detailValue && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-500/10 border border-blue-500/25">
                  <span className="text-blue-400 text-xs flex-shrink-0">選択内容</span>
                  <span className="text-blue-200 text-sm font-semibold">{detailValue}</span>
                  <button
                    type="button"
                    onClick={() => setValue('detail', '')}
                    className="ml-auto text-gray-600 hover:text-gray-400 text-xs transition-colors"
                  >
                    ✕
                  </button>
                </div>
              )}

              <div>
                <label className="block text-gray-400 text-sm mb-2">メッセージ *</label>
                <textarea
                  {...register('message', { required: 'メッセージを入力してください' })}
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60 transition-colors resize-none"
                  placeholder="ご質問・ご要望をお書きください"
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
              </div>

              {status === 'error' && (
                <div className="text-center text-sm rounded-xl bg-red-500/10 border border-red-500/25 px-4 py-3">
                  <p className="text-red-400">送信に失敗しました。もう一度お試しください。</p>
                  <p className="text-gray-400 mt-1">
                    繰り返し失敗する場合は、お手数ですが
                    <a href="mailto:info@next-i-oki.com" className="text-blue-400 underline hover:text-blue-300">
                      info@next-i-oki.com
                    </a>
                    まで直接ご連絡ください。
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(0,102,255,0.5)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {isSubmitting ? '送信中...' : '送信する →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
