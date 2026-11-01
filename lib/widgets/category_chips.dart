import 'package:flutter/material.dart';
import '../models/joke.dart';

class CategoryChips extends StatelessWidget {
  final List<JokeCategory> categories;
  final String selectedCategory;
  final bool censorMode;
  final Function(String) onSelectCategory;

  const CategoryChips({
    super.key,
    required this.categories,
    required this.selectedCategory,
    required this.censorMode,
    required this.onSelectCategory,
  });

  @override
  Widget build(BuildContext context) {
    final availableCategories = categories.where((c) {
      if (censorMode && c.mature) return false;
      return true;
    }).toList();

    return SizedBox(
      height: 48,
      child: ListView.separated(
        padding: const EdgeInsets.symmetric(horizontal: 16),
        scrollDirection: Axis.horizontal,
        itemCount: availableCategories.length,
        separatorBuilder: (context, index) => const SizedBox(width: 8),
        itemBuilder: (context, index) {
          final cat = availableCategories[index];
          final isSelected = cat.id == selectedCategory;
          final isMature = cat.mature;

          return Material(
            color: Colors.transparent,
            child: InkWell(
              onTap: () => onSelectCategory(cat.id),
              borderRadius: BorderRadius.circular(24),
              child: AnimatedContainer(
                duration: const Duration(milliseconds: 200),
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                decoration: BoxDecoration(
                  gradient: isSelected
                      ? (isMature
                          ? const LinearGradient(colors: [Colors.redAccent, Colors.red])
                          : const LinearGradient(colors: [Color(0xFFFF6B00), Color(0xFFFF3D00)]))
                      : null,
                  color: isSelected
                      ? null
                      : (isMature
                          ? Colors.red.withOpacity(0.12)
                          : Theme.of(context).cardColor),
                  borderRadius: BorderRadius.circular(24),
                  border: Border.all(
                    color: isSelected
                        ? Colors.transparent
                        : (isMature
                            ? Colors.red.withOpacity(0.4)
                            : Theme.of(context).dividerColor),
                    width: 1.2,
                  ),
                  boxShadow: isSelected
                      ? [
                          BoxShadow(
                            color: (isMature ? Colors.red : const Color(0xFFFF5722))
                                .withOpacity(0.35),
                            blurRadius: 8,
                            offset: const Offset(0, 3),
                          )
                        ]
                      : null,
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(cat.emoji, style: const TextStyle(fontSize: 18)),
                    const SizedBox(width: 6),
                    Text(
                      cat.name,
                      style: TextStyle(
                        fontSize: 13,
                        fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
                        color: isSelected
                            ? Colors.white
                            : (isMature
                                ? Colors.redAccent
                                : Theme.of(context).textTheme.bodyMedium?.color),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
