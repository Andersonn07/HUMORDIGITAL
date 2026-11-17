/**
 * Serviço de Geração de Piadas de Alta Velocidade (Groq AI + Gemini + Fallback Semântico)
 */

export interface JokeGenerationParams {
  prompt?: string;
  category?: string;
  language?: 'pt' | 'en' | 'es';
}

export interface JokeGenerationResult {
  text: string;
  source: 'groq' | 'gemini' | 'fallback';
  language: 'pt' | 'en' | 'es';
}

function normalizeText(str: string): string {
  return (str || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

// Base temática rica com normalização de acentos para resposta instantânea
const THEMATIC_JOKES: Record<'pt' | 'en' | 'es', Array<{ keywords: string[]; text: string }>> = {
  pt: [
    {
      keywords: ['cafe', 'manha', 'cansaco', 'sono', 'dormir', 'segunda', 'despertador'],
      text: 'O café da manhã não é uma refeição: é uma tentativa desesperada da medicina caseira para ressuscitar a minha alma para mais um dia de trabalho!'
    },
    {
      keywords: ['dev', 'programador', 'codigo', 'bug', 'software', 'computador', 'ti', 'site', 'internet'],
      text: 'Um programador vai à padaria e a esposa diz: "Traz um pão, e se tiver ovos, traz dez". Ele voltou com 10 pães porque tinham ovos.'
    },
    {
      keywords: ['sogra', 'casamento', 'marido', 'esposa', 'namorado', 'namorada', 'casal'],
      text: 'O homem entra em casa apressado: "Querida, faz as malas que acabei de ganhar a lotaria!". A esposa pergunta: "Roupas de verão ou de inverno?". Ele responde: "Não interessa, desde que vás embora hoje!"'
    },
    {
      keywords: ['trabalho', 'chefe', 'emprego', 'reuniao', 'escritorio', 'salario', 'dinheiro', 'banco', 'conta'],
      text: 'No meu trabalho temos uma política muito rigorosa: 90% das reuniões poderiam ter sido um email, e o email poderia ter sido não me chatearem.'
    },
    {
      keywords: ['gato', 'cachorro', 'cao', 'animal', 'pet', 'papagaio', 'bicho', 'pato'],
      text: 'Dois gatos a conversar na rua: "Miau!", diz o primeiro. O outro responde: "Au au!". O primeiro estranha: "Porque estás a ladrar?". O outro pisca o olho: "Hoje em dia quem não sabe falar uma segunda língua não vai a lado nenhum!"'
    },
    {
      keywords: ['carro', 'transito', 'multa', 'policia', 'estrada', 'uber', 'gasolina'],
      text: 'O polícia de trânsito manda parar o condutor: "O senhor sabe que os seus faróis estão apagados?". O condutor responde: "Pois claro, com o preço da eletricidade hoje em dia há que poupar em tudo!"'
    },
    {
      keywords: ['pizza', 'comida', 'dieta', 'gordo', 'fome', 'restaurante', 'chocolate'],
      text: 'Comecei ontem uma dieta muito disciplinada: cortei a pizza em 4 fatias em vez de 8 para comer menos calorias!'
    },
    {
      keywords: ['cerveja', 'bebado', 'bar', 'festa', 'alcool'],
      text: 'Dois amigos no bar: "Bebes tanto que já vês a dobrar!". O outro responde: "Impossível, fechei um olho!".'
    },
    {
      keywords: ['medico', 'hospital', 'farmacia', 'doente', 'dor', 'dentista'],
      text: 'No consultório médico: "Senhor doutor, toda a gente me ignora!". O médico olha para a porta e grita: "Próximo, por favor!"'
    },
    {
      keywords: ['escola', 'professor', 'aluno', 'estudo', 'aula', 'matematica', 'prova'],
      text: 'O professor de matemática pergunta: "Joãozinho, se tens 5 euros num bolso e 10 noutro, o que tens?". O Joãozinho responde: "As calças de outra pessoa, com certeza!"'
    },
    {
      keywords: ['futebol', 'jogo', 'bola', 'estadio', 'gol', 'golo', 'arbitro'],
      text: 'O árbitro pergunta ao jogador: "Não viu que a bola já estava fora?". O jogador responde: "Ver até vi, mas enquanto o VAR não apitar, eu continuo a correr!"'
    },
    {
      keywords: ['inteligente', 'ciencia', 'fisica', 'quimica', 'atomo', 'universo'],
      text: 'Um neutrão entra num bar e pergunta: "Quanto custa uma cerveja?". O barman olha e responde: "Para si, não há carga!".'
    },
    {
      keywords: ['seca', 'trocadilho', 'ruim', 'sem graca', 'dad joke'],
      text: 'O que faz uma impressora quando está apaixonada? — Imprime sentimentos em alta resolução!'
    }
  ],
  en: [
    {
      keywords: ['coffee', 'morning', 'tired', 'sleep', 'monday', 'alarm'],
      text: 'Morning coffee isn’t just a beverage; it’s a liquid reboot for a human operating system that refuses to wake up.'
    },
    {
      keywords: ['dev', 'programmer', 'code', 'bug', 'software', 'computer', 'tech'],
      text: 'A programmer goes to the grocery store. His wife says: "Buy a loaf of bread, and if they have eggs, buy a dozen." He comes back with 12 loaves of bread because they had eggs.'
    },
    {
      keywords: ['work', 'boss', 'job', 'meeting', 'office', 'salary', 'money'],
      text: 'My boss told me to have a good day. So I packed my bags, went home, and took a nap.'
    },
    {
      keywords: ['marriage', 'wife', 'husband', 'date', 'relationship'],
      text: 'My wife told me to stop impersonating a flamingo. I had to put my foot down.'
    },
    {
      keywords: ['cat', 'dog', 'pet', 'animal'],
      text: 'What do you call a sleeping dinosaur? — A dino-snore!'
    },
    {
      keywords: ['pizza', 'food', 'diet'],
      text: 'I’m on a strictly 30-day diet. So far, I’ve lost 15 days.'
    },
    {
      keywords: ['doctor', 'hospital'],
      text: 'Doctor: "I have good news and bad news." Patient: "Give me the good news first." Doctor: "They are going to name a brand-new disease after you!"'
    },
    {
      keywords: ['science', 'atom', 'physics'],
      text: 'Why do scientists refuse to trust atoms? Because they literally make up everything!'
    }
  ],
  es: [
    {
      keywords: ['cafe', 'manana', 'cansancio', 'sueno', 'dormir', 'lunes', 'despertador'],
      text: 'El café de la mañana no es una bebida: es un intento desesperado de devolverle el alma al cuerpo antes de empezar el día.'
    },
    {
      keywords: ['dev', 'programador', 'codigo', 'bug', 'software', 'computadora'],
      text: 'Un programador va a la panadería y su esposa le dice: "Trae una barra de pan, y si hay huevos, trae diez". Volvió con diez barras de pan porque sí había huevos.'
    },
    {
      keywords: ['trabajo', 'jefe', 'empleo', 'reunion', 'oficina', 'salario', 'dinero'],
      text: 'En mi oficina, el 90% de las reuniones podrían haber sido un correo, y el correo podría haber sido un "déjenme trabajar en paz".'
    },
    {
      keywords: ['suegra', 'matrimonio', 'esposo', 'esposa', 'novio'],
      text: '— Cariño, ¿qué estás leyendo? — ¡Nada, cosas mías! — ¡Mentira, estás leyendo nuestro certificado de matrimonio! — Sí, ¡buscando la fecha de caducidad!'
    },
    {
      keywords: ['gato', 'perro', 'animal'],
      text: '¿Qué hace una abeja en el gimnasio? — ¡Zum-ba!'
    },
    {
      keywords: ['pizza', 'comida', 'dieta'],
      text: 'Estoy en una dieta súper estricta: veo comida deliciosa y me la como estrictamente toda.'
    },
    {
      keywords: ['medico', 'hospital', 'doctor'],
      text: '— Doctor, doctor, nadie me toma en serio. — El doctor responde: "Usted debe estar bromeando".'
    },
    {
      keywords: ['ciencia', 'atomo', 'fisica'],
      text: 'Dos átomos van caminando por la calle. Uno dice: "¡He perdido un electrón!". El otro pregunta: "¿Seguro?". "¡Totalmente positivo!".'
    }
  ]
};

function getMatchingThematicJoke(lang: 'pt' | 'en' | 'es', rawQuery: string): string | null {
  const list = THEMATIC_JOKES[lang] || THEMATIC_JOKES.pt;
  const normQuery = normalizeText(rawQuery);

  if (!normQuery) return null;

  for (const item of list) {
    for (const kw of item.keywords) {
      if (normQuery.includes(kw)) {
        return item.text;
      }
    }
  }

  return null;
}

/**
 * Chaves da Groq e Gemini (localStorage -> variáveis de ambiente)
 */
export function getGroqApiKey(): string | null {
  const userKey = typeof window !== 'undefined' ? localStorage.getItem('groq_api_key')?.trim() : null;
  if (userKey) return userKey;

  const envKey = (import.meta.env.VITE_GROQ_API_KEY as string | undefined)?.trim();
  if (envKey && envKey !== 'YOUR_GROQ_API_KEY') return envKey;

  return null;
}

export function setGroqApiKey(key: string | null): void {
  if (typeof window === 'undefined') return;
  if (key && key.trim()) {
    localStorage.setItem('groq_api_key', key.trim());
  } else {
    localStorage.removeItem('groq_api_key');
  }
}

export function getGeminiApiKey(): string | null {
  const userKey = typeof window !== 'undefined' ? localStorage.getItem('gemini_api_key')?.trim() : null;
  if (userKey) return userKey;

  const envKey = (import.meta.env.VITE_GEMINI_API_KEY as string | undefined)?.trim();
  if (envKey && envKey !== 'YOUR_GEMINI_API_KEY') return envKey;

  return null;
}

export function setGeminiApiKey(key: string | null): void {
  if (typeof window === 'undefined') return;
  if (key && key.trim()) {
    localStorage.setItem('gemini_api_key', key.trim());
  } else {
    localStorage.removeItem('gemini_api_key');
  }
}

/**
 * Chamada à API da Groq (Ultra-rápida)
 */
async function callGroqApi(apiKey: string, promptText: string, lang: 'pt' | 'en' | 'es'): Promise<string> {
  const langRules: Record<'pt' | 'en' | 'es', string> = {
    pt: 'Escreve estritamente em Português de forma natural, espirituosa e muito engraçada.',
    en: 'Write strictly in punchy, witty English.',
    es: 'Escribe estrictamente en Español natural, divertido y con buen remate.'
  };

  const systemMessage = `És um comediante de stand-up profissional e mestre em piadas curtas.
${langRules[lang]}
Regras obrigatórias:
1. Responde APENAS com o texto direto da piada, sem introduções, sem saudações (não digas "Aqui está uma piada") e sem aspas.
2. A piada deve ser curta (1 a 3 frases) e focar exatamente no tema pedido.`;

  const userMessage = `Cria uma piada curta e engraçada sobre: "${promptText}".`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 7000);

  // Modelos suportados na conta Groq
  const models = ['openai/gpt-oss-120b', 'openai/gpt-oss-20b', 'qwen/qwen3.8-27b'];
  let lastError: any = null;

  for (const model of models) {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        signal: controller.signal,
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: systemMessage },
            { role: 'user', content: userMessage }
          ],
          temperature: 0.85,
          max_tokens: 150
        })
      });

      if (response.ok) {
        clearTimeout(timeoutId);
        const data = await response.json();
        const joke = data.choices?.[0]?.message?.content?.trim();
        if (joke) {
          return joke.replace(/^["']|["']$/g, '').trim();
        }
      } else {
        lastError = new Error(`Groq ${model} status ${response.status}`);
      }
    } catch (e) {
      lastError = e;
    }
  }

  clearTimeout(timeoutId);
  throw lastError || new Error('Falha ao gerar piada na Groq');
}

