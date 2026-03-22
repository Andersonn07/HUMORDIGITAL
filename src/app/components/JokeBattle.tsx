import { useState, useMemo } from 'react';
import { UserJoke } from './JokeCreator';
import { Flame, Trash2, TrendingUp, Clock, Trophy, Zap } from 'lucide-react';

interface JokeBattleProps {
  jokes: UserJoke[];
  userVotes: Record<string, 'fire' | 'trash'>;
  onVote: (jokeId: string, vote: 'fire' | 'trash') => void;
  onDeleteJoke: (jokeId: string) => void;
}

type SortOption = 'recent' | 'hot' | 'controversial';

export function JokeBattle({ jokes, userVotes, onVote, onDeleteJoke }: JokeBattleProps) {
  const [sortBy, setSortBy] = useState<SortOption>('hot');

  const sortedJokes = useMemo(() => {
    const jokesCopy = [...jokes];

    switch (sortBy) {
      case 'recent':
        return jokesCopy.sort((a, b) => b.createdAt - a.createdAt);
      
      case 'hot':
        return jokesCopy.sort((a, b) => {
          const scoreA = a.votes.fire - a.votes.trash;
          const scoreB = b.votes.fire - b.votes.trash;
          if (scoreB !== scoreA) return scoreB - scoreA;
          return b.createdAt - a.createdAt;
        });
      
      case 'controversial':
        return jokesCopy.sort((a, b) => {
          const totalA = a.votes.fire + a.votes.trash;
          const totalB = b.votes.fire + b.votes.trash;
          const ratioA = totalA > 0 ? Math.min(a.votes.fire, a.votes.trash) / totalA : 0;
          const ratioB = totalB > 0 ? Math.min(b.votes.fire, b.votes.trash) / totalB : 0;
          if (ratioB !== ratioA) return ratioB - ratioA;
          return totalB - totalA;
        });
      
      default:
        return jokesCopy;
    }
  }, [jokes, sortBy]);

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      anedotas: 'Anedota',
      secas: 'Seca',
      negro: 'Humor Negro',
      trocadilhos: 'Trocadilho',
      inteligentes: 'Inteligente',
      observacional: 'Observacional',
    };
    return labels[category] || category;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      anedotas: 'bg-blue-100 text-blue-700 border-blue-200',
      secas: 'bg-gray-100 text-gray-700 border-gray-200',
      negro: 'bg-purple-100 text-purple-700 border-purple-200',
      trocadilhos: 'bg-green-100 text-green-700 border-green-200',
      inteligentes: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      observacional: 'bg-pink-100 text-pink-700 border-pink-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) return 'agora mesmo';
    if (seconds < 3600) return `há ${Math.floor(seconds / 60)}min`;
    if (seconds < 86400) return `há ${Math.floor(seconds / 3600)}h`;
    return `há ${Math.floor(seconds / 86400)}d`;
  };

  const getRank = (index: number) => {
    if (index === 0) return { emoji: '🥇', color: 'text-yellow-500' };
    if (index === 1) return { emoji: '🥈', color: 'text-gray-400' };
    if (index === 2) return { emoji: '🥉', color: 'text-orange-600' };
    return { emoji: `#${index + 1}`, color: 'text-gray-500' };
  };

  if (jokes.length === 0) {
    return (
      <div className="text-center py-16 bg-white dark:bg-neutral-900 rounded-2xl border border-orange-300 dark:border-orange-800 transition-colors duration-300">
        <div className="text-6xl mb-4">🎭</div>
        <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-2">
          Nenhuma Piada Criada Ainda
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
          Sê o primeiro a criar uma piada e começar a batalha!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Sort Controls */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSortBy('hot')}
          className={`px-4 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
            sortBy === 'hot'
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-sm'
              : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 hover:border-orange-400 dark:hover:border-orange-600'
          }`}
        >
          <Flame className="w-4 h-4" />
          Top
        </button>
        <button
          onClick={() => setSortBy('recent')}
          className={`px-4 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
            sortBy === 'recent'
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-sm'
              : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 hover:border-orange-400 dark:hover:border-orange-600'
          }`}
        >
          <Clock className="w-4 h-4" />
          Recentes
        </button>
        <button
          onClick={() => setSortBy('controversial')}
          className={`px-4 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
            sortBy === 'controversial'
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-sm'
              : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 hover:border-orange-400 dark:hover:border-orange-600'
          }`}
        >
          <Zap className="w-4 h-4" />
          Polémicas
        </button>
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 rounded-xl p-4 border border-orange-300 dark:border-orange-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-orange-600 dark:text-orange-500" />
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">
              {jokes.length} {jokes.length === 1 ? 'Piada' : 'Piadas'} na Batalha
            </span>
          </div>
          <div className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
            {Object.keys(userVotes).length} {Object.keys(userVotes).length === 1 ? 'voto dado' : 'votos dados'}
          </div>
        </div>
      </div>

      {/* Jokes List */}
      <div className="space-y-4">
        {sortedJokes.map((joke, index) => {
          const totalVotes = joke.votes.fire + joke.votes.trash;
          const firePercentage = totalVotes > 0 ? (joke.votes.fire / totalVotes) * 100 : 50;
          const score = joke.votes.fire - joke.votes.trash;
          const userVote = userVotes[joke.id];
          const rank = sortBy === 'hot' ? getRank(index) : null;

          return (
            <div
              key={joke.id}
              className="bg-white dark:bg-neutral-900 rounded-2xl border border-orange-300 dark:border-orange-800 overflow-hidden hover:border-orange-400 dark:hover:border-orange-700 transition-all duration-200"
            >
              {/* Header */}
              <div className="px-4 py-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border-b border-orange-200 dark:border-orange-900 flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {rank && (
                    <span className={`text-2xl font-bold ${rank.color}`}>
                      {rank.emoji}
                    </span>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-neutral-900 dark:text-neutral-100 truncate">
                        {joke.author}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-lg border font-semibold ${getCategoryColor(joke.category)}`}>
                        {getCategoryLabel(joke.category)}
                      </span>
                    </div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-500 flex items-center gap-1 mt-1 font-medium">
                      <Clock className="w-3 h-3" />
                      {formatTimeAgo(joke.createdAt)}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onDeleteJoke(joke.id)}
                  className="p-2 text-neutral-400 dark:text-neutral-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-all"
                  title="Eliminar piada"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <div className="px-5 py-4">
                <p className="text-neutral-800 dark:text-neutral-100 leading-relaxed text-sm">
                  {joke.content}
                </p>
              </div>

              {/* Vote Bar */}
              <div className="px-5 pb-3">
                <div className="relative h-2.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500"
                    style={{ width: `${firePercentage}%` }}
                  />
                </div>
              </div>

              {/* Vote Buttons */}
              <div className="px-5 pb-5 flex gap-2">
                <button
                  onClick={() => onVote(joke.id, 'fire')}
                  className={`flex-1 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                    userVote === 'fire'
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-sm scale-[1.02]'
                      : 'bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 border border-orange-300 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-950/50'
                  }`}
                >
                  <Flame className="w-5 h-5" />
                  <span className="text-lg">{joke.votes.fire}</span>
                </button>

                <div className="flex items-center px-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
                  <div className="text-center">
                    <div className="text-xs text-neutral-500 dark:text-neutral-500 font-medium">Score</div>
                    <div className={`text-lg font-bold ${score > 0 ? 'text-orange-600 dark:text-orange-500' : score < 0 ? 'text-neutral-500 dark:text-neutral-500' : 'text-neutral-400 dark:text-neutral-500'}`}>
                      {score > 0 ? '+' : ''}{score}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onVote(joke.id, 'trash')}
                  className={`flex-1 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                    userVote === 'trash'
                      ? 'bg-neutral-700 dark:bg-neutral-600 text-white shadow-sm scale-[1.02]'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
                >
                  <Trash2 className="w-5 h-5" />
                  <span className="text-lg">{joke.votes.trash}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}