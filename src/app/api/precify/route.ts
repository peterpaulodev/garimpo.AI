import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { tipo, marca, condicao, material, tendencia } = body;

    const prompt = `
Precifique a seguinte peça de brechó considerando tendências de moda, condição e faixa de mercado brasileiro.

Peça: ${tipo}
Marca: ${marca || "N/A"}
Condição: ${condicao || "N/A"}
Material: ${material || "N/A"}
Tendência: ${tendencia || "N/A"}

Responda em JSON no formato:
{
  "preco_sugerido": "R$ XX - R$ YY",
  "justificativa": "texto explicando a escolha"
}
`;

    // Chamando Gemini
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

    // Extrair resposta do Gemini
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    const parsed = JSON.parse(text);

    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error("Erro na API:", error);
    return NextResponse.json(
      { error: "Erro ao gerar preço. Tente novamente." },
      { status: 500 }
    );
  }
}
