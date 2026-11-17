import 'dart:async';
import 'dart:convert';
import 'dart:math';
import 'package:http/http.dart' as http;

class GroqJokeResult {
  final String text;
  final String source; // 'groq' | 'fallback'
  final String language;

  GroqJokeResult({
    required this.text,
    required this.source,
    required this.language,
  });
}

class GroqService {
  static const String defaultApiKey =
      String.fromEnvironment('GROQ_API_KEY', defaultValue: '');

  static const List<String> supportedModels = [
    'openai/gpt-oss-120b',
    'openai/gpt-oss-20b',
    'qwen/qwen3.8-27b',
  ];

  static String normalizeText(String input) {
    var str = input.toLowerCase();
    const withDia = 'àáâãäåèéêëìíîïòóôõöùúûüýÿñç';
    const withoutDia = 'aaaaaaeeeeiiiiooooouuuuyync';
    for (int i = 0; i < withDia.length; i++) {
      str = str.replaceAll(withDia[i], withoutDia[i]);
    }
    return str.trim();
  }

  // Base temática de piadas para contingência offline / sem conexão
  static final Map<String, List<Map<String, dynamic>>> thematicJokes = {
    'pt': [
      {
        'keywords': ['cafe', 'manha', 'cansaco', 'sono', 'dormir', 'segunda', 'despertador'],
        'text':
            'O café da manhã não é uma refeição: é uma tentativa desesperada da medicina caseira para ressuscitar a minha alma para mais um dia de trabalho!',
      },
      {
        'keywords': ['dev', 'programador', 'codigo', 'bug', 'software', 'computador', 'ti', 'site', 'internet'],
        'text':
            'Um programador vai à padaria e a esposa diz: "Traz um pão, e se tiver ovos, traz dez". Ele voltou com 10 pães porque tinham ovos.',
      },
      {
        'keywords': ['sogra', 'casamento', 'marido', 'esposa', 'namorado', 'namorada', 'casal'],
        'text':
            'O homem entra em casa apressado: "Querida, faz as malas que acabei de ganhar a lotaria!". A esposa pergunta: "Roupas de verão ou de inverno?". Ele responde: "Não interessa, desde que vás embora hoje!"',
      },
      {
        'keywords': ['trabalho', 'chefe', 'emprego', 'reuniao', 'escritorio', 'salario', 'dinheiro', 'banco', 'conta'],
        'text':
            'No meu trabalho temos uma política muito rigorosa: 90% das reuniões poderiam ter sido um email, e o email poderia ter sido não me chatearem.',
      },
      {
        'keywords': ['gato', 'cachorro', 'cao', 'animal', 'pet', 'papagaio', 'bicho', 'pato'],
        'text':
            'Dois gatos a conversar na rua: "Miau!", diz o primeiro. O outro responde: "Au au!". O primeiro estranha: "Porque estás a ladrar?". O outro pisca o olho: "Hoje em dia quem não sabe falar uma segunda língua não vai a lado nenhum!"',
      },
      {
        'keywords': ['carro', 'transito', 'multa', 'policia', 'estrada', 'uber', 'gasolina'],
        'text':
            'O polícia de trânsito manda parar o condutor: "O senhor sabe que os seus faróis estão apagados?". O condutor responde: "Pois claro, com o preço da eletricidade hoje em dia há que poupar em tudo!"',
      },
      {
        'keywords': ['pizza', 'comida', 'dieta', 'gordo', 'fome', 'restaurante', 'chocolate'],
        'text':
            'Comecei ontem uma dieta muito disciplinada: cortei a pizza em 4 fatias em vez de 8 para comer menos calorias!',
      },
      {
        'keywords': ['cerveja', 'bebado', 'bar', 'festa', 'alcool'],
        'text':
            'Dois amigos no bar: "Bebes tanto que já vês a dobrar!". O outro responde: "Impossível, fechei um olho!".',
      },
      {
        'keywords': ['medico', 'hospital', 'farmacia', 'doente', 'dor', 'dentista'],
        'text':
            'No consultório médico: "Senhor doutor, toda a gente me ignora!". O médico olha para a porta e grita: "Próximo, por favor!"',
      },
      {
        'keywords': ['escola', 'professor', 'aluno', 'estudo', 'aula', 'matematica', 'prova'],
        'text':
            'O professor de matemática pergunta: "Joãozinho, se tens 5 euros num bolso e 10 noutro, o que tens?". O Joãozinho responde: "As calças de outra pessoa, com certeza!"',
      },
      {
        'keywords': ['futebol', 'jogo', 'bola', 'estadio', 'gol', 'golo', 'arbitro'],
        'text':
            'O árbitro pergunta ao jogador: "Não viu que a bola já estava fora?". O jogador responde: "Ver até vi, mas enquanto o VAR não apitar, eu continuo a correr!"',
      },
      {
        'keywords': ['inteligente', 'ciencia', 'fisica', 'quimica', 'atomo', 'universo'],
        'text':
            'Um neutrão entra num bar e pergunta: "Quanto custa uma cerveja?". O barman olha e responde: "Para si, não há carga!".',
      },
      {
        'keywords': ['seca', 'trocadilho', 'ruim', 'sem graca', 'dad joke'],
        'text':
            'O que faz uma impressora quando está apaixonada? — Imprime sentimentos em alta resolução!',
      },
    ],
    'en': [
      {
        'keywords': ['coffee', 'morning', 'tired', 'sleep', 'monday', 'alarm'],
        'text':
            'Morning coffee isn’t just a beverage; it’s a liquid reboot for a human operating system that refuses to wake up.',
      },
      {
        'keywords': ['dev', 'programmer', 'code', 'bug', 'software', 'computer', 'tech'],
        'text':
            'A programmer goes to the grocery store. His wife says: "Buy a loaf of bread, and if they have eggs, buy a dozen." He comes back with 12 loaves of bread because they had eggs.',
      },
      {
        'keywords': ['work', 'boss', 'job', 'meeting', 'office', 'salary', 'money'],
        'text':
            'My boss told me to have a good day. So I packed my bags, went home, and took a nap.',
      },
      {
        'keywords': ['marriage', 'wife', 'husband', 'date', 'relationship'],
        'text':
            'My wife told me to stop impersonating a flamingo. I had to put my foot down.',
      },
      {
        'keywords': ['cat', 'dog', 'pet', 'animal'],
        'text': 'What do you call a sleeping dinosaur? — A dino-snore!',
      },
      {
        'keywords': ['pizza', 'food', 'diet'],
        'text': 'I’m on a strictly 30-day diet. So far, I’ve lost 15 days.',
      },
      {
        'keywords': ['science', 'atom', 'physics'],
        'text': 'Why do scientists refuse to trust atoms? Because they literally make up everything!',
      },
    ],
    'es': [
      {
        'keywords': ['cafe', 'manana', 'cansancio', 'sueno', 'dormir', 'lunes', 'despertador'],
        'text':
            'El café de la mañana no es una bebida: es un intento desesperado de devolverle el alma al cuerpo antes de empezar el día.',
      },
      {
        'keywords': ['dev', 'programador', 'codigo', 'bug', 'software', 'computadora'],
        'text':
            'Un programador va a la panadería y su esposa le dice: "Trae una barra de pan, y si hay huevos, trae diez". Volvió con diez barras de pan porque sí había huevos.',
      },
      {
        'keywords': ['trabajo', 'jefe', 'empleo', 'reunion', 'oficina', 'salario', 'dinero'],
        'text':
            'En mi oficina, el 90% de las reuniones podrían haber sido un correo, y el correo podría haber sido un "déjenme trabajar en paz".',
      },
      {
        'keywords': ['suegra', 'matrimonio', 'esposo', 'esposa', 'novio'],
        'text':
            '— Cariño, ¿qué estás leyendo? — ¡Nada, cosas mías! — ¡Mentira, estás leyendo nuestro certificado de matrimonio! — Sí, ¡buscando la fecha de caducidad!',
      },
      {
        'keywords': ['gato', 'perro', 'animal'],
        'text': '¿Qué hace una abeja en el gimnasio? — ¡Zum-ba!',
      },
      {
        'keywords': ['pizza', 'comida', 'dieta'],
        'text': 'Estoy en una dieta súper estricta: veo comida deliciosa y me la como estrictamente toda.',
      },
      {
        'keywords': ['ciencia', 'atomo', 'fisica'],
        'text':
            'Dos átomos van caminando por la calle. Uno dice: "¡He perdido un electrón!". El otro pregunta: "¿Seguro?". "¡Totalmente positivo!".',
      },
    ],
  };

