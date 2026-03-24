import { motion } from 'motion/react';
import { MoodOption } from './MoodPicker';
import { Smile } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface MoodBadgeProps {
  mood: MoodOption | null;
  onClick: () => void;
}

export function MoodBadge({ mood, onClick }: MoodBadgeProps) {
  const { t } = useTranslation();
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl border transition-all duration-200 ${mood
          ? `${mood.bg} ${mood.border} ${mood.text}`
          : 'bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-500 hover:bg-orange-100 dark:hover:bg-orange-950/50'
        }`}
    >
      {mood ? (
        <>
          <motion.span
            key={mood.id}
            initial={{ scale: 0.5, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 12, stiffness: 260 }}
            className="text-xl"
          >
            {mood.emoji}
          </motion.span>
          <span className="text-sm font-semibold">
            {mood.label}
          </span>
          <span className="text-xs opacity-70 font-medium">• hoje</span>
        </>
      ) : (
        <>
          <Smile className="w-4 h-4" />
          <span className="text-sm font-semibold">
            {t('moods.badge_prompt')}
          </span>
        </>
      )}
    </motion.button>
  );
}
