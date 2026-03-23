import { motion } from 'motion/react';
import { ShieldCheck, ShieldOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CensorToggleProps {
  censorMode: boolean;
  onToggle: () => void;
}

export function CensorToggle({ censorMode, onToggle }: CensorToggleProps) {
  const { t } = useTranslation();
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.02 }}
      onClick={onToggle}
      title={censorMode ? t('censor.toggle.activeTitle') : t('censor.toggle.inactiveTitle')}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-300 ${censorMode
          ? 'bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'
          : 'bg-red-50 dark:bg-red-950/30 border-red-300 dark:border-red-700 text-red-700 dark:text-red-400'
        }`}
    >
      <motion.div
        key={censorMode ? 'on' : 'off'}
        initial={{ scale: 0.7, rotate: -15 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', damping: 12, stiffness: 260 }}
      >
        {censorMode ? (
          <ShieldCheck className="w-4 h-4" />
        ) : (
          <ShieldOff className="w-4 h-4" />
        )}
      </motion.div>
      <span className="text-sm font-medium hidden sm:inline">
        {censorMode ? t('censor.toggle.labelActive') : t('censor.toggle.labelInactive')}
      </span>
      {/* LED indicator */}
      <span
        className={`w-2 h-2 rounded-full flex-shrink-0 ${censorMode ? 'bg-green-500' : 'bg-red-500 animate-pulse'
          }`}
      />
    </motion.button>
  );
}
