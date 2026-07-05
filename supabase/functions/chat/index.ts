import { serve } from "https://deno.land/std/http/server.ts";

serve(async (req) => {
  const { prompt } = await req.json();

  const apiKey = Deno.env.get("OPENROUTER_API_KEY");

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "poolside/laguna-xs-2.1:free",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    }
  );

  const data = await response.json();

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
});