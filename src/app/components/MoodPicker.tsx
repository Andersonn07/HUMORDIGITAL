import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';

export interface MoodOption {
  id: string;
  emoji: string;
  label: string;
  description: string;
  gradient: string;
  bg: string;
  border: string;
  text: string;
  suggestedCategory: string;
  suggestion: string;
}

export const moods: MoodOption[] = [
  {
    id: 'feliz',
    emoji: '😄',
    label: 'Feliz',
    description: 'Tudo a correr bem!',
    gradient: 'from-yellow-400 to-orange-400',
    bg: 'bg-yellow-50',
    border: 'border-yellow-300',
    text: 'text-yellow-700',
    suggestedCategory: 'anedotas',
    suggestion: 'Que bom! Vamos manter o bom humor com anedotas clássicas! 🎉',
  },
  {
    id: 'animado',
    emoji: '🤩',
    label: 'Animado',
    description: 'Energia no máximo!',
    gradient: 'from-orange-400 to-red-500',
    bg: 'bg-orange-50',
    border: 'border-orange-300',
    text: 'text-orange-700',
    suggestedCategory: 'inteligentes',
    suggestion: 'Com essa energia, piadas inteligentes são o teu palco! 🧠⚡',
  },
  {
    id: 'relaxado',
    emoji: '😌',
    label: 'Relaxado',
    description: 'Modo zen ativado.',
    gradient: 'from-green-400 to-teal-400',
    bg: 'bg-green-50',
    border: 'border-green-300',
    text: 'text-green-700',
    suggestedCategory: 'observacionais',
    suggestion: 'Modo zen! Humor observacional para apreciar sem pressa. 🍃',
  },
  {
    id: 'neutro',
    emoji: '😐',
    label: 'Neutro',
    description: 'Nem bom, nem mau.',
    gradient: 'from-gray-400 to-slate-500',
    bg: 'bg-gray-50',
    border: 'border-gray-300',
    text: 'text-gray-600',
    suggestedCategory: 'trocadilhos',
    suggestion: 'Tá bem, vamos ver se um trocadilho te anima um bocado... 🤓',
  },
  {
    id: 'triste',
    emoji: '😔',
    label: 'Triste',
    description: 'Um dia mais difícil.',
    gradient: 'from-blue-400 to-indigo-500',
    bg: 'bg-blue-50',
    border: 'border-blue-300',
    text: 'text-blue-700',
    suggestedCategory: 'negro',
    suggestion: 'Às vezes o humor negro é a melhor medicina. Vai com calma. 🖤',
  },
  {
    id: 'irritado',
    emoji: '😤',
    label: 'Irritado',
    description: 'Hoje ninguém presta...',
    gradient: 'from-red-500 to-rose-600',
    bg: 'bg-red-50',
    border: 'border-red-300',
    text: 'text-red-700',
    suggestedCategory: 'secas',
    suggestion: 'Calma! Umas piadas secas vão ajudar a respirar fundo. 😤➡️😤',
  },
  {
    id: 'cansado',
    emoji: '😴',
    label: 'Cansado',
    description: 'Preciso de uma sesta.',
    gradient: 'from-purple-400 to-violet-500',
    bg: 'bg-purple-50',
    border: 'border-purple-300',
    text: 'text-purple-700',
    suggestedCategory: 'secas',
    suggestion: 'Sem energia para grandes histórias? Piadas curtas e secas a caminho! 💤',
  },
  {
    id: 'bem_disposto',
    emoji: '😂',
    label: 'Com Humor',
    description: 'Pronto para rir de tudo!',
    gradient: 'from-pink-400 to-rose-500',
    bg: 'bg-pink-50',
    border: 'border-pink-300',
    text: 'text-pink-700',
    suggestedCategory: 'todas',
    suggestion: 'Estás de boa! Todas as categorias estão abertas para ti! 🎭',
  },
];

interface MoodPickerProps {
  isOpen: boolean;
  currentMood: MoodOption | null;
  onSelectMood: (mood: MoodOption) => void;
  onApplySuggestion: (category: string) => void;
  onClose: () => void;
}

