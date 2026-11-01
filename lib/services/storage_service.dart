import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/mood.dart';
import '../models/sticker.dart';

class StorageService {
  static const _keyFavorites = 'favoriteJokes';
  static const _keyLikes = 'likedJokes';
  static const _keyVotes = 'jokeVotes';
  static const _keyUserVotes = 'jokeUserVotes';
  static const _keyBattleVotes = 'battleVotes';
  static const _keyUserJokes = 'userJokes';
  static const _keyDarkMode = 'darkMode';
  static const _keyCensorMode = 'censorMode';
  static const _keyLanguage = 'appLanguage';
  static const _keyMoodDayKey = 'moodDayKey';
  static const _keyMoodTodayId = 'moodTodayId';
  static const _keyUserStickers = 'userStickers';
  static const _keyFavStickers = 'favoriteStickerIds';
  static const _keyRecentStickers = 'recentStickerIds';
  static const _keyJokeStickerReactions = 'jokeStickerReactions';
  static const _keyMoodEntries = 'moodEntries';

  late SharedPreferences _prefs;

  Future<void> init() async {
    _prefs = await SharedPreferences.getInstance();
  }

  // Favorites
  List<String> getFavorites() {
    final str = _prefs.getString(_keyFavorites);
    if (str == null) return [];
    try {
      final List list = jsonDecode(str);
      return list.map((e) => e.toString()).toList();
    } catch (_) {
      return [];
    }
  }

  Future<void> setFavorites(List<String> list) async {
    await _prefs.setString(_keyFavorites, jsonEncode(list));
  }

  // Likes
  Set<String> getLikes() {
    final str = _prefs.getString(_keyLikes);
    if (str == null) return {};
    try {
      final List list = jsonDecode(str);
      return list.map((e) => e.toString()).toSet();
    } catch (_) {
      return {};
    }
  }

  Future<void> setLikes(Set<String> set) async {
    await _prefs.setString(_keyLikes, jsonEncode(set.toList()));
  }

  // Votes
  Map<String, Map<String, int>> getVotes() {
    final str = _prefs.getString(_keyVotes);
    if (str == null) return {};
    try {
      final Map<String, dynamic> decoded = jsonDecode(str);
      return decoded.map((key, value) {
        final valMap = value as Map<String, dynamic>;
        return MapEntry(key, {
          'funny': (valMap['funny'] as num?)?.toInt() ?? 0,
          'cringe': (valMap['cringe'] as num?)?.toInt() ?? 0,
        });
      });
    } catch (_) {
      return {};
    }
  }

  Future<void> setVotes(Map<String, Map<String, int>> votes) async {
    await _prefs.setString(_keyVotes, jsonEncode(votes));
  }

  // User Votes
  Map<String, String> getUserVotes() {
    final str = _prefs.getString(_keyUserVotes);
    if (str == null) return {};
    try {
      final Map<String, dynamic> decoded = jsonDecode(str);
      return decoded.map((key, value) => MapEntry(key, value.toString()));
    } catch (_) {
      return {};
    }
  }

  Future<void> setUserVotes(Map<String, String> userVotes) async {
    await _prefs.setString(_keyUserVotes, jsonEncode(userVotes));
  }

  // Battle Votes
  Map<String, String> getBattleVotes() {
    final str = _prefs.getString(_keyBattleVotes);
    if (str == null) return {};
    try {
      final Map<String, dynamic> decoded = jsonDecode(str);
      return decoded.map((key, value) => MapEntry(key, value.toString()));
    } catch (_) {
      return {};
    }
  }

  Future<void> setBattleVotes(Map<String, String> battleVotes) async {
    await _prefs.setString(_keyBattleVotes, jsonEncode(battleVotes));
  }

  // User Jokes
  List<UserJoke> getUserJokes() {
    final str = _prefs.getString(_keyUserJokes);
    if (str == null) return [];
    try {
      final List list = jsonDecode(str);
      return list.map((e) => UserJoke.fromJson(e as Map<String, dynamic>)).toList();
    } catch (_) {
      return [];
    }
  }

  Future<void> setUserJokes(List<UserJoke> jokes) async {
    final list = jokes.map((j) => j.toJson()).toList();
    await _prefs.setString(_keyUserJokes, jsonEncode(list));
  }

  // User Stickers
  List<Sticker> getUserStickers() {
    final str = _prefs.getString(_keyUserStickers);
    if (str == null) return [];
    try {
      final List list = jsonDecode(str);
      return list.map((e) => Sticker.fromJson(e as Map<String, dynamic>)).toList();
    } catch (_) {
      return [];
    }
  }

  Future<void> setUserStickers(List<Sticker> stickers) async {
    final list = stickers.map((s) => s.toJson()).toList();
    await _prefs.setString(_keyUserStickers, jsonEncode(list));
  }

  // Favorite Sticker IDs
  List<String> getFavoriteStickerIds() {
    final str = _prefs.getString(_keyFavStickers);
    if (str == null) return ['sticker-flork-olhando', 'sticker-capivara-zen'];
    try {
      final List list = jsonDecode(str);
      return list.map((e) => e.toString()).toList();
    } catch (_) {
      return [];
    }
  }

  Future<void> setFavoriteStickerIds(List<String> list) async {
    await _prefs.setString(_keyFavStickers, jsonEncode(list));
  }

  // Recent Sticker IDs
  List<String> getRecentStickerIds() {
    final str = _prefs.getString(_keyRecentStickers);
    if (str == null) return [];
    try {
      final List list = jsonDecode(str);
      return list.map((e) => e.toString()).toList();
    } catch (_) {
      return [];
    }
  }

  Future<void> setRecentStickerIds(List<String> list) async {
    await _prefs.setString(_keyRecentStickers, jsonEncode(list));
  }

