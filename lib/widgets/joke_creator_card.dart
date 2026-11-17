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
  bool _hasGenerated = false;
  String _lastSource = '';

  final _promptController = TextEditingController();
  final _contentController = TextEditingController();
  final _authorController = TextEditingController();
  String _selectedCategory = 'anedotas';

  @override
  void dispose() {
    _promptController.dispose();
    _contentController.dispose();
    _authorController.dispose();
    super.dispose();
  }

  String get _lang => widget.jokeService.storage.getLanguage();

  String _t(String pt, String en, String es) {
    if (_lang == 'en') return en;
    if (_lang == 'es') return es;
    return pt;
  }

  void _generateWithAI() async {
    if (_isGenerating) return;

    final promptText = _promptController.text.trim();
    setState(() => _isGenerating = true);

    try {
      final result = await widget.jokeService.generateJokeWithAI(
        prompt: promptText,
        category: _selectedCategory,
      );

      setState(() {
        _contentController.text = result.text;
        _hasGenerated = true;
        _lastSource = result.source;
        if (_authorController.text.trim().isEmpty) {
          _authorController.text = result.source == 'groq'
              ? 'Groq IA ⚡'
              : 'Humorista IA 🤖';
        }
      });

      if (mounted) {
        final successMsg = result.source == 'groq'
            ? _t('Piada gerada pela Groq AI ⚡', 'Joke generated with Groq AI ⚡', '¡Chiste generado por Groq AI ⚡!')
            : _t('Piada gerada com sucesso! ✨', 'Joke generated successfully! ✨', '¡Chiste generado con éxito! ✨');

        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(successMsg),
            backgroundColor: const Color(0xFF673AB7),
            behavior: SnackBarBehavior.floating,
            duration: const Duration(seconds: 3),
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(_t('Erro ao contactar a API Groq.', 'Error contacting Groq API.', 'Error al conectar con Groq API.')),
            backgroundColor: Colors.red.shade700,
            behavior: SnackBarBehavior.floating,
          ),
        );
      }
    } finally {
      if (mounted) {
        setState(() => _isGenerating = false);
      }
    }
  }

  void _submit() async {
    final text = _contentController.text.trim();
    if (text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(_t('Escreva ou gere uma piada primeiro!', 'Please write or generate a joke first!', '¡Escribe o genera un chiste primero!')),
          backgroundColor: Colors.orange.shade800,
          behavior: SnackBarBehavior.floating,
        ),
      );
      return;
    }

    final authorName = _authorController.text.trim().isEmpty
        ? (_hasGenerated ? 'Groq IA ⚡' : _t('Anônimo', 'Anonymous', 'Anónimo'))
        : _authorController.text.trim();

    await widget.jokeService.addUserJoke(
      text,
      authorName,
      _selectedCategory,
    );

    _contentController.clear();
    _promptController.clear();
    _authorController.clear();
    setState(() {
      _hasGenerated = false;
      _lastSource = '';
      _isExpanded = false;
    });

    widget.onJokeCreated();

    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(_t('Piada publicada na Batalha com sucesso! 🎉', 'Joke published to the Battle! 🎉', '¡Chiste publicado en la Batalla! 🎉')),
          backgroundColor: Colors.green.shade700,
          behavior: SnackBarBehavior.floating,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Card(
      elevation: 3,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(24),
        side: BorderSide(
          color: const Color(0xFFFF5722).withValues(alpha: isDark ? 0.4 : 0.25),
          width: 1.5,
        ),
      ),
      child: Padding(
        padding: const EdgeInsets.all(18),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Top Collapsible Bar
            InkWell(
              onTap: () => setState(() => _isExpanded = !_isExpanded),
              borderRadius: BorderRadius.circular(16),
              child: Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(
                        colors: [Color(0xFFFF5722), Color(0xFFFF9800)],
                      ),
                      borderRadius: BorderRadius.circular(14),
                      boxShadow: [
                        BoxShadow(
                          color: const Color(0xFFFF5722).withValues(alpha: 0.3),
                          blurRadius: 8,
                          offset: const Offset(0, 3),
                        ),
                      ],
                    ),
                    child: const Icon(Icons.auto_awesome_rounded, color: Colors.white, size: 22),
                  ),
                  const SizedBox(width: 14),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          _t('Criar Piada com IA ou à Mão', 'Create Joke with AI or by Hand', 'Crear Chiste con IA o a Mano'),
                          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                        ),
                        const SizedBox(height: 2),
                        Text(
                          _t(
                            'Escreva o tema e a IA gera a piada para você.',
                            'Type your topic and AI writes the joke for you.',
                            'Escribe el tema y la IA crea el chiste por ti.',
                          ),
                          style: TextStyle(fontSize: 12, color: theme.hintColor),
                        ),
                      ],
                    ),
                  ),
                  Icon(
                    _isExpanded
                        ? Icons.keyboard_arrow_up_rounded
                        : Icons.keyboard_arrow_down_rounded,
                    color: const Color(0xFFFF5722),
                    size: 28,
                  ),
                ],
              ),
            ),

            if (_isExpanded) ...[
              const SizedBox(height: 16),
              Divider(color: theme.dividerColor.withValues(alpha: 0.4)),
              const SizedBox(height: 12),

              // 1. Author Name Field
              TextField(
                controller: _authorController,
                decoration: InputDecoration(
                  labelText: _t('Seu nome / Apelido (opcional)', 'Your Name / Nickname (optional)', 'Tu nombre / Apodo (opcional)'),
                  prefixIcon: const Icon(Icons.person_outline_rounded, size: 20),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(16)),
                  contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                ),
              ),
              const SizedBox(height: 14),

              // 2. Custom Prompt Box (Purple gradient card)
              Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: isDark
                      ? const Color(0xFF311B92).withValues(alpha: 0.25)
                      : const Color(0xFFEDE7F6),
                  borderRadius: BorderRadius.circular(18),
                  border: Border.all(
                    color: const Color(0xFF7E57C2).withValues(alpha: isDark ? 0.5 : 0.35),
                  ),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Row(
                      children: [
                        const Icon(Icons.auto_awesome_rounded, color: Color(0xFF7E57C2), size: 18),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Text(
                            _t('Que tipo de piada queres?', 'What kind of joke do you want?', '¿Qué tipo de chiste quieres?'),
                            style: const TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 13,
                              color: Color(0xFF673AB7),
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),

                    // Custom Topic Input Field
                    TextField(
                      controller: _promptController,
                      onSubmitted: (_) => _generateWithAI(),
                      decoration: InputDecoration(
                        hintText: _t(
                          'Ex: café, segunda-feira, sogra, programador...',
                          'e.g. morning coffee, work, programmer, in-laws...',
                          'Ej: café, lunes, programador, suegra...',
                        ),
                        hintStyle: TextStyle(fontSize: 13, color: theme.hintColor),
                        filled: true,
                        fillColor: isDark ? const Color(0xFF1E1E2C) : Colors.white,
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(14),
                          borderSide: BorderSide(
                            color: const Color(0xFF7E57C2).withValues(alpha: 0.5),
                          ),
                        ),
                        enabledBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(14),
                          borderSide: BorderSide(
                            color: const Color(0xFF7E57C2).withValues(alpha: 0.3),
                          ),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(14),
                          borderSide: const BorderSide(color: Color(0xFF673AB7), width: 1.8),
                        ),
                        contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                      ),
                    ),
                    const SizedBox(height: 10),

                    // Generate Button with Groq Indicator
                    ElevatedButton.icon(
                      onPressed: _isGenerating ? null : _generateWithAI,
                      icon: _isGenerating
                          ? const SizedBox(
                              width: 16,
                              height: 16,
                              child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white),
                            )
                          : const Icon(Icons.bolt_rounded, size: 20),
                      label: Text(
                        _isGenerating
                            ? _t('A gerar com Groq ⚡...', 'Generating with Groq ⚡...', 'Generando con Groq ⚡...')
                            : _t('Gerar com IA ✨', 'Generate with AI ✨', 'Generar con IA ✨'),
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF673AB7),
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(vertical: 12),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                        elevation: 2,
                      ),
                    ),
                    const SizedBox(height: 6),

                    Text(
                      _t(
                        'Dica: Toque em Gerar ou aperte Enter no teclado.',
                        'Tip: Tap Generate or press Enter on keyboard.',
                        'Consejo: Toca Generar o presiona Enter en el teclado.',
                      ),
                      textAlign: TextAlign.center,
                      style: TextStyle(fontSize: 11, color: theme.hintColor),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),

              // 3. Joke Content Field
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    _t('Texto da Piada:', 'Joke Content:', 'Texto del Chiste:'),
                    style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                  ),
                  if (_hasGenerated)
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                      decoration: BoxDecoration(
                        color: Colors.green.withValues(alpha: 0.15),
                        borderRadius: BorderRadius.circular(10),
                        border: Border.all(color: Colors.green.shade400),
                      ),
                      child: Row(
                        children: [
                          const Icon(Icons.check_circle_rounded, size: 14, color: Colors.green),
                          const SizedBox(width: 4),
                          Text(
                            _lastSource == 'groq'
                                ? 'Groq IA ⚡'
                                : _t('Piada Pronta! ✨', 'Joke Ready! ✨', '¡Chiste Listo! ✨'),
                            style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.green),
                          ),
                        ],
                      ),
                    ),
                ],
              ),
              const SizedBox(height: 8),

              TextField(
                controller: _contentController,
                maxLines: 4,
                maxLength: 500,
                decoration: InputDecoration(
                  hintText: _t(
                    'Escreva ou gere com a IA acima...',
                    'Write or generate with AI above...',
                    'Escribe o genera con la IA arriba...',
                  ),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(16)),
                  contentPadding: const EdgeInsets.all(14),
                ),
              ),
              const SizedBox(height: 12),

              // 4. Category Selector (Full Width & Responsive)
              DropdownButtonFormField<String>(
                initialValue: _selectedCategory,
                isExpanded: true,
                decoration: InputDecoration(
                  labelText: _t('Categoria', 'Category', 'Categoría'),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(14)),
                  contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
                ),
                items: widget.jokeService.categories
                    .where((c) => !c.mature && c.id != 'todas')
                    .map((c) => DropdownMenuItem(
                          value: c.id,
                          child: Text(
                            '${c.emoji} ${c.name}',
                            style: const TextStyle(fontSize: 13),
                            overflow: TextOverflow.ellipsis,
                          ),
                        ))
                    .toList(),
                onChanged: (val) {
                  if (val != null) setState(() => _selectedCategory = val);
                },
              ),
              const SizedBox(height: 14),

              // 5. Submit Button (Full Width Mobile-First)
              ElevatedButton.icon(
                onPressed: _submit,
                icon: const Icon(Icons.send_rounded, size: 18),
                label: Text(
                  _t('Publicar Piada na Batalha', 'Publish Joke to Battle', 'Publicar Chiste en la Batalla'),
                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                ),
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFFFF5722),
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                  elevation: 2,
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
