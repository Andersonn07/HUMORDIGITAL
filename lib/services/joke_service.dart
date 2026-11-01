import 'dart:convert';
import 'dart:math';
import 'package:flutter/services.dart';
import '../models/joke.dart';
import '../models/mood.dart';
import '../models/sticker.dart';
import 'storage_service.dart';

class JokeService {
  final StorageService storage;
  List<Joke> allJokes = [];
  List<JokeCategory> categories = [];
  List<MoodOption> moods = [];
  List<Sticker> defaultStickersList = [];
  List<Sticker> userStickers = [];

  List<String> favorites = [];
  Set<String> likes = {};
  Map<String, Map<String, int>> votes = {};
  Map<String, String> userVotes = {};
  Map<String, String> battleVotes = {};
  List<UserJoke> userJokes = [];
  List<String> favoriteStickerIds = [];
  List<String> recentStickerIds = [];
  Map<String, List<String>> jokeStickerReactions = {};
  List<MoodEntry> moodEntries = [];

  JokeService(this.storage);

  Future<void> loadData() async {
    // Load jokes & categories from assets
    final jokesString = await rootBundle.loadString('assets/jokes.json');
    final Map<String, dynamic> data = jsonDecode(jokesString);

    allJokes = (data['jokes'] as List)
        .map((j) => Joke.fromJson(j as Map<String, dynamic>))
        .toList();

    categories = (data['categories'] as List)
        .map((c) => JokeCategory.fromJson(c as Map<String, dynamic>))
        .toList();

    // Load moods
    final moodsString = await rootBundle.loadString('assets/moods.json');
    final List moodsData = jsonDecode(moodsString);
    moods = moodsData
        .map((m) => MoodOption.fromJson(m as Map<String, dynamic>))
        .toList();

    // Load default stickers
    final stickersString = await rootBundle.loadString('assets/stickers.json');
    final List stickersData = jsonDecode(stickersString);
    defaultStickersList = stickersData
        .map((s) => Sticker.fromJson(s as Map<String, dynamic>))
        .toList();

    // Load persisted state
    favorites = storage.getFavorites();
    likes = storage.getLikes();
    votes = storage.getVotes();
    userVotes = storage.getUserVotes();
    battleVotes = storage.getBattleVotes();
    userJokes = storage.getUserJokes();
    userStickers = storage.getUserStickers();
    favoriteStickerIds = storage.getFavoriteStickerIds();
    recentStickerIds = storage.getRecentStickerIds();
    jokeStickerReactions = storage.getJokeStickerReactions();
    moodEntries = storage.getMoodEntries();

    // Seed default user jokes if empty
    if (userJokes.isEmpty) {
      userJokes = [
        UserJoke(
          id: 'uj-1',
          text: 'Qual é o prato favorito do programador? Macarrão com bug-bites!',
          author: 'DevSincero',
          category: 'ti',
          fireVotes: 14,
          trashVotes: 3,
          createdAt: DateTime.now().subtract(const Duration(hours: 3)),
        ),
        UserJoke(
          id: 'uj-2',
          text: 'Por que o café foi ao psicólogo? Porque estava sob muita pressão!',
          author: 'MariaCafé',
          category: 'trocadilhos',
          fireVotes: 21,
          trashVotes: 2,
          createdAt: DateTime.now().subtract(const Duration(hours: 6)),
        ),
        UserJoke(
          id: 'uj-3',
          text: 'O que o Wi-Fi disse pro celular? "Estou sentindo uma conexão entre nós!"',
          author: 'TechGeek',
          category: 'ti',
          fireVotes: 8,
          trashVotes: 11,
          createdAt: DateTime.now().subtract(const Duration(hours: 12)),
        ),
      ];
      await storage.setUserJokes(userJokes);
    }
  }

  List<Joke> getFilteredJokes(String categoryId, bool censorMode) {
    if (categoryId == 'todas') {
      return censorMode ? allJokes.where((j) => !j.mature).toList() : allJokes;
    }
    return allJokes.where((j) => j.category == categoryId).toList();
  }

  bool isFavorite(String jokeId) => favorites.contains(jokeId);

  Future<void> toggleFavorite(String jokeId) async {
    if (favorites.contains(jokeId)) {
      favorites.remove(jokeId);
    } else {
      favorites.add(jokeId);
    }
    await storage.setFavorites(favorites);
  }

  bool isLiked(String jokeId) => likes.contains(jokeId);

  Future<void> toggleLike(String jokeId) async {
    if (likes.contains(jokeId)) {
      likes.remove(jokeId);
    } else {
      likes.add(jokeId);
    }
    await storage.setLikes(likes);
  }

  Map<String, int> getJokeVotes(String jokeId) {
    return votes[jokeId] ?? {'funny': 0, 'cringe': 0};
  }

  String? getUserVote(String jokeId) {
    return userVotes[jokeId];
  }

  Future<void> voteJoke(String jokeId, String voteType) async {
    final currentVote = userVotes[jokeId];
    final currentVotes = votes[jokeId] ?? {'funny': 0, 'cringe': 0};
    int funny = currentVotes['funny'] ?? 0;
    int cringe = currentVotes['cringe'] ?? 0;

    if (currentVote == voteType) {
      if (voteType == 'funny') funny = max(0, funny - 1);
      if (voteType == 'cringe') cringe = max(0, cringe - 1);
      userVotes.remove(jokeId);
    } else {
      if (currentVote == 'funny') funny = max(0, funny - 1);
      if (currentVote == 'cringe') cringe = max(0, cringe - 1);

      if (voteType == 'funny') funny += 1;
      if (voteType == 'cringe') cringe += 1;
      userVotes[jokeId] = voteType;
    }

    votes[jokeId] = {'funny': funny, 'cringe': cringe};
    await storage.setVotes(votes);
    await storage.setUserVotes(userVotes);
  }

