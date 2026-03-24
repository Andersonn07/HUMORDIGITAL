import { Joke } from '../data/jokes';
import { Heart, ThumbsUp, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { useTranslation } from 'react-i18next';

interface FavoritesListProps {
  jokes: Joke[];
  likedJokes: Set<string>;
  onLike: (jokeId: string) => void;
  onFavorite: (jokeId: string) => void;
}

export function FavoritesList({ jokes, likedJokes, onLike, onFavorite }: FavoritesListProps) {
  const { t, i18n } = useTranslation();
  if (jokes.length === 0) {
    return (
      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-16 text-center transition-colors duration-300">
        <Heart className="w-16 h-16 mx-auto text-neutral-300 dark:text-neutral-700 mb-4" />
        <p className="text-neutral-700 dark:text-neutral-300 text-base font-semibold mb-2">{t('favorites.empty.title')}</p>
        <p className="text-neutral-500 dark:text-neutral-500 text-sm">
          {t('favorites.empty.subtitle')}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {jokes.map((joke) => {
        const isLiked = likedJokes.has(joke.id);

        return (
          <div
            key={joke.id}
            className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-200"
          >
            {/* Categoria */}
            <div className="flex justify-between items-start mb-4">
              <span className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold">
                {t(`categories.names.${joke.category}`)}
              </span>
            </div>

            {/* Conteúdo */}
            <p className="text-neutral-800 dark:text-neutral-100 text-base leading-relaxed mb-5">
              {typeof joke.content === 'string' ? joke.content : (joke.content[i18n.language as keyof typeof joke.content] || joke.content.pt)}
            </p>

            {/* Ações */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <div className="flex gap-2">
                <Button
                  onClick={() => onLike(joke.id)}
                  variant="ghost"
                  size="sm"
                  className={`rounded-lg font-medium ${isLiked ? 'text-orange-600 dark:text-orange-500' : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'}`}
                >
                  <ThumbsUp
                    className={`w-4 h-4 mr-1.5 ${isLiked ? 'fill-current' : ''}`}
                  />
                  {isLiked ? t('favorites.actions.liked') : t('favorites.actions.like')}
                </Button>
              </div>

              <Button
                onClick={() => onFavorite(joke.id)}
                variant="ghost"
                size="sm"
                className="text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg font-medium"
              >
                <Trash2 className="w-4 h-4 mr-1.5" />
                {t('favorites.actions.remove')}
              </Button>
            </div>
          </div>
        );
      })}

      <div className="text-center py-4">
        <p className="text-sm text-neutral-500 dark:text-neutral-500 font-medium">
          {t('favorites.stats', { count: jokes.length })}
        </p>
      </div>
    </div>
  );
}