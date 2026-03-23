import { Sticker } from './StickerCreator';
import { Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface StickersTabProps {
  stickers: Sticker[];
  onDeleteSticker: (id: string) => void;
}

export function StickersTab({ stickers, onDeleteSticker }: StickersTabProps) {
  const { t } = useTranslation();
  if (stickers.length === 0) {
    return (
      <div className="text-center py-16 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 mt-6">
        <p className="text-neutral-500 dark:text-neutral-400 text-sm">{t('stickers.tab.empty_title')}</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">{t('stickers.tab.collection')}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {stickers.map((sticker) => (
          <div
            key={sticker.id}
            className="group relative bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md p-3 rounded-2xl border border-white/60 dark:border-neutral-700/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col items-center justify-center aspect-square"
          >
            <img
              src={sticker.image}
              alt={sticker.name}
              className="max-h-full max-w-full rounded-lg object-contain drop-shadow-sm mb-2"
            />
            <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400 truncate w-full text-center">
              {sticker.name}
            </span>
            <button
              onClick={() => onDeleteSticker(sticker.id)}
              className="absolute top-2 right-2 p-1.5 bg-red-100 dark:bg-red-900/80 text-red-600 dark:text-red-300 rounded-lg opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
              title={t('stickers.tab.delete_tip')}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
