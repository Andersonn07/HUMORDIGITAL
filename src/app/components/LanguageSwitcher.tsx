import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { getAppLanguage } from '../../i18n/utils';

const languages = [
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const activeLangCode = getAppLanguage(i18n.language);

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    try {
      localStorage.setItem('i18nextLng', lng);
    } catch {
      // Ignora erro em modo privado
    }
  };

  const currentLang = languages.find((l) => l.code === activeLangCode) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-200 active:scale-95"
          title={t('app.changeLanguage')}
          aria-label={t('app.changeLanguage')}
        >
          <Globe className="w-4 h-4 text-orange-500" />
          <span className="text-sm font-semibold">{currentLang.flag} {currentLang.code.toUpperCase()}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 shadow-xl rounded-xl p-1 min-w-[140px]">
        {languages.map((lng) => {
          const isSelected = activeLangCode === lng.code;
          return (
            <DropdownMenuItem
              key={lng.code}
              onClick={() => handleLanguageChange(lng.code)}
              className={`cursor-pointer px-3 py-2.5 rounded-lg flex items-center justify-between text-sm transition-colors ${isSelected
                  ? 'font-bold bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400'
                  : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-base">{lng.flag}</span>
                <span>{lng.name}</span>
              </span>
              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