  Future<void> voteBattle(String jokeId, String voteType) async {
    final prevVote = battleVotes[jokeId];
    final jokeIndex = userJokes.indexWhere((j) => j.id == jokeId);
    if (jokeIndex == -1) return;

    final joke = userJokes[jokeIndex];

    if (prevVote == voteType) {
      if (voteType == 'fire') joke.fireVotes = max(0, joke.fireVotes - 1);
      if (voteType == 'trash') joke.trashVotes = max(0, joke.trashVotes - 1);
      battleVotes.remove(jokeId);
    } else {
      if (prevVote == 'fire') joke.fireVotes = max(0, joke.fireVotes - 1);
      if (prevVote == 'trash') joke.trashVotes = max(0, joke.trashVotes - 1);

      if (voteType == 'fire') joke.fireVotes += 1;
      if (voteType == 'trash') joke.trashVotes += 1;
      battleVotes[jokeId] = voteType;
    }

    await storage.setBattleVotes(battleVotes);
    await storage.setUserJokes(userJokes);
  }

  Future<void> deleteUserJoke(String jokeId) async {
    userJokes.removeWhere((j) => j.id == jokeId);
    battleVotes.remove(jokeId);
    await storage.setUserJokes(userJokes);
    await storage.setBattleVotes(battleVotes);
  }

  Future<void> addUserJoke(String text, String author, String category) async {
    final newJoke = UserJoke(
      id: 'uj-${DateTime.now().millisecondsSinceEpoch}',
      text: text,
      author: author.trim().isEmpty ? 'Anônimo' : author.trim(),
      category: category,
      createdAt: DateTime.now(),
    );
    userJokes.insert(0, newJoke);
    await storage.setUserJokes(userJokes);
  }

  // AI Joke Generator (intelligent random synthesis based on category)
  Future<String> generateJokeWithAI(String category) async {
    await Future.delayed(const Duration(milliseconds: 600));
    final Map<String, List<String>> aiJokes = {
      'ti': [
        'Existem 10 tipos de pessoas no mundo: as que entendem binário e as que não entendem.',
        'Um programador vai ao mercado. A esposa diz: "Compre um pacote de pão. Se tiver ovos, traga 6". Ele voltou com 6 pacotes de pão.',
        'Qual o café preferido do desenvolvedor? O Java!',
      ],
      'trocadilhos': [
        'Você sabe qual é o prato favorito do Thor? A Thorta de maçã!',
        'O que o zero disse para o oito? "Belo cinto!"',
        'Por que o jacaré tirou o filho da escola? Porque ele réptil de ano!',
      ],
      'anedotas': [
        'O filho chega pro pai e diz: "Pai, é verdade que a ignorância traz felicidade?" O pai responde: "Não sei e não quero saber!"',
        'Por que o peixe não usa computador? Porque ele tem medo da rede!',
        'O que o tomate foi fazer no banco? Foi tirar extrato!',
      ],
      'secas': [
        'Qual é a tecla preferida do astronauta? A barra de espaço.',
        'O que uma impressora falou para a outra? "Essa folha é sua ou é impressão minha?"',
      ],
    };

    final list = aiJokes[category] ?? aiJokes['anedotas']!;
    return list[Random().nextInt(list.length)];
  }

  // Stickers management
  List<Sticker> get allStickers => [...defaultStickersList, ...userStickers];

  bool isStickerFavorite(String stickerId) => favoriteStickerIds.contains(stickerId);

  Future<void> toggleStickerFavorite(String stickerId) async {
    if (favoriteStickerIds.contains(stickerId)) {
      favoriteStickerIds.remove(stickerId);
    } else {
      favoriteStickerIds.add(stickerId);
    }
    await storage.setFavoriteStickerIds(favoriteStickerIds);
  }

  Future<void> addStickerReaction(String jokeId, String stickerIdOrSvg) async {
    final list = jokeStickerReactions[jokeId] ?? [];
    if (!list.contains(stickerIdOrSvg)) {
      list.add(stickerIdOrSvg);
      jokeStickerReactions[jokeId] = list.take(6).toList();
      await storage.setJokeStickerReactions(jokeStickerReactions);
    }
  }

  Future<void> addUserSticker(Sticker sticker) async {
    userStickers.insert(0, sticker);
    await storage.setUserStickers(userStickers);
  }

  Future<void> deleteUserSticker(String stickerId) async {
    userStickers.removeWhere((s) => s.id == stickerId);
    favoriteStickerIds.remove(stickerId);
    await storage.setUserStickers(userStickers);
    await storage.setFavoriteStickerIds(favoriteStickerIds);
  }

  // Mood Entries
  Future<void> addMoodEntry(String moodId, int intensity, String? note) async {
    final entry = MoodEntry(
      id: 'me-${DateTime.now().millisecondsSinceEpoch}',
      moodId: moodId,
      intensity: intensity,
      note: note,
      timestamp: DateTime.now(),
    );
    moodEntries.insert(0, entry);
    await storage.setMoodEntries(moodEntries);
  }
}
