// api/gpt.js
export default async function handler(req, res) {
  // --- CORS ---
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  if (req.method === "OPTIONS") { res.status(200).end(); return; }
  // -------------

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "OPENAI_API_KEY is missing" });

    const { prompt = "", context = {} } = req.body || {};
    const sys = "Ты помощник юркомпании по списанию долгов. Отвечай кратко, по чек-листам, без гарантий результата.";

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.3,
        messages: [
          { role: "system", content: sys },
          { role: "user", content: `${prompt}\n\nКонтекст:\n${JSON.stringify(context)}` }
        ]
      })
    });

    const data = await r.json();
    const text = (data?.choices?.[0]?.message?.content || "").trim();
    return res.status(200).json({ text });
  } catch (e) {
    return res.status(500).json({ error: String(e) });
  }
}
