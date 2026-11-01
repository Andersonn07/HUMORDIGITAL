import 'package:flutter/material.dart';
import '../models/mood.dart';
import '../services/joke_service.dart';

class DashboardScreen extends StatefulWidget {
  final JokeService jokeService;
  final MoodOption? todayMood;
  final Function(MoodOption) onSelectMood;

  const DashboardScreen({
    super.key,
    required this.jokeService,
    required this.todayMood,
    required this.onSelectMood,
  });

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  double _intensity = 7.0;
  final _noteController = TextEditingController();

  @override
  void dispose() {
    _noteController.dispose();
    super.dispose();
  }

  void _saveMoodEntry() async {
    final moodId = widget.todayMood?.id ?? 'feliz';
    await widget.jokeService.addMoodEntry(
      moodId,
      _intensity.round(),
      _noteController.text.trim().isEmpty ? null : _noteController.text.trim(),
    );
    _noteController.clear();
    setState(() {});
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Registro de humor salvo com sucesso! 📊'),
          backgroundColor: Colors.green,
          behavior: SnackBarBehavior.floating,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final entries = widget.jokeService.moodEntries;

    // Calculate frequency breakdown
    final Map<String, int> counts = {};
    for (final e in entries) {
      counts[e.moodId] = (counts[e.moodId] ?? 0) + 1;
    }

    final maxCount = counts.values.isEmpty ? 1 : counts.values.reduce((a, b) => a > b ? a : b);

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 720),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Dashboard Header Card
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [
                      Colors.orange.shade700.withValues(alpha: 0.12),
                      Colors.purple.shade700.withValues(alpha: 0.08),
                    ],
                  ),
                  borderRadius: BorderRadius.circular(24),
                  border: Border.all(color: Colors.orange.withValues(alpha: 0.3)),
                ),
                child: Row(
                  children: [
                    const Text('📊', style: TextStyle(fontSize: 36)),
                    const SizedBox(width: 14),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'Painel do Humor',
                            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
                          ),
                          const SizedBox(height: 2),
                          Text(
                            'Acompanhe a sua jornada emocional e seu histórico de risadas.',
                            style: TextStyle(fontSize: 13, color: theme.hintColor),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 18),

              // Frequency Chart Card
              Card(
                elevation: 2,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(22),
                  side: BorderSide(color: theme.dividerColor.withValues(alpha: 0.4)),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(20),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      const Text(
                        'Distribuição de Humores',
                        style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
                      ),
                      const SizedBox(height: 16),
                      Column(
                        children: widget.jokeService.moods.map((m) {
                          final count = counts[m.id] ?? 0;
                          final fraction = count / maxCount;

                          return Padding(
                            padding: const EdgeInsets.symmetric(vertical: 6),
                            child: Row(
                              children: [
                                SizedBox(
                                  width: 90,
                                  child: Row(
                                    children: [
                                      Text(m.emoji, style: const TextStyle(fontSize: 16)),
                                      const SizedBox(width: 6),
                                      Expanded(
                                        child: Text(
                                          m.label,
                                          style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600),
                                          overflow: TextOverflow.ellipsis,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                                const SizedBox(width: 10),
                                Expanded(
                                  child: ClipRRect(
                                    borderRadius: BorderRadius.circular(8),
                                    child: LinearProgressIndicator(
                                      value: fraction,
                                      minHeight: 12,
                                      backgroundColor: theme.colorScheme.surfaceContainerHighest,
                                      valueColor: const AlwaysStoppedAnimation(Color(0xFFFF5722)),
                                    ),
                                  ),
                                ),
                                const SizedBox(width: 12),
                                SizedBox(
                                  width: 24,
                                  child: Text(
                                    '$count',
                                    textAlign: TextAlign.end,
                                    style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12),
                                  ),
                                ),
                              ],
                            ),
                          );
                        }).toList(),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 18),

              // Log Today's Entry Form
              Card(
                elevation: 2,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(22),
                  side: BorderSide(color: theme.dividerColor.withValues(alpha: 0.4)),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(20),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Row(
                        children: [
                          Text(widget.todayMood?.emoji ?? '😄', style: const TextStyle(fontSize: 24)),
                          const SizedBox(width: 10),
                          Text(
                            'Registrar Humor: ${widget.todayMood?.label ?? 'Feliz'}',
                            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
                          ),
                        ],
                      ),
                      const SizedBox(height: 14),

                      // Intensity Slider
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Text('Intensidade:', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600)),
                          Text(
                            '${_intensity.round()} / 10',
                            style: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFFFF5722)),
                          ),
                        ],
                      ),
                      Slider(
                        value: _intensity,
                        min: 1.0,
                        max: 10.0,
                        divisions: 9,
                        activeColor: const Color(0xFFFF5722),
                        label: '${_intensity.round()}',
                        onChanged: (val) => setState(() => _intensity = val),
                      ),
                      const SizedBox(height: 10),

                      TextField(
                        controller: _noteController,
                        decoration: InputDecoration(
                          hintText: 'O que aconteceu hoje? (opcional)',
                          border: OutlineInputBorder(borderRadius: BorderRadius.circular(14)),
                          contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                        ),
                      ),
                      const SizedBox(height: 14),

                      ElevatedButton.icon(
                        onPressed: _saveMoodEntry,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFFFF5722),
                          foregroundColor: Colors.white,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                          padding: const EdgeInsets.symmetric(vertical: 12),
                        ),
                        icon: const Icon(Icons.bookmark_add_rounded, size: 18),
                        label: const Text('Salvar no Histórico', style: TextStyle(fontWeight: FontWeight.bold)),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 24),

              // Recent History
              const Text(
                'Histórico Recente',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
              ),
              const SizedBox(height: 12),

              if (entries.isEmpty)
                const Center(child: Text('Nenhum registro ainda.'))
              else
                ListView.separated(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  itemCount: entries.length,
                  separatorBuilder: (_, __) => const SizedBox(height: 10),
                  itemBuilder: (context, index) {
                    final item = entries[index];
                    final moodOpt = widget.jokeService.moods.where((m) => m.id == item.moodId).firstOrNull;
                    final dateStr = '${item.timestamp.day.toString().padLeft(2, '0')}/${item.timestamp.month.toString().padLeft(2, '0')} às ${item.timestamp.hour.toString().padLeft(2, '0')}:${item.timestamp.minute.toString().padLeft(2, '0')}';

                    return Card(
                      elevation: 1,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(16),
                        side: BorderSide(color: theme.dividerColor.withValues(alpha: 0.3)),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.all(14),
                        child: Row(
                          children: [
                            Text(moodOpt?.emoji ?? '😊', style: const TextStyle(fontSize: 28)),
                            const SizedBox(width: 14),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: [
                                      Text(
                                        moodOpt?.label ?? item.moodId,
                                        style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                                      ),
                                      Text(
                                        dateStr,
                                        style: TextStyle(fontSize: 11, color: theme.hintColor),
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 4),
                                  Text(
                                    'Intensidade: ${item.intensity}/10',
                                    style: const TextStyle(fontSize: 12, color: Color(0xFFFF5722), fontWeight: FontWeight.w600),
                                  ),
                                  if (item.note != null && item.note!.isNotEmpty) ...[
                                    const SizedBox(height: 4),
                                    Text(
                                      '"${item.note}"',
                                      style: TextStyle(fontSize: 12, fontStyle: FontStyle.italic, color: theme.hintColor),
                                    ),
                                  ],
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
            ],
          ),
        ),
      ),
    );
  }
}
