import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_svg/flutter_svg.dart';
import '../models/joke.dart';
import '../models/sticker.dart';

class JokeCard extends StatelessWidget {
  final Joke joke;
  final String language;
  final int currentIndex;
  final int totalJokes;
  final bool isLiked;
  final bool isFavorite;
  final Map<String, int> votes;
  final String? userVote;
  final bool censorMode;
  final List<String> stickerReactions;
  final List<Sticker> availableStickers;
  final VoidCallback onLike;
  final VoidCallback onFavorite;
  final Function(String) onVote;
  final VoidCallback onUnlockMature;
  final Function(Sticker) onAddSticker;

  const JokeCard({
    super.key,
    required this.joke,
    required this.language,
    required this.currentIndex,
    required this.totalJokes,
    required this.isLiked,
    required this.isFavorite,
    required this.votes,
    required this.userVote,
    required this.censorMode,
    required this.stickerReactions,
    required this.availableStickers,
    required this.onLike,
    required this.onFavorite,
    required this.onVote,
    required this.onUnlockMature,
    required this.onAddSticker,
  });

  void _openStickerPicker(BuildContext context) {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (ctx) {
        return Container(
          padding: const EdgeInsets.all(20),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'Reagir com Figurinha ✨',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  IconButton(
                    icon: const Icon(Icons.close_rounded),
                    onPressed: () => Navigator.pop(ctx),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              SizedBox(
                height: 110,
                child: ListView.separated(
                  scrollDirection: Axis.horizontal,
                  itemCount: availableStickers.length,
                  separatorBuilder: (_, __) => const SizedBox(width: 12),
                  itemBuilder: (context, i) {
                    final stk = availableStickers[i];
                    return InkWell(
                      onTap: () {
                        onAddSticker(stk);
                        Navigator.pop(ctx);
                      },
                      borderRadius: BorderRadius.circular(16),
                      child: Container(
                        width: 90,
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          color: Theme.of(context).cardColor,
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(
                            color: Theme.of(context).dividerColor.withValues(alpha: 0.4),
                          ),
                        ),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            SizedBox(
                              width: 50,
                              height: 50,
                              child: SvgPicture.string(
                                stk.rawSvg,
                                placeholderBuilder: (_) => const Center(
                                  child: CircularProgressIndicator(strokeWidth: 2),
                                ),
                              ),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              stk.name,
                              style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold),
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
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
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final text = joke.content.getText(language);
    final funnyCount = votes['funny'] ?? 0;
    final cringeCount = votes['cringe'] ?? 0;
    final totalVotesCount = funnyCount + cringeCount;
    final funnyPercent = totalVotesCount > 0 ? (funnyCount / totalVotesCount) * 100 : 50.0;
    final cringePercent = totalVotesCount > 0 ? (cringeCount / totalVotesCount) * 100 : 50.0;

    final isCensored = censorMode && joke.mature;

    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(28),
        side: BorderSide(
          color: joke.mature
              ? Colors.red.withValues(alpha: 0.4)
              : theme.dividerColor.withValues(alpha: 0.4),
          width: 1.5,
        ),
      ),
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Header Row: Category Badge + Progress Counter
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      colors: joke.mature
                          ? [Colors.redAccent, Colors.red.shade700]
                          : [const Color(0xFFFF5722), const Color(0xFFEA580C)],
                    ),
                    borderRadius: BorderRadius.circular(14),
                    boxShadow: [
                      BoxShadow(
                        color: (joke.mature ? Colors.red : const Color(0xFFFF5722))
                            .withValues(alpha: 0.3),
                        blurRadius: 6,
                        offset: const Offset(0, 2),
                      ),
                    ],
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      if (joke.mature) const Text('🔞 ', style: TextStyle(fontSize: 12)),
                      Text(
                        joke.category.toUpperCase(),
                        style: const TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                          letterSpacing: 0.8,
                          color: Colors.white,
                        ),
                      ),
                    ],
                  ),
                ),
                Text(
                  '${currentIndex + 1} / $totalJokes',
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w600,
                    color: theme.hintColor,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 20),

            // Content or Censored Overlay
            ConstrainedBox(
              constraints: const BoxConstraints(minHeight: 160),
              child: isCensored
                  ? Stack(
                      alignment: Alignment.center,
                      children: [
                        // Blurred preview
                        ImageFiltered(
                          imageFilter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
                          child: Text(
                            text,
                            textAlign: TextAlign.center,
                            style: const TextStyle(fontSize: 18),
                          ),
                        ),
                        // Unlock overlay
                        Container(
                          padding: const EdgeInsets.all(16),
                          decoration: BoxDecoration(
                            color: theme.cardColor.withValues(alpha: 0.85),
                            borderRadius: BorderRadius.circular(18),
                            border: Border.all(color: Colors.red.withValues(alpha: 0.4)),
                          ),
                          child: Column(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              const Text('🔞', style: TextStyle(fontSize: 32)),
                              const SizedBox(height: 6),
                              const Text(
                                'Conteúdo Adulto (+18)',
                                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                              ),
                              const SizedBox(height: 4),
                              const Text(
                                'Desative a censura para ver esta piada.',
                                style: TextStyle(fontSize: 12, color: Colors.grey),
                              ),
                              const SizedBox(height: 12),
                              ElevatedButton.icon(
                                onPressed: onUnlockMature,
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: Colors.redAccent,
                                  foregroundColor: Colors.white,
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(12),
                                  ),
                                ),
                                icon: const Icon(Icons.lock_open_rounded, size: 16),
                                label: const Text('Desbloquear (+18)'),
                              ),
                            ],
                          ),
                        ),
                      ],
                    )
                  : Center(
                      child: Text(
                        text,
                        textAlign: TextAlign.center,
                        style: theme.textTheme.headlineSmall?.copyWith(
                          fontWeight: FontWeight.w600,
                          height: 1.45,
                          fontSize: 20,
                        ),
                      ),
                    ),
            ),

            if (joke.author != null && !isCensored) ...[
              const SizedBox(height: 12),
              Text(
                '— ${joke.author}',
                textAlign: TextAlign.right,
                style: TextStyle(
                  fontSize: 13,
                  fontStyle: FontStyle.italic,
                  color: theme.hintColor,
                ),
              ),
            ],
            const SizedBox(height: 16),

            // Sticker reactions display row
            if (stickerReactions.isNotEmpty) ...[
              Wrap(
                spacing: 8,
                runSpacing: 6,
                children: stickerReactions.map((rawSvgOrId) {
                  return Container(
                    padding: const EdgeInsets.all(4),
                    decoration: BoxDecoration(
                      color: theme.colorScheme.surfaceContainerHighest.withValues(alpha: 0.6),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: SizedBox(
                      width: 38,
                      height: 38,
                      child: SvgPicture.string(
                        rawSvgOrId.startsWith('data:image/svg+xml;utf8,')
                            ? Uri.decodeComponent(rawSvgOrId.substring('data:image/svg+xml;utf8,'.length))
                            : rawSvgOrId,
                        placeholderBuilder: (_) => const Icon(Icons.sentiment_satisfied_rounded, size: 20),
                      ),
                    ),
                  );
                }).toList(),
              ),
              const SizedBox(height: 12),
            ],

            const Divider(),
            const SizedBox(height: 8),

            // Action Buttons Row: Curtir, Favoritar, Reagir Figurinha, Copiar
            Row(
              children: [
                OutlinedButton.icon(
                  onPressed: onLike,
                  style: OutlinedButton.styleFrom(
                    foregroundColor: isLiked ? Colors.red : null,
                    side: BorderSide(
                      color: isLiked ? Colors.red : theme.dividerColor,
                    ),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                  ),
                  icon: Icon(
                    isLiked ? Icons.favorite_rounded : Icons.favorite_border_rounded,
                    color: isLiked ? Colors.red : null,
                    size: 18,
                  ),
                  label: Text(
                    isLiked ? 'Curtido' : 'Curtir',
                    style: TextStyle(fontWeight: isLiked ? FontWeight.bold : FontWeight.normal),
                  ),
                ),
                const SizedBox(width: 8),

                IconButton(
                  tooltip: isFavorite ? 'Remover dos favoritos' : 'Favoritar',
                  icon: Icon(
                    isFavorite ? Icons.bookmark_rounded : Icons.bookmark_border_rounded,
                    color: isFavorite ? Colors.amber.shade700 : null,
                  ),
                  onPressed: onFavorite,
                ),

                IconButton(
                  tooltip: 'Reagir com figurinha',
                  icon: const Icon(Icons.add_reaction_outlined),
                  onPressed: () => _openStickerPicker(context),
                ),

                const Spacer(),

                IconButton(
                  tooltip: 'Copiar piada',
                  icon: const Icon(Icons.copy_rounded, size: 20),
                  onPressed: () {
                    Clipboard.setData(ClipboardData(text: text));
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: const Row(
                          children: [
                            Icon(Icons.check_circle_rounded, color: Colors.white, size: 18),
                            SizedBox(width: 8),
                            Text('Piada copiada!'),
                          ],
                        ),
                        backgroundColor: Colors.green.shade700,
                        behavior: SnackBarBehavior.floating,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                        duration: const Duration(seconds: 2),
                      ),
                    );
                  },
                ),
              ],
            ),
            const SizedBox(height: 14),

            // Termômetro de Humor
            Text(
              'O QUE VOCÊ ACHOU DESSA PIADA?',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 11,
                fontWeight: FontWeight.w700,
                letterSpacing: 1.1,
                color: theme.hintColor,
              ),
            ),
            const SizedBox(height: 8),

            Row(
              children: [
                Expanded(
                  child: ElevatedButton(
                    onPressed: () => onVote('funny'),
                    style: ElevatedButton.styleFrom(
                      elevation: userVote == 'funny' ? 3 : 0,
                      backgroundColor: userVote == 'funny'
                          ? Colors.orange.shade600
                          : theme.colorScheme.surfaceContainerHighest,
                      foregroundColor: userVote == 'funny'
                          ? Colors.white
                          : theme.textTheme.bodyMedium?.color,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(14),
                      ),
                      padding: const EdgeInsets.symmetric(vertical: 11),
                    ),
                    child: Text(
                      '😂 Boa ($funnyCount)',
                      style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                    ),
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: ElevatedButton(
                    onPressed: () => onVote('cringe'),
                    style: ElevatedButton.styleFrom(
                      elevation: userVote == 'cringe' ? 3 : 0,
                      backgroundColor: userVote == 'cringe'
                          ? Colors.deepPurple.shade500
                          : theme.colorScheme.surfaceContainerHighest,
                      foregroundColor: userVote == 'cringe'
                          ? Colors.white
                          : theme.textTheme.bodyMedium?.color,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(14),
                      ),
                      padding: const EdgeInsets.symmetric(vertical: 11),
                    ),
                    child: Text(
                      '😬 Cringe ($cringeCount)',
                      style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                    ),
                  ),
                ),
              ],
            ),

            if (totalVotesCount > 0) ...[
              const SizedBox(height: 10),
              ClipRRect(
                borderRadius: BorderRadius.circular(6),
                child: Row(
                  children: [
                    Expanded(
                      flex: funnyPercent.round(),
                      child: Container(
                        height: 6,
                        color: Colors.orange.shade500,
                      ),
                    ),
                    Expanded(
                      flex: cringePercent.round(),
                      child: Container(
                        height: 6,
                        color: Colors.deepPurple.shade400,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 4),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    '${funnyPercent.toStringAsFixed(0)}% Engraçada',
                    style: TextStyle(
                      fontSize: 11,
                      color: Colors.orange.shade700,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Text(
                    '${cringePercent.toStringAsFixed(0)}% Cringe',
                    style: TextStyle(
                      fontSize: 11,
                      color: Colors.deepPurple.shade400,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ],
          ],
        ),
      ),
    );
  }
}