export function MoodPicker({ isOpen, currentMood, onSelectMood, onApplySuggestion, onClose }: MoodPickerProps) {
  const { t } = useTranslation();
  const [hoveredMood, setHoveredMood] = useState<string | null>(null);
  const [step, setStep] = useState<'pick' | 'result'>(currentMood ? 'result' : 'pick');
  const [selectedMood, setSelectedMood] = useState<MoodOption | null>(currentMood);

  const handleSelect = (mood: MoodOption) => {
    setSelectedMood(mood);
    onSelectMood(mood);
    setTimeout(() => setStep('result'), 150);
  };

  const handleApply = () => {
    if (selectedMood) {
      onApplySuggestion(selectedMood.suggestedCategory);
      onClose();
    }
  };

  const handleReset = () => {
    setStep('pick');
    setSelectedMood(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            className="fixed inset-x-4 bottom-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg z-50 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden transition-colors duration-300"
          >
            {/* Gradient header */}
            <div className="h-2 bg-gradient-to-r from-orange-400 via-red-400 to-rose-500" />

            <div className="p-6">
              {/* Close */}
              <div className="flex justify-between items-start mb-5">
                <div>
                  <h2 className="text-2xl text-gray-800 dark:text-gray-100" style={{ fontWeight: 700 }}>
                    <Trans i18nKey="moods.title">
                      Como te sentes <span className="text-orange-500">hoje</span>?
                    </Trans>
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    {step === 'pick'
                      ? t('moods.subtitle_pick')
                      : t('moods.subtitle_result')}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <AnimatePresence mode="wait">
                {step === 'pick' ? (
                  <motion.div
                    key="pick"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Mood Grid */}
                    <div className="grid grid-cols-4 gap-3">
                      {moods.map((mood) => {
                        const isHovered = hoveredMood === mood.id;
                        return (
                          <motion.button
                            key={mood.id}
                            whileTap={{ scale: 0.88 }}
                            whileHover={{ scale: 1.08 }}
                            onClick={() => handleSelect(mood)}
                            onMouseEnter={() => setHoveredMood(mood.id)}
                            onMouseLeave={() => setHoveredMood(null)}
                            className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 transition-all duration-200 ${isHovered
                                ? `${mood.bg} ${mood.border} shadow-md`
                                : 'border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 hover:border-gray-200 dark:hover:border-gray-600'
                              }`}
                          >
                            <motion.span
                              className="text-3xl"
                              animate={{ rotate: isHovered ? [0, -10, 10, -5, 0] : 0 }}
                              transition={{ duration: 0.4 }}
                            >
                              {mood.emoji}
                            </motion.span>
                            <span className={`text-xs text-center leading-tight ${isHovered ? mood.text : 'text-gray-600 dark:text-gray-300'}`} style={{ fontWeight: 600 }}>
                              {t(`moods.labels.${mood.id}`)}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Hover description */}
                    <div className="mt-4 h-6 text-center">
                      <AnimatePresence>
                        {hoveredMood && (
                          <motion.p
                            key={hoveredMood}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            className="text-sm text-gray-500 dark:text-gray-400 italic"
                          >
                            {t(`moods.descriptions.${moods.find(m => m.id === hoveredMood)?.id}`)}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="text-center"
                  >
                    {selectedMood && (
                      <>
                        {/* Big emoji */}
                        <motion.div
                          initial={{ scale: 0.5 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', damping: 14, stiffness: 200 }}
                          className={`w-24 h-24 mx-auto rounded-full ${selectedMood.bg} border-4 ${selectedMood.border} flex items-center justify-center mb-4`}
                        >
                          <span className="text-5xl">{selectedMood.emoji}</span>
                        </motion.div>

                        <h3 className={`text-xl mb-1 ${selectedMood.text}`} style={{ fontWeight: 700 }}>
                          {t(`moods.labels.${selectedMood.id}`)}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">{t(`moods.descriptions.${selectedMood.id}`)}</p>

                        {/* Suggestion bubble */}
                        <div className={`${selectedMood.bg} border ${selectedMood.border} rounded-2xl p-4 mb-5 flex items-start gap-3 text-left`}>
                          <Sparkles className={`w-5 h-5 flex-shrink-0 mt-0.5 ${selectedMood.text}`} />
                          <p className={`text-sm ${selectedMood.text}`}>{t(`moods.suggestions.${selectedMood.id}`)}</p>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col gap-2">
                          {selectedMood.suggestedCategory !== 'todas' && (
                            <motion.button
                              whileTap={{ scale: 0.97 }}
                              onClick={handleApply}
                              className={`w-full py-3 px-5 rounded-xl bg-gradient-to-r ${selectedMood.gradient} text-white flex items-center justify-center gap-2`}
                              style={{ fontWeight: 600 }}
                            >
                              {t('moods.view_jokes')}
                              <ArrowRight className="w-4 h-4" />
                            </motion.button>
                          )}

                          <button
                            onClick={onClose}
                            className="w-full py-3 px-5 rounded-xl border-2 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            style={{ fontWeight: 500 }}
                          >
                            {t('moods.view_all')}
                          </button>

                          <button
                            onClick={handleReset}
                            className="text-sm text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors mt-1"
                          >
                            ↩ {t('moods.change_mood')}
                          </button>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}