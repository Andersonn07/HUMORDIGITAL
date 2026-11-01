import 'package:flutter/material.dart';

class AgeGateDialog extends StatelessWidget {
  const AgeGateDialog({super.key});

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
      title: const Row(
        children: [
          Text('🔞', style: TextStyle(fontSize: 26)),
          SizedBox(width: 10),
          Text('Controle de Idade', style: TextStyle(fontWeight: FontWeight.bold)),
        ],
      ),
      content: const Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Você está prestes a desativar o filtro de censura.',
            style: TextStyle(fontWeight: FontWeight.w600, fontSize: 15),
          ),
          SizedBox(height: 8),
          Text(
            'Esta seção contém piadas com conteúdo adulto, humor negro e linguagem sem censura.',
            style: TextStyle(fontSize: 13, color: Colors.grey),
          ),
          SizedBox(height: 12),
          Text(
            'Você confirma ter 18 anos ou mais?',
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
          ),
        ],
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(false),
          child: const Text('Cancelar / Sou menor'),
        ),
        ElevatedButton(
          onPressed: () => Navigator.of(context).pop(true),
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.redAccent,
            foregroundColor: Colors.white,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          ),
          child: const Text('Confirmar (+18)'),
        ),
      ],
    );
  }
}
