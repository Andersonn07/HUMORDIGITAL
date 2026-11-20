import 'package:flutter/material.dart';
import 'models/mood.dart';
import 'services/joke_service.dart';
import 'services/storage_service.dart';
import 'screens/jokes_screen.dart';
import 'screens/battle_screen.dart';
import 'screens/ranking_screen.dart';
import 'screens/favorites_screen.dart';
import 'screens/stickers_screen.dart';
import 'screens/dashboard_screen.dart';
import 'widgets/age_gate_dialog.dart';
import 'widgets/mood_picker_dialog.dart';
import 'widgets/settings_dialog.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Oculta barras feias de aviso visual de overflow
  ErrorWidget.builder = (FlutterErrorDetails details) {
    return const SizedBox.shrink();
  };

  final storage = StorageService();
  await storage.init();

  final jokeService = JokeService(storage);
  await jokeService.loadData();

  runApp(HumorDigitalApp(storage: storage, jokeService: jokeService));
}

class HumorDigitalApp extends StatefulWidget {
  final StorageService storage;
  final JokeService jokeService;

  const HumorDigitalApp({
    super.key,
    required this.storage,
    required this.jokeService,
  });

  @override
  State<HumorDigitalApp> createState() => _HumorDigitalAppState();
}

class _HumorDigitalAppState extends State<HumorDigitalApp> {
  late bool _darkMode;
  late bool _censorMode;
  late String _language;
  MoodOption? _todayMood;

  @override
  void initState() {
    super.initState();
    _darkMode = widget.storage.getDarkMode();
    _censorMode = widget.storage.getCensorMode();
    _language = widget.storage.getLanguage();

    final now = DateTime.now();
    final todayKey = '${now.year}-${now.month}-${now.day}';
    final savedMoodId = widget.storage.getTodayMoodId(todayKey);
    if (savedMoodId != null) {
      final found = widget.jokeService.moods.where((m) => m.id == savedMoodId);
      if (found.isNotEmpty) {
        _todayMood = found.first;
      }
    }
  }

  void _toggleDarkMode() {
    setState(() => _darkMode = !_darkMode);
    widget.storage.setDarkMode(_darkMode);
  }

  void _setCensorMode(bool val) {
    setState(() => _censorMode = val);
    widget.storage.setCensorMode(val);
  }

  void _setLanguage(String lang) {
    setState(() => _language = lang);
    widget.storage.setLanguage(lang);
  }

  void _setTodayMood(MoodOption mood) {
    final now = DateTime.now();
    final todayKey = '${now.year}-${now.month}-${now.day}';
    setState(() => _todayMood = mood);
    widget.storage.setTodayMoodId(todayKey, mood.id);
  }

  @override
  Widget build(BuildContext context) {
    const primaryColor = Color(0xFFFF5722);

    return MaterialApp(
      title: 'RIBO - App de Humor Digital',
      debugShowCheckedModeBanner: false,
      themeMode: _darkMode ? ThemeMode.dark : ThemeMode.light,
      theme: ThemeData(
        useMaterial3: true,
        brightness: Brightness.light,
        colorScheme: ColorScheme.fromSeed(
          seedColor: primaryColor,
          brightness: Brightness.light,
        ),
        scaffoldBackgroundColor: const Color(0xFFF9FAFB),
        cardTheme: const CardThemeData(
          color: Colors.white,
          elevation: 2,
        ),
      ),
      darkTheme: ThemeData(
        useMaterial3: true,
        brightness: Brightness.dark,
        colorScheme: ColorScheme.fromSeed(
          seedColor: primaryColor,
          brightness: Brightness.dark,
        ),
        scaffoldBackgroundColor: const Color(0xFF111827),
        cardTheme: const CardThemeData(
          color: Color(0xFF1F2937),
          elevation: 2,
        ),
      ),
      home: MainNavigationScreen(
        storage: widget.storage,
        jokeService: widget.jokeService,
        darkMode: _darkMode,
        censorMode: _censorMode,
        language: _language,
        todayMood: _todayMood,
        onToggleDarkMode: _toggleDarkMode,
        onSetCensorMode: _setCensorMode,
        onSetLanguage: _setLanguage,
        onSetTodayMood: _setTodayMood,
      ),
    );
  }
}

