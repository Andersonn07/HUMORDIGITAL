import 'package:flutter/material.dart';
import '../services/joke_service.dart';

class JokeCreatorCard extends StatefulWidget {
  final JokeService jokeService;
  final VoidCallback onJokeCreated;

  const JokeCreatorCard({
    super.key,
    required this.jokeService,
    required this.onJokeCreated,
  });

  @override
  State<JokeCreatorCard> createState() => _JokeCreatorCardState();
}

class _JokeCreatorCardState extends State<JokeCreatorCard> {
  bool _isExpanded = false;
  bool _isGenerating = false;
  final _contentController = TextEditingController();
  final _authorController = TextEditingController();
  String _selectedCategory = 'anedotas';

  @override
  void dispose() {
    _contentController.dispose();
    _authorController.dispose();
    super.dispose();
  }

  void _generateWithAI() async {
    setState(() => _isGenerating = true);
    try {
      final joke = await widget.jokeService.generateJokeWithAI(_selectedCategory);
      _contentController.text = joke;
      if (_authorController.text.isEmpty) {
        _authorController.text = 'Humorista IA 🤖';
      }
    } finally {
      setState(() => _isGenerating = false);
    }
  }

  void _submit() async {
    final text = _contentController.text.trim();
    if (text.isEmpty) return;

    await widget.jokeService.addUserJoke(
      text,
      _authorController.text,
      _selectedCategory,
    );

    _contentController.clear();
    _authorController.clear();
    setState(() => _isExpanded = false);
    widget.onJokeCreated();

    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Piada publicada na Batalha com sucesso! 🎉'),
          backgroundColor: Colors.green,
          behavior: SnackBarBehavior.floating,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(22),
        side: BorderSide(color: const Color(0xFFFF5722).withValues(alpha: 0.3)),
      ),
      child: Padding(
        padding: const EdgeInsets.all(18),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            InkWell(
              onTap: () => setState(() => _isExpanded = !_isExpanded),
              borderRadius: BorderRadius.circular(12),
              child: Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: const Color(0xFFFF5722).withValues(alpha: 0.15),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: const Icon(Icons.add_rounded, color: Color(0xFFFF5722)),
                  ),
                  const SizedBox(width: 12),
                  const Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Tem uma piada boa? Envie aqui!',
                          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
                        ),
                        Text(
                          'Entre na arena e dispute os votos da comunidade.',
                          style: TextStyle(fontSize: 12, color: Colors.grey),
                        ),
                      ],
                    ),
                  ),
                  Icon(
                    _isExpanded ? Icons.keyboard_arrow_up_rounded : Icons.keyboard_arrow_down_rounded,
                  ),
                ],
              ),
            ),

            if (_isExpanded) ...[
              const SizedBox(height: 16),
              const Divider(),
              const SizedBox(height: 12),

              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text('Escreva sua piada:', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                  TextButton.icon(
                    onPressed: _isGenerating ? null : _generateWithAI,
                    icon: _isGenerating
                        ? const SizedBox(
                            width: 14,
                            height: 14,
                            child: CircularProgressIndicator(strokeWidth: 2),
                          )
                        : const Icon(Icons.auto_awesome_rounded, size: 16, color: Colors.purple),
                    label: const Text('Gerar com IA ✨', style: TextStyle(fontSize: 12, color: Colors.purple, fontWeight: FontWeight.bold)),
                  ),
                ],
              ),
              const SizedBox(height: 8),

              TextField(
                controller: _contentController,
                maxLines: 3,
                decoration: InputDecoration(
                  hintText: 'Digite o texto da piada ou gere com IA...',
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(14)),
                ),
              ),
              const SizedBox(height: 12),

              Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _authorController,
                      decoration: InputDecoration(
                        labelText: 'Seu nome / Apelido',
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(14)),
                        contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                      ),
                    ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: DropdownButtonFormField<String>(
                      initialValue: _selectedCategory,
                      decoration: InputDecoration(
                        labelText: 'Categoria',
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(14)),
                        contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                      ),
                      items: widget.jokeService.categories
                          .where((c) => !c.mature && c.id != 'todas')
                          .map((c) => DropdownMenuItem(
                                value: c.id,
                                child: Text('${c.emoji} ${c.name}', style: const TextStyle(fontSize: 12)),
                              ))
                          .toList(),
                      onChanged: (val) {
                        if (val != null) setState(() => _selectedCategory = val);
                      },
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),

              ElevatedButton(
                onPressed: _submit,
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFFFF5722),
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 12),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                ),
                child: const Text('Publicar Piada na Batalha', style: TextStyle(fontWeight: FontWeight.bold)),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
