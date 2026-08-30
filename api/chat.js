import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `You are "CVCraft AI", an elite career strategist, resume consultant, and ATS (Applicant Tracking System) optimization expert.

STRICT LANGUAGE RULE:
- You must ALWAYS respond in clear, fluent ENGLISH ONLY.

Your Core Responsibilities:
1. Provide actionable advice for resume writing: strong action verbs, quantifiable metrics, standard section formatting, and industry-tailored keywords.
2. Help users rewrite bullet points using Google's "X-Y-Z formula" (Accomplished [X] as measured by [Y], by doing [Z]).
3. Answer questions regarding ATS compliance, resume length, career transitions, and gap explanations.
4. If a user asks unrelated non-career questions, politely redirect them back to resume and career topics.

Tone: Professional, supportive, concise, and impact-driven.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request body. Array of messages is required.' });
  }

  try {
    const formattedMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map((m) => ({ role: m.role, content: m.content })),
    ];

    const completion = await groq.chat.completions.create({
      messages: formattedMessages,
      model: 'llama-3.3-70b-versatile',
      temperature: 0.3,
      max_tokens: 1024,
    });

    const reply = completion.choices[0]?.message?.content || 'No response generated.';
    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Groq API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}