/**
 * Chamada à API Oficial do Google Gemini
 */
async function callGeminiApi(apiKey: string, promptText: string, lang: 'pt' | 'en' | 'es'): Promise<string> {
  const langRules: Record<'pt' | 'en' | 'es', string> = {
    pt: 'Escreva OBRIGATORIAMENTE em Português.',
    en: 'Write STRICTLY in English.',
    es: 'Escribe OBLIGATORIAMENTE en Español.'
  };

  const systemInstruction = `És um comediante profissional.
${langRules[lang]}
Gera uma piada curta, criativa e engraçada sobre o seguinte tema: "${promptText}".
Regras:
1. Responde APENAS com a piada direta, sem saudações e sem introduções.
2. Máximo de 3 linhas.`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    signal: controller.signal,
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: systemInstruction }] }],
      generationConfig: { temperature: 0.9, maxOutputTokens: 150 }
    })
  });

  clearTimeout(timeoutId);

  if (!response.ok) {
    throw new Error(`Gemini API HTTP ${response.status}`);
  }

  const data = await response.json();
  const joke = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

  if (!joke) throw new Error('Resposta vazia da API Gemini');

  return joke.replace(/^["']|["']$/g, '').trim();
}

/**
 * Função Principal de Geração de Piadas
 * Prioridade: Groq (Ultra-rápida ~400ms) -> Gemini -> Base Semântica Local
 */
export async function gerarPiadaComIA(params: JokeGenerationParams = {}): Promise<JokeGenerationResult> {
  const lang: 'pt' | 'en' | 'es' = params.language || 'pt';
  const customPrompt = (params.prompt || '').trim();
  const category = (params.category || 'anedotas').trim();
  const searchSubject = customPrompt || category;

  // 1. Tenta Groq API (Recomendada: ~400ms e sem bloqueios)
  const groqKey = getGroqApiKey();
  if (groqKey) {
    try {
      const joke = await callGroqApi(groqKey, searchSubject, lang);
      return { text: joke, source: 'groq', language: lang };
    } catch (err) {
      console.warn('[Groq API] Falha na Groq, tentando alternativas...', err);
    }
  }

  // 2. Tenta Gemini API se houver chave configurada
  const geminiKey = getGeminiApiKey();
  if (geminiKey) {
    try {
      const joke = await callGeminiApi(geminiKey, searchSubject, lang);
      return { text: joke, source: 'gemini', language: lang };
    } catch (err) {
      console.warn('[Gemini API] Falha na API Gemini...', err);
    }
  }

  // 3. Fallback Semântico Local Instantâneo (Zero Latência, Nunca Falha)
  const thematicJoke = getMatchingThematicJoke(lang, searchSubject);
  if (thematicJoke) {
    return { text: thematicJoke, source: 'fallback', language: lang };
  }

  const fallbackList = THEMATIC_JOKES[lang] || THEMATIC_JOKES.pt;
  const randomThematic = fallbackList[Math.floor(Math.random() * fallbackList.length)].text;

  return { text: randomThematic, source: 'fallback', language: lang };
}
