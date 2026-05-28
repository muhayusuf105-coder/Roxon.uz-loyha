/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Truck, ShieldCheck, Award, Headphones } from 'lucide-react';

export function StatsGrid() {
  const advantages = [
    {
      icon: <Truck className="w-4 h-4 sm:w-8 sm:h-8 text-amber-500" />,
      title: 'Tezkor yetkazib berish',
      desc: 'O\'zbekiston bo\'ylab 24 soat ichida ishonchli yetkazib beramiz.'
    },
    {
      icon: <ShieldCheck className="w-4 h-4 sm:w-8 sm:h-8 text-amber-500" />,
      title: 'Original mahsulotlar',
      desc: 'Faqat original, sertifikatlangan, kafolatli texnikalar.'
    },
    {
      icon: <Award className="w-4 h-4 sm:w-8 sm:h-8 text-amber-500" />,
      title: 'Rasmiy kafolat',
      desc: 'Mahsulotlar uchun 2-yilgacha bo\'lgan rasmiy kafolat.'
    },
    {
      icon: <Headphones className="w-4 h-4 sm:w-8 sm:h-8 text-amber-500" />,
      title: 'Onlayn yordam guruhi',
      desc: 'Mutaxassislar haftada 7 kun davomida yordamga tayyor.'
    }
  ];

  return (
    <section className="py-3 sm:py-24 px-1.5 sm:px-6 md:px-12 w-full max-w-7xl mx-auto border-b border-white/5 bg-neutral-950/20">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-8">
        {advantages.map((adv, index) => (
          <div
            key={index}
            className="p-2 sm:p-8 border-l border-white/10 hover:border-amber-500 hover:bg-neutral-900/10 transition-all duration-300 rounded-r-lg sm:rounded-r-2xl group flex flex-col justify-between min-h-[95px] sm:min-h-0"
          >
            <div>
              <div className="mb-1 sm:mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {adv.icon}
              </div>
              <h4 className="text-[9.5px] min-[370px]:text-[10.5px] sm:text-base md:text-lg font-extrabold text-white mb-0.5 sm:mb-3 group-hover:text-amber-500 transition-colors leading-tight line-clamp-1">
                {adv.title}
              </h4>
            </div>
            <p className="text-[8px] min-[370px]:text-[9px] sm:text-xs md:text-sm text-gray-500 leading-normal line-clamp-2 md:line-clamp-none">
              {adv.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
