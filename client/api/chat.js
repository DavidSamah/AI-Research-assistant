import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { prompt } = req.body;

    const completion = await client.chat.completions.create({
      model: "poolside/laguna-xs-2.1:free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    res.status(200).json({
      response: completion.choices[0].message.content,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}