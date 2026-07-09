/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Review, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'Barcha mahsulotlar', icon: 'Compass', count: 50 },
  { id: 'tools', name: 'Elektr instrumentlar', icon: 'Wrench', count: 18 },
  { id: 'generators', name: 'Generatorlar', icon: 'Zap', count: 8 },
  { id: 'pumps', name: 'Suv nasoslari', icon: 'Droplet', count: 8 },
  { id: 'machinery', name: 'Qurilish texnikalari', icon: 'Hammer', count: 9 },
  { id: 'accessories', name: 'Aksessuarlar', icon: 'Layers', count: 7 }
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Nexora Ultra Drill X-200',
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
    name: 'Nexora FlowMaster P-30',
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
    name: 'Nexora Concrete Mixer XM-180',
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
    name: 'Nexora Heavy Jackhammer H-65',
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
    name: 'Nexora Drill Bit Set King-12',
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
  },
  {
    id: '9',
    name: 'Nexora Rotary Hammer Drill RH-28',
    category: 'tools',
    categoryLabel: 'Elektr instrumentlar',
    price: 1750000,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=500&q=80',
    rating: 5,
    reviewsCount: 38,
    tag: 'CHEGIRMA',
    description: 'Og\'ir yuklar uchun mo\'ljallangan professional perforator. Uch xil rejimda (burg\'ulash, zarbli burg\'ulash, zarb) ishlash imkoniyati mavjud. SDS-Plus tez o\'zgaruvchan patron.',
    warrantyMonths: 18,
    isAvailable: true,
    specs: [
      { label: 'Quvvati', value: '1200 Vt' },
      { label: 'Zarba quvvati', value: '3.5 J' },
      { label: 'Maksimal diametri', value: '28 mm' },
      { label: 'Og\'irligi', value: '3.2 kg' }
    ]
  },
  {
    id: '10',
    name: 'Nexora Inverter Generator 2.2kW',
    category: 'generators',
    categoryLabel: 'Generatorlar',
    price: 6200000,
    image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=500&q=80',
    rating: 5,
    reviewsCount: 45,
    tag: 'YANGI',
    description: 'Eko-rejimga ega portativ inverterli generator. Nozik texnikalar va noutbuklarni ham muammosiz quvvatlaydi. Kam yoqilg\'i sarfi, shovqinsiz va ixcham dizayn.',
    warrantyMonths: 24,
    isAvailable: true,
    specs: [
      { label: 'Maksimal quvvat', value: '2.2 kVt' },
      { label: 'Nominal quvvat', value: '2.0 kVt' },
      { label: 'Shovqin darajasi', value: '58 dB' },
      { label: 'Dvigatel turi', value: '4-taktli OHV' },
      { label: 'Og\'irligi', value: '21 kg' }
    ]
  },
  {
    id: '11',
    name: 'Nexora Deep Well Pump Neptun-100',
    category: 'pumps',
    categoryLabel: 'Suv nasoslari',
    price: 3450000,
    image: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&w=500&q=80',
    rating: 4,
    reviewsCount: 29,
    description: 'Artezian va chuqur quduqlardan toza suv tortib berish uchun mo\'ljallangan zanglamas metall korpusli chuqurlik nasosi. Qizib ketishga qarshi himoyaga ega.',
    warrantyMonths: 12,
    isAvailable: true,
    specs: [
      { label: 'Quvvati', value: '1100 Vt' },
      { label: 'Maksimal chuqurlik', value: '100 m' },
      { label: 'Unumdorligi', value: '100 l/daqiqa' },
      { label: 'Korpus materiali', value: 'Zanglamas po\'lat' },
      { label: 'Minimal quduq diametri', value: '4 dyuym' }
    ]
  },
  {
    id: '12',
    name: 'Nexora Laser Level 3D Green',
    category: 'tools',
    categoryLabel: 'Elektr instrumentlar',
    price: 1550000,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80',
    rating: 5,
    reviewsCount: 67,
    tag: 'CHEGIRMA',
    description: 'Yashil nurli 12 qatorli 3D lazer sathi. Barcha yo\'nalishlarda (360 daraja) aniq chiziqlar tortadi. Devor va polda plitka qo\'yish, qurilish loyihalari uchun ideal.',
    warrantyMonths: 12,
    isAvailable: true,
    specs: [
      { label: 'Lazer nuri rangi', value: 'Yashil' },
      { label: 'Chiziqlar soni', value: '12 qator (3D)' },
      { label: 'Ishlash masofasi', value: '25 m' },
      { label: 'Aniqlik darajasi', value: '±0.2 mm/m' },
      { label: 'Akkumulyator', value: '2 dona Li-ion' }
    ]
  },
  {
    id: '13',
    name: 'Nexora Plate Compactor PC-90',
    category: 'machinery',
    categoryLabel: 'Qurilish texnikalari',
    price: 8900000,
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=500&q=80',
    rating: 5,
    reviewsCount: 14,
    tag: 'HEAVY-DUTY',
    description: 'Asfalt, shag\'al va qumli gruntlarni zichlash uchun vibroplita. Honda dvigateli analogi bilan jihozlangan. Qurilish va yo\'l infratuzilmalarida yuqori sifatli zichlashni kafolatlaydi.',
    warrantyMonths: 24,
    isAvailable: true,
    specs: [
      { label: 'Og\'irligi', value: '90 kg' },
      { label: 'Zichlash kuchi', value: '15 kN' },
      { label: 'Zichlash chuqurligi', value: '30 sm' },
      { label: 'Ishchi tezligi', value: '25 m/daqiqa' },
      { label: 'Yoqilg\'i turi', value: 'Benzin (A-92)' }
    ]
  },
  {
    id: '14',
    name: 'Nexora Screwdriver Set 45-in-1',
    category: 'accessories',
    categoryLabel: 'Aksessuarlar',
    price: 290000,
    image: 'https://images.unsplash.com/photo-1530124560072-aee7062445b4?auto=format&fit=crop&w=500&q=80',
    rating: 5,
    reviewsCount: 112,
    description: 'Har qanday smartfonlar, kompyuterlar va kichik maishiy texnikalarni ta\'mirlash uchun mo\'ljallangan professional magnitli otvyortkalar to\'plami.',
    warrantyMonths: 6,
    isAvailable: true,
    specs: [
      { label: 'Elementlar soni', value: '45 xil nasadka' },
      { label: 'Material', value: 'Cr-V xrom-vanadiy metalli' },
      { label: 'Dasta turi', value: 'Ergonomik, aylanuvchi' },
      { label: 'Magnit', value: 'Mavjud' }
    ]
  },
  {
    id: '15',
    name: 'Nexora Electric Chain Saw CS-400',
    category: 'tools',
    categoryLabel: 'Elektr instrumentlar',
    price: 1950000,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=500&q=80',
    rating: 4,
    reviewsCount: 23,
    description: 'Yog\'och, tanaffuslar va qalin shoxlarni tez va xavfsiz kesish uchun professional elektr zanjirli arra. Avtomatik moylash tizimi va zudlik bilan to\'xtash tormozi mavjud.',
    warrantyMonths: 18,
    isAvailable: true,
    specs: [
      { label: 'Dvigatel quvvati', value: '2400 Vt' },
      { label: 'Shina uzunligi', value: '40 sm (16")' },
      { label: 'Zanjir tezligi', value: '14 m/s' },
      { label: 'Moy baki sig\'imi', value: '120 ml' },
      { label: 'Og\'irligi', value: '4.8 kg' }
    ]
  },
  // ADDING 35 MORE HIGH QUALITY DETAILED PRODUCTS TO REACH 50 TOTAL
  {
    id: '16',
    name: 'Nexora Air Compressor AC-50',
    category: 'machinery',
    categoryLabel: 'Qurilish texnikalari',
    price: 2850000,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=500&q=80',
    rating: 5,
    reviewsCount: 30,
    description: 'Professional pnevmatik asboblar va bo\'yash tabancalari uchun 50 litrli moyli pistonli havo kompressori. Yuqori unumdorlik va bosim stabilizatori.',
    warrantyMonths: 12,
    isAvailable: true,
    specs: [
      { label: 'Resessiv sig\'imi', value: '50 L' },
      { label: 'Quvvati', value: '2200 Vt / 3 HP' },
      { label: 'Maksimal bosim', value: '8 bar' },
      { label: 'Ishlab chiqarish quvvati', value: '350 l/daqiqa' },
      { label: 'Dvigatel turi', value: 'Asinxron bir fazali' }
    ]
  },
  {
    id: '17',
    name: 'Nexora Professional Welder ARC-250',
    category: 'tools',
    categoryLabel: 'Elektr instrumentlar',
    price: 1650000,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=500&q=80',
    rating: 5,
    reviewsCount: 74,
    tag: 'TAVSIYA',
    description: 'Raqamli displeyli invertorli payvandlash apparati. IGBT tranzistor texnologiyasi asosida ishlab chiqilgan bo\'lib, barqaror yoy va mukammal payvand chokini kafolatlaydi.',
    warrantyMonths: 18,
    isAvailable: true,
    specs: [
      { label: 'Tok kuchi', value: '20 - 250 A' },
      { label: 'Elektrod diametri', value: '1.6 - 4.5 mm' },
      { label: 'Ish kuchlanishi', value: '220 V ±15%' },
      { label: 'Texnologiya', value: 'IGBT Inverter' },
      { label: 'Foydali ish koeffitsiyenti', value: '85%' }
    ]
  },
  {
    id: '18',
    name: 'Nexora Electric Paint Spray SP-400',
    category: 'tools',
    categoryLabel: 'Elektr instrumentlar',
    price: 490000,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80',
    rating: 4,
    reviewsCount: 19,
    description: 'Devorlar, to\'siqlar, metall karkaslar va duradgorlik buyumlarini bir tekis va tez bo\'yash uchun mo\'ljallangan ixcham va kuchli elektr kraskapult (bo\'yoq purkagich).',
    warrantyMonths: 12,
    isAvailable: true,
    specs: [
      { label: 'Quvvati', value: '450 Vt' },
      { label: 'Sig\'imi', value: '800 ml' },
      { label: 'Bo\'yoq sarfi', value: '400 ml/daqiqa' },
      { label: 'Maksimal qovushqoqlik', value: '60 Din/s' },
      { label: 'Nasadka diametri', value: '2.5 mm' }
    ]
  },
  {
    id: '19',
    name: 'Nexora Circular Saw CS-185',
    category: 'tools',
    categoryLabel: 'Elektr instrumentlar',
    price: 1100000,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=500&q=80',
    rating: 5,
    reviewsCount: 26,
    description: 'Plitalar, brusok va sun\'iy taxta materiallarini to\'g\'ri burchak va 45 dan 90 darajagacha nishablik ostida aniq kesish uchun sirkulyar arra (pchela).',
    warrantyMonths: 12,
    isAvailable: true,
    specs: [
      { label: 'Dvigatel quvvati', value: '1500 Vt' },
      { label: 'Pila diski diametri', value: '185 mm' },
      { label: 'Aylanish tezligi', value: '5500 ayl/daqiqa' },
      { label: 'Maksimal kesish chuqurligi', value: '65 mm (90° da)' },
      { label: 'Lazerli yo\'naltirgich', value: 'Mavjud' }
    ]
  },
  {
    id: '20',
    name: 'Nexora Electric Jigsaw JS-85',
    category: 'tools',
    categoryLabel: 'Elektr instrumentlar',
    price: 780000,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80',
    rating: 4,
    reviewsCount: 31,
    description: 'Yog\'och, metall va plastmassa materiallardan murakkab kavisli shakllar kesish uchun mo\'ljallangan professional elektr lobzik. 4 bosqichli mayatnikli harakat tizimiga ega.',
    warrantyMonths: 12,
    isAvailable: true,
    specs: [
      { label: 'Quvvati', value: '850 Vt' },
      { label: 'Yurish tezligi', value: '800 - 3000 m/daqiqa' },
      { label: 'Maksimal kesish (yog\'och)', value: '85 mm' },
      { label: 'Maksimal kesish (metall)', value: '10 mm' },
      { label: 'Nishab burchagi', value: '45° - 90°' }
    ]
  },
  {
    id: '21',
    name: 'Nexora Heavy Dual Bench Grinder BG-150',
    category: 'tools',
    categoryLabel: 'Elektr instrumentlar',
    price: 650000,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=500&q=80',
    rating: 5,
    reviewsCount: 15,
    description: 'Ketmon, pichoq, bolta va boshqa metall asboblarni charxlash va tozalash uchun stolga o\'rnatiladigan ikki toshli tosh-charx uskunasi.',
    warrantyMonths: 12,
    isAvailable: true,
    specs: [
      { label: 'Quvvati', value: '350 Vt' },
      { label: 'Tosh o\'lchami', value: '150 x 20 x 32 mm' },
      { label: 'Aylanishlar tezligi', value: '2950 ayl/daqiqa' },
      { label: 'Ishchi himoya ekranlari', value: 'Mavjud, Shaffof' }
    ]
  },
  {
    id: '22',
    name: 'Nexora Gasoline Water Pump WP-50',
    category: 'pumps',
    categoryLabel: 'Suv nasoslari',
    price: 2950000,
    image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=500&q=80',
    rating: 5,
    reviewsCount: 37,
    tag: 'BENZINLI',
    description: 'Elektr tarmog\'i mavjud bo\'lmagan dalalar, bog\'lar va fermer xo\'jaliklarini sug\'orish uchun mo\'ljallangan yuqori unumdorlikka ega benzinli motopompa.',
    warrantyMonths: 18,
    isAvailable: true,
    specs: [
      { label: 'Dvigatel quvvati', value: '6.5 HP' },
      { label: 'Yoqilg\'i turi', value: 'Benzin (A-92)' },
      { label: 'Unumdorligi', value: '600 l/daqiqa (36 m3/soat)' },
      { label: 'Maksimal ko\'tarish balandligi', value: '30 m' },
      { label: 'Diametri', value: '50 mm (2 dyuym)' }
    ]
  },
  {
    id: '23',
    name: 'Nexora Submersible Sewage Pump SP-750',
    category: 'pumps',
    categoryLabel: 'Suv nasoslari',
    price: 1850000,
    image: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&w=500&q=80',
    rating: 4,
    reviewsCount: 18,
    description: 'Suv toshqinlari ostida qolgan padvallar, chuqurlar va kanalizatsiya tizimlaridan qum va chang aralashgan loyqa suvlarni tortib beruvchi po\'lat plastinkali cho\'kma nasosi.',
    warrantyMonths: 12,
    isAvailable: true,
    specs: [
      { label: 'Nominal quvvati', value: '750 Vt' },
      { label: 'Maksimal flegma unumdorligi', value: '250 l/daqiqa' },
      { label: 'Maksimal ko\'tarish uzoqligi', value: '12 m' },
      { label: 'Korpus', value: 'Zanglamas metall / Plastik asosi' }
    ]
  },
  {
    id: '24',
    name: 'Nexora Self-Priming Jet Pump Jet-100',
    category: 'pumps',
    categoryLabel: 'Suv nasoslari',
    price: 1350000,
    image: 'https://images.unsplash.com/photo-1585338111111-a8a25a072049?auto=format&fit=crop&w=500&q=80',
    rating: 5,
    reviewsCount: 44,
    description: 'Uylar va dala hovlilarni doimiy toza ichimlik suvi bilan ta\'minlash, bosimni oshirish uchun ishlatiladigan cho\'yan korpusli o\'zi tortuvchi sirt nasosi.',
    warrantyMonths: 12,
    isAvailable: true,
    specs: [
      { label: 'Quvvati', value: '750 Vt / 1 HP' },
      { label: 'Maksimal bosim balandligi', value: '45 m' },
      { label: 'Tortish chuqurligi', value: '9 m' },
      { label: 'Unumdorligi', value: '60 l/daqiqa' },
      { label: 'Issiqlik datchigi', value: 'Mavjud (Avto to\'xtatish)' }
    ]
  },
  {
    id: '25',
    name: 'Nexora Heavy Petrol Generator 7.5kW SG-8500',
    category: 'generators',
    categoryLabel: 'Generatorlar',
    price: 9800000,
    image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=500&q=80',
    rating: 5,
    reviewsCount: 51,
    tag: 'ULTRA-POWER',
    description: 'Katta villalar, dala hovlilar va ofis binolarini butunlay elektr bilan taminlash uchun og\'ir yuk generatori. 100% mis simli alternator va elektr start (kalit yordamida).',
    warrantyMonths: 24,
    isAvailable: true,
    specs: [
      { label: 'Maksimal quvvati', value: '7.5 kVt' },
      { label: 'Nominal quvvati', value: '7.0 kVt' },
      { label: 'Dvigatel', value: '440cc, 4-taktli' },
      { label: 'Ishga tushirish', value: 'Ruchnoy + Elektro (Kalit)' },
      { label: 'Yoqilg\'i baki', value: '25 litr' },
      { label: 'Alternator', value: '100% Mis' }
    ]
  },
  {
    id: '26',
    name: 'Nexora Petrol Generator 3.0kW SG-3500',
    category: 'generators',
    categoryLabel: 'Generatorlar',
    price: 4800000,
    image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=500&q=80',
    rating: 4,
    reviewsCount: 40,
    description: 'Uy sharoitida televizor, muzlatgich, yoritish tizimlari va suv nasosini ishlashini ta\'minlovchi standart 3 kVtlik tejamkor generator.',
    warrantyMonths: 18,
    isAvailable: true,
    specs: [
      { label: 'Maksimal quvvat', value: '3.0 kVt' },
      { label: 'Nominal quvvat', value: '2.8 kVt' },
      { label: 'Yoqilg\'i sarfi', value: '0.9 l/soat' },
      { label: 'Bak sig\'imi', value: '15 litr' },
      { label: 'Chiqish portlari', value: '2 dona 220V, 1 dona 12V DC' }
    ]
  },
  {
    id: '27',
    name: 'Nexora Portable Inverter Generator 1.0kW',
    category: 'generators',
    categoryLabel: 'Generatorlar',
    price: 3850000,
    image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=500&q=80',
    rating: 5,
    reviewsCount: 22,
    description: 'Tabiat qo\'yniga sayohat qilish, baliq ovi yoki lager yig\'inlari uchun ideal bo\'lgan ixcham, o\'ta yengil va shovqinsiz inverter generator.',
    warrantyMonths: 12,
    isAvailable: true,
    specs: [
      { label: 'Maksimal quvvati', value: '1.0 kVt' },
      { label: 'Nominal quvvati', value: '0.9 kVt' },
      { label: 'Og\'irligi', value: '12 kg' },
      { label: 'Maxsus port', value: 'USB tezkor quvvatlash' },
      { label: 'Shovqin darajasi', value: '52 dB' }
    ]
  },
  {
    id: '28',
    name: 'Nexora Smart Battery Charger BC-30',
    category: 'accessories',
    categoryLabel: 'Aksessuarlar',
    price: 450000,
    image: 'https://images.unsplash.com/photo-1540104279090-eec9e9b0b144?auto=format&fit=crop&w=500&q=80',
    rating: 5,
    reviewsCount: 39,
    description: 'Avtomobillar, mototsikllar va generatorlar akkumulyatorlarini 12V/24V hajmda aqlli rejimda, qizib ketishdan va ortiqcha toklardan saqlagan holda quvvatlovchi avtomatik qurilma.',
    warrantyMonths: 12,
    isAvailable: true,
    specs: [
      { label: 'Kuchlanish chiqishi', value: '12 V / 24 V' },
      { label: 'Maksimal tok kuchi', value: '15 A' },
      { label: 'Zaryadlash turi', value: '7 bosqichli mikroprotsessorli mikro-tizim' },
      { label: 'Displey', value: 'LCD info-ekran' }
    ]
  },
  {
    id: '29',
    name: 'Nexora Premium Socket Wrench Set 82-pcs',
    category: 'accessories',
    categoryLabel: 'Aksessuarlar',
    price: 890000,
    image: 'https://images.unsplash.com/photo-1530124560072-aee7062445b4?auto=format&fit=crop&w=500&q=80',
    rating: 5,
    reviewsCount: 88,
    tag: 'XIT MAHSULOT',
    description: 'Avtoservis va uy xo\'jaligida turli xil murvatlarni qulay burash va qotirish uchun premium sinfga mansub 82 bo\'lakli professional klyuchlar va golovkalar jamlanmasi.',
    warrantyMonths: 24,
    isAvailable: true,
    specs: [
      { label: 'Elementlar soni', value: '82 dona klyuch va golovka' },
      { label: 'Material qotishmasi', value: 'Chrome Vanadium (Cr-V Premium)' },
      { label: 'Tishli dasta tishlari', value: '72 tishli tezkor klyuch dastalari' },
      { label: 'Quti dizayni', value: 'Metalik qulflari bo\'lgan mustahkam keys' }
    ]
  },
  {
    id: '30',
    name: 'Nexora Laser Distance Meter LDM-80',
    category: 'accessories',
    categoryLabel: 'Aksessuarlar',
    price: 420000,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80',
    rating: 4,
    reviewsCount: 35,
    description: 'Yuzani, hajmni va pifagor arifmetikasini avtomat o\'lchab beruvchi yuqori sezgirlikka ega portativ lazer metr (lazerli ruletka).',
    warrantyMonths: 12,
    isAvailable: true,
    specs: [
      { label: 'O\'lchash masofasi', value: '80 m' },
      { label: 'O\'lchash xatoligi', value: '±1.5 mm' },
      { label: 'Xotira sig\'imi', value: '20 ta oxirgi ko\'rsatkich' },
      { label: 'Lazer toifasi', value: 'Class 2, Qizil nur' }
    ]
  },
  {
    id: '31',
    name: 'Nexora Demolition Hammer DH-95',
    category: 'machinery',
    categoryLabel: 'Qurilish texnikalari',
    price: 5200000,
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=500&q=80',
    rating: 5,
    reviewsCount: 16,
    description: 'Tosh, uylar poydevori va temir-beton plitalarni osonlikcha parchalash uchun 95 Joul zarb kuchi bilan ishlovchi o\'ta mustahkam va gigant pnevmo-buzg\'ich.',
    warrantyMonths: 24,
    isAvailable: true,
    specs: [
      { label: 'Zarba kuchi', value: '95 J' },
      { label: 'Nominal quvvati', value: '2400 Vt' },
      { label: 'Minutiga zarbalar', value: '1650 zarba/daqiqa' },
      { label: 'Og\'irligi', value: '22 kg' },
      { label: 'Aksessuarlar', value: '2 dona cho\'kich (o\'tkir va tekis)' }
    ]
  },
  {
    id: '32',
    name: 'Nexora High Pressure Washer PW-150',
    category: 'tools',
    categoryLabel: 'Elektr instrumentlar',
    price: 2100000,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80',
    rating: 5,
    reviewsCount: 52,
    description: 'Avtomobillarni, hovli plitkalarini va fasadlarni kuchli bosimda suv bilan yuvish uchun mo\'ljallangan induksion motorli va ko\'pikli fiting ega avtomoika.',
    warrantyMonths: 12,
    isAvailable: true,
    specs: [
      { label: 'Maksimal bosim', value: '150 bar' },
      { label: 'Dvigatel quvvati', value: '1800 Vt (Induksion)' },
      { label: 'Suv sarfi', value: '450 l/soat' },
      { label: 'Shlang uzunligi', value: '8 m metal-simli shlang' },
      { label: 'Avto-Stop tizimi', value: 'Mavjud' }
    ]
  },
  {
    id: '33',
    name: 'Nexora Premium Heat Gun HG-2000',
    category: 'tools',
    categoryLabel: 'Elektr instrumentlar',
    price: 360000,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=500&q=80',
    rating: 4,
    reviewsCount: 29,
    description: 'Plastik quvurlarni bükme, bo\'yoq qatlamlarini tozalash va plyonkalarni yopishtirish uchun haroratni aniq sozlovchi LCD ekranli professional elektr fen.',
    warrantyMonths: 12,
    isAvailable: true,
    specs: [
      { label: 'Quvvati', value: '2000 Vt' },
      { label: 'Harorat darajalari', value: '50 - 650 °C (LCD ekranda sozlash)' },
      { label: 'Havo oqimi', value: '300 - 500 l/daqiqa' },
      { label: 'Nasodkalar', value: '4 xil metall nasodka jamlangan' }
    ]
  },
  {
    id: '34',
    name: 'Nexora Electronic Wood Router RT-12',
    category: 'tools',
    categoryLabel: 'Elektr instrumentlar',
    price: 1680000,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80',
    rating: 5,
    reviewsCount: 14,
    description: 'Yog\'och materiallarga har xil murakkab profillar berish, uya va qulflar ochish uchun professional vertikal freza mashinasi.',
    warrantyMonths: 18,
    isAvailable: true,
    specs: [
      { label: 'Quvvati', value: '1600 Vt' },
      { label: 'Sanchqi diametri (Tsang)', value: '8 / 12 mm' },
      { label: 'Aylanish tezligi', value: '10000 - 23000 ayl/daqiqa' },
      { label: 'Kesish chuqurligi', value: '0 - 60 mm (Mikro sozlash bilan)' }
    ]
  },
  {
    id: '35',
    name: 'Nexora Multi-Tool Cordless MT-12',
    category: 'tools',
    categoryLabel: 'Elektr instrumentlar',
    price: 850000,
    image: 'https://images.unsplash.com/photo-1540104279090-eec9e9b0b144?auto=format&fit=crop&w=500&q=80',
    rating: 5,
    reviewsCount: 24,
    description: 'Yoningizda olib yurish mumkin bo\'lgan akkumulyatorli ko\'p funksiyali asbob (renovator). Turli materiallarni kesish, silliqlash va qirish ishlariga mo\'ljallangan.',
    warrantyMonths: 12,
    isAvailable: true,
    specs: [
      { label: 'Kuchlanish', value: '12 V Li-ion' },
      { label: 'Tebranishlar burchagi', value: '3.2°' },
      { label: 'Tebranish tezligi', value: '5000 - 20000 tebr/daqiqa' },
      { label: 'Aksessuarlar soni', value: '9 dona har xil boshlik' }
    ]
  },
  {
    id: '36',
    name: 'Nexora Heavy Tile Cutter TC-800',
    category: 'tools',
    categoryLabel: 'Elektr instrumentlar',
    price: 1050000,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80',
    rating: 5,
    reviewsCount: 30,
    description: 'Kafel, kranit va keramo-granit plitalarni lazer yo\'naltirgich yordamida mukammal va siniqlarsiz to\'g\'ri kesuvchi mexanik qo\'l stanogi.',
    warrantyMonths: 12,
    isAvailable: true,
    specs: [
      { label: 'Maksimal kesish uzunligi', value: '800 mm' },
      { label: 'Kesish qalinligi', value: '6 - 16 mm' },
      { label: 'Yo\'naltiruvchi shina', value: 'Kengaytirilgan mustahkam temir rels' },
      { label: 'Lazerli ko\'rish liniyasi', value: 'Mavjud (Batareyada ishlaydi)' }
    ]
  },
  {
    id: '37',
    name: 'Nexora Deep Well Pump Neptun-150',
    category: 'pumps',
    categoryLabel: 'Suv nasoslari',
    price: 4950000,
    image: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&w=500&q=80',
    rating: 5,
    reviewsCount: 20,
    description: 'Eng chuqur artezian quduqlaridan (150 metrgacha bo\'lgan) toza, xossalarsiz minerallashgan suvlarni chiqarishga mo\'ljallangan super-chuqurlik porshenli nasos.',
    warrantyMonths: 18,
    isAvailable: true,
    specs: [
      { label: 'Dvigatel quvvati', value: '1500 Vt / 2 HP' },
      { label: 'Maksimal bosim balandligi', value: '150 m' },
      { label: 'Unumdorlik tezligi', value: '120 l/daqiqa' },
      { label: 'Parraklar soni', value: '16 bosqichli latun parraklar' },
      { label: 'Pult-karobka', value: 'Avtomat blok himoyasi bilan birga' }
    ]
  },
  {
    id: '38',
    name: 'Nexora High Flow Centrifugal Pump CP-200',
    category: 'pumps',
    categoryLabel: 'Suv nasoslari',
    price: 3600000,
    image: 'https://images.unsplash.com/photo-1585338111111-a8a25a072049?auto=format&fit=crop&w=500&q=80',
    rating: 4,
    reviewsCount: 16,
    description: 'Sug\'orish tizimlari, tomchilatib sug\'orish va sanoat korxonalarida katta hajmdagi suvlarni uzluksiz haydash uchun mo\'ljallangan markazdan qochma nasos.',
    warrantyMonths: 12,
    isAvailable: true,
    specs: [
      { label: 'Quvvati', value: '2000 Vt (2 Faxli)' },
      { label: 'Maksbalandlik', value: '38 m' },
      { label: 'Maksunumlilik', value: '550 l/daqiqa (33 m3/soat)' },
      { label: 'Kirish-chiqish', value: '2" x 2" (Dyuym)' }
    ]
  },
  {
    id: '39',
    name: 'Nexora Pressure Control Switch PC-10',
    category: 'pumps',
    categoryLabel: 'Suv nasoslari',
    price: 250000,
    image: 'https://images.unsplash.com/photo-1540104279090-eec9e9b0b144?auto=format&fit=crop&w=500&q=80',
    rating: 5,
    reviewsCount: 61,
    description: 'Suv nasoslarini avtomatlashtirish, bosim tushganda yoqish va suv oqimi to\'xtaganda nasosni o\'chirish, "quruq ishlash" dan himoya qiluvchi elektron rele.',
    warrantyMonths: 12,
    isAvailable: true,
    specs: [
      { label: 'Ishchi kuchlanish', value: '220 V / 50 Hz' },
      { label: 'Maksimal ruxsat etilgan oqim', value: '10 A' },
      { label: 'Ishchi bosim oralig\'i', value: '1.0 - 3.5 bar' },
      { label: 'Suv o\'tmaslik klassi', value: 'IP65' }
    ]
  },
  {
    id: '40',
    name: 'Nexora Professional Electric Hoist EH-500',
    category: 'machinery',
    categoryLabel: 'Qurilish texnikalari',
    price: 3200000,
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=500&q=80',
    rating: 5,
    reviewsCount: 15,
    tag: 'OG\'IR YUKLAR',
    description: 'Qurilish maydonchalarida va omborxonalarda yuklarni vertikal ravishda yuqoriga ko\'tarish uchun mo\'ljallangan po\'lat arqonli elektr telfer.',
    warrantyMonths: 18,
    isAvailable: true,
    specs: [
      { label: 'Yuk ko\'tarish qobiliyati', value: '250 kg (Bloksiz) / 500 kg (Blok bilan)' },
      { label: 'Ko\'tarish balandligi', value: '12 m (Bloksiz) / 6 m (Blokli)' },
      { label: 'Ko\'tarish tezligi', value: '10 m/daqiqa' },
      { label: 'Dvigatel quvvati', value: '1050 Vt' },
      { label: 'Arqon diametri', value: '4.2 mm po\'lat' }
    ]
  },
  {
    id: '41',
    name: 'Nexora Concrete Vibrator CV-1500',
    category: 'machinery',
    categoryLabel: 'Qurilish texnikalari',
    price: 1950000,
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=500&q=80',
    rating: 4,
    reviewsCount: 22,
    description: 'Beton quyish jarayonida monolitik tuzilmalar ichidagi havo pufakchalarini to\'liq yo\'qotish va betonni o\'ta zich qilish uchun professional portativ vibroshlang.',
    warrantyMonths: 12,
    isAvailable: true,
    specs: [
      { label: 'Quvvati', value: '1500 Vt' },
      { label: 'Vibratsiya tezligi', value: '4000 tebr/daqiqa' },
      { label: 'Shlang (Val) uzunligi', value: '4 metr (komplektda)' },
      { label: 'Boshlik diametri', value: '38 mm' }
    ]
  },
  {
    id: '42',
    name: 'Nexora Double Dual Wheelbarrow WB-120',
    category: 'machinery',
    categoryLabel: 'Qurilish texnikalari',
    price: 480000,
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=500&q=80',
    rating: 5,
    reviewsCount: 48,
    description: 'Mustahkamlangan qalin temirli va og\'irlik muvozanatini saqlovchi ikki g\'ildirakli qurilish va ruzg\'or aravalari. Qum va toshlarni ortishga qulay.',
    warrantyMonths: 6,
    isAvailable: true,
    specs: [
      { label: 'Yuk ko\'tarish', value: '200 kg gacha' },
      { label: 'Kuzov hajmi', value: '110 litr' },
      { label: 'G\'ildiraklar turi', value: 'Pnevmatik podshipnikli amortizatsion g\'ildiraklar' },
      { label: 'Kuzov materiali', value: 'Ruxlangan (sinklangan) qalin po\'lat' }
    ]
  },
  {
    id: '43',
    name: 'Nexora Portable Gas Generator 5.5kW GS-5500',
    category: 'generators',
    categoryLabel: 'Generatorlar',
    price: 8200000,
    image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=500&q=80',
    rating: 5,
    reviewsCount: 18,
    description: 'Ham benzinda ham suyultirilgan balon gazida ishlash imkoniyatiga ega dual-fuel gaz generatori. Yoqilg\'i sarfini sezilarli darajada kamaytirish uchun ajoyib yechim.',
    warrantyMonths: 24,
    isAvailable: true,
    specs: [
      { label: 'Yoqilg\'i turi', value: 'Benzin (A-92) / LPG (Metan-Propan gaz)' },
      { label: 'Maks quvvat', value: '5.5 kVt' },
      { label: 'Nominal quvvat', value: '5.0 kVt' },
      { label: 'Karbyurator datchigi', value: 'Avtomatik ravishda gaz/benzinni o\'tkazgich' },
      { label: 'Ish muddati', value: 'Balon to\'la gazda 12 soatgacha uzluksiz' }
    ]
  },
  {
    id: '44',
    name: 'Nexora Pure Sine-Wave Inverter 3.0kW',
    category: 'generators',
    categoryLabel: 'Generatorlar',
    price: 3200000,
    image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=500&q=80',
    rating: 5,
    reviewsCount: 29,
    description: 'Sof sinus to\'lqinli kuchlanish o\'zgartirgich (akku inverter). Doimiy 12V tokni uylardagi toza 220V elektr toklarga aylanib beradi. Gaz kotyollari uchun maxsus moslashgan.',
    warrantyMonths: 12,
    isAvailable: true,
    specs: [
      { label: 'Nominal chiqish quvvati', value: '3000 Vt' },
      { label: 'Kirish kuchlanishi', value: '12 V DC / 24 V DC' },
      { label: 'Chiqish kuchlanishi', value: '220 V Sof Sinus (Pure Sine)' },
      { label: 'Himoya tizimi', value: 'Ortiqcha yuklanish, Qisqa tutashuv va Chuqur razryad' }
    ]
  },
  {
    id: '45',
    name: 'Nexora Digital Multimeter Pro DM-90',
    category: 'accessories',
    categoryLabel: 'Aksessuarlar',
    price: 280000,
    image: 'https://images.unsplash.com/photo-1540104279090-eec9e9b0b144?auto=format&fit=crop&w=500&q=80',
    rating: 5,
    reviewsCount: 48,
    description: 'Kuchlanish, qarshilik, tok kuchi va kondensator sig\'imlarini yuqori aniqlikda o\'lchab beruvchi LCD yorug\'lik datchigiga ega voltmetr-multimetr apparati.',
    warrantyMonths: 12,
    isAvailable: true,
    specs: [
      { label: 'O\'lchash diapazoni', value: 'Avtomatik (Auto-ranging)' },
      { label: 'O\'lchov turi', value: 'True RMS (yuqori aniqlik)' },
      { label: 'Qo\'shimcha funksiya', value: 'Simlarni kontaktsiz aniqlash (NCV)' },
      { label: 'Batareya quvvati', value: '2 dona AAA' }
    ]
  },
  {
    id: '46',
    name: 'Nexora Heavy Duty Tool Bag TB-20',
    category: 'accessories',
    categoryLabel: 'Aksessuarlar',
    price: 240000,
    image: 'https://images.unsplash.com/photo-1530124560072-aee7062445b4?auto=format&fit=crop&w=500&q=80',
    rating: 5,
    reviewsCount: 71,
    description: 'Asboblarni qulay va tartibli olib yurish uchun suv o\'tmas, plastik qattiq tub qatlamiga ega bo\'lgan 20 dyuymli mustahkam professional neylon karkas jomdon-sumka.',
    warrantyMonths: 6,
    isAvailable: true,
    specs: [
      { label: 'O\'lchami', value: '20 dyuym (50 x 28 x 30 sm)' },
      { label: 'Material', value: 'Oxsford 1680D suv o\'tkazmaydigan zich neylon' },
      { label: 'Cho\'ntaklar soni', value: '8 dona ichki, 10 dona tashqi cho\'ntaklar' },
      { label: 'Tub qoplamasi', value: 'Zarblarga bardoshli qattiq plastik taglik' }
    ]
  },
  {
    id: '47',
    name: 'Nexora Heavy Wall Chaser WC-150',
    category: 'tools',
    categoryLabel: 'Elektr instrumentlar',
    price: 2250000,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=500&q=80',
    rating: 5,
    reviewsCount: 19,
    tag: 'QURILISH UCHUN',
    description: 'Uylar ichidagi elektr kabellar va quvurlar o\'tkazish uchun g\'isht va beton devorlarda egat (shtroba) ochuvchi ikki diskli professional shtroborez.',
    warrantyMonths: 18,
    isAvailable: true,
    specs: [
      { label: 'Quvvati', value: '1800 Vt' },
      { label: 'Disk diametri', value: '150 mm (2 dona parallel)' },
      { label: 'Egat chuqurligi', value: '0 - 45 mm (Sozlanadi)' },
      { label: 'Egat kengligi', value: '9 - 30 mm gacha' },
      { label: 'Changyutgich teshigi', value: 'Mavjud (Changlarsiz ishlash)' }
    ]
  },
  {
    id: '48',
    name: 'Nexora Petrol Chainsaw SG-5200',
    category: 'tools',
    categoryLabel: 'Elektr instrumentlar',
    price: 1550000,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=500&q=80',
    rating: 4,
    reviewsCount: 46,
    description: 'O\'rmon xo\'jaliklari va qurilishda qattiq va qalin tanaffuslarni kesish uchun mo\'ljallangan, 52 sm uzunlikdagi shinali kuchli benzinli zanjir arra (drujba).',
    warrantyMonths: 12,
    isAvailable: true,
    specs: [
      { label: 'Dvigatel hajmi', value: '52 kub sm / 2-taktli' },
      { label: 'Maks quvvat', value: '3.4 HP' },
      { label: 'Shina uzunligi', value: '50 sm (20 dyuym)' },
      { label: 'Yoqilg\'i aralashmasi', value: 'Benzin + 2T moy' }
    ]
  },
  {
    id: '49',
    name: 'Nexora Electromagnetic Drill MD-40',
    category: 'machinery',
    categoryLabel: 'Qurilish texnikalari',
    price: 9400000,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80',
    rating: 5,
    reviewsCount: 11,
    tag: 'YUQORI TEXNOLOGIYA',
    description: 'Yirik metall konstruksiyalarni vertical va gorizontal tekkislikda burg\'ulash uchun mo\'ljallangan, kuchli elektromagnitli taglik asosi bo\'lgan magnit drel stoli.',
    warrantyMonths: 24,
    isAvailable: true,
    specs: [
      { label: 'Quvvati', value: '1200 Vt' },
      { label: 'Magnitning yopishish kuchi', value: '13500 N (o\'ta kuchli)' },
      { label: 'Maksimal burg\'ulash diametri', value: '40 mm' },
      { label: 'Sayohat balandligi (Xod)', value: '150 mm' },
      { label: 'Og\'irligi', value: '12.5 kg' }
    ]
  },
  {
    id: '50',
    name: 'Nexora Platform Digital Scale DS-300',
    category: 'accessories',
    categoryLabel: 'Aksessuarlar',
    price: 750000,
    image: 'https://images.unsplash.com/photo-1540104279090-eec9e9b0b144?auto=format&fit=crop&w=500&q=80',
    rating: 5,
    reviewsCount: 52,
    description: 'Omborlar, savdo nuqtalari va yuk tashish maskanlari uchun 300 kg gacha bo\'lgan og\'ir qutilarni va tovarlarni aniq taroziga tortuvchi zanglamas po\'lat platformali tarozi.',
    warrantyMonths: 12,
    isAvailable: true,
    specs: [
      { label: 'Maksimal og\'irlik', value: '300 kg' },
      { label: 'Minimal o\'lchov chegarasi', value: '100 gr' },
      { label: 'Platforma o\'lchami', value: '40 x 50 sm (Zanglamas metall)' },
      { label: 'Akkumulyator ishlashi', value: 'Zaryadlangandan so\'ng 100 soatgacha uzluksiz' },
      { label: 'Tarozi xotirasi', value: '7 tagacha narxlarni eslab qolish' }
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
    text: "Nexora generatorini sotib olganimdan beri uydagi va kafedagi svet o'chish muammolari to'liq unutilgan. Sifatiga gap bo'lishi mumkin emas, har qanday ob-havoda ishonchli ishlaydi.",
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
