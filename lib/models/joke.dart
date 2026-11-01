class JokeContent {
  final String pt;
  final String en;
  final String es;

  JokeContent({required this.pt, required this.en, required this.es});

  factory JokeContent.fromJson(Map<String, dynamic> json) {
    return JokeContent(
      pt: json['pt'] ?? '',
      en: json['en'] ?? '',
      es: json['es'] ?? '',
    );
  }

  String getText(String lang) {
    switch (lang) {
      case 'en':
        return en.isNotEmpty ? en : pt;
      case 'es':
        return es.isNotEmpty ? es : pt;
      case 'pt':
      default:
        return pt;
    }
  }
}

class Joke {
  final String id;
  final JokeContent content;
  final String category;
  final String? author;
  final bool mature;

  Joke({
    required this.id,
    required this.content,
    required this.category,
    this.author,
    this.mature = false,
  });

  factory Joke.fromJson(Map<String, dynamic> json) {
    return Joke(
      id: json['id']?.toString() ?? '',
      content: JokeContent.fromJson(json['content'] as Map<String, dynamic>? ?? {}),
      category: json['category'] ?? 'todas',
      author: json['author'],
      mature: json['mature'] == true,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'content': {
        'pt': content.pt,
        'en': content.en,
        'es': content.es,
      },
      'category': category,
      'author': author,
      'mature': mature,
    };
  }
}

class JokeCategory {
  final String id;
  final String name;
  final String emoji;
  final bool mature;

  JokeCategory({
    required this.id,
    required this.name,
    required this.emoji,
    this.mature = false,
  });

  factory JokeCategory.fromJson(Map<String, dynamic> json) {
    return JokeCategory(
      id: json['id'] ?? '',
      name: json['name'] ?? '',
      emoji: json['emoji'] ?? '😄',
      mature: json['mature'] == true,
    );
  }
}
