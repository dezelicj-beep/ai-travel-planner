import express from "express";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = process.env.PORT || 8080;
const apiKey = process.env.GEMINI_API_KEY;

app.use(express.json({ limit: "1mb" }));
app.use(express.static("public"));

function demoPlan({ destination, days, budget, interests }) {
  const d = destination || "odabrana destinacija";
  const n = days || "3";
  const b = budget || "srednji";
  const i = interests || "znamenitosti, hrana i kultura";
  return `DEMO PLAN PUTOVANJA\n\nDestinacija: ${d}\nTrajanje: ${n} dana\nBudžet: ${b}\nInteresi: ${i}\n\nDan 1\n- Dolazak i smještaj\n- Lagana šetnja centrom grada\n- Posjet glavnim znamenitostima\n- Večera u lokalnom restoranu\n\nDan 2\n- Obilazak muzeja i kulturnih lokacija\n- Pauza za ručak prema budžetu\n- Popodnevna aktivnost prema interesima korisnika\n- Večernja šetnja i slobodno vrijeme\n\nDan 3\n- Kraći izlet ili dodatni obilazak\n- Kupnja suvenira\n- Povratak\n\nNapomena: Ovo je demo prikaz. Za stvarno AI generiranje potrebno je postaviti GEMINI_API_KEY u Google Cloud Run postavkama.`;
}

app.post("/api/plan", async (req, res) => {
  try {
    const { destination, days, budget, interests, travelStyle } = req.body || {};

    if (!destination || !days || !budget) {
      return res.status(400).json({ error: "Molimo unesite destinaciju, broj dana i budžet." });
    }

    if (!apiKey) {
      return res.json({ plan: demoPlan({ destination, days, budget, interests }), demo: true });
    }

    const ai = new GoogleGenAI({ apiKey });
    const prompt = `
Ti si AI planer putovanja. Odgovaraj na hrvatskom jeziku.

Korisnik želi personalizirani plan putovanja.
Podaci korisnika:
- Destinacija: ${destination}
- Broj dana: ${days}
- Budžet: ${budget}
- Interesi: ${interests || "nije navedeno"}
- Stil putovanja: ${travelStyle || "uravnoteženo"}

Izradi pregledan plan putovanja. Uključi:
1. Kratki uvod
2. Raspored po danima
3. Preporuke aktivnosti i znamenitosti
4. Ideje za hranu/restorane
5. Okvirnu raspodjelu budžeta
6. Kratke savjete za putovanje

Odgovor neka bude praktičan, jasan i formatiran za prikaz u web aplikaciji. Ne izmišljaj konkretne cijene ulaznica ako nisi siguran, nego koristi okvirne procjene.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });

    res.json({ plan: response.text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Došlo je do pogreške pri generiranju plana. Provjerite API ključ i pokušajte ponovno." });
  }
});

app.listen(PORT, () => {
  console.log(`AI Travel Planner radi na portu ${PORT}`);
});
