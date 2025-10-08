import { NextResponse } from "next/server";

const generateGeminiPrompt = (
  type: string,
  brand: string,
  condition: string,
  material: string,
  trend: string
) => {
  const prompt = `
Você é um especialista em moda e precificação de brechó no mercado brasileiro.

Sua tarefa é sugerir uma faixa de preço justa para uma peça, considerando tendências atuais, condição, marca e material.

Regras IMPORTANTES:
1. Se as informações fornecidas forem inválidas, confusas ou sem sentido (ex: "dasadlskja"), responda:
   {
     "price": "Indisponível",
     "explanation": "<p>Não foi possível gerar uma precificação pois os dados informados são inválidos ou insuficientes.</p>"
   }
2. Sempre responda SOMENTE em JSON válido.
3. Utilize reais (R$) e faixas de preço realistas do mercado brasileiro de brechó (ex: R$ 40 - R$ 120).
4. Nunca use outros formatos de moeda, texto fora do JSON ou explicações fora da tag HTML <p>.
5. Explique o raciocínio de forma breve, amigável e com formatação simples em HTML (<p>, <strong>, <em>).

Peça: ${type || "N/A"}
Marca: ${brand || "N/A"}
Condição: ${condition || "N/A"}
Material: ${material || "N/A"}
Tendência: ${trend || "N/A"}

Responda em formato JSON:
{
  "price": "R$ XX - R$ YY",
  "explanation": "<p>Texto explicando a escolha com possíveis tags HTML para ênfase e listas.</p>"
}
`;

  return prompt;
};

const parseGeminiResponse = (response: any) => {
  try {
    const text = response?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("Nenhum JSON encontrado na resposta:", text);
      return null;
    }

    const jsonString = jsonMatch[0];
    const parsed = JSON.parse(jsonString);

    return {
      price: parsed.price || "Preço não disponível",
      explanation: parsed.explanation || "Sem explicação fornecida",
    };
  } catch (error) {
    console.error("Erro ao parsear resposta do Gemini:", error);
    return null;
  }
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("🚀 ~ POST ~ body:", body);

    const { type, brand, condition, material, trend } = body;

    const prompt = generateGeminiPrompt(
      type,
      brand,
      condition,
      material,
      trend
    );

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
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
