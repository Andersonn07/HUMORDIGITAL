import { useState } from 'react';
import { Plus, Sparkles, Send, RefreshCw, User, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { gerarPiadaComIA } from '../../lib/jokeAi';
import { getAppLanguage } from '../../i18n/utils';

export interface UserJoke {
  id: string;
  content: string;
  category: string;
  author: string;
  createdAt: number;
  votes: {
    fire: number;
    trash: number;
  };
  generatedByAi?: boolean;
}

interface JokeCreatorProps {
  onJokeCreated: (joke: UserJoke) => void;
}

export function JokeCreator({ onJokeCreated }: JokeCreatorProps) {
  const { t, i18n } = useTranslation();
  const currentLang = getAppLanguage(i18n.language);

  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [category, setCategory] = useState('anedotas');
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const jokeCategories = ['anedotas', 'secas', 'negro', 'trocadilhos', 'inteligentes', 'observacionais'];

  // Gerar piada com IA a partir do que o utilizador escreveu
  const handleGenerate = async (e?: React.MouseEvent | React.FormEvent) => {
    if (e) e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const result = await gerarPiadaComIA({
        prompt: customPrompt.trim(),
        category,
        language: currentLang,
      });

      setContent(result.text);
      setHasGenerated(true);
      toast.success(t('jokeCreator.aiSuccessToast', 'Piada gerada com sucesso!'));
    } catch (e) {
      console.error('Erro ao gerar piada:', e);
      toast.error(t('jokeCreator.fallbackToast', 'Não foi possível gerar no momento.'));
    } finally {
      setLoading(false);
    }
  };

  // Submeter a piada para a Batalha
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error('Por favor, escreve ou gera uma piada primeiro.');
      return;
    }

    const finalAuthor = author.trim() || 'Anónimo';

    const newJoke: UserJoke = {
      id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      content: content.trim(),
      category,
      author: finalAuthor,
      createdAt: Date.now(),
      votes: {
        fire: 0,
        trash: 0,
      },
      generatedByAi: hasGenerated,
    };

    onJokeCreated(newJoke);
    setContent('');
    setCustomPrompt('');
    setHasGenerated(false);
    setIsExpanded(false);
    toast.success(t('jokeCreator.publish') + ' ✓');
  };

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="w-full py-4 sm:py-5 px-6 bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 text-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3 group"
        aria-label={t('jokeCreator.button')}
      >
        <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        <span className="font-bold text-base sm:text-lg tracking-tight">{t('jokeCreator.button')}</span>
        <Sparkles className="w-5 h-5 group-hover:animate-pulse text-amber-200" />
      </button>
    );
  }

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-orange-300 dark:border-orange-800/70 p-5 sm:p-7 shadow-xl transition-all duration-300 space-y-5">
      {/* Cabeçalho */}
      <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-100 dark:border-neutral-800">
        <div className="w-9 h-9 rounded-xl bg-orange-100 dark:bg-orange-950/50 flex items-center justify-center text-orange-600 dark:text-orange-400">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100">
            {t('jokeCreator.title')}
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Escreve o tema e a IA gera a piada para ti.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo do Autor */}
        <div>
          <label htmlFor="author" className="block text-xs sm:text-sm font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
            {t('jokeCreator.nameLabel')}
          </label>
          <div className="relative">
            <input
              id="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder={t('jokeCreator.namePlaceholder')}
              maxLength={40}
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 text-sm transition-all"
            />
            <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Campo Principal: Que tipo de piada queres? */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-purple-50/70 via-indigo-50/30 to-orange-50/20 dark:from-purple-950/30 dark:via-indigo-950/20 dark:to-neutral-900 border border-purple-200/80 dark:border-purple-800/40 space-y-3">
          <label htmlFor="customPrompt" className="block text-xs sm:text-sm font-bold text-purple-900 dark:text-purple-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            {t('jokeCreator.promptLabel')}
          </label>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              id="customPrompt"
              type="text"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleGenerate();
                }
              }}
              placeholder={t('jokeCreator.promptPlaceholder')}
              className="flex-1 px-4 py-3 text-sm border border-purple-300 dark:border-purple-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 shadow-inner"
            />

            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading}
              className="py-3 px-5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl flex items-center justify-center gap-2 font-bold text-sm shadow-md transition-all active:scale-95 disabled:opacity-50 whitespace-nowrap"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{t('jokeCreator.generating')}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{t('jokeCreator.generate')}</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 pt-1">
            <span>Dica: Carrega em Enter ou clica no botão para gerar.</span>
            <div className="flex items-center gap-1.5">
              <label htmlFor="categorySelect" className="font-medium">Categoria:</label>
              <select
                id="categorySelect"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-2 py-1 text-xs border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
              >
                {jokeCategories.map((catId) => (
                  <option key={catId} value={catId}>
                    {t(`categories.names.${catId}`)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Campo da Piada Gerada / Pronta para Publicar */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="content" className="block text-xs sm:text-sm font-bold text-neutral-700 dark:text-neutral-300">
              {t('jokeCreator.jokeLabel')}
            </label>
            {hasGenerated && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                <CheckCircle2 className="w-3 h-3" />
                Piada Pronta!
              </span>
            )}
          </div>

          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t('jokeCreator.jokePlaceholder')}
            rows={4}
            maxLength={500}
            className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 text-sm placeholder-neutral-400 leading-relaxed"
            required
          />

          <div className="text-right text-[11px] text-neutral-400 dark:text-neutral-500 mt-1 font-medium">
            {content.length}/500
          </div>
        </div>

        {/* Botões de Ação Finais */}
        <div className="flex flex-wrap gap-2.5 sm:gap-3 pt-2">
          <button
            type="submit"
            disabled={!content.trim() || loading}
            className="flex-1 min-w-[140px] py-3 px-5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:shadow-lg transition-all font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>{t('jokeCreator.publish')}</span>
          </button>

          {hasGenerated && (
            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading}
              className="py-3 px-4 border border-purple-300 dark:border-purple-800 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/40 rounded-xl transition-all font-semibold text-sm active:scale-95 flex items-center gap-1.5"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>{t('jokeCreator.generateAnother', 'Gerar Outra')}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              setIsExpanded(false);
              setContent('');
              setCustomPrompt('');
              setHasGenerated(false);
            }}
            className="py-3 px-5 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors font-semibold text-sm active:scale-95"
          >
            {t('jokeCreator.cancel')}
          </button>
        </div>
      </form>
    </div>
  );
}
