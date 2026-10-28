export async function gerarPiadaComIA(categoria: string = 'anedotas'): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('Chave da API do Gemini não configurada.');
  }

  const prompt = `Você é um humorista profissional. Crie uma piada curta e engraçada em português do tipo: ${categoria}. Não inclua introduções, responda apenas com o texto da piada.`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.9 }
      })
    }
  );

  const data = await response.json();
  const piada = data.candidates?.[0]?.content?.parts?.[0]?.text;
  return piada ?? 'Não consegui gerar uma piada agora.';
}
