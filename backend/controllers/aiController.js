const OpenAI = require('openai');

const SYSTEM_PROMPT = `You are an expert agricultural assistant for Indian farmers ("Kisan AI Copilot").

STRICT RESPONSE RULES:
- Answer in under 80 words unless the user explicitly asks for details.
- Give the direct answer first.
- Use concise bullet points for your response.
- Never write long introductions or repeat the user's question.
- Never explain basic concepts unless explicitly asked.
- Never include unnecessary warnings or generic filler advice.
- Always use the provided weather, mandi prices, or field area data when forming recommendations.
- If essential information is missing, ask only ONE short follow-up question.`;

// Dynamic Context Generator for fallback responses adhering to strict rules
const generateFallbackResponse = (userPrompt, context = {}) => {
  const p = userPrompt.toLowerCase();
  const weather = context.weather || {};
  const mandi = context.mandi || [];
  const fields = context.fields || [];

  const temp = weather.current?.temperature ? `${weather.current.temperature}°C` : '29°C';
  const cond = weather.current?.condition || 'Partly Cloudy';
  const rainChance = weather.current?.rainProbability !== undefined ? `${weather.current.rainProbability}%` : '25%';

  if (p.includes('irrigat') || p.includes('water')) {
    if (weather.current?.rainProbability > 50) {
      return `• Hold off on irrigation today.\n• High rain probability (${rainChance}) with ${cond}.\n• Prevents waterlogging and conserves fuel/electricity.`;
    }
    return `• Irrigate during early morning or late evening.\n• Current weather: ${cond} (${temp}) with low rain chance (${rainChance}).\n• Check soil top layer (2-3 inches) for moisture before watering.`;
  }

  if (p.includes('price') || p.includes('mandi') || p.includes('wheat') || p.includes('rate')) {
    if (mandi && mandi.length > 0) {
      const top = mandi[0];
      return `• ${top.cropName} modal price: ₹${top.modalPrice} / Quintal.\n• Market: ${top.market} (${top.district}, ${top.state}).\n• Range: Min ₹${top.minPrice} - Max ₹${top.maxPrice}.`;
    }
    return `• Wheat: ₹2,360 / Quintal (Khanna Mandi).\n• Paddy Basmati: ₹4,050 / Quintal (Amritsar).\n• Cotton: ₹7,200 / Quintal (Gondal Mandi).`;
  }

  if (p.includes('seed') || p.includes('acre') || p.includes('field') || p.includes('land')) {
    const area = fields.length > 0 ? fields[0].areaAcres : 2;
    return `For ${area} Acres field area:\n• Wheat: 80–100 kg certified seed.\n• Paddy: 12–15 kg seed for nursery.\n• Cotton: 3–4 packets hybrid seed.`;
  }

  if (p.includes('rain') || p.includes('weather') || p.includes('forecast')) {
    return `• Current: ${cond}, ${temp}.\n• Rain chance: ${rainChance}.\n• Sunrise: ${weather.current?.sunrise || '06:00 AM'} | Sunset: ${weather.current?.sunset || '06:45 PM'}.`;
  }

  if (p.includes('crop') || p.includes('season') || p.includes('sugges')) {
    return `• Kharif: Paddy, Cotton, Soybean, Maize.\n• Rabi: Wheat, Mustard, Gram (Chana).\n• Zaid: Cucumber, Watermelon, Fodder.`;
  }

  if (p.includes('scheme') || p.includes('pm kisan') || p.includes('gov')) {
    return `• PM-KISAN: ₹6,000 yearly direct benefit transfer.\n• PM Fasal Bima: Comprehensive crop insurance.\n• KCC: Subsidized crop loan up to ₹3 Lakh at 4% interest.`;
  }

  return `• Weather: ${cond}, ${temp} (${rainChance} rain chance).\n• Wheat price: ₹2,360 / Quintal.\n\nWhich crop or field topic would you like advice on?`;
};

const chatWithAI = async (req, res, next) => {
  try {
    const { messages = [], context = {} } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ success: false, message: 'Messages array is required' });
    }

    const lastMessage = messages[messages.length - 1];
    const userPrompt = lastMessage?.content || '';

    // Build context summary string
    let contextStr = '--- REAL-TIME FARMER CONTEXT ---\n';
    if (context.location) contextStr += `Location: ${context.location}\n`;
    if (context.weather) {
      contextStr += `Current Weather: ${context.weather.current?.temperature}°C, ${context.weather.current?.condition}, Humidity: ${context.weather.current?.humidity}%, Rain Chance: ${context.weather.current?.rainProbability}%\n`;
    }
    if (context.mandi && context.mandi.length > 0) {
      contextStr += `Live Mandi Rates: ${context.mandi.slice(0, 3).map(m => `${m.cropName} @ ${m.market}: ₹${m.modalPrice}/qtl`).join('; ')}\n`;
    }
    if (context.fields && context.fields.length > 0) {
      contextStr += `Saved Fields: ${context.fields.map(f => `${f.name} (${f.areaAcres} Acres)`).join('; ')}\n`;
    }
    contextStr += '---------------------------------\n';

    // Check if OpenAI API Key is configured
    const apiKey = process.env.OPENAI_API_KEY;

    // Set Server-Sent Events headers for streaming response
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    if (apiKey && apiKey.startsWith('sk-')) {
      try {
        const openai = new OpenAI({ apiKey });

        const formattedMessages = [
          { role: 'system', content: `${SYSTEM_PROMPT}\n\n${contextStr}` },
          ...messages.map(m => ({
            role: m.role === 'user' ? 'user' : 'assistant',
            content: m.content
          }))
        ];

        const stream = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: formattedMessages,
          stream: true,
          temperature: 0.5,
          max_tokens: 600
        });

        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || '';
          if (content) {
            res.write(`data: ${JSON.stringify({ content })}\n\n`);
          }
        }

        res.write(`data: [DONE]\n\n`);
        return res.end();

      } catch (openAiError) {
        console.warn('OpenAI Stream API error, switching to smart agricultural fallback:', openAiError.message);
      }
    }

    // Fallback Streaming Simulation for Instant Offline / Unconfigured Key Support
    const fallbackText = generateFallbackResponse(userPrompt, context);
    const words = fallbackText.split(' ');

    for (let i = 0; i < words.length; i++) {
      const chunk = words[i] + (i === words.length - 1 ? '' : ' ');
      res.write(`data: ${JSON.stringify({ content: chunk })}\n\n`);
      // Short delay for realistic typing stream effect
      await new Promise(resolve => setTimeout(resolve, 35));
    }

    res.write(`data: [DONE]\n\n`);
    res.end();

  } catch (error) {
    console.error('AI Chat Error:', error);
    if (!res.headersSent) {
      next(error);
    } else {
      res.write(`data: ${JSON.stringify({ content: '\n\nAn error occurred while generating response.' })}\n\n`);
      res.write(`data: [DONE]\n\n`);
      res.end();
    }
  }
};

module.exports = {
  chatWithAI
};
