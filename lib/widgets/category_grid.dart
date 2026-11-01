import 'package:flutter/material.dart';
import '../models/joke.dart';

class CategoryGrid extends StatelessWidget {
  final List<JokeCategory> categories;
  final String selectedCategory;
  final bool censorMode;
  final Function(String) onCategoryChange;

  const CategoryGrid({
    super.key,
    required this.categories,
    required this.selectedCategory,
    required this.censorMode,
    required this.onCategoryChange,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final normalCategories = categories.where((c) => !c.mature).toList();
    final matureCategory = categories.where((c) => c.mature).firstOrNull;

    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Header
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'Categorias',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                ),
                if (!censorMode)
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: Colors.red.withValues(alpha: 0.12),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: Colors.red.withValues(alpha: 0.3)),
                    ),
                    child: const Text(
                      '🔞 MODO ADULTO',
                      style: TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.bold,
                        color: Colors.redAccent,
                      ),
                    ),
                  ),
              ],
            ),
            const SizedBox(height: 16),

            // Grid of categories
            LayoutBuilder(
              builder: (context, constraints) {
                final crossAxisCount = constraints.maxWidth > 500 ? 4 : 2;
                return GridView.builder(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  itemCount: normalCategories.length,
                  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: crossAxisCount,
                    crossAxisSpacing: 10,
                    mainAxisSpacing: 10,
                    childAspectRatio: constraints.maxWidth > 500 ? 1.6 : 2.0,
                  ),
                  itemBuilder: (context, index) {
                    final cat = normalCategories[index];
                    final isSelected = selectedCategory == cat.id;

                    return Material(
                      color: Colors.transparent,
                      child: InkWell(
                        onTap: () => onCategoryChange(cat.id),
                        borderRadius: BorderRadius.circular(16),
                        child: AnimatedContainer(
                          duration: const Duration(milliseconds: 200),
                          decoration: BoxDecoration(
                            gradient: isSelected
                                ? const LinearGradient(
                                    colors: [Color(0xFFFF5722), Color(0xFFEA580C)],
                                    begin: Alignment.topLeft,
                                    end: Alignment.bottomRight,
                                  )
                                : null,
                            color: isSelected ? null : theme.cardColor,
                            borderRadius: BorderRadius.circular(16),
                            border: Border.all(
                              color: isSelected
                                  ? Colors.transparent
                                  : theme.dividerColor.withValues(alpha: 0.4),
                              width: 1.2,
                            ),
                            boxShadow: isSelected
                                ? [
                                    BoxShadow(
                                      color: const Color(0xFFFF5722).withValues(alpha: 0.3),
                                      blurRadius: 8,
                                      offset: const Offset(0, 3),
                                    ),
                                  ]
                                : null,
                          ),
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Text(cat.emoji, style: const TextStyle(fontSize: 22)),
                              const SizedBox(height: 4),
                              Text(
                                cat.name,
                                textAlign: TextAlign.center,
                                style: TextStyle(
                                  fontSize: 12,
                                  fontWeight: isSelected ? FontWeight.bold : FontWeight.w600,
                                  color: isSelected
                                      ? Colors.white
                                      : theme.textTheme.bodyMedium?.color,
                                ),
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                              ),
                            ],
                          ),
                        ),
                      ),
                    );
                  },
                );
              },
            ),

            // Mature Category Section (+18)
            if (!censorMode && matureCategory != null) ...[
              const SizedBox(height: 18),
              Row(
                children: [
                  Expanded(child: Divider(color: Colors.red.withValues(alpha: 0.3))),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 12),
                    child: Text(
                      'ZONA +18',
                      style: TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.bold,
                        letterSpacing: 1.2,
                        color: Colors.red.shade400,
                      ),
                    ),
                  ),
                  Expanded(child: Divider(color: Colors.red.withValues(alpha: 0.3))),
                ],
              ),
              const SizedBox(height: 12),
              InkWell(
                onTap: () => onCategoryChange(matureCategory.id),
                borderRadius: BorderRadius.circular(16),
                child: Container(
                  padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 16),
                  decoration: BoxDecoration(
                    gradient: selectedCategory == matureCategory.id
                        ? const LinearGradient(colors: [Colors.redAccent, Colors.red])
                        : null,
                    color: selectedCategory == matureCategory.id
                        ? null
                        : Colors.red.withValues(alpha: 0.08),
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(
                      color: selectedCategory == matureCategory.id
                          ? Colors.transparent
                          : Colors.red.withValues(alpha: 0.4),
                      width: 1.5,
                    ),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Text('🔞', style: TextStyle(fontSize: 20)),
                      const SizedBox(width: 8),
                      Text(
                        'Acessar Piadas +18 (Zona Adulta)',
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.bold,
                          color: selectedCategory == matureCategory.id
                              ? Colors.white
                              : Colors.redAccent,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
