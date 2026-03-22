import { MoodEntry } from '../App';
import { Smile, Meh, Frown, Angry, Heart, Sparkles, Trash2 } from 'lucide-react';
import { Button } from './ui/button';

interface MoodHistoryProps {
  entries: MoodEntry[];
  onDelete: (id: string) => void;
}

const moodIcons: Record<string, any> = {
  'Feliz': Smile,
  'Animado': Sparkles,
  'Apaixonado': Heart,
  'Neutro': Meh,
  'Triste': Frown,
  'Irritado': Angry,
};

const moodColors: Record<string, string> = {
  'Feliz': 'text-green-500 bg-green-100',
  'Animado': 'text-yellow-500 bg-yellow-100',
  'Apaixonado': 'text-pink-500 bg-pink-100',
  'Neutro': 'text-gray-500 bg-gray-100',
  'Triste': 'text-blue-500 bg-blue-100',
  'Irritado': 'text-red-500 bg-red-100',
};

export function MoodHistory({ entries, onDelete }: MoodHistoryProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-12">
        <Meh className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <p className="text-gray-500">Nenhum registro ainda. Comece registrando seu humor!</p>
      </div>
    );
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const entryDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    if (entryDate.getTime() === today.getTime()) {
      return `Hoje às ${date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (entryDate.getTime() === yesterday.getTime()) {
      return `Ontem às ${date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Seus registros</h3>
      
      {entries.map((entry) => {
        const Icon = moodIcons[entry.mood];
        const colorClass = moodColors[entry.mood];
        
        return (
          <div
            key={entry.id}
            className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 bg-white hover:shadow-md transition-shadow"
          >
            <div className={`${colorClass} p-3 rounded-full flex-shrink-0`}>
              <Icon className="w-6 h-6" />
            </div>
            
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-800">{entry.mood}</span>
                <span className="text-xs text-gray-500">• Intensidade: {entry.intensity}/10</span>
              </div>
              <p className="text-sm text-gray-500 mb-2">{formatDate(entry.timestamp)}</p>
              {entry.note && (
                <p className="text-gray-700 text-sm">{entry.note}</p>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(entry.id)}
              className="text-gray-400 hover:text-red-500 flex-shrink-0"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        );
      })}
    </div>
  );
}
