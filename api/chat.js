// api/chat.js — AgroMach AI Chatbot endpoint (proxies to Claude API)
// API key stays on server — never exposed to client

module.exports = async function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_API_KEY) {
    return res.status(500).json({
      error: 'ANTHROPIC_API_KEY not configured. Please add it in Vercel Environment Variables.'
    });
  }

  const { messages } = req.body || {};
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array required' });
  }

  const systemPrompt = `You are an AI assistant for AgroMach Engineering Pvt. Ltd. — an industrial food processing machinery company based in India.
Your job is to help the sales team create quotations by collecting customer information conversationally.

RESPOND IN HINGLISH (Hindi + English mix) — simple, friendly, professional.

AVAILABLE PLANT TYPES:
- Rice Mill (chawal mill)
- Flour Mill (aata mill)
- Dal Mill (dal mill)
- Maize Mill (makka mill)

AVAILABLE CAPACITIES: 4 TPH, 6 TPH, 8 TPH, 12 TPH
(TPH = Tons Per Hour — production capacity)

INFORMATION TO COLLECT for a quotation:
1. custName — Customer/Company Name (required)
2. custContact — Contact Person Name (required)
3. custPhone — Phone Number (required)
4. custEmail — Email Address (optional, ask but skip if not given)
5. custLoc — Location / State in India (required)
6. plantType — "Rice Mill", "Flour Mill", "Dal Mill", or "Maize Mill" (required)
7. capacity — "4", "6", "8", or "12" (required)
8. turnkey — true or false (required)
   Turnkey = AgroMach handles installation + civil work too
   Supply Only = only machinery supply

CONVERSATION RULES:
- Ask 1-2 questions at a time, not all at once
- Be warm and helpful
- If user seems unsure about capacity, help them: "Agar aap roz 40-60 ton process karna chahte hain to 6-8 TPH sahi rahega"
- Once ALL required fields collected (custName, custContact, custPhone, custLoc, plantType, capacity, turnkey), output this EXACT line at the END of your message — do not put anything after it:
  ACTION:FILL_FORM:{"custName":"VALUE","custContact":"VALUE","custPhone":"VALUE","custEmail":"VALUE","custLoc":"VALUE","plantType":"VALUE","capacity":"VALUE","turnkey":BOOLEAN}

- Replace each VALUE with actual collected data
- capacity must be exactly "4", "6", "8", or "12"
- plantType must be exactly one of: "Rice Mill", "Flour Mill", "Dal Mill", "Maize Mill"
- turnkey must be true or false (no quotes)
- custEmail can be empty string "" if not provided
- Only output ACTION:FILL_FORM once, and only when you have everything

Example final message:
"Perfect! Sab details mil gayi. Main abhi form fill kar raha hoon...
ACTION:FILL_FORM:{"custName":"M/S Sharma Rice Mills","custContact":"Rajesh Sharma","custPhone":"9876543210","custEmail":"sharma@gmail.com","custLoc":"Punjab","plantType":"Rice Mill","capacity":"6","turnkey":true}"`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 512,
        system: systemPrompt,
        messages: messages
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: errText });
    }

    const data = await response.json();
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