class MainNavigationScreen extends StatefulWidget {
  final StorageService storage;
  final JokeService jokeService;
  final bool darkMode;
  final bool censorMode;
  final String language;
  final MoodOption? todayMood;
  final VoidCallback onToggleDarkMode;
  final Function(bool) onSetCensorMode;
  final Function(String) onSetLanguage;
  final Function(MoodOption) onSetTodayMood;

  const MainNavigationScreen({
    super.key,
    required this.storage,
    required this.jokeService,
    required this.darkMode,
    required this.censorMode,
    required this.language,
    required this.todayMood,
    required this.onToggleDarkMode,
    required this.onSetCensorMode,
    required this.onSetLanguage,
    required this.onSetTodayMood,
  });

  @override
  State<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends State<MainNavigationScreen> {
  int _currentTabIndex = 0;
  String _selectedCategory = 'todas';

  void _handleCensorToggle() async {
    if (widget.censorMode) {
      final confirmed = await showDialog<bool>(
        context: context,
        builder: (_) => const AgeGateDialog(),
      );
      if (confirmed == true) {
        widget.onSetCensorMode(false);
      }
    } else {
      widget.onSetCensorMode(true);
      if (_selectedCategory == 'censurado') {
        setState(() => _selectedCategory = 'todas');
      }
    }
  }

  void _openMoodDialog() {
    showDialog(
      context: context,
      builder: (_) => MoodPickerDialog(
        moods: widget.jokeService.moods,
        currentMoodId: widget.todayMood?.id,
        onSelectMood: widget.onSetTodayMood,
      ),
    );
  }

  void _openSettingsDialog() {
    showDialog(
      context: context,
      builder: (_) => SettingsDialog(
        storage: widget.storage,
        jokeService: widget.jokeService,
        darkMode: widget.darkMode,
        censorMode: widget.censorMode,
        language: widget.language,
        onToggleDarkMode: widget.onToggleDarkMode,
        onSetCensorMode: widget.onSetCensorMode,
        onSetLanguage: widget.onSetLanguage,
        onDataChanged: () => setState(() {}),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final favCount = widget.jokeService.favorites.length;
    final totalVotesCount = widget.jokeService.votes.values
        .fold(0, (sum, v) => sum + (v['funny'] ?? 0) + (v['cringe'] ?? 0));
    final battleCount = widget.jokeService.userJokes.length;
    final stickersCount = widget.jokeService.allStickers.length;

    final tabs = [
      JokesScreen(
        jokeService: widget.jokeService,
        language: widget.language,
        censorMode: widget.censorMode,
        initialCategory: _selectedCategory,
        onCategoryChange: (cat) => setState(() => _selectedCategory = cat),
        onUnlockMature: _handleCensorToggle,
      ),
      FavoritesScreen(jokeService: widget.jokeService, language: widget.language),
      RankingScreen(jokeService: widget.jokeService, language: widget.language),
      BattleScreen(jokeService: widget.jokeService),
      StickersScreen(
        jokeService: widget.jokeService,
        currentJokeId: widget.jokeService.allJokes.isNotEmpty ? widget.jokeService.allJokes.first.id : null,
      ),
      DashboardScreen(
        jokeService: widget.jokeService,
        todayMood: widget.todayMood,
        onSelectMood: widget.onSetTodayMood,
      ),
    ];

    return Scaffold(
      appBar: AppBar(
        titleSpacing: 16,
        title: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Image.asset(
              widget.darkMode ? 'assets/ribo-logo-dark.png' : 'assets/ribo-logo-light.png',
              height: 32,
              errorBuilder: (context, error, stackTrace) => const Text('🎭', style: TextStyle(fontSize: 22)),
            ),
            const SizedBox(width: 8),
            const Text(
              'RIBO',
              style: TextStyle(fontWeight: FontWeight.w800, fontSize: 19, letterSpacing: 0.5),
            ),
          ],
        ),
        actions: [
          // Mood Selector Button (compact emoji)
          IconButton(
            tooltip: widget.todayMood?.label ?? 'Humor de Hoje',
            icon: Text(
              widget.todayMood?.emoji ?? '😄',
              style: const TextStyle(fontSize: 20),
            ),
            onPressed: _openMoodDialog,
          ),

          // Dark Mode Toggle
          IconButton(
            tooltip: widget.darkMode ? 'Tema Claro' : 'Tema Escuro',
            icon: Icon(
              widget.darkMode ? Icons.light_mode_rounded : Icons.dark_mode_rounded,
              size: 22,
            ),
            onPressed: widget.onToggleDarkMode,
          ),

          // Settings Button (contains Language, +18 Filter, Groq API, Backup)
          IconButton(
            tooltip: 'Configurações',
            icon: const Icon(Icons.settings_rounded, size: 22, color: Color(0xFFFF5722)),
            onPressed: _openSettingsDialog,
          ),
          const SizedBox(width: 6),
        ],
      ),
      body: IndexedStack(
        index: _currentTabIndex,
        children: tabs,
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentTabIndex,
        onDestinationSelected: (idx) => setState(() => _currentTabIndex = idx),
        destinations: [
          const NavigationDestination(
            icon: Icon(Icons.sentiment_very_satisfied_rounded),
            selectedIcon: Icon(Icons.sentiment_very_satisfied_rounded, color: Color(0xFFFF5722)),
            label: 'Piadas',
          ),
          NavigationDestination(
            icon: Badge(
              isLabelVisible: favCount > 0,
              label: Text('$favCount'),
              child: const Icon(Icons.bookmark_border_rounded),
            ),
            selectedIcon: Badge(
              isLabelVisible: favCount > 0,
              label: Text('$favCount'),
              child: const Icon(Icons.bookmark_rounded, color: Color(0xFFFF5722)),
            ),
            label: 'Favoritos',
          ),
          NavigationDestination(
            icon: Badge(
              isLabelVisible: totalVotesCount > 0,
              label: Text('$totalVotesCount'),
              child: const Icon(Icons.leaderboard_outlined),
            ),
            selectedIcon: Badge(
              isLabelVisible: totalVotesCount > 0,
              label: Text('$totalVotesCount'),
              child: const Icon(Icons.leaderboard_rounded, color: Color(0xFFFF5722)),
            ),
            label: 'Ranking',
          ),
          NavigationDestination(
            icon: Badge(
              isLabelVisible: battleCount > 0,
              label: Text('$battleCount'),
              child: const Icon(Icons.flash_on_outlined),
            ),
            selectedIcon: Badge(
              isLabelVisible: battleCount > 0,
              label: Text('$battleCount'),
              child: const Icon(Icons.flash_on_rounded, color: Color(0xFFFF5722)),
            ),
            label: 'Batalha',
          ),
          NavigationDestination(
            icon: Badge(
              isLabelVisible: stickersCount > 0,
              label: Text('$stickersCount'),
              child: const Icon(Icons.image_outlined),
            ),
            selectedIcon: Badge(
              isLabelVisible: stickersCount > 0,
              label: Text('$stickersCount'),
              child: const Icon(Icons.image_rounded, color: Color(0xFFFF5722)),
            ),
            label: 'Stickers',
          ),
          const NavigationDestination(
            icon: Icon(Icons.bar_chart_rounded),
            selectedIcon: Icon(Icons.bar_chart_rounded, color: Color(0xFFFF5722)),
            label: 'Dashboard',
          ),
        ],
      ),
    );
  }
}
