import 'package:flutter/material.dart';
import '../models/joke.dart';
import '../services/joke_service.dart';

class RankingScreen extends StatefulWidget {
  final JokeService jokeService;
  final String language;

  const RankingScreen({
    super.key,
    required this.jokeService,
    required this.language,
  });

  @override
  State<RankingScreen> createState() => _RankingScreenState();
}

class _RankingScreenState extends State<RankingScreen> {
  bool _sortByCringe = true;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final allJokes = widget.jokeService.allJokes;

    // Filter jokes that have at least 1 vote or sort all jokes
    final List<MapEntry<Joke, Map<String, int>>> ranked = allJokes.map((joke) {
      return MapEntry(joke, widget.jokeService.getJokeVotes(joke.id));
    }).toList();

    ranked.sort((a, b) {
      final aVotes = a.value;
      final bVotes = b.value;
      if (_sortByCringe) {
        final aCringe = aVotes['cringe'] ?? 0;
        final bCringe = bVotes['cringe'] ?? 0;
        if (bCringe != aCringe) return bCringe.compareTo(aCringe);
        return (bVotes['funny'] ?? 0).compareTo(aVotes['funny'] ?? 0);
      } else {
        final aFunny = aVotes['funny'] ?? 0;
        final bFunny = bVotes['funny'] ?? 0;
        if (bFunny != aFunny) return bFunny.compareTo(aFunny);
        return (bVotes['cringe'] ?? 0).compareTo(aVotes['cringe'] ?? 0);
      }
    });

    final topJokes = ranked.take(20).toList();

    return Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 680),
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(16),
              child: Row(
                children: [
                  const Text('🏆', style: TextStyle(fontSize: 26)),
                  const SizedBox(width: 10),
                  const Text(
                    'Ranking do Humor',
                    style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
                  ),
                  const Spacer(),
                  SegmentedButton<bool>(
                    segments: const [
                      ButtonSegment(
                        value: true,
                        label: Text('😬 Mais Cringe', style: TextStyle(fontSize: 12)),
                      ),
                      ButtonSegment(
                        value: false,
                        label: Text('😂 Melhores', style: TextStyle(fontSize: 12)),
                      ),
                    ],
                    selected: {_sortByCringe},
                    onSelectionChanged: (set) {
                      setState(() => _sortByCringe = set.first);
                    },
                  ),
                ],
              ),
            ),
            Expanded(
              child: ListView.separated(
                padding: const EdgeInsets.fromLTRB(16, 0, 16, 24),
                itemCount: topJokes.length,
                separatorBuilder: (context, index) => const SizedBox(height: 10),
                itemBuilder: (context, index) {
                  final item = topJokes[index];
                  final joke = item.key;
                  final votes = item.value;
                  final funny = votes['funny'] ?? 0;
                  final cringe = votes['cringe'] ?? 0;

                  String rankBadge;
                  Color? badgeColor;
                  if (index == 0) {
                    rankBadge = '🥇 1º';
                    badgeColor = Colors.amber;
                  } else if (index == 1) {
                    rankBadge = '🥈 2º';
                    badgeColor = Colors.blueGrey.shade300;
                  } else if (index == 2) {
                    rankBadge = '🥉 3º';
                    badgeColor = Colors.brown.shade300;
                  } else {
                    rankBadge = '#${index + 1}';
                    badgeColor = null;
                  }

                  return Card(
                    elevation: index < 3 ? 3 : 1,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                      side: BorderSide(
                        color: badgeColor ?? theme.dividerColor.withOpacity(0.3),
                        width: index < 3 ? 1.5 : 1,
                      ),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(14),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                            decoration: BoxDecoration(
                              color: (badgeColor ?? theme.colorScheme.surfaceContainerHighest).withValues(alpha: 0.2),
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: Text(
                              rankBadge,
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 13,
                                color: badgeColor ?? theme.textTheme.bodyMedium?.color,
                              ),
                            ),
                          ),
                          const SizedBox(width: 12),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  joke.content.getText(widget.language),
                                  style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w500),
                                  maxLines: 3,
                                  overflow: TextOverflow.ellipsis,
                                ),
                                const SizedBox(height: 8),
                                Row(
                                  children: [
                                    Text('😂 $funny', style: TextStyle(fontSize: 12, color: Colors.orange.shade700, fontWeight: FontWeight.bold)),
                                    const SizedBox(width: 12),
                                    Text('😬 $cringe', style: TextStyle(fontSize: 12, color: Colors.deepPurple.shade400, fontWeight: FontWeight.bold)),
                                    const Spacer(),
                                    Text(joke.category.toUpperCase(), style: TextStyle(fontSize: 10, color: theme.hintColor, fontWeight: FontWeight.bold)),
                                  ],
                                ),
                              ],
                            ),
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
