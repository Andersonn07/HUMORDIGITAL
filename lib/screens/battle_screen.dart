import 'package:flutter/material.dart';
import '../services/joke_service.dart';
import '../widgets/joke_creator_card.dart';

class BattleScreen extends StatefulWidget {
  final JokeService jokeService;

  const BattleScreen({super.key, required this.jokeService});

  @override
  State<BattleScreen> createState() => _BattleScreenState();
}

class _BattleScreenState extends State<BattleScreen> {
  @override
  Widget build(BuildContext context) {
    final jokes = widget.jokeService.userJokes;
    final theme = Theme.of(context);

    return Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 720),
        child: ListView(
          padding: const EdgeInsets.fromLTRB(16, 16, 16, 40),
          children: [
            // Top Creator Card (Collapsible + AI Generator!)
            JokeCreatorCard(
              jokeService: widget.jokeService,
              onJokeCreated: () => setState(() {}),
            ),
            const SizedBox(height: 20),

            // Battle Header Banner
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [
                    Colors.orange.shade700.withValues(alpha: 0.12),
                    Colors.red.shade700.withValues(alpha: 0.08),
                  ],
                ),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: Colors.orange.shade300.withValues(alpha: 0.5)),
              ),
              child: const Row(
                children: [
                  Text('⚔️', style: TextStyle(fontSize: 28)),
                  SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Arena da Batalha',
                          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                        ),
                        SizedBox(height: 2),
                        Text(
                          'Vote nas piadas da comunidade: 🔥 Braba ou 🗑️ Lixo!',
                          style: TextStyle(fontSize: 12, color: Colors.grey),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),

            // Jokes List
            if (jokes.isEmpty)
              const Padding(
                padding: EdgeInsets.all(40),
                child: Center(child: Text('Nenhuma piada na batalha ainda. Seja o primeiro a postar!')),
              )
            else
              ...jokes.map((joke) {
                final userVote = widget.jokeService.battleVotes[joke.id];

                return Padding(
                  padding: const EdgeInsets.only(bottom: 12),
                  child: Card(
                    elevation: 2,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20),
                      side: BorderSide(color: theme.dividerColor.withValues(alpha: 0.4)),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(18),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        children: [
                          Row(
                            children: [
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                                decoration: BoxDecoration(
                                  color: theme.colorScheme.primary.withValues(alpha: 0.12),
                                  borderRadius: BorderRadius.circular(10),
                                ),
                                child: Text(
                                  joke.category.toUpperCase(),
                                  style: TextStyle(
                                    fontSize: 11,
                                    fontWeight: FontWeight.bold,
                                    color: theme.colorScheme.primary,
                                  ),
                                ),
                              ),
                              const SizedBox(width: 8),
                              Expanded(
                                child: Text(
                                  'Por ${joke.author}',
                                  textAlign: TextAlign.end,
                                  style: TextStyle(
                                    fontSize: 12,
                                    fontStyle: FontStyle.italic,
                                    color: theme.hintColor,
                                  ),
                                  overflow: TextOverflow.ellipsis,
                                ),
                              ),
                              const SizedBox(width: 6),
                              IconButton(
                                icon: const Icon(Icons.delete_outline_rounded, size: 18, color: Colors.red),
                                tooltip: 'Excluir piada',
                                onPressed: () async {
                                  await widget.jokeService.deleteUserJoke(joke.id);
                                  setState(() {});
                                },
                              ),
                            ],
                          ),
                          const SizedBox(height: 12),
                          Text(
                            joke.text,
                            style: const TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.w500,
                              height: 1.4,
                            ),
                          ),
                          const SizedBox(height: 14),
                          Wrap(
                            alignment: WrapAlignment.end,
                            spacing: 8,
                            runSpacing: 8,
                            children: [
                              // Fire Button
                              ElevatedButton.icon(
                                onPressed: () async {
                                  await widget.jokeService.voteBattle(joke.id, 'fire');
                                  setState(() {});
                                },
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: userVote == 'fire'
                                      ? Colors.orange.shade700
                                      : theme.colorScheme.surfaceContainerHighest,
                                  foregroundColor: userVote == 'fire'
                                      ? Colors.white
                                      : theme.textTheme.bodyMedium?.color,
                                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                                ),
                                icon: const Text('🔥', style: TextStyle(fontSize: 16)),
                                label: Text(
                                  'Braba (${joke.fireVotes})',
                                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                                ),
                              ),
                              // Trash Button
                              ElevatedButton.icon(
                                onPressed: () async {
                                  await widget.jokeService.voteBattle(joke.id, 'trash');
                                  setState(() {});
                                },
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: userVote == 'trash'
                                      ? Colors.blueGrey.shade800
                                      : theme.colorScheme.surfaceContainerHighest,
                                  foregroundColor: userVote == 'trash'
                                      ? Colors.white
                                      : theme.textTheme.bodyMedium?.color,
                                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                                ),
                                icon: const Text('🗑️', style: TextStyle(fontSize: 16)),
                                label: Text(
                                  'Lixo (${joke.trashVotes})',
                                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              }),
          ],
        ),
      ),
    );
  }
}
