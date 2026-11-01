class Sticker {
  final String id;
  final String name;
  final String category;
  final String packName;
  final List<String> tags;
  final int createdAt;
  final String image;

  Sticker({
    required this.id,
    required this.name,
    required this.category,
    required this.packName,
    required this.tags,
    required this.createdAt,
    required this.image,
  });

  factory Sticker.fromJson(Map<String, dynamic> json) {
    return Sticker(
      id: json['id'] ?? '',
      name: json['name'] ?? '',
      category: json['category'] ?? 'memes',
      packName: json['packName'] ?? 'Geral',
      tags: (json['tags'] as List?)?.map((e) => e.toString()).toList() ?? [],
      createdAt: json['createdAt'] ?? 0,
      image: json['image'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'category': category,
      'packName': packName,
      'tags': tags,
      'createdAt': createdAt,
      'image': image,
    };
  }

  String get rawSvg {
    if (image.startsWith('data:image/svg+xml;utf8,')) {
      try {
        return Uri.decodeComponent(image.substring('data:image/svg+xml;utf8,'.length));
      } catch (_) {
        return image;
      }
    }
    return image;
  }
}
