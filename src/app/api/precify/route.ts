import { NextResponse } from "next/server";

const generateGeminiPrompt = (
  type: string,
  brand: string,
  condition: string,
  material: string,
  trend: string
) => {
  return `
Precifique a seguinte peça de brechó considerando tendências de moda, condição e faixa de mercado brasileiro.

Peça: ${type}
Marca: ${brand || "N/A"}
Condição: ${condition || "N/A"}
Material: ${material || "N/A"}
Tendência: ${trend || "N/A"}

Responda em JSON no formato:
{
  "preco_sugerido": "R$ XX - R$ YY",
  "justificativa": "texto explicando a escolha"
}
`;
};

const parseGeminiResponse = (response: any) => {
  try {
    const text = response?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    const parsed = JSON.parse(text);
    return parsed;
  } catch (error) {
    console.error("Erro ao parsear resposta do Gemini:", error);
    return null;
  }
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { type, brand, condition, material, trend } = body;

    const prompt = generateGeminiPrompt(
      type,
      brand,
      condition,
      material,
      trend
    );

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();
    const parsed = parseGeminiResponse(data);

    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error("Erro na API:", error);
    return NextResponse.json(
      { error: "Erro ao gerar preço. Tente novamente." },
      { status: 500 }
    );
  }
}
