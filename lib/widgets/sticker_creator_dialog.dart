import 'dart:math';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import '../models/sticker.dart';

class StickerCreatorDialog extends StatefulWidget {
  final Function(Sticker) onCreated;

  const StickerCreatorDialog({super.key, required this.onCreated});

  @override
  State<StickerCreatorDialog> createState() => _StickerCreatorDialogState();
}

class _StickerCreatorDialogState extends State<StickerCreatorDialog> {
  final _nameController = TextEditingController(text: 'Meu Sticker');
  final _captionController = TextEditingController(text: 'EITA NÓIS! 😱');
  String _selectedTemplate = 'capivara';
  Color _bannerColor = const Color(0xFF15803D);

  final List<Map<String, String>> _templates = [
    {'id': 'capivara', 'name': 'Capivara', 'emoji': '🦫'},
    {'id': 'flork', 'name': 'Flork', 'emoji': '☕'},
    {'id': 'nazare', 'name': 'Confusa', 'emoji': '🤔'},
    {'id': 'fogo', 'name': 'Fogo no Parquinho', 'emoji': '🔥'},
  ];

  String _buildSvg() {
    final caption = _captionController.text.trim().isEmpty ? 'MEME' : _captionController.text.trim();
    final hexColor = '#${_bannerColor.value.toRadixString(16).substring(2)}';

    String content;
    if (_selectedTemplate == 'capivara') {
      content = '''
        <ellipse cx="110" cy="120" rx="55" ry="45" fill="#b45309" stroke="#451a03" stroke-width="4"/>
        <rect x="120" y="105" width="40" height="35" rx="12" fill="#78350f"/>
        <ellipse cx="148" cy="118" rx="6" ry="5" fill="#1c1917"/>
        <path d="M 90,105 Q 98,110 106,105" fill="none" stroke="#1c1917" stroke-width="4" stroke-linecap="round"/>
        <circle cx="75" cy="90" r="10" fill="#78350f"/>
        <circle cx="110" cy="70" r="16" fill="#f97316"/>
      ''';
    } else if (_selectedTemplate == 'flork') {
      content = '''
        <path d="M 65,195 C 45,195 40,135 45,100 C 52,60 80,50 110,50 C 145,50 162,75 160,125 C 158,155 162,175 170,195 Z" fill="#f8fafc" stroke="#1e293b" stroke-width="6" stroke-linecap="round"/>
        <circle cx="85" cy="85" r="6" fill="#0f172a"/>
        <circle cx="120" cy="82" r="6" fill="#0f172a"/>
        <path d="M 90,105 Q 102,108 116,104" fill="none" stroke="#0f172a" stroke-width="4" stroke-linecap="round"/>
        <rect x="145" y="130" width="28" height="30" rx="6" fill="#ef4444"/>
      ''';
    } else if (_selectedTemplate == 'nazare') {
      content = '''
        <circle cx="110" cy="110" r="75" fill="#fef08a"/>
        <path d="M 50,130 C 40,80 65,40 110,40 C 155,40 180,80 170,130 Z" fill="#facc15" stroke="#ca8a04" stroke-width="4"/>
        <circle cx="110" cy="115" r="45" fill="#fed7aa"/>
        <ellipse cx="94" cy="108" rx="8" ry="7" fill="#ffffff"/>
        <circle cx="96" cy="104" r="4" fill="#0f172a"/>
        <ellipse cx="126" cy="108" rx="8" ry="7" fill="#ffffff"/>
        <circle cx="128" cy="104" r="4" fill="#0f172a"/>
        <text x="35" y="70" fill="#2563eb" font-family="monospace" font-weight="bold" font-size="14">√x² + y</text>
        <text x="145" y="65" fill="#dc2626" font-family="monospace" font-weight="bold" font-size="14">∫ e^x</text>
      ''';
    } else {
      content = '''
        <circle cx="110" cy="110" r="75" fill="#fee2e2"/>
        <text x="110" y="125" text-anchor="middle" font-size="64">🔥</text>
      ''';
    }

    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" width="220" height="220">
      <circle cx="110" cy="110" r="95" fill="#ffffff" stroke="#e2e8f0" stroke-width="6"/>
      $content
      <g transform="translate(110, 190)">
        <rect x="-80" y="-12" width="160" height="24" rx="8" fill="$hexColor"/>
        <text x="0" y="5" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="11">$caption</text>
      </g>
    </svg>''';
  }

  @override
  void dispose() {
    _nameController.dispose();
    _captionController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final svgCode = _buildSvg();

    return AlertDialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
      title: const Row(
        children: [
          Text('🎨', style: TextStyle(fontSize: 24)),
          SizedBox(width: 8),
          Text('Criar Nova Figurinha', style: TextStyle(fontWeight: FontWeight.bold)),
        ],
      ),
      content: SingleChildScrollView(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Preview
            Center(
              child: Container(
                width: 140,
                height: 140,
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withValues(alpha: 0.1),
                      blurRadius: 10,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                padding: const EdgeInsets.all(8),
                child: SvgPicture.string(svgCode),
              ),
            ),
            const SizedBox(height: 16),

            // Template Selector
            const Text('Escolha o Meme:', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
            const SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: _templates.map((t) {
                final isSelected = t['id'] == _selectedTemplate;
                return InkWell(
                  onTap: () => setState(() => _selectedTemplate = t['id']!),
                  borderRadius: BorderRadius.circular(12),
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                    decoration: BoxDecoration(
                      color: isSelected ? const Color(0xFFFF5722) : Colors.grey.withValues(alpha: 0.15),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      '${t['emoji']} ${t['name']}',
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                        color: isSelected ? Colors.white : null,
                      ),
                    ),
                  ),
                );
              }).toList(),
            ),
            const SizedBox(height: 14),

            TextField(
              controller: _captionController,
              decoration: InputDecoration(
                labelText: 'Texto da Legenda',
                hintText: 'Ex: TUDO SOB CONTROLE',
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(14)),
                contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
              ),
              onChanged: (_) => setState(() {}),
            ),
            const SizedBox(height: 12),

            TextField(
              controller: _nameController,
              decoration: InputDecoration(
                labelText: 'Nome da Figurinha',
                hintText: 'Ex: Minha Capivara',
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(14)),
                contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
              ),
            ),
            const SizedBox(height: 14),

            // Color picker row
            const Text('Cor da Faixa:', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
            const SizedBox(height: 6),
            Row(
              children: [
                const Color(0xFF15803D),
                const Color(0xFFEF4444),
                const Color(0xFF3B82F6),
                const Color(0xFF8B5CF6),
                const Color(0xFFF97316),
                const Color(0xFF1E293B),
              ].map((c) {
                final isSelected = _bannerColor == c;
                return GestureDetector(
                  onTap: () => setState(() => _bannerColor = c),
                  child: Container(
                    margin: const EdgeInsets.only(right: 8),
                    width: 32,
                    height: 32,
                    decoration: BoxDecoration(
                      color: c,
                      shape: BoxShape.circle,
                      border: Border.all(
                        color: isSelected ? Colors.white : Colors.transparent,
                        width: 3,
                      ),
                      boxShadow: isSelected
                          ? [BoxShadow(color: c.withValues(alpha: 0.6), blurRadius: 6)]
                          : null,
                    ),
                  ),
                );
              }).toList(),
            ),
          ],
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(context),
          child: const Text('Cancelar'),
        ),
        ElevatedButton(
          onPressed: () {
            final name = _nameController.text.trim().isEmpty ? 'Figurinha' : _nameController.text.trim();
            final sticker = Sticker(
              id: 'custom-${DateTime.now().millisecondsSinceEpoch}-${Random().nextInt(999)}',
              name: name,
              category: 'custom',
              packName: 'Criadas por Mim',
              tags: ['custom', _selectedTemplate],
              createdAt: DateTime.now().millisecondsSinceEpoch,
              image: svgCode,
            );
            widget.onCreated(sticker);
            Navigator.pop(context);
          },
          style: ElevatedButton.styleFrom(
            backgroundColor: const Color(0xFFFF5722),
            foregroundColor: Colors.white,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          ),
          child: const Text('Salvar Figurinha'),
        ),
      ],
    );
  }
}
