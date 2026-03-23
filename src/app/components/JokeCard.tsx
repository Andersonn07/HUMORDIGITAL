import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Joke } from '../data/jokes';
import { Button } from './ui/button';
import { Heart, ThumbsUp, ChevronLeft, ChevronRight, Shuffle, EyeOff } from 'lucide-react';
import { CringeVote } from './CringeVote';

interface VoteData {
  funny: number;
  cringe: number;
}

interface JokeCardProps {
  joke: Joke;
  isLiked: boolean;
  isFavorite: boolean;
  onLike: (jokeId: string) => void;
  onFavorite: (jokeId: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  onRandom: () => void;
  currentIndex: number;
  totalJokes: number;
  votes: Record<string, VoteData>;
  userVotes: Record<string, 'funny' | 'cringe'>;
  onCringeVote: (jokeId: string, vote: 'funny' | 'cringe') => void;
  censorMode?: boolean;
}

export function JokeCard({
  joke,
  isLiked,
  isFavorite,
  onLike,
  onFavorite,
  onNext,
  onPrevious,
  onRandom,
  currentIndex,
  totalJokes,
  votes,
  userVotes,
  onCringeVote,
  censorMode = true,
}: JokeCardProps) {
  const { t } = useTranslation();
  const jokeVotes = votes[joke.id] || { funny: 0, cringe: 0 };
  const userVote = userVotes[joke.id] || null;
  const isCensored = censorMode && joke.mature;

  return (
    <motion.div
      key={joke.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl rounded-[2rem] border border-white/60 dark:border-neutral-700/50 p-8 md:p-10 shadow-lg hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500"
    >
      {/* Categoria Badge */}
      <div className="flex justify-between items-start mb-8">
        <span className={`inline-flex items-center gap-2 ${joke.mature ? 'bg-gradient-to-r from-red-500 to-rose-600' : 'bg-gradient-to-r from-orange-500 to-red-500'} text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm`}>
          {joke.mature && <span className="text-base">🔞</span>}
          {t(`categories.names.${joke.category}`)}
        </span>
        <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
          {currentIndex + 1} / {totalJokes}
        </span>
      </div>

      {/* Conteúdo da Piada */}
      <div className="min-h-[220px] flex items-center justify-center mb-10 relative">
        {isCensored ? (
          /* Censored overlay */
          <div className="w-full flex flex-col items-center justify-center gap-4 py-8">
            {/* Blurred text behind */}
            <div className="relative w-full flex items-center justify-center">
              <p className="text-lg md:text-xl text-neutral-800 dark:text-neutral-200 text-center leading-relaxed select-none blur-lg pointer-events-none px-4">
                {joke.content}
              </p>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-950/40 border border-red-300 dark:border-red-800 flex items-center justify-center">
                  <EyeOff className="w-7 h-7 text-red-600 dark:text-red-400" />
                </div>
                <div className="bg-white dark:bg-neutral-900 rounded-2xl px-6 py-4 border border-red-200 dark:border-red-800 shadow-sm text-center max-w-[280px]">
                  <p className="text-red-600 dark:text-red-400 font-semibold text-sm mb-1">{t('censor.matureTitle')}</p>
                  <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed">
                    {t('censor.matureSubtitle')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-lg md:text-xl text-neutral-900 dark:text-neutral-100 text-center leading-relaxed px-4 font-normal">
            {joke.content}
          </p>
        )}
      </div>

      {/* Ações - Curtir e Favoritar */}
      {!isCensored && (
        <div className="flex justify-center gap-3 mb-8">
          <Button
            onClick={() => onLike(joke.id)}
            variant={isLiked ? 'default' : 'outline'}
            size="lg"
            className={`flex-1 max-w-[160px] h-12 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${isLiked
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-orange-500/30 border-transparent'
                : 'bg-white/50 backdrop-blur-sm dark:bg-neutral-800/50 hover:bg-orange-50 dark:hover:bg-orange-950/30 border border-white/60 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'
              }`}
          >
            <ThumbsUp className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
            {t('jokeCard.like')}
          </Button>

          <Button
            onClick={() => onFavorite(joke.id)}
            variant={isFavorite ? 'default' : 'outline'}
            size="lg"
            className={`flex-1 max-w-[160px] h-12 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${isFavorite
                ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-red-500/30 border-transparent'
                : 'bg-white/50 backdrop-blur-sm dark:bg-neutral-800/50 hover:bg-red-50 dark:hover:bg-red-950/30 border border-white/60 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'
              }`}
          >
            <Heart className={`w-4 h-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
            {t('jokeCard.favorite')}
          </Button>
        </div>
      )}

      {/* Sistema de Votação Cringe */}
      {!isCensored && (
        <CringeVote
          jokeId={joke.id}
          funnyVotes={jokeVotes.funny}
          cringeVotes={jokeVotes.cringe}
          userVote={userVote}
          onVote={onCringeVote}
        />
      )}

      {/* Navegação */}
      <div className="flex justify-center items-center gap-3 mt-8">
        <Button
          onClick={onPrevious}
          variant="ghost"
          size="icon"
          className="h-11 w-11 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <Button
          onClick={onRandom}
          variant="outline"
          size="lg"
          className="flex-1 max-w-[200px] h-11 rounded-xl font-semibold bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
        >
          <Shuffle className="w-4 h-4 mr-2" />
          {t('jokeCard.random')}
        </Button>

        <Button
          onClick={onNext}
          variant="ghost"
          size="icon"
          className="h-11 w-11 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Dica de teclado */}
      <div className="mt-5 text-center">
        <p className="text-xs text-neutral-500 dark:text-neutral-500">
          {t('jokeCard.keyboardHint')}
        </p>
      </div>
    </motion.div>
  );
}