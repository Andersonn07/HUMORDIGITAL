import { motion } from 'motion/react';

interface CringeVoteProps {
  jokeId: string;
  funnyVotes: number;
  cringeVotes: number;
  userVote: 'funny' | 'cringe' | null;
  onVote: (jokeId: string, vote: 'funny' | 'cringe') => void;
}

export function CringeVote({ jokeId, funnyVotes, cringeVotes, userVote, onVote }: CringeVoteProps) {
  const total = funnyVotes + cringeVotes;
  const funnyPct = total > 0 ? Math.round((funnyVotes / total) * 100) : 50;
  const cringePct = total > 0 ? Math.round((cringeVotes / total) * 100) : 50;

  const getCringeLabel = () => {
    if (total === 0) return { text: 'Sem votos ainda', color: 'text-gray-400' };
    if (cringePct >= 80) return { text: '💀 Dolorosamente cringe!', color: 'text-red-500' };
    if (cringePct >= 60) return { text: '😬 Bastante cringe...', color: 'text-orange-500' };
    if (funnyPct >= 80) return { text: '🔥 Genuinamente engraçado!', color: 'text-green-600' };
    if (funnyPct >= 60) return { text: '😄 Mais engraçado que cringe', color: 'text-emerald-500' };
    return { text: '🤷 Os votos estão divididos', color: 'text-yellow-500' };
  };

  const verdict = getCringeLabel();

  return (
    <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
      {/* Título */}
      <p className="text-center text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-4 tracking-wider uppercase">
        Júri Popular — É engraçado ou é cringe?
      </p>

      {/* Botões de voto */}
      <div className="flex gap-3 justify-center mb-5">
        <motion.button
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.02 }}
          onClick={() => onVote(jokeId, 'funny')}
          className={`flex-1 max-w-[150px] py-3.5 px-4 rounded-xl border transition-all duration-200 flex flex-col items-center gap-1.5 ${
            userVote === 'funny'
              ? 'bg-green-600 border-green-600 text-white shadow-sm'
              : 'bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/20 hover:border-green-400 dark:hover:border-green-700'
          }`}
        >
          <span className="text-2xl">😂</span>
          <span className="text-sm font-bold">Engraçado!</span>
          {total > 0 && (
            <span className="text-xs opacity-90 font-medium">{funnyVotes} voto{funnyVotes !== 1 ? 's' : ''}</span>
          )}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.02 }}
          onClick={() => onVote(jokeId, 'cringe')}
          className={`flex-1 max-w-[150px] py-3.5 px-4 rounded-xl border transition-all duration-200 flex flex-col items-center gap-1.5 ${
            userVote === 'cringe'
              ? 'bg-red-600 border-red-600 text-white shadow-sm'
              : 'bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 hover:border-red-400 dark:hover:border-red-700'
          }`}
        >
          <span className="text-2xl">😬</span>
          <span className="text-sm font-bold">Cringe!</span>
          {total > 0 && (
            <span className="text-xs opacity-90 font-medium">{cringeVotes} voto{cringeVotes !== 1 ? 's' : ''}</span>
          )}
        </motion.button>
      </div>

      {/* Cringe-o-metro */}
      {total > 0 && (
        <div className="space-y-3">
          <div className="flex justify-between text-xs font-medium text-neutral-600 dark:text-neutral-400 px-1">
            <span>😂 {funnyPct}%</span>
            <span className={`font-bold ${verdict.color}`}>{verdict.text}</span>
            <span>{cringePct}% 😬</span>
          </div>
          <div className="h-3 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden flex">
            <motion.div
              className="h-full bg-gradient-to-r from-green-500 to-green-600"
              initial={{ width: 0 }}
              animate={{ width: `${funnyPct}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
            <motion.div
              className="h-full bg-gradient-to-r from-orange-500 to-red-600"
              initial={{ width: 0 }}
              animate={{ width: `${cringePct}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>
          <p className="text-center text-xs text-neutral-500 dark:text-neutral-500 font-medium">{total} voto{total !== 1 ? 's' : ''} no total</p>
        </div>
      )}
    </div>
  );
}