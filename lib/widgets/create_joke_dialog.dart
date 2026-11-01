import 'package:flutter/material.dart';
import '../models/joke.dart';

class CreateJokeDialog extends StatefulWidget {
  final List<JokeCategory> categories;
  final Function(String text, String author, String category) onSubmit;

  const CreateJokeDialog({
    super.key,
    required this.categories,
    required this.onSubmit,
  });

  @override
  State<CreateJokeDialog> createState() => _CreateJokeDialogState();
}

class _CreateJokeDialogState extends State<CreateJokeDialog> {
  final _textController = TextEditingController();
  final _authorController = TextEditingController();
  String _selectedCategory = 'anedotas';

  @override
  void dispose() {
    _textController.dispose();
    _authorController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
      title: const Row(
        children: [
          Icon(Icons.edit_note_rounded, color: Color(0xFFFF5722)),
          SizedBox(width: 8),
          Text('Enviar sua Piada', style: TextStyle(fontWeight: FontWeight.bold)),
        ],
      ),
      content: SingleChildScrollView(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            TextField(
              controller: _textController,
              maxLines: 4,
              decoration: InputDecoration(
                labelText: 'Conte sua piada...',
                hintText: 'Escreva algo bem engraçado ou bem cringe!',
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(16)),
              ),
            ),
            const SizedBox(height: 14),
            TextField(
              controller: _authorController,
              decoration: InputDecoration(
                labelText: 'Seu nome ou apelido (opcional)',
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(16)),
              ),
            ),
            const SizedBox(height: 14),
            DropdownButtonFormField<String>(
              initialValue: _selectedCategory,
              decoration: InputDecoration(
                labelText: 'Categoria',
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(16)),
              ),
              items: widget.categories
                  .where((c) => c.id != 'todas')
                  .map((c) => DropdownMenuItem(
                        value: c.id,
                        child: Row(
                          children: [
                            Text(c.emoji),
                            const SizedBox(width: 8),
                            Text(c.name),
                          ],
                        ),
                      ))
                  .toList(),
              onChanged: (val) {
                if (val != null) setState(() => _selectedCategory = val);
              },
            ),
          ],
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(),
          child: const Text('Cancelar'),
        ),
        ElevatedButton(
          onPressed: () {
            final text = _textController.text.trim();
            if (text.isEmpty) return;
            widget.onSubmit(text, _authorController.text, _selectedCategory);
            Navigator.of(context).pop();
          },
          style: ElevatedButton.styleFrom(
            backgroundColor: const Color(0xFFFF5722),
            foregroundColor: Colors.white,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          ),
          child: const Text('Publicar na Batalha'),
        ),
      ],
    );
  }
}
