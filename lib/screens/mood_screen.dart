import 'package:flutter/material.dart';
import '../models/mood.dart';
import '../services/joke_service.dart';
import '../widgets/mood_picker_dialog.dart';

class MoodScreen extends StatefulWidget {
  final JokeService jokeService;
  final MoodOption? todayMood;
  final Function(MoodOption) onSelectMood;
  final Function(String category) onApplySuggestedCategory;

  const MoodScreen({
    super.key,
    required this.jokeService,
    required this.todayMood,
    required this.onSelectMood,
    required this.onApplySuggestedCategory,
  });

  @override
  State<MoodScreen> createState() => _MoodScreenState();
}

class _MoodScreenState extends State<MoodScreen> {
  void _openMoodPicker() {
    showDialog(
      context: context,
      builder: (_) => MoodPickerDialog(
        moods: widget.jokeService.moods,
        currentMoodId: widget.todayMood?.id,
        onSelectMood: widget.onSelectMood,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final mood = widget.todayMood;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 680),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Mood Header Card
              Container(
                padding: const EdgeInsets.all(22),
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [
                      const Color(0xFFFF5722).withOpacity(0.15),
                      Colors.orange.withOpacity(0.08),
                    ],
                  ),
                  borderRadius: BorderRadius.circular(24),
                  border: Border.all(color: const Color(0xFFFF5722).withOpacity(0.3)),
                ),
                child: Column(
                  children: [
                    Text(
                      mood?.emoji ?? '🤔',
                      style: const TextStyle(fontSize: 54),
                    ),
                    const SizedBox(height: 10),
                    Text(
                      mood != null ? 'Hoje você está: ${mood.label}' : 'Como está o seu humor hoje?',
                      style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 6),
                    Text(
                      mood?.description ?? 'Registre o seu humor para receber recomendações de piadas feitas para o seu dia.',
                      textAlign: TextAlign.center,
                      style: TextStyle(fontSize: 14, color: theme.hintColor),
                    ),
                    const SizedBox(height: 16),
                    ElevatedButton.icon(
                      onPressed: _openMoodPicker,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFFFF5722),
                        foregroundColor: Colors.white,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                      ),
                      icon: const Icon(Icons.mood_rounded),
                      label: Text(
                        mood != null ? 'Mudar Humor' : 'Definir Humor do Dia',
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                    ),
                  ],
                ),
              ),

              if (mood != null) ...[
                const SizedBox(height: 20),
                // Recommendation Card
                Card(
                  elevation: 3,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                    side: BorderSide(color: Colors.orange.shade300),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(18),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        Row(
                          children: [
                            const Text('💡', style: TextStyle(fontSize: 22)),
                            const SizedBox(width: 8),
                            const Text(
                              'Recomendação do Dia',
                              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                            ),
                            const Spacer(),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                              decoration: BoxDecoration(
                                color: Colors.orange.shade100,
                                borderRadius: BorderRadius.circular(10),
                              ),
                              child: Text(
                                mood.suggestedCategory.toUpperCase(),
                                style: TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 11,
                                  color: Colors.orange.shade900,
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        Text(
                          mood.suggestion,
                          style: const TextStyle(fontSize: 15, height: 1.35),
                        ),
                        const SizedBox(height: 16),
                        ElevatedButton.icon(
                          onPressed: () => widget.onApplySuggestedCategory(mood.suggestedCategory),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.orange.shade700,
                            foregroundColor: Colors.white,
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                          ),
                          icon: const Icon(Icons.arrow_forward_rounded, size: 18),
                          label: Text(
                            'Ver Piadas de ${mood.suggestedCategory.toUpperCase()}',
                            style: const TextStyle(fontWeight: FontWeight.bold),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],

              const SizedBox(height: 24),
              const Text(
                'Explore todos os humores:',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
              ),
              const SizedBox(height: 12),

              Wrap(
                spacing: 10,
                runSpacing: 10,
                children: widget.jokeService.moods.map((m) {
                  return InkWell(
                    onTap: () => widget.onSelectMood(m),
                    borderRadius: BorderRadius.circular(16),
                    child: Container(
                      width: 145,
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: theme.cardColor,
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: theme.dividerColor.withOpacity(0.4)),
                      ),
                      child: Column(
                        children: [
                          Text(m.emoji, style: const TextStyle(fontSize: 28)),
                          const SizedBox(height: 4),
                          Text(m.label, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                          const SizedBox(height: 2),
                          Text(
                            m.description,
                            style: const TextStyle(fontSize: 11, color: Colors.grey),
                            textAlign: TextAlign.center,
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ],
                      ),
                    ),
                  );
                }).toList(),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
