/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Truck, ShieldCheck, Award, Headphones } from 'lucide-react';

export function StatsGrid() {
  const advantages = [
    {
      icon: <Truck className="w-10 h-10 text-amber-500" />,
      title: 'Tezkor yetkazib berish',
      desc: 'Butun O\'zbekiston bo\'ylab 24 soat ichida ishonchli yetkazib beramiz.'
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-amber-500" />,
      title: 'Original mahsulotlar',
      desc: 'Faqat original va sertifikatlangan, kafolatli texnikalar sotuvda.'
    },
    {
      icon: <Award className="w-10 h-10 text-amber-500" />,
      title: 'Rasmiy kafolat',
      desc: 'Barcha asosiy mahsulotlar uchun 2-yilgacha bo\'lgan rasmiy kafolat.'
    },
    {
      icon: <Headphones className="w-10 h-10 text-amber-500" />,
      title: 'Onlayn yordam guruhi',
      desc: 'Mutaxassislarimiz haftada 7 kun davomida har qanday yordamga tayyor.'
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12 w-full max-w-7xl mx-auto border-b border-white/5 bg-neutral-950/20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {advantages.map((adv, index) => (
          <div
            key={index}
            className="p-8 border-l border-white/10 hover:border-amber-500 hover:bg-neutral-900/10 transition-all duration-300 rounded-r-2xl group"
          >
            <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
              {adv.icon}
            </div>
            <h4 className="text-lg font-bold text-white mb-3 group-hover:text-amber-500 transition-colors">
              {adv.title}
            </h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              {adv.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
