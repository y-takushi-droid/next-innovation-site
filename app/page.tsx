import LogoImage from '@/components/LogoImage';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Pricing from '@/components/Pricing';
import Works from '@/components/Works';
import SnsSection from '@/components/SnsSection';
import Recruitment from '@/components/Recruitment';
import Contact from '@/components/Contact';
import { readData } from '@/lib/db';

export const dynamic = 'force-dynamic';

type Work = { id: string; category: string; title: string; description: string; beforeImage: string; afterImage: string; date: string };
type Settings = { instagram: string; twitter: string; facebook: string; line: string };

export default async function Home() {
  const services = await readData<Parameters<typeof Services>[0]['services']>('services.json');
  const plans = await readData<Parameters<typeof Pricing>[0]['plans']>('pricing.json');
  const works = await readData<Work[]>('works.json');
  const settings = await readData<Settings>('settings.json');
  const jobs = await readData<Parameters<typeof Recruitment>[0]['jobs']>('jobs.json');

  return (
    <main className="bg-[#0a0a0a]">
      {/* nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LogoImage
              width={52}
              height={52}
              className="h-12 w-12"
              style={{ filter: 'brightness(1.5) contrast(1.2) drop-shadow(0 0 8px rgba(0,150,255,0.9)) drop-shadow(0 0 2px rgba(255,255,255,0.5))' }}
            />
            <span className="font-bold text-lg tracking-wide text-white hidden sm:block">
              Next <em className="not-italic text-[#00aaff]">Innovation</em>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-gray-400 text-sm">
            <a href="#services" className="hover:text-white transition-colors">サービス</a>
            <a href="#about" className="hover:text-white transition-colors">会社概要</a>
            <a href="#pricing" className="hover:text-white transition-colors">料金</a>
            {works.length > 0 && (
              <a href="#works" className="hover:text-white transition-colors">実績</a>
            )}
            <a href="#recruitment" className="hover:text-white transition-colors">採用</a>
            <a
              href="#contact"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-sm hover:shadow-[0_0_15px_rgba(0,102,255,0.5)] transition-all"
            >
              お問い合わせ
            </a>
          </div>
        </div>
      </nav>

      <Hero />
      <Services services={services} />
      <About />
      <Pricing plans={plans} />
      <Works works={works} />
      <SnsSection settings={settings} />
      <Recruitment jobs={jobs} />
      <Contact />

      <footer className="bg-[#060610] border-t border-white/5 py-8 text-center text-gray-600 text-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-center mb-3">
            <LogoImage
              width={80}
              height={80}
              className="h-14 w-14"
              style={{ filter: 'drop-shadow(0 0 6px rgba(0,170,255,0.4))' }}
            />
          </div>
          <p>© 2026 Next Innovation. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
