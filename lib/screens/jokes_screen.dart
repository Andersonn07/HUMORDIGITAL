import 'dart:math';
import 'package:flutter/material.dart';
import '../models/joke.dart';
import '../models/sticker.dart';
import '../services/joke_service.dart';
import '../widgets/category_grid.dart';
import '../widgets/joke_card.dart';

class JokesScreen extends StatefulWidget {
  final JokeService jokeService;
  final String language;
  final bool censorMode;
  final String initialCategory;
  final Function(String) onCategoryChange;
  final VoidCallback onUnlockMature;

  const JokesScreen({
    super.key,
    required this.jokeService,
    required this.language,
    required this.censorMode,
    required this.initialCategory,
    required this.onCategoryChange,
    required this.onUnlockMature,
  });

  @override
  State<JokesScreen> createState() => _JokesScreenState();
}

class _JokesScreenState extends State<JokesScreen> {
  int _currentIndex = 0;

  List<Joke> get _currentJokes =>
      widget.jokeService.getFilteredJokes(widget.initialCategory, widget.censorMode);

  void _nextJoke() {
    final list = _currentJokes;
    if (list.isEmpty) return;
    setState(() {
      _currentIndex = (_currentIndex + 1) % list.length;
    });
  }

  void _prevJoke() {
    final list = _currentJokes;
    if (list.isEmpty) return;
    setState(() {
      _currentIndex = (_currentIndex - 1 + list.length) % list.length;
    });
  }

  void _randomJoke() {
    final list = _currentJokes;
    if (list.isEmpty) return;
    setState(() {
      _currentIndex = Random().nextInt(list.length);
    });
  }

  @override
  Widget build(BuildContext context) {
    final jokes = _currentJokes;
    if (_currentIndex >= jokes.length) {
      _currentIndex = 0;
    }

    final currentJoke = jokes.isNotEmpty ? jokes[_currentIndex] : null;

    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(vertical: 16),
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 720),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Category Grid
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: CategoryGrid(
                  categories: widget.jokeService.categories,
                  selectedCategory: widget.initialCategory,
                  censorMode: widget.censorMode,
                  onCategoryChange: (cat) {
                    setState(() => _currentIndex = 0);
                    widget.onCategoryChange(cat);
                  },
                ),
              ),
              const SizedBox(height: 20),

              // Joke Card
              if (currentJoke != null)
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  child: JokeCard(
                    joke: currentJoke,
                    language: widget.language,
                    currentIndex: _currentIndex,
                    totalJokes: jokes.length,
                    isLiked: widget.jokeService.isLiked(currentJoke.id),
                    isFavorite: widget.jokeService.isFavorite(currentJoke.id),
                    votes: widget.jokeService.getJokeVotes(currentJoke.id),
                    userVote: widget.jokeService.getUserVote(currentJoke.id),
                    censorMode: widget.censorMode,
                    stickerReactions: widget.jokeService.jokeStickerReactions[currentJoke.id] ?? [],
                    availableStickers: widget.jokeService.allStickers,
                    onLike: () async {
                      await widget.jokeService.toggleLike(currentJoke.id);
                      setState(() {});
                    },
                    onFavorite: () async {
                      await widget.jokeService.toggleFavorite(currentJoke.id);
                      setState(() {});
                    },
                    onVote: (type) async {
                      await widget.jokeService.voteJoke(currentJoke.id, type);
                      setState(() {});
                    },
                    onUnlockMature: widget.onUnlockMature,
                    onAddSticker: (Sticker stk) async {
                      await widget.jokeService.addStickerReaction(currentJoke.id, stk.rawSvg);
                      setState(() {});
                    },
                  ),
                )
              else
                const Padding(
                  padding: EdgeInsets.all(40),
                  child: Center(
                    child: Text('Nenhuma piada encontrada nesta categoria.'),
                  ),
                ),

              const SizedBox(height: 24),

              // Navigation Buttons (Anterior / Aleatória / Próxima)
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: Row(
                  children: [
                    Expanded(
                      flex: 4,
                      child: OutlinedButton.icon(
                        onPressed: jokes.isNotEmpty ? _prevJoke : null,
                        style: OutlinedButton.styleFrom(
                          padding: const EdgeInsets.symmetric(vertical: 14),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(16),
                          ),
                        ),
                        icon: const Icon(Icons.arrow_back_rounded),
                        label: const Text(
                          'Anterior',
                          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    IconButton.filledTonal(
                      tooltip: 'Piada Aleatória',
                      onPressed: jokes.isNotEmpty ? _randomJoke : null,
                      icon: const Icon(Icons.shuffle_rounded),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      flex: 4,
                      child: ElevatedButton.icon(
                        onPressed: jokes.isNotEmpty ? _nextJoke : null,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFFFF5722),
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(vertical: 14),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(16),
                          ),
                          elevation: 3,
                        ),
                        icon: const Text(
                          'Próxima',
                          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                        ),
                        label: const Icon(Icons.arrow_forward_rounded),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
