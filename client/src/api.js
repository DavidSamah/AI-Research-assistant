import { RESEARCH_PROMPT } from "./prompts";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

export async function sendToAI(documentText) {
  console.log("📃 Messenger leaving...");

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "poolside/laguna-xs-2.1:free",
        messages: [
          {
            role: "user",
            content: `${RESEARCH_PROMPT}\n\n${documentText}`,
          },
        ],
      }),
    }
  );
  console.log("📃 Messenger leaving...");
  if (!response.ok) {
    const error = await response.json();
    console.error(error);
    throw new Error(error.error?.message || "AI request failed");
  }

  const data = await response.json();
console.log(data)
console.log(data.choices[0].message.content)
 const aiText = data.choices[0].message.content
 const clean = aiText
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

return JSON.parse(clean);
}