import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { jokes } from '../data/jokes';
import { Trophy, Skull, BarChart2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface VoteData {
  funny: number;
  cringe: number;
}

interface CringeRankingProps {
  votes: Record<string, VoteData>;
}

type RankMode = 'funny' | 'cringe' | 'contested';

export function CringeRanking({ votes }: CringeRankingProps) {
  const { t } = useTranslation();
  const [mode, setMode] = useState<RankMode>('funny');

  const jokesWithVotes = jokes
    .map((joke) => {
      const v = votes[joke.id] || { funny: 0, cringe: 0 };
      const total = v.funny + v.cringe;
      const funnyPct = total > 0 ? (v.funny / total) * 100 : 0;
      const cringePct = total > 0 ? (v.cringe / total) * 100 : 0;
      return { ...joke, funny: v.funny, cringe: v.cringe, total, funnyPct, cringePct };
    })
    .filter((j) => j.total > 0);

  const sorted = [...jokesWithVotes].sort((a, b) => {
    if (mode === 'funny') return b.funnyPct - a.funnyPct;
    if (mode === 'cringe') return b.cringePct - a.cringePct;
    // contested = closest to 50/50
    const diffA = Math.abs(a.funnyPct - 50);
    const diffB = Math.abs(b.funnyPct - 50);
    return diffA - diffB;
  });

  const tabs: { id: RankMode; label: string; icon: React.ReactNode; color: string; activeColor: string }[] = [
    {
      id: 'funny',
      label: t('ranking.tabs.funny'),
      icon: <Trophy className="w-4 h-4" />,
      color: 'border-green-200 text-green-700',
      activeColor: 'bg-green-500 text-white border-green-500',
    },
    {
      id: 'cringe',
      label: t('ranking.tabs.cringe'),
      icon: <Skull className="w-4 h-4" />,
      color: 'border-red-200 text-red-700',
      activeColor: 'bg-red-500 text-white border-red-500',
    },
    {
      id: 'contested',
      label: t('ranking.tabs.contested'),
      icon: <BarChart2 className="w-4 h-4" />,
      color: 'border-yellow-200 text-yellow-700',
      activeColor: 'bg-yellow-500 text-white border-yellow-500',
    },
  ];

  const getModeLabel = () => {
    if (mode === 'funny') return { emoji: '🏆', desc: t('ranking.modes.funny.desc') };
    if (mode === 'cringe') return { emoji: '💀', desc: t('ranking.modes.cringe.desc') };
    return { emoji: '⚔️', desc: t('ranking.modes.contested.desc') };
  };

  const modeInfo = getModeLabel();

  const getCategoryName = (cat: string) => {
    return t(`categories.names.${cat}`);
  };

  const getRankBadge = (index: number, mode: RankMode) => {
    if (index === 0) {
      if (mode === 'funny') return { bg: 'bg-yellow-400', emoji: '🥇' };
      if (mode === 'cringe') return { bg: 'bg-red-500', emoji: '💀' };
      return { bg: 'bg-purple-500', emoji: '⚔️' };
    }
    if (index === 1) return { bg: 'bg-gray-300', emoji: mode === 'funny' ? '🥈' : mode === 'cringe' ? '😬' : '🤷' };
    if (index === 2) return { bg: 'bg-orange-400', emoji: mode === 'funny' ? '🥉' : mode === 'cringe' ? '😵' : '😐' };
    return { bg: 'bg-gray-100', emoji: `${index + 1}` };
  };

  return (
    <div className="space-y-5">
      {/* Tabs */}
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setMode(tab.id)}
            className={`flex-1 py-3 px-2 rounded-xl border transition-all duration-200 flex items-center justify-center gap-2 text-sm font-semibold ${mode === tab.id ? tab.activeColor + ' shadow-sm' : `bg-white dark:bg-neutral-900 ${tab.color} dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800`
              }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Header do modo */}
      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 text-center transition-colors duration-300">
        <p className="text-3xl mb-2">{modeInfo.emoji}</p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{modeInfo.desc}</p>
      </div>

      {/* Lista de piadas */}
      {sorted.length === 0 ? (
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-16 text-center transition-colors duration-300">
          <p className="text-4xl mb-3">🗳️</p>
          <p className="text-neutral-700 dark:text-neutral-300 text-base font-semibold mb-2">{t('ranking.empty.title')}</p>
          <p className="text-neutral-500 dark:text-neutral-500 text-sm leading-relaxed">
            {t('ranking.empty.subtitle')}
          </p>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-3"
          >
            {sorted.slice(0, 15).map((joke, index) => {
              const badge = getRankBadge(index, mode);
              return (
                <motion.div
                  key={joke.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-200"
                >
                  <div className="flex items-start gap-3">
                    {/* Posição */}
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-xl ${badge.bg} flex items-center justify-center text-base font-bold ${index < 3 ? 'text-white' : 'text-neutral-700 dark:text-neutral-300'}`}
                    >
                      {badge.emoji}
                    </div>

                    {/* Conteúdo */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs bg-gradient-to-r from-orange-500 to-red-500 text-white px-2.5 py-1 rounded-lg font-semibold">
                          {getCategoryName(joke.category)}
                        </span>
                        <span className="text-xs text-neutral-500 dark:text-neutral-500 font-medium">{t('ranking.stats.votes', { count: joke.total })}</span>
                      </div>

                      <p className="text-neutral-800 dark:text-neutral-100 text-sm leading-relaxed mb-3 line-clamp-3">
                        {joke.content}
                      </p>

                      {/* Mini barra */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-green-600 dark:text-green-500 w-10 text-right font-semibold">{Math.round(joke.funnyPct)}%</span>
                        <div className="flex-1 h-2.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden flex">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500"
                            style={{ width: `${joke.funnyPct}%` }}
                          />
                          <div
                            className="h-full bg-gradient-to-r from-orange-500 to-red-600 transition-all duration-500"
                            style={{ width: `${joke.cringePct}%` }}
                          />
                        </div>
                        <span className="text-xs text-red-600 dark:text-red-500 w-10 font-semibold">{Math.round(joke.cringePct)}%</span>
                      </div>

                      <div className="flex gap-3 mt-2">
                        <span className="text-xs text-neutral-500 dark:text-neutral-500 font-medium">😂 {joke.funny}</span>
                        <span className="text-xs text-neutral-500 dark:text-neutral-500 font-medium">😬 {joke.cringe}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      )}

      {sorted.length > 0 && (
        <p className="text-center text-xs text-neutral-500 dark:text-neutral-500 py-2 font-medium">
          {t('ranking.stats.jokes', { count: sorted.length })}
        </p>
      )}
    </div>
  );
}