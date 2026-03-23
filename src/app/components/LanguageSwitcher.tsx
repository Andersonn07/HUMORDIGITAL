import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const languages = [
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-200"
          title="Mudar idioma"
        >
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium hidden sm:inline">{currentLang.flag} {currentLang.code.toUpperCase()}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700">
        {languages.map((lng) => (
          <DropdownMenuItem
            key={lng.code}
            onClick={() => handleLanguageChange(lng.code)}
            className={`cursor-pointer ${i18n.language === lng.code ? 'font-bold bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400' : 'text-neutral-700 dark:text-neutral-300'}`}
          >
            <span className="mr-2 text-lg">{lng.flag}</span>
            {lng.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