  // Joke Sticker Reactions
  Map<String, List<String>> getJokeStickerReactions() {
    final str = _prefs.getString(_keyJokeStickerReactions);
    if (str == null) return {};
    try {
      final Map<String, dynamic> decoded = jsonDecode(str);
      return decoded.map((key, value) {
        final List list = value as List;
        return MapEntry(key, list.map((e) => e.toString()).toList());
      });
    } catch (_) {
      return {};
    }
  }

  Future<void> setJokeStickerReactions(Map<String, List<String>> reactions) async {
    await _prefs.setString(_keyJokeStickerReactions, jsonEncode(reactions));
  }

  // Mood Entries
  List<MoodEntry> getMoodEntries() {
    final str = _prefs.getString(_keyMoodEntries);
    if (str == null) {
      // Default sample historical entries for visualization
      return [
        MoodEntry(id: 'm1', moodId: 'feliz', intensity: 8, timestamp: DateTime.now().subtract(const Duration(days: 4))),
        MoodEntry(id: 'm2', moodId: 'animado', intensity: 9, timestamp: DateTime.now().subtract(const Duration(days: 3))),
        MoodEntry(id: 'm3', moodId: 'relaxado', intensity: 7, timestamp: DateTime.now().subtract(const Duration(days: 2))),
        MoodEntry(id: 'm4', moodId: 'feliz', intensity: 8, timestamp: DateTime.now().subtract(const Duration(days: 1))),
      ];
    }
    try {
      final List list = jsonDecode(str);
      return list.map((e) => MoodEntry.fromJson(e as Map<String, dynamic>)).toList();
    } catch (_) {
      return [];
    }
  }

  Future<void> setMoodEntries(List<MoodEntry> entries) async {
    final list = entries.map((e) => e.toJson()).toList();
    await _prefs.setString(_keyMoodEntries, jsonEncode(list));
  }

  // Preferences
  bool getDarkMode() => _prefs.getBool(_keyDarkMode) ?? false;
  Future<void> setDarkMode(bool val) => _prefs.setBool(_keyDarkMode, val);

  bool getCensorMode() => _prefs.getBool(_keyCensorMode) ?? true;
  Future<void> setCensorMode(bool val) => _prefs.setBool(_keyCensorMode, val);

  String getLanguage() => _prefs.getString(_keyLanguage) ?? 'pt';
  Future<void> setLanguage(String lang) => _prefs.setString(_keyLanguage, lang);

  String? getTodayMoodId(String todayKey) {
    final savedKey = _prefs.getString(_keyMoodDayKey);
    if (savedKey == todayKey) {
      return _prefs.getString(_keyMoodTodayId);
    }
    return null;
  }

  Future<void> setTodayMoodId(String todayKey, String moodId) async {
    await _prefs.setString(_keyMoodDayKey, todayKey);
    await _prefs.setString(_keyMoodTodayId, moodId);
  }

  // Backup Export
  String exportBackupData() {
    final map = {
      'app': 'RIBO',
      'version': '1.0.0',
      'exportedAt': DateTime.now().toIso8601String(),
      'favorites': getFavorites(),
      'likes': getLikes().toList(),
      'votes': getVotes(),
      'userVotes': getUserVotes(),
      'battleVotes': getBattleVotes(),
      'userJokes': getUserJokes().map((e) => e.toJson()).toList(),
      'userStickers': getUserStickers().map((e) => e.toJson()).toList(),
      'favoriteStickerIds': getFavoriteStickerIds(),
      'jokeStickerReactions': getJokeStickerReactions(),
      'moodEntries': getMoodEntries().map((e) => e.toJson()).toList(),
    };
    return jsonEncode(map);
  }

  // Backup Import
  bool importBackupData(String jsonString) {
    try {
      final Map<String, dynamic> data = jsonDecode(jsonString);
      if (data['favorites'] is List) {
        setFavorites((data['favorites'] as List).map((e) => e.toString()).toList());
      }
      if (data['likes'] is List) {
        setLikes((data['likes'] as List).map((e) => e.toString()).toSet());
      }
      if (data['userJokes'] is List) {
        setUserJokes((data['userJokes'] as List).map((e) => UserJoke.fromJson(e)).toList());
      }
      if (data['userStickers'] is List) {
        setUserStickers((data['userStickers'] as List).map((e) => Sticker.fromJson(e)).toList());
      }
      return true;
    } catch (_) {
      return false;
    }
  }

  // Clear data
  Future<void> clearData(String scope) async {
    if (scope == 'all') {
      await _prefs.remove(_keyFavorites);
      await _prefs.remove(_keyLikes);
      await _prefs.remove(_keyVotes);
      await _prefs.remove(_keyUserVotes);
      await _prefs.remove(_keyBattleVotes);
      await _prefs.remove(_keyUserJokes);
      await _prefs.remove(_keyUserStickers);
      await _prefs.remove(_keyFavStickers);
      await _prefs.remove(_keyRecentStickers);
      await _prefs.remove(_keyJokeStickerReactions);
      await _prefs.remove(_keyMoodEntries);
      await _prefs.remove(_keyMoodDayKey);
      await _prefs.remove(_keyMoodTodayId);
    } else if (scope == 'favorites') {
      await _prefs.remove(_keyFavorites);
      await _prefs.remove(_keyLikes);
    } else if (scope == 'votes') {
      await _prefs.remove(_keyVotes);
      await _prefs.remove(_keyUserVotes);
      await _prefs.remove(_keyBattleVotes);
    } else if (scope == 'stickers') {
      await _prefs.remove(_keyUserStickers);
      await _prefs.remove(_keyFavStickers);
      await _prefs.remove(_keyRecentStickers);
      await _prefs.remove(_keyJokeStickerReactions);
    }
  }
}
