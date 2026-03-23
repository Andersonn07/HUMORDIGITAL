import { categories } from '../data/jokes';
import { useTranslation, Trans } from 'react-i18next';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  censorMode: boolean;
}

export function CategoryFilter({ selectedCategory, onCategoryChange, censorMode }: CategoryFilterProps) {
  const { t } = useTranslation();
  const normalCategories = categories.filter((c) => !c.mature);
  const matureCategory = categories.find((c) => c.mature);

  return (
    <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl rounded-[2rem] border border-white/60 dark:border-neutral-700/50 p-6 transition-all duration-500 shadow-md hover:shadow-xl">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">{t('categories.title')}</h3>
        {!censorMode && (
          <span className="text-xs bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 px-3 py-1 rounded-full font-semibold">
            {t('categories.adultMode')}
          </span>
        )}
      </div>

      {/* Categorias normais */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {normalCategories.map((category) => {
          const isSelected = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`${isSelected
                ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30 border-transparent'
                : 'bg-white/50 backdrop-blur-sm dark:bg-neutral-800/50 text-neutral-700 dark:text-neutral-300 hover:bg-orange-50/50 dark:hover:bg-neutral-700/50 hover:border-orange-300 dark:hover:border-orange-700 border border-white/60 dark:border-neutral-700/50'
                } p-4 rounded-xl transition-all duration-300 hover:scale-[1.03] active:scale-95 hover:-translate-y-1 hover:shadow-md flex flex-col items-center gap-2`}
            >
              <span className="text-2xl">{category.emoji}</span>
              <span className="text-sm font-semibold text-center leading-tight">{t(`categories.names.${category.id}`)}</span>
            </button>
          );
        })}
      </div>

      {/* Separador + Zona +18 */}
      {!censorMode && matureCategory && (
        <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          {/* Divider com label */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-red-200 dark:bg-red-900/50" />
            <span className="text-xs text-red-600 dark:text-red-400 font-bold tracking-wider uppercase">
              {t('categories.adultZone')}
            </span>
            <div className="flex-1 h-px bg-red-200 dark:bg-red-900/50" />
          </div>

          {/* Botão Zona +18 — ocupa largura total com design especial */}
          <button
            onClick={() => onCategoryChange(matureCategory.id)}
            className={`w-full rounded-xl transition-all duration-200 active:scale-[0.98] overflow-hidden border ${selectedCategory === matureCategory.id
              ? 'border-red-500 dark:border-red-600 shadow-sm scale-[1.01]'
              : 'border-red-200 dark:border-red-900 hover:border-red-400 dark:hover:border-red-700 hover:scale-[1.01]'
              }`}
          >
            <div
              className={`relative flex items-center gap-4 px-5 py-4 ${selectedCategory === matureCategory.id
                ? 'bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white'
                : 'bg-gradient-to-r from-red-50 via-rose-50 to-red-50 dark:from-red-950/30 dark:via-rose-950/20 dark:to-red-950/30 text-red-700 dark:text-red-300'
                }`}
            >
              {/* Faixas decorativas de "zona proibida" */}
              <div className="absolute inset-y-0 left-0 w-1.5 overflow-hidden opacity-20">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 ${i % 2 === 0 ? 'bg-red-700' : 'bg-transparent'}`}
                  />
                ))}
              </div>
              <div className="absolute inset-y-0 right-0 w-1.5 overflow-hidden opacity-20">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 ${i % 2 === 0 ? 'bg-red-700' : 'bg-transparent'}`}
                  />
                ))}
              </div>

              <span className="text-3xl ml-1">{matureCategory.emoji}</span>
              <div className="flex-1 text-left min-w-0">
                <p className="font-bold text-sm">{t(`categories.names.${matureCategory.id}`)}</p>
                <p className={`text-xs mt-1 leading-relaxed ${selectedCategory === matureCategory.id ? 'text-red-100' : 'text-red-600 dark:text-red-400'}`}>
                  {t('censor.description')}
                </p>
              </div>
              <div className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold border ${selectedCategory === matureCategory.id
                ? 'bg-white/20 border-white/30 text-white'
                : 'bg-red-100 dark:bg-red-950/50 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400'
                }`}>
                29
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Teaser bloqueado — só visível com modo censura ON */}
      {censorMode && (
        <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />
            <span className="text-xs text-neutral-500 dark:text-neutral-500 font-bold tracking-wider uppercase">
              {t('categories.blockedContent')}
            </span>
            <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />
          </div>
          <div className="relative rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 overflow-hidden">
            {/* Conteúdo borrão */}
            <div className="flex items-center gap-4 px-5 py-4 blur-md select-none pointer-events-none bg-neutral-50 dark:bg-neutral-800/50">
              <span className="text-3xl">🔞</span>
              <div className="flex-1 text-left min-w-0">
                <p className="font-bold text-sm text-neutral-500 dark:text-neutral-500">Zona +18</p>
                <p className="text-xs mt-1 text-neutral-500 dark:text-neutral-500">Sexualidade · Religião · Humor Negro Pesado</p>
              </div>
            </div>
            {/* Overlay de cadeado */}
            <div className="absolute inset-0 flex items-center justify-center gap-3 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm">
              <span className="text-xl">🔒</span>
              <p className="text-sm text-neutral-700 dark:text-neutral-400 font-medium">
                <Trans i18nKey="categories.unlockAdult">
                  Desbloqueia o <span className="font-bold text-orange-600 dark:text-orange-500">Modo Adulto</span> para aceder
                </Trans>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}