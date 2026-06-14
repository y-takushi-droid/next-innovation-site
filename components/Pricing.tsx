import PricingCard from '@/components/PricingCard';

type PriceRow = { label: string; price: string };

type Plan = {
  id: string;
  service: string;
  name: string;
  price: string;
  unit: string;
  description: string;
  features: string[];
  allPrices: PriceRow[];
  options: PriceRow[];
  recommended: boolean;
};

export default function Pricing({ plans }: { plans: Plan[] }) {
  const grouped = plans.reduce<Record<string, Plan[]>>((acc, p) => {
    if (!acc[p.service]) acc[p.service] = [];
    acc[p.service].push(p);
    return acc;
  }, {});

  return (
    <section id="pricing" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-blue-400 text-sm tracking-widest uppercase font-semibold">Pricing</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-4">
            料金<span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">プラン</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            まずはお気軽にお問い合わせください。現地調査・初回相談は無料です。
          </p>
        </div>

        {Object.entries(grouped).map(([service, servicePlans]) => (
          <div key={service} className="mb-16">
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-gradient-to-r from-blue-500 to-transparent" />
              {service}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {servicePlans.map((plan) => (
                <PricingCard key={plan.id} plan={plan} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
