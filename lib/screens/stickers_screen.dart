import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_svg/flutter_svg.dart';
import '../services/joke_service.dart';
import '../widgets/sticker_creator_dialog.dart';

class StickersScreen extends StatefulWidget {
  final JokeService jokeService;
  final String? currentJokeId;

  const StickersScreen({
    super.key,
    required this.jokeService,
    this.currentJokeId,
  });

  @override
  State<StickersScreen> createState() => _StickersScreenState();
}

class _StickersScreenState extends State<StickersScreen> {
  String _selectedCategory = 'all';
  String _searchQuery = '';

  void _openCreator() {
    showDialog(
      context: context,
      builder: (_) => StickerCreatorDialog(
        onCreated: (stk) async {
          await widget.jokeService.addUserSticker(stk);
          setState(() {});
          if (mounted) {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(
                content: Text('Nova figurinha criada com sucesso! ✨'),
                backgroundColor: Colors.green,
                behavior: SnackBarBehavior.floating,
              ),
            );
          }
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final allStickers = widget.jokeService.allStickers;

    final filtered = allStickers.where((s) {
      if (_selectedCategory == 'favorites') {
        if (!widget.jokeService.isStickerFavorite(s.id)) return false;
      } else if (_selectedCategory == 'custom') {
        if (s.category != 'custom') return false;
      } else if (_selectedCategory == 'memes') {
        if (s.category != 'memes') return false;
      } else if (_selectedCategory == 'capivara') {
        if (!s.tags.contains('capivara')) return false;
      }

      if (_searchQuery.isNotEmpty) {
        final query = _searchQuery.toLowerCase();
        final matchesName = s.name.toLowerCase().contains(query);
        final matchesTag = s.tags.any((t) => t.toLowerCase().contains(query));
        return matchesName || matchesTag;
      }
      return true;
    }).toList();

    return Scaffold(
      backgroundColor: Colors.transparent,
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _openCreator,
        backgroundColor: const Color(0xFFFF5722),
        foregroundColor: Colors.white,
        icon: const Icon(Icons.add_rounded),
        label: const Text('Criar Figurinha', style: TextStyle(fontWeight: FontWeight.bold)),
      ),
      body: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 720),
          child: Column(
            children: [
              // Search & Filter header
              Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  children: [
                    TextField(
                      decoration: InputDecoration(
                        prefixIcon: const Icon(Icons.search_rounded),
                        hintText: 'Buscar figurinhas por nome ou meme...',
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(16)),
                        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                      ),
                      onChanged: (val) => setState(() => _searchQuery = val),
                    ),
                    const SizedBox(height: 12),
                    SingleChildScrollView(
                      scrollDirection: Axis.horizontal,
                      child: Row(
                        children: [
                          _buildFilterChip('all', 'Todos 🌟'),
                          _buildFilterChip('favorites', 'Favoritos ⭐'),
                          _buildFilterChip('memes', 'Memes BR 😂'),
                          _buildFilterChip('capivara', 'Capivaras 🦫'),
                          _buildFilterChip('custom', 'Criados por Mim 🎨'),
                        ],
                      ),
                    ),
                  ],
                ),
              ),

              // Grid
              Expanded(
                child: filtered.isEmpty
                    ? Center(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            const Text('🔍', style: TextStyle(fontSize: 48)),
                            const SizedBox(height: 12),
                            Text(
                              'Nenhuma figurinha encontrada.',
                              style: TextStyle(color: theme.hintColor, fontSize: 16),
                            ),
                          ],
                        ),
                      )
                    : GridView.builder(
                        padding: const EdgeInsets.fromLTRB(16, 0, 16, 80),
                        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: 2,
                          crossAxisSpacing: 14,
                          mainAxisSpacing: 14,
                          childAspectRatio: 0.8,
                        ),
                        itemCount: filtered.length,
                        itemBuilder: (context, index) {
                          final stk = filtered[index];
                          final isFav = widget.jokeService.isStickerFavorite(stk.id);

                          return Card(
                            elevation: 2,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(20),
                              side: BorderSide(color: theme.dividerColor.withValues(alpha: 0.4)),
                            ),
                            child: Padding(
                              padding: const EdgeInsets.all(12),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.stretch,
                                children: [
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: [
                                      IconButton(
                                        icon: Icon(
                                          isFav ? Icons.star_rounded : Icons.star_border_rounded,
                                          color: isFav ? Colors.amber : Colors.grey,
                                          size: 20,
                                        ),
                                        onPressed: () async {
                                          await widget.jokeService.toggleStickerFavorite(stk.id);
                                          setState(() {});
                                        },
                                      ),
                                      if (stk.category == 'custom')
                                        IconButton(
                                          icon: const Icon(Icons.delete_outline_rounded, size: 18, color: Colors.red),
                                          onPressed: () async {
                                            await widget.jokeService.deleteUserSticker(stk.id);
                                            setState(() {});
                                          },
                                        ),
                                    ],
                                  ),
                                  Expanded(
                                    child: Center(
                                      child: SvgPicture.string(
                                        stk.rawSvg,
                                        placeholderBuilder: (_) => const Center(
                                          child: CircularProgressIndicator(strokeWidth: 2),
                                        ),
                                      ),
                                    ),
                                  ),
                                  const SizedBox(height: 6),
                                  Text(
                                    stk.name,
                                    textAlign: TextAlign.center,
                                    style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12),
                                    maxLines: 1,
                                    overflow: TextOverflow.ellipsis,
                                  ),
                                  const SizedBox(height: 8),
                                  Row(
                                    children: [
                                      Expanded(
                                        child: OutlinedButton(
                                          onPressed: () {
                                            Clipboard.setData(ClipboardData(text: stk.rawSvg));
                                            ScaffoldMessenger.of(context).showSnackBar(
                                              const SnackBar(
                                                content: Text('SVG da figurinha copiado!'),
                                                duration: Duration(seconds: 1),
                                                behavior: SnackBarBehavior.floating,
                                              ),
                                            );
                                          },
                                          style: OutlinedButton.styleFrom(
                                            padding: const EdgeInsets.symmetric(vertical: 6),
                                            shape: RoundedRectangleBorder(
                                              borderRadius: BorderRadius.circular(10),
                                            ),
                                          ),
                                          child: const Text('Copiar', style: TextStyle(fontSize: 11)),
                                        ),
                                      ),
                                      if (widget.currentJokeId != null) ...[
                                        const SizedBox(width: 6),
                                        Expanded(
                                          child: ElevatedButton(
                                            onPressed: () async {
                                              await widget.jokeService.addStickerReaction(
                                                widget.currentJokeId!,
                                                stk.rawSvg,
                                              );
                                              if (mounted) {
                                                ScaffoldMessenger.of(context).showSnackBar(
                                                  const SnackBar(
                                                    content: Text('Figurinha aplicada na piada atual! ✨'),
                                                    duration: Duration(seconds: 2),
                                                    behavior: SnackBarBehavior.floating,
                                                    backgroundColor: Colors.orange,
                                                  ),
                                                );
                                              }
                                            },
                                            style: ElevatedButton.styleFrom(
                                              backgroundColor: const Color(0xFFFF5722),
                                              foregroundColor: Colors.white,
                                              padding: const EdgeInsets.symmetric(vertical: 6),
                                              shape: RoundedRectangleBorder(
                                                borderRadius: BorderRadius.circular(10),
                                              ),
                                            ),
                                            child: const Text('Reagir', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                                          ),
                                        ),
                                      ],
                                    ],
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
      ),
    );
  }

  Widget _buildFilterChip(String id, String label) {
    final isSelected = _selectedCategory == id;
    return Padding(
      padding: const EdgeInsets.only(right: 8),
      child: FilterChip(
        selected: isSelected,
        label: Text(label),
        selectedColor: const Color(0xFFFF5722).withValues(alpha: 0.2),
        checkmarkColor: const Color(0xFFFF5722),
        labelStyle: TextStyle(
          color: isSelected ? const Color(0xFFFF5722) : null,
          fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
          fontSize: 12,
        ),
        onSelected: (_) => setState(() => _selectedCategory = id),
      ),
    );
  }
}
