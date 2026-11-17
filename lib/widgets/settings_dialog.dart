import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../services/joke_service.dart';
import '../services/storage_service.dart';

class SettingsDialog extends StatefulWidget {
  final StorageService storage;
  final JokeService jokeService;
  final bool darkMode;
  final bool censorMode;
  final String language;
  final VoidCallback onToggleDarkMode;
  final Function(bool) onSetCensorMode;
  final Function(String) onSetLanguage;
  final VoidCallback onDataChanged;

  const SettingsDialog({
    super.key,
    required this.storage,
    required this.jokeService,
    required this.darkMode,
    required this.censorMode,
    required this.language,
    required this.onToggleDarkMode,
    required this.onSetCensorMode,
    required this.onSetLanguage,
    required this.onDataChanged,
  });

  @override
  State<SettingsDialog> createState() => _SettingsDialogState();
}

class _SettingsDialogState extends State<SettingsDialog> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  late TextEditingController _groqApiKeyController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
    _groqApiKeyController = TextEditingController(text: widget.storage.getGroqApiKey() ?? '');
  }

  @override
  void dispose() {
    _tabController.dispose();
    _groqApiKeyController.dispose();
    super.dispose();
  }

  void _exportBackup() {
    final jsonStr = widget.storage.exportBackupData();
    Clipboard.setData(ClipboardData(text: jsonStr));
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Backup JSON copiado para a área de transferência! 📋'),
        backgroundColor: Colors.green,
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  void _showImportDialog() {
    final controller = TextEditingController();
    showDialog(
      context: context,
      builder: (ctx) {
        return AlertDialog(
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
          title: const Text('Restaurar Backup JSON'),
          content: TextField(
            controller: controller,
            maxLines: 6,
            decoration: const InputDecoration(
              hintText: 'Cole o código JSON do seu backup aqui...',
              border: OutlineInputBorder(),
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(ctx),
              child: const Text('Cancelar'),
            ),
            ElevatedButton(
              onPressed: () async {
                final success = widget.storage.importBackupData(controller.text.trim());
                if (success) {
                  await widget.jokeService.loadData();
                  widget.onDataChanged();
                  if (mounted) {
                    Navigator.pop(ctx);
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Dados restaurados com sucesso! 🎉'),
                        backgroundColor: Colors.green,
                        behavior: SnackBarBehavior.floating,
                      ),
                    );
                  }
                } else {
                  if (mounted) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Erro: formato JSON inválido.'),
                        backgroundColor: Colors.red,
                        behavior: SnackBarBehavior.floating,
                      ),
                    );
                  }
                }
              },
              child: const Text('Restaurar'),
            ),
          ],
        );
      },
    );
  }

  void _confirmClearData(String scope, String title) {
    showDialog(
      context: context,
      builder: (ctx) {
        return AlertDialog(
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
          title: Text(title),
          content: const Text('Esta ação não pode ser desfeita. Tem certeza?'),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(ctx),
              child: const Text('Cancelar'),
            ),
            ElevatedButton(
              onPressed: () async {
                await widget.storage.clearData(scope);
                await widget.jokeService.loadData();
                widget.onDataChanged();
                if (mounted) {
                  Navigator.pop(ctx);
                  setState(() {});
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Dados apagados.'),
                      behavior: SnackBarBehavior.floating,
                    ),
                  );
                }
              },
              style: ElevatedButton.styleFrom(backgroundColor: Colors.red, foregroundColor: Colors.white),
              child: const Text('Confirmar e Apagar'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final favCount = widget.storage.getFavorites().length;
    final likesCount = widget.storage.getLikes().length;
    final jokesCount = widget.storage.getUserJokes().length;
    final stickersCount = widget.storage.getUserStickers().length;

    return Dialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(28)),
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 540, maxHeight: 600),
        child: Column(
          children: [
            // Title
            Padding(
              padding: const EdgeInsets.fromLTRB(20, 20, 16, 0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Row(
                    children: [
                      Icon(Icons.settings_rounded, color: Color(0xFFFF5722)),
                      SizedBox(width: 8),
                      Text(
                        'Configurações & Privacidade',
                        style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                  IconButton(
                    icon: const Icon(Icons.close_rounded),
                    onPressed: () => Navigator.pop(context),
                  ),
                ],
              ),
            ),
            TabBar(
              controller: _tabController,
              labelColor: const Color(0xFFFF5722),
              indicatorColor: const Color(0xFFFF5722),
              tabs: const [
                Tab(text: 'Geral'),
                Tab(text: 'Dados & Backup'),
                Tab(text: 'Sobre'),
              ],
            ),
            Expanded(
              child: TabBarView(
                controller: _tabController,
                children: [
                  // Tab 1: Geral
                  ListView(
                    padding: const EdgeInsets.all(20),
                    children: [
                      SwitchListTile(
                        title: const Text('Tema Escuro (Dark Mode)'),
                        subtitle: const Text('Alternar entre modo claro e escuro'),
                        value: widget.darkMode,
                        activeColor: const Color(0xFFFF5722),
                        onChanged: (_) => widget.onToggleDarkMode(),
                      ),
                      const Divider(),
                      SwitchListTile(
                        title: const Text('Filtro de Censura (+18)'),
                        subtitle: const Text('Ocultar piadas maduras e conteúdo adulto'),
                        value: widget.censorMode,
                        activeColor: Colors.green,
                        onChanged: (val) => widget.onSetCensorMode(val),
                      ),
                      const Divider(),
                      ListTile(
                        title: const Text('Idioma do Aplicativo'),
                        subtitle: Text(
                          widget.language == 'pt'
                              ? 'Português'
                              : widget.language == 'en'
                                  ? 'English'
                                  : 'Español',
                        ),
                        trailing: DropdownButton<String>(
                          value: widget.language,
                          underline: const SizedBox(),
                          items: const [
                            DropdownMenuItem(value: 'pt', child: Text('🇵🇹 Português')),
                            DropdownMenuItem(value: 'en', child: Text('🇺🇸 English')),
                            DropdownMenuItem(value: 'es', child: Text('🇪🇸 Español')),
                          ],
                          onChanged: (val) {
                            if (val != null) widget.onSetLanguage(val);
                          },
                        ),
                      ),
                      const Divider(),
                      const SizedBox(height: 10),
                      Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.all(6),
                            decoration: BoxDecoration(
                              color: Colors.deepPurple.withValues(alpha: 0.15),
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: const Icon(Icons.bolt_rounded, color: Colors.deepPurple, size: 20),
                          ),
                          const SizedBox(width: 8),
                          const Text(
                            'Inteligência Artificial (Groq ⚡)',
                            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: Theme.of(context).cardColor,
                          borderRadius: BorderRadius.circular(14),
                          border: Border.all(
                            color: Colors.deepPurple.withValues(alpha: 0.25),
                          ),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                Container(
                                  width: 8,
                                  height: 8,
                                  decoration: const BoxDecoration(
                                    color: Colors.green,
                                    shape: BoxShape.circle,
                                  ),
                                ),
                                const SizedBox(width: 6),
                                const Text(
                                  'Groq API Ativa ⚡ (Ultra-rápida)',
                                  style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: Colors.green),
                                ),
                              ],
                            ),
                            const SizedBox(height: 6),
                            const Text(
                              'Geração ultra-rápida com Llama 3.3 / GPT-OSS.',
                              style: TextStyle(fontSize: 11, color: Colors.grey),
                            ),
                            const SizedBox(height: 10),
                            TextField(
                              controller: _groqApiKeyController,
                              obscureText: true,
                              decoration: InputDecoration(
                                labelText: 'Chave de API Groq (Opcional)',
                                hintText: 'Deixe vazio para usar a chave padrão',
                                border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                                contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                              ),
                              onChanged: (val) {
                                widget.storage.setGroqApiKey(val);
                              },
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),

                  // Tab 2: Dados & Backup
                  ListView(
                    padding: const EdgeInsets.all(20),
                    children: [
                      const Text(
                        'Estatísticas Locais',
                        style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
                      ),
                      const SizedBox(height: 10),
                      Wrap(
                        spacing: 10,
                        runSpacing: 10,
                        children: [
                          _buildStatCard('❤️ Favoritos', '$favCount'),
                          _buildStatCard('👍 Curtidas', '$likesCount'),
                          _buildStatCard('⚔️ Piadas na Batalha', '$jokesCount'),
                          _buildStatCard('🎨 Figurinhas Criadas', '$stickersCount'),
                        ],
                      ),
                      const SizedBox(height: 20),
                      const Text(
                        'Exportar & Restaurar',
                        style: TextStyle(fontWeight: FontWeight.bold, fontSize: 15),
                      ),
                      const SizedBox(height: 10),
                      Row(
                        children: [
                          Expanded(
                            child: OutlinedButton.icon(
                              onPressed: _exportBackup,
                              icon: const Icon(Icons.download_rounded),
                              label: const Text('Copiar Backup'),
                            ),
                          ),
                          const SizedBox(width: 10),
                          Expanded(
                            child: ElevatedButton.icon(
                              onPressed: _showImportDialog,
                              icon: const Icon(Icons.upload_rounded),
                              label: const Text('Restaurar Backup'),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 24),
                      const Text(
                        'Zona de Perigo',
                        style: TextStyle(fontWeight: FontWeight.bold, color: Colors.red, fontSize: 15),
                      ),
                      const SizedBox(height: 10),
                      OutlinedButton.icon(
                        onPressed: () => _confirmClearData('favorites', 'Limpar Favoritos'),
                        style: OutlinedButton.styleFrom(foregroundColor: Colors.red),
                        icon: const Icon(Icons.delete_outline_rounded),
                        label: const Text('Limpar Favoritos Salvos'),
                      ),
                      const SizedBox(height: 8),
                      ElevatedButton.icon(
                        onPressed: () => _confirmClearData('all', 'Resetar Todos os Dados'),
                        style: ElevatedButton.styleFrom(backgroundColor: Colors.red, foregroundColor: Colors.white),
                        icon: const Icon(Icons.delete_forever_rounded),
                        label: const Text('Apagar Todos os Dados Locais'),
                      ),
                    ],
                  ),

                  // Tab 3: Sobre
                  ListView(
                    padding: const EdgeInsets.all(20),
                    children: [
                      const Center(child: Text('🎭', style: TextStyle(fontSize: 48))),
                      const SizedBox(height: 8),
                      const Center(
                        child: Text(
                          'RIBO - Humor Digital',
                          style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                        ),
                      ),
                      const Center(
                        child: Text(
                          'Versão Flutter 1.0.0',
                          style: TextStyle(fontSize: 12, color: Colors.grey),
                        ),
                      ),
                      const SizedBox(height: 16),
                      Text(
                        'Aplicativo projetado para alegrar o seu dia com o melhor do humor em texto, batalha de anedotas, memes e figurinhas.',
                        textAlign: TextAlign.center,
                        style: TextStyle(color: theme.hintColor),
                      ),
                      const SizedBox(height: 16),
                      const Divider(),
                      const ListTile(
                        dense: true,
                        leading: Icon(Icons.palette_outlined),
                        title: Text('Design Figma Make'),
                        subtitle: Text('Baseado na interface oficial de App de Humor Digital'),
                      ),
                      const ListTile(
                        dense: true,
                        leading: Icon(Icons.security_outlined),
                        title: Text('Privacidade Total'),
                        subtitle: Text('Todos os dados são armazenados localmente no seu dispositivo.'),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatCard(String label, String value) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
      decoration: BoxDecoration(
        color: Theme.of(context).colorScheme.surfaceContainerHighest.withValues(alpha: 0.5),
        borderRadius: BorderRadius.circular(14),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w600)),
          const SizedBox(height: 2),
          Text(value, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Color(0xFFFF5722))),
        ],
      ),
    );
  }
}