  static String? findThematicJoke(String lang, String query) {
    final list = thematicJokes[lang] ?? thematicJokes['pt']!;
    final normQuery = normalizeText(query);
    if (normQuery.isEmpty) return null;

    for (final item in list) {
      final keywords = (item['keywords'] as List).cast<String>();
      for (final kw in keywords) {
        if (normQuery.contains(kw)) {
          return item['text'] as String;
        }
      }
    }
    return null;
  }

  static String getRandomFallbackJoke(String lang) {
    final list = thematicJokes[lang] ?? thematicJokes['pt']!;
    final randomItem = list[Random().nextInt(list.length)];
    return randomItem['text'] as String;
  }

  /// Gera uma piada via API Groq ultra-rápida com fallback inteligente
  static Future<GroqJokeResult> generateJoke({
    required String prompt,
    String category = 'anedotas',
    String language = 'pt',
    String? customApiKey,
  }) async {
    final lang = ['pt', 'en', 'es'].contains(language) ? language : 'pt';
    final apiKey = (customApiKey != null && customApiKey.trim().isNotEmpty)
        ? customApiKey.trim()
        : defaultApiKey;

    if (apiKey.isEmpty) {
      final thematic = findThematicJoke(lang, promptText);
      if (thematic != null) {
        return GroqJokeResult(
          text: thematic,
          source: 'fallback',
          language: lang,
        );
      }
      return GroqJokeResult(
        text: getRandomFallbackJoke(lang),
        source: 'fallback',
        language: lang,
      );
    }

    String promptText = prompt.trim();
    if (promptText.isEmpty) {
      switch (category) {
        case 'ti':
          promptText = lang == 'en' ? 'software developers and bugs' : (lang == 'es' ? 'programadores y bugs' : 'programadores e bugs de software');
          break;
        case 'secas':
          promptText = lang == 'en' ? 'dry dad jokes' : (lang == 'es' ? 'chistes secos y malos' : 'piadas secas e trocadilhos');
          break;
        case 'trocadilhos':
          promptText = lang == 'en' ? 'clever puns' : (lang == 'es' ? 'juegos de palabras' : 'trocadilhos e jogos de palavras');
          break;
        case 'inteligentes':
          promptText = lang == 'en' ? 'science and universe' : (lang == 'es' ? 'ciencia y física' : 'ciência, física e inteligência');
          break;
        default:
          promptText = lang == 'en' ? 'everyday funny life' : (lang == 'es' ? 'situaciones graciosas de la vida cotidiana' : 'situações engraçadas do dia a dia');
      }
    }

    final langRules = {
      'pt': 'Escreve estritamente em Português de forma natural, espirituosa e muito engraçada.',
      'en': 'Write strictly in punchy, witty English.',
      'es': 'Escribe estrictamente en Español natural, divertido y con buen remate.',
    };

    final systemMessage = '''És um comediante de stand-up profissional e mestre em piadas curtas.
${langRules[lang]}
Regras obrigatórias:
1. Responde APENAS com o texto direto da piada, sem introduções, sem saudações (não digas "Aqui está uma piada") e sem aspas.
2. A piada deve ser curta (1 a 3 frases) e focar exatamente no tema pedido.''';

    final userMessage = 'Cria uma piada curta e engraçada sobre: "$promptText".';

    // Tentativa com os modelos Groq suportados
    for (final model in supportedModels) {
      try {
        final response = await http
            .post(
              Uri.parse('https://api.groq.com/openai/v1/chat/completions'),
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer $apiKey',
              },
              body: jsonEncode({
                'model': model,
                'messages': [
                  {'role': 'system', 'content': systemMessage},
                  {'role': 'user', 'content': userMessage},
                ],
                'temperature': 0.85,
                'max_tokens': 160,
              }),
            )
            .timeout(const Duration(seconds: 8));

        if (response.statusCode == 200) {
          final data = jsonDecode(response.body);
          final rawContent = data['choices']?[0]?['message']?['content']?.toString()?.trim();
          if (rawContent != null && rawContent.isNotEmpty) {
            final cleaned = rawContent
                .replaceAll(RegExp(r'^["\s]+'), '')
                .replaceAll(RegExp(r'["\s]+$'), '')
                .trim();
            return GroqJokeResult(
              text: cleaned,
              source: 'groq',
              language: lang,
            );
          }
        }
      } catch (_) {
        // Tenta o próximo modelo
        continue;
      }
    }

    // Se a Groq falhar ou não houver conexão, utiliza a base de contingência temática
    final thematic = findThematicJoke(lang, promptText);
    if (thematic != null) {
      return GroqJokeResult(
        text: thematic,
        source: 'fallback',
        language: lang,
      );
    }

    return GroqJokeResult(
      text: getRandomFallbackJoke(lang),
      source: 'fallback',
      language: lang,
    );
  }
}
