import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../services/joke_service.dart';

class FavoritesScreen extends StatefulWidget {
  final JokeService jokeService;
  final String language;

  const FavoritesScreen({
    super.key,
    required this.jokeService,
    required this.language,
  });

  @override
  State<FavoritesScreen> createState() => _FavoritesScreenState();
}

class _FavoritesScreenState extends State<FavoritesScreen> {
  String _searchQuery = '';

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final favIds = widget.jokeService.favorites;
    final favJokes = widget.jokeService.allJokes
        .where((j) => favIds.contains(j.id))
        .where((j) {
      if (_searchQuery.isEmpty) return true;
      final text = j.content.getText(widget.language).toLowerCase();
      return text.contains(_searchQuery.toLowerCase());
    }).toList();

    return Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 680),
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(16),
              child: TextField(
                decoration: InputDecoration(
                  prefixIcon: const Icon(Icons.search_rounded),
                  hintText: 'Pesquisar favoritos...',
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(16)),
                  contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                ),
                onChanged: (val) => setState(() => _searchQuery = val),
              ),
            ),
            Expanded(
              child: favJokes.isEmpty
                  ? Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(Icons.bookmark_border_rounded, size: 64, color: theme.hintColor.withOpacity(0.4)),
                          const SizedBox(height: 12),
                          Text(
                            favIds.isEmpty
                                ? 'Nenhuma piada favoritada ainda.'
                                : 'Nenhuma piada encontrada na busca.',
                            style: TextStyle(color: theme.hintColor, fontSize: 16),
                          ),
                          const SizedBox(height: 6),
                          const Text(
                            'Toque no ícone de marcador para salvar piadas aqui!',
                            style: TextStyle(color: Colors.grey, fontSize: 13),
                          ),
                        ],
                      ),
                    )
                  : ListView.separated(
                      padding: const EdgeInsets.fromLTRB(16, 0, 16, 24),
                      itemCount: favJokes.length,
                      separatorBuilder: (context, index) => const SizedBox(height: 12),
                      itemBuilder: (context, index) {
                        final joke = favJokes[index];
                        final text = joke.content.getText(widget.language);

                        return Card(
                          elevation: 2,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(18),
                            side: BorderSide(color: theme.dividerColor.withOpacity(0.3)),
                          ),
                          child: Padding(
                            padding: const EdgeInsets.all(16),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.stretch,
                              children: [
                                Row(
                                  children: [
                                    Container(
                                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                                      decoration: BoxDecoration(
                                        color: theme.colorScheme.primary.withOpacity(0.1),
                                        borderRadius: BorderRadius.circular(8),
                                      ),
                                      child: Text(
                                        joke.category.toUpperCase(),
                                        style: TextStyle(
                                          fontSize: 10,
                                          fontWeight: FontWeight.bold,
                                          color: theme.colorScheme.primary,
                                        ),
                                      ),
                                    ),
                                    const Spacer(),
                                    IconButton(
                                      icon: const Icon(Icons.copy_rounded, size: 18),
                                      tooltip: 'Copiar',
                                      onPressed: () {
                                        Clipboard.setData(ClipboardData(text: text));
                                        ScaffoldMessenger.of(context).showSnackBar(
                                          const SnackBar(
                                            content: Text('Piada copiada!'),
                                            behavior: SnackBarBehavior.floating,
                                            duration: Duration(seconds: 1),
                                          ),
                                        );
                                      },
                                    ),
                                    IconButton(
                                      icon: const Icon(Icons.bookmark_remove_rounded, color: Colors.redAccent, size: 20),
                                      tooltip: 'Remover dos favoritos',
                                      onPressed: () async {
                                        await widget.jokeService.toggleFavorite(joke.id);
                                        setState(() {});
                                      },
                                    ),
                                  ],
                                ),
                                const SizedBox(height: 8),
                                Text(
                                  text,
                                  style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w500, height: 1.35),
                                ),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
            ),
          ],
        ),
      ),
    );
  }
}
