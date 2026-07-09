/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Use JSON middleware
  app.use(express.json());

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Client-side endpoint for Gemini requests
  app.post('/api/ai/chat', async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Suhbat tarixi (messages) talab qilinadi.' });
      }

      // Read GEMINI_API_KEY from env
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: 'Gemini API kaliti serverda sozlanmagan. Iltimos, Sozlamalar orqali GEMINI_API_KEY kalitini kiriting.'
        });
      }

      // Initialize GoogleGenAI client with correct headers
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });

      // Map incoming messages to Gemini correct structure
      // e.g. role: 'user' | 'model', parts: [{ text: '...' }]
      const formattedContents = messages.map(msg => ({
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

      // Call Gemini API using modern SDK structure
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: formattedContents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const replyText = response.text || "Kechirasiz, javob tayyorlashda xatolik yuz berdi.";
      return res.json({ response: replyText });

    } catch (err: any) {
      console.error('Gemini error:', err);
      return res.status(500).json({ error: err.message || 'Ichki server xatoligi yuz berdi.' });
    }
  });

  // Vite development middleware versus production assets static server
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
