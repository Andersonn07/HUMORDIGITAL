class MoodOption {
  final String id;
  final String emoji;
  final String label;
  final String description;
  final String suggestedCategory;
  final String suggestion;

  MoodOption({
    required this.id,
    required this.emoji,
    required this.label,
    required this.description,
    required this.suggestedCategory,
    required this.suggestion,
  });

  factory MoodOption.fromJson(Map<String, dynamic> json) {
    return MoodOption(
      id: json['id'] ?? '',
      emoji: json['emoji'] ?? '😊',
      label: json['label'] ?? '',
      description: json['description'] ?? '',
      suggestedCategory: json['suggestedCategory'] ?? 'todas',
      suggestion: json['suggestion'] ?? '',
    );
  }
}

class MoodEntry {
  final String id;
  final String moodId;
  final int intensity;
  final String? note;
  final DateTime timestamp;

  MoodEntry({
    required this.id,
    required this.moodId,
    required this.intensity,
    this.note,
    required this.timestamp,
  });

  factory MoodEntry.fromJson(Map<String, dynamic> json) {
    return MoodEntry(
      id: json['id'] ?? '',
      moodId: json['moodId'] ?? json['mood'] ?? 'feliz',
      intensity: (json['intensity'] as num?)?.toInt() ?? 5,
      note: json['note'],
      timestamp: json['timestamp'] != null
          ? DateTime.fromMillisecondsSinceEpoch(json['timestamp'])
          : DateTime.now(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'moodId': moodId,
      'intensity': intensity,
      'note': note,
      'timestamp': timestamp.millisecondsSinceEpoch,
    };
  }
}

class UserJoke {
  final String id;
  final String text;
  final String author;
  final String category;
  int fireVotes;
  int trashVotes;
  final DateTime createdAt;

  UserJoke({
    required this.id,
    required this.text,
    required this.author,
    this.category = 'geral',
    this.fireVotes = 0,
    this.trashVotes = 0,
    required this.createdAt,
  });

  factory UserJoke.fromJson(Map<String, dynamic> json) {
    return UserJoke(
      id: json['id'] ?? '',
      text: json['text'] ?? json['content'] ?? '',
      author: json['author'] ?? 'Anônimo',
      category: json['category'] ?? 'geral',
      fireVotes: json['votes'] != null
          ? ((json['votes']['fire'] as num?)?.toInt() ?? 0)
          : (json['fireVotes'] ?? 0),
      trashVotes: json['votes'] != null
          ? ((json['votes']['trash'] as num?)?.toInt() ?? 0)
          : (json['trashVotes'] ?? 0),
      createdAt: json['createdAt'] != null
          ? DateTime.fromMillisecondsSinceEpoch(json['createdAt'])
          : DateTime.now(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'text': text,
      'author': author,
      'category': category,
      'fireVotes': fireVotes,
      'trashVotes': trashVotes,
      'createdAt': createdAt.millisecondsSinceEpoch,
    };
  }
}
