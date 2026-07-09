import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  // CORS Headers support
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metod ruxsat etilmagan' });
  }

  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Suhbat tarixi (messages) talab qilinadi.' });
    }

    // Read GEMINI_API_KEY from environment variables on Vercel with case-insensitive / robust fallbacks
    const rawApiKey = 
      process.env.GEMINI_API_KEY || 
      process.env.Gemini_API_Key || 
      process.env.Gemini_API_Ke || 
      process.env.gemini_api_key;

    if (!rawApiKey) {
      return res.status(500).json({
        error: "Gemini API kaliti serverda topilmadi. Iltimos, Vercel sozlamalarida variable nomini to'g'ri (katta harflar bilan: GEMINI_API_KEY) o'rnating va loyihani QAYTA DEPLOY (Redeploy) qiling."
      });
    }

    // Sanitize the API Key: trim whitespace, strip quotes, and fix the common 'AlzaSy' -> 'AIzaSy' typo
    let apiKey = rawApiKey.trim().replace(/^["']|["']$/g, '');
    if (apiKey.startsWith('AlzaSy')) {
      apiKey = 'AI' + apiKey.slice(2);
    }

    // Initialize GoogleGenAI client with the correct headers
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    // Match the correct body structure for Gemini model
    const formattedContents = messages.map((msg: any) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    const systemInstruction = `
Siz NEXORA kompaniyasining virtual AI maslahatchisiz va sanoat uskunalari, elektr asboblari bo'yicha mutaxassisiz.
Sizning asosiy vazifangiz - foydalanuvchilarning asboblar, generatorlar, nasoslar va boshqa mahsulotlar bo'yicha bergan savollariga javob berish va ularga eng to'g'ri mahsulotlarni tanlashda yordam berishdir.
Siz faqat va faqat o'zbek tilida (lotin yoki kirill yozuvlarida, foydalanuvchi qaysi tilda yozsa shu uslubda) o'ta xushmuomala hamda professional tarzda javob qaytarasiz.

Siz faqat quyidagi mahsulotlarimizni tavsiya eta olasiz va ulardagi narxlarga tayanasiz:
1. **Nexora Ultra Drill X-200** (Drel) - 2 450 000 UZS. Akkumulyatori 20V, brushless, 75 Nm moment, drel/shurup burash.
2. **Silent Generator 5kW Pro** - 12 800 000 UZS. Maksimal 5.5 kVt, nominal 5 kVt, yoqilg'i baki 25 litr, shovqinsiz kassa (62 dB).
3. **Nexora FlowMaster P-30** (Suv nasosi) - 4 120 000 UZS (chegirmada, asl narxi 4 850 000 UZS). 2200 Vt (3 HP), maksimal bosim 45 metr balandlik.
4. **Power Grind 125 Pro** (Bolgarka) - 1 150 000 UZS. Disk 125 mm, quvvat 1400 Vt, 6-bosqichli tezlik sozlash mexanizmi.
5. **Nexora Concrete Mixer XM-180** (Beton qorgich) - 7 500 000 UZS. Hajmi 180 litr, dvigatel 1000 Vt, sifatli metal.
6. **Nexora Heavy Jackhammer H-65** (Zarbli bolta / Otdoynik) - 3 900 000 UZS. Zarba quvvati 65 J, quvvat 2200 Vt, og'irligi 16.5 kg.
7. **Industrial Sump Pump S-500** (Drenaj nasosi) - 5 600 000 UZS. 380V Uch faza, 45 m3/soat suv sarfi, pichoqli maydalagich.
8. **Nexora Drill Bit Set King-12** (Parmalar to'plami) - 380 000 UZS. 12 dona professional parma, kobalt qotishmasi.

Muhim ko'rsatmalar:
- Agar mijoz qaysi generatorni tanlashni bilmasa, uning uyi yoki ishxonasida qanday elektr jihozlar (muzlatgich, teleradior, konditsioner v.b.) borligini so'rang va nominal generator yuklanishini kVt larda hisoblashda yordam bering.
- Har doim javoblaringizda chiroyli Markdown jadvali, qalin matnlar, sarlavhalar va tartibli ro'yxatlarni chiroyli formatda qo'llang.
- Foydalanuvchilar mahsulotlarni sotib olmoqchi bo'lishsa, ularni yuqori o'ng burchakdagi 'Xarid savati'ga mahsulotni qo'shib, keyin 'Buyurtmani rasmiylashtirish' tugmasini bosishga yoki saytdan to'g'ridan-to'g'ri buyurtma qoldirishga chaqiring.
- Rostgo'y, professional, energiyali va yordam berishga ishtiyoqmand bo'ling. Hech qachon asossiz texnik parametrlarni to'qimang.
    `.trim();

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const replyText = response.text || "Kechirasiz, javob tayyorlashda xatolik yuz berdi.";
    return res.status(200).json({ response: replyText });

  } catch (err: any) {
    console.error('Gemini error:', err);
    
    const errStr = String(err.message || err);
    
    // Check for Quota exceeded / Rate limit (429 / RESOURCE_EXHAUSTED)
    if (
      errStr.includes('429') || 
      errStr.includes('RESOURCE_EXHAUSTED') || 
      errStr.includes('quota') || 
      errStr.includes('limit') || 
      errStr.includes('current quota')
    ) {
      return res.status(429).json({
        error: "⚠️ **Tizim vaqtincha band:** Siz bepul tarifdagi daqiqalik yoki kunlik cheklovga (**Quota Limit**) duch keldingiz. Bizning AI xizmatimiz mutlaqo **BEPUL**! Shunchaki server yuklamasini kamaytirish uchun so'rovlar orasida ozroq tanaffus qilish lozim.\n\nIltimos, **1-2 daqiqa kutib**, xabarni qayta yuborib ko'ring. Hech qanday pul to'lash shart emas, shunchaki qisqa vaqt kutishingiz yetarli. 😊"
      });
    }

    // Check for Invalid API key or status 400
    if (errStr.includes('API_KEY_INVALID') || errStr.includes('API key not valid')) {
      return res.status(400).json({
        error: "⚠️ **Xatolik:** Vercel sozlamalariga kiritilgan Gemini API kaliti (GEMINI_API_KEY) yaroqsiz (noto'g'ri) yoki xato yozilgan. Iltimos, Vercel paneli orqali kalitingizni so'z boshi va oxiridagi bo'shliqlarsiz to'g'ri kiritganingizga ishonch hosil qiling va loyihani qayta deploy (Redeploy) qiling."
      });
    }

    return res.status(500).json({ 
      error: `⚠️ **Xatolik:** Sun'iy intellektdan javob olishda xatolik yuz berdi: ${errStr}` 
    });
  }
}
