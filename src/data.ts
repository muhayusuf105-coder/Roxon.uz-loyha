/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Review, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'Barcha mahsulotlar', icon: 'Compass', count: 10 },
  { id: 'tools', name: 'Elektr instrumentlar', icon: 'Wrench', count: 3 },
  { id: 'generators', name: 'Generatorlar', icon: 'Zap', count: 2 },
  { id: 'pumps', name: 'Suv nasoslari', icon: 'Droplet', count: 2 },
  { id: 'machinery', name: 'Qurilish texnikalari', icon: 'Hammer', count: 2 },
  { id: 'accessories', name: 'Aksessuarlar', icon: 'Layers', count: 1 }
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Roxon Ultra Drill X-200',
    category: 'tools',
    categoryLabel: 'Elektr instrumentlar',
    price: 2450000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCT4EjC2fJNZ307Q3uySpeGPkku318EmI9od_0YJQ0hF8kO99_k9BvrufwMxDipO3RdnpYEIb1D7BqpQCsjKqnESlYQCiRvKZK0UWS2cvMtz36m3PZtQCYFyNQSQig5hTgx0CdWrWUM7AKDhcx7prgSpZRhqsrwwDLblj2vWSZBdINBDUFAaVtPygXHSiR8vHH8b_LgMcTyujRjKW9fw7mrg-1RCrWou9nzfIlXEGnlgALJpdENaFDweiFuXY_1jVTtol21cm-4KNU',
    rating: 4,
    reviewsCount: 42,
    tag: 'YANGI',
    description: 'Professional darajadagi akkumulyatorli drel-shurup buragich. Yuqori moment va uzoq xizmat qiluvchi cho\'tkasiz (brushless) motor bilan jihozlangan. Qurilish va pnevmatik ishlarda mukammal sherik.',
    warrantyMonths: 24,
    isAvailable: true,
    specs: [
      { label: 'Akku kuchlanishi', value: '20 V' },
      { label: 'Aylanishlar soni', value: '0-2000 ayl/daqiqa' },
      { label: 'Maksimal buralish momenti', value: '75 Nm' },
      { label: 'Akkumulyator sig\'imi', value: '4.0 Ah (Li-ion)' },
      { label: 'Ish rejimlari', value: 'Drellash, Shurup burash, Zarbli zarba' }
    ]
  },
  {
    id: '2',
    name: 'Silent Generator 5kW Pro',
    category: 'generators',
    categoryLabel: 'Generatorlar',
    price: 12800000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdT7O7XerodVn8JIaxvwbSy8G7oVSP4aVaHAlTi4pqM2jLHGOhc2EuW12a5OqWINWd4T2_ctSyfjMhLwX741a-feMqnEn2g7BEjyYPxCBcse4Jk90XTf27uE1U8B7qtGfT-owHQWK9YpJKjwm-uTXFUCRtINfggHof7W7F56IRfiLGplOEqY8yOwkzUAMU8vz_BMiCqT9Gk6EpiKPtYAvNkwLO-LmKljyj5tFt8e8oFaSAJ5LubaQsJ65P6KYQE8qHx2ZjvYtuYpk',
    rating: 5,
    reviewsCount: 128,
    description: 'Chidamlilik va yuqori samaradorlikni o\'zida mujassam etgan benzinli shovqinsiz generator. Sanoat, do\'konlar va uylar uchun barqaror elektr energiyasi manbai.',
    warrantyMonths: 24,
    isAvailable: true,
    specs: [
      { label: 'Maksimal quvvati', value: '5.5 kVt' },
      { label: 'Nominal quvvati', value: '5.0 kVt' },
      { label: 'Kuchlanish chiqishi', value: '220 V / 12 V' },
      { label: 'Dvigatel turi', value: '4 taktli, OHV' },
      { label: 'Shovqin darajasi', value: '62 dB (Shovqinsiz kassa)' },
      { label: 'Yoqilg\'i baki', value: '25 L' }
    ]
  },
  {
    id: '3',
    name: 'Roxon FlowMaster P-30',
    category: 'pumps',
    categoryLabel: 'Suv nasoslari',
    price: 4120000,
    originalPrice: 4850000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQrXgjPGW4OkjXNF2_1NwysyRP-nwEx50Af9nz8B7G-iEu4sJdZ2NiX_PMY79gup3y8gZVVKN7-6fwqjWDvDkPsaE4XiiBfVvZrY4cwlYw7edF6tMN31MD0SVhI4B4AN27T41XIEBb5MUhXAvUmpk7RFrP1Uu4Pd2PxqWkRU--jba4BRywC5SOSgJQ4J7XlfUNi2oTUbn9y2_Pqx5iIorEOIal-UvaQpNt6-wJcdcKI5nvkl2mMlvyHwBfcqycE483q07eKyk_1Fc',
    rating: 4,
    reviewsCount: 15,
    tag: '-15%',
    description: 'Sanoat va qishloq xo\'jaligi uchun kuchli suv nasosi. Suvni katta bosimda uzoq masofalarga ishonchli haydab beradi va elektr tejamkor tizimga ega.',
    warrantyMonths: 18,
    isAvailable: true,
    specs: [
      { label: 'Quvvati', value: '2200 Vt / 3 HP' },
      { label: 'Maksimal bosim', value: '45 m' },
      { label: 'Suv sarfi unumdorligi', value: '600 l/daqiqa' },
      { label: 'Kirish/Chiqish diametri', value: '3 dyuym' },
      { label: 'Nasos materiali', value: 'Zanglamas po\'lat va cho\'yan' }
    ]
  },
  {
    id: '4',
    name: 'Power Grind 125 Pro',
    category: 'tools',
    categoryLabel: 'Elektr instrumentlar',
    price: 1150000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDP0jzdNu17lkT98k5UeuPWFfe510ggeXU8Opwf9hWvZP4EyHifNjwMnfXOKWygJjG6ZE7_Gngrg1e3atJrdcxPRMvxw4E2jyiLMG_A1-MSKPBNSJvCRGKsnAEHRRrXnM9VrJNUrW63iyiMpXsOaj5pJOimwy7pP6xxR5JZJDEitvV5dOsryLulgGECEsG_5Db8PksvDqbQlIoQkZXXEOSI50AIP925vzZ3LYzGnvzKmrAmfSEnglZDHxDiQbAliIpd6yoxrWZcSo0',
    rating: 5,
    reviewsCount: 89,
    description: 'Metall va toshlarni kesish, silliqlash va tozalash ishlari uchun professional burchakli silliqlash mashinasi (bolgarka). Haddan tashqari qizishdan himoya tizimi bilan.',
    warrantyMonths: 24,
    isAvailable: true,
    specs: [
      { label: 'Disk diametri', value: '125 mm' },
      { label: 'Dvigatel quvvati', value: '1400 Vt' },
      { label: 'Maksimal aylanish tezligi', value: '11000 ayl/daqiqa' },
      { label: 'Og\'irligi', value: '2.1 kg' },
      { label: 'Tezlikni sozlash', value: 'Mavjud (6 bosqichli)' }
    ]
  },
  {
    id: '5',
    name: 'Roxon Concrete Mixer XM-180',
    category: 'machinery',
    categoryLabel: 'Qurilish texnikalari',
    price: 7500000,
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=500&q=80',
    rating: 5,
    reviewsCount: 19,
    tag: 'HEAVY-DUTY',
    description: 'Katta hajmdagi qurilish loyihalari uchun beton qorgich. To\'liq cho\'yan tojli g\'ildirak va kuchli 1000 Vt quvvatli motor xizmat muddati uzoqligini ta\'minlaydi.',
    warrantyMonths: 24,
    isAvailable: true,
    specs: [
      { label: 'Baraban hajmi', value: '180 litr' },
      { label: 'Tayyor qorishma hajmi', value: '135 litr' },
      { label: 'Dvigatel quvvati', value: '1000 Vt' },
      { label: 'Baraban aylanish tezligi', value: '28-30 ayl/daqiqa' },
      { label: 'Material', value: 'Yuqori sifatli po\'lat metall' }
    ]
  },
  {
    id: '6',
    name: 'Roxon Heavy Jackhammer H-65',
    category: 'machinery',
    categoryLabel: 'Qurilish texnikalari',
    price: 3900000,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=500&q=80',
    rating: 4,
    reviewsCount: 31,
    description: 'Beton, tosh va asfalt qoplamalarini buzish ishlari uchun professional zarbli jackhammer. Vibratsiyaga qarshi maxsus AVT dasta tizimi mehnatni yengillashtiradi.',
    warrantyMonths: 24,
    isAvailable: true,
    specs: [
      { label: 'Zarba quvvati', value: '65 J' },
      { label: 'Nominal quvvati', value: '2200 Vt' },
      { label: 'Zarbalar soni', value: '1900 zarba/daqiqa' },
      { label: 'Patron turi', value: 'HEX (olti qirrali) 30mm' },
      { label: 'Og\'irligi', value: '16.5 kg' }
    ]
  },
  {
    id: '7',
    name: 'Industrial Sump Pump S-500',
    category: 'pumps',
    categoryLabel: 'Suv nasoslari',
    price: 5600000,
    image: 'https://images.unsplash.com/photo-1585338111111-a8a25a072049?auto=format&fit=crop&w=500&q=80',
    rating: 5,
    reviewsCount: 22,
    description: 'Drenaj va ifloslangan suv havzalarini tozalash uchun heavy-duty suvo\'tkazmas drenaj nasos guruhlari. Cho\'yan perchatka va pichoqli kesgichlar bilan har qanday qiyin sharoitda ishlaydi.',
    warrantyMonths: 18,
    isAvailable: true,
    specs: [
      { label: 'Kuchlanish', value: '380 V / Uch faza' },
      { label: 'Suv o\'tkazuvchanligi', value: '45 m3/soat' },
      { label: 'Maksimal uzoqlik', value: '22 m' },
      { label: 'Pichoqli maydalagich', value: 'Mavjud (Chidamlilik yuqori)' }
    ]
  },
  {
    id: '8',
    name: 'Roxon Drill Bit Set King-12',
    category: 'accessories',
    categoryLabel: 'Aksessuarlar',
    price: 380000,
    image: 'https://images.unsplash.com/photo-1540104279090-eec9e9b0b144?auto=format&fit=crop&w=500&q=80',
    rating: 5,
    reviewsCount: 94,
    description: 'Beton, metall va taxta uchun drel va perkussiv pistoletlar uchun universal yuqori chidamli kobaltli parmalar to\'plami. Titan qoplamasiga ega.',
    warrantyMonths: 6,
    isAvailable: true,
    specs: [
      { label: 'Soni', value: '12 dona professional parma' },
      { label: 'Material', value: 'HSS-Co kobalt qotishmasi' },
      { label: 'Parmalash qobiliyati', value: 'Beton, Chelik metall, Yog\'och' },
      { label: 'G\'ilof qutisi', value: 'Zarbdan himoyalangan alyuminiy' }
    ]
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Aziz Abdullayev',
    authorInitials: 'AA',
    role: 'Xususiy tadbirkor',
    rating: 5,
    text: "Roxon generatorini sotib olganimdan beri uydagi va kafedagi svet o'chish muammolari to'liq unutilgan. Sifatiga gap bo'lishi mumkin emas, har qanday ob-havoda ishonchli ishlaydi.",
    date: '12.04.2026'
  },
  {
    id: 'r2',
    author: 'Sardor Karimov',
    authorInitials: 'SK',
    role: 'Qurilish ustasi',
    rating: 5,
    text: "Uskunalar professional darajada ishlab chiqilgan. Drill X-200 modeli juda kuchli va eng muhimi batareyasi uzoqqa yetadi. Qo'lda ishlash juda qulay va og'irligi muvozanatlashgan.",
    date: '18.05.2026'
  },
  {
    id: 'r3',
    author: 'Jasur Mahmudov',
    authorInitials: 'JM',
    role: 'Muhandis',
    rating: 5,
    text: 'Yetkazib berish xizmati chaqqon, buyurtmadan ko\'p o\'tmay Toshkent bo\'ylab keltirib berishdi. Servis va texnik maslahat beruvchilar juda xushmuomala. Brendga omad!',
    date: '25.05.2026'
  }
];
