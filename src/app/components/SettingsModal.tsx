import { useState, useRef, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { User as FirebaseUser } from 'firebase/auth';
import { 
  Settings, 
  ShieldCheck, 
  SlidersHorizontal, 
  Sun, 
  Moon, 
  Globe, 
  Smile, 
  RefreshCw, 
  Download, 
  Upload, 
  Trash2, 
  User, 
  LogIn, 
  LogOut, 
  AlertTriangle, 
  FileText, 
  CheckCircle2, 
  ShieldAlert, 
  Database,
  Lock,
  Heart,
  ThumbsUp,
  Image as ImageIcon,
  Swords,
  Trophy,
  Info
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from './ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { toast } from 'sonner';
import { MoodOption } from './MoodPicker';

export interface DataStats {
  favoritesCount: number;
  likesCount: number;
  votesCount: number;
  stickersCount: number;
  battleJokesCount: number;
}

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  censorMode: boolean;
  onToggleCensor: () => void;
  user: FirebaseUser | null;
  onOpenAuthModal: () => void;
  onSignOut: () => void;
  todayMood: MoodOption | null;
  onOpenMoodPicker: () => void;
  onResetMood: () => void;
  dataStats: DataStats;
  onExportData: () => void;
  onImportData: (data: any) => boolean;
  onClearData: (scope: 'all' | 'favorites' | 'votes' | 'stickers') => void;
}

export function SettingsModal({
  isOpen,
  onClose,
  darkMode,
  onToggleDarkMode,
  censorMode,
  onToggleCensor,
  user,
  onOpenAuthModal,
  onSignOut,
  todayMood,
  onOpenMoodPicker,
  onResetMood,
  dataStats,
  onExportData,
  onImportData,
  onClearData,
}: SettingsModalProps) {
  const { t, i18n } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<'general' | 'privacy' | 'terms'>('general');
  const [clearScope, setClearScope] = useState<'all' | 'favorites' | 'votes' | 'stickers' | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const languages = [
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
  ];

  const handleLanguageSelect = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        const success = onImportData(parsed);
        if (success) {
          toast.success(t('settings.data.importSuccess'));
        } else {
          toast.error(t('settings.data.importError'));
        }
      } catch (err) {
        toast.error(t('settings.data.importError'));
      }
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsText(file);
  };

  const requestClear = (scope: 'all' | 'favorites' | 'votes' | 'stickers') => {
    setClearScope(scope);
    setIsAlertOpen(true);
  };

  const handleConfirmClear = () => {
    if (clearScope) {
      onClearData(clearScope);
      toast.success(t('settings.data.clearedSuccess'));
      setClearScope(null);
    }
    setIsAlertOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col p-0 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-2xl shadow-2xl">
          {/* Header Gradient Top Stripe */}
          <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-rose-500 to-purple-600 shrink-0" />

          {/* Modal Header */}
          <DialogHeader className="px-6 pt-5 pb-3 text-left border-b border-neutral-100 dark:border-neutral-800 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-100 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-900/50 flex items-center justify-center text-orange-600 dark:text-orange-400">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
                  {t('settings.modalTitle')}
                  <Badge variant="outline" className="text-[11px] font-semibold text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-900/40 bg-orange-50/50 dark:bg-orange-950/30">
                    RIBO
                  </Badge>
                </DialogTitle>
                <DialogDescription className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  {t('settings.modalSubtitle')}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {/* Hidden File Input for Data Import */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json,application/json"
            className="hidden"
          />

          {/* Tabs Navigation */}
          <div className="px-6 pt-3 shrink-0">
            <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as any)} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-neutral-100 dark:bg-neutral-800/70 p-1.5 rounded-2xl border border-neutral-200/80 dark:border-neutral-700/60">
                <TabsTrigger
                  value="general"
                  className="text-xs sm:text-sm font-medium rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-900 data-[state=active]:text-orange-600 dark:data-[state=active]:text-orange-400 data-[state=active]:shadow-sm transition-all flex items-center justify-center gap-1.5 py-2"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>{t('settings.tabs.general')}</span>
                </TabsTrigger>
                <TabsTrigger
                  value="privacy"
                  className="text-xs sm:text-sm font-medium rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-900 data-[state=active]:text-orange-600 dark:data-[state=active]:text-orange-400 data-[state=active]:shadow-sm transition-all flex items-center justify-center gap-1.5 py-2"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{t('settings.tabs.privacy')}</span>
                </TabsTrigger>
                <TabsTrigger
                  value="terms"
                  className="text-xs sm:text-sm font-medium rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-900 data-[state=active]:text-orange-600 dark:data-[state=active]:text-orange-400 data-[state=active]:shadow-sm transition-all flex items-center justify-center gap-1.5 py-2"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{t('settings.tabs.terms')}</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5 text-neutral-800 dark:text-neutral-200">
            {/* TAB 1: GERAL & APARÊNCIA */}
            {activeTab === 'general' && (
              <div className="space-y-5">
                {/* Visual Theme Selection */}
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-700/50">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                        {darkMode ? <Moon className="w-4 h-4 text-purple-500" /> : <Sun className="w-4 h-4 text-amber-500" />}
                        {t('settings.appearance.themeTitle')}
                      </h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {t('settings.appearance.themeSubtitle')}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => { if (darkMode) onToggleDarkMode(); }}
                      className={`flex items-center justify-center gap-2.5 p-3 rounded-xl border text-sm font-medium transition-all ${
                        !darkMode
                          ? 'bg-white text-orange-600 border-orange-400 shadow-sm ring-2 ring-orange-400/20'
                          : 'bg-neutral-100/50 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      }`}
                    >
                      <Sun className="w-4 h-4 text-amber-500" />
                      <span>{t('settings.appearance.light')}</span>
                      {!darkMode && <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 ml-auto" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => { if (!darkMode) onToggleDarkMode(); }}
                      className={`flex items-center justify-center gap-2.5 p-3 rounded-xl border text-sm font-medium transition-all ${
                        darkMode
                          ? 'bg-neutral-900 text-orange-400 border-orange-500 shadow-sm ring-2 ring-orange-500/20'
                          : 'bg-neutral-100/50 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      }`}
                    >
                      <Moon className="w-4 h-4 text-purple-400" />
                      <span>{t('settings.appearance.dark')}</span>
                      {darkMode && <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 ml-auto" />}
                    </button>
                  </div>
                </div>

                {/* Language Selection */}
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-700/50">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                        <Globe className="w-4 h-4 text-sky-500" />
                        {t('settings.appearance.languageTitle')}
                      </h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {t('settings.appearance.languageSubtitle')}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {languages.map((lng) => {
                      const isSelected = i18n.language === lng.code;
                      return (
                        <button
                          key={lng.code}
                          type="button"
                          onClick={() => handleLanguageSelect(lng.code)}
                          className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                            isSelected
                              ? 'bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border-orange-400 dark:border-orange-800 shadow-sm ring-2 ring-orange-400/20'
                              : 'bg-white dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                          }`}
                        >
                          <span className="text-base">{lng.flag}</span>
                          <span>{lng.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Daily Mood Management */}
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-700/50">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                        <Smile className="w-4 h-4 text-rose-500" />
                        {t('settings.dailyMood.title')}
                      </h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {t('settings.dailyMood.subtitle')}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      {todayMood ? (
                        <>
                          <div className={`w-11 h-11 rounded-2xl ${todayMood.bg} border ${todayMood.border} flex items-center justify-center text-2xl shadow-sm shrink-0`}>
                            {todayMood.emoji}
                          </div>
                          <div>
                            <p className="text-xs text-neutral-400">{t('settings.dailyMood.current')}</p>
                            <p className={`text-sm font-bold ${todayMood.text}`}>
                              {t(`moods.labels.${todayMood.id}`)}
                            </p>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center gap-2.5 text-neutral-500 dark:text-neutral-400 text-xs">
                          <Smile className="w-5 h-5 text-neutral-400" />
                          <span>{t('settings.dailyMood.noMood')}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          onClose();
                          setTimeout(() => onOpenMoodPicker(), 200);
                        }}
                        className="text-xs rounded-xl h-8 px-3"
                      >
                        {t('settings.dailyMood.change')}
                      </Button>
                      {todayMood && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            onResetMood();
                            toast.success(t('settings.dailyMood.resetSuccess'));
                          }}
                          className="text-xs rounded-xl h-8 px-2.5 text-neutral-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                          title={t('settings.dailyMood.reset')}
                        >
                          <RefreshCw className="w-3.5 h-3.5 mr-1" />
                          {t('settings.dailyMood.reset')}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: PRIVACIDADE & DADOS */}
            {activeTab === 'privacy' && (
              <div className="space-y-5">
                {/* Content Safety (+18 / Censorship) */}
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-700/50">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🔞</span>
                        <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                          {t('settings.safety.censorTitle')}
                        </h4>
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                        {t('settings.safety.censorDesc')}
                      </p>
                      <div className="mt-2.5">
                        <Badge
                          variant={censorMode ? "secondary" : "destructive"}
                          className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                            censorMode 
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800' 
                              : 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300 border-red-300 dark:border-red-800'
                          }`}
                        >
                          {censorMode ? t('settings.safety.censorActive') : t('settings.safety.censorInactive')}
                        </Badge>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant={censorMode ? "outline" : "default"}
                      onClick={onToggleCensor}
                      className={`rounded-xl text-xs font-medium shrink-0 h-9 px-3.5 ${
                        !censorMode ? 'bg-red-600 hover:bg-red-700 text-white' : ''
                      }`}
                    >
                      {censorMode ? t('settings.safety.censorBtnDisable') : t('settings.safety.censorBtnEnable')}
                    </Button>
                  </div>
                </div>

                {/* Account & Session */}
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-700/50">
                  <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2 flex items-center gap-2">
                    <User className="w-4 h-4 text-indigo-500" />
                    {t('settings.account.title')}
                  </h4>

                  <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {user && user.photoURL ? (
                        <img src={user.photoURL} alt="Avatar" className="w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-700" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center text-neutral-500 dark:text-neutral-300">
                          <User className="w-5 h-5" />
                        </div>
                      )}
                      <div>
                        {user ? (
                          <>
                            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                              {t('settings.account.connected')}
                            </p>
                            <p className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                              {user.displayName || user.email}
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                              {t('settings.account.guest')}
                            </p>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">
                              {t('settings.account.guestDesc')}
                            </p>
                          </>
                        )}
                      </div>
                    </div>

                    <div>
                      {user ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            onSignOut();
                            toast.success(t('settings.account.logoutSuccess'));
                          }}
                          className="text-xs rounded-xl h-8 text-neutral-600 hover:text-red-600 dark:text-neutral-400 dark:hover:text-red-400"
                        >
                          <LogOut className="w-3.5 h-3.5 mr-1.5" />
                          {t('settings.account.logoutBtn')}
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => {
                            onClose();
                            setTimeout(() => onOpenAuthModal(), 200);
                          }}
                          className="text-xs rounded-xl h-8 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white shadow-sm"
                        >
                          <LogIn className="w-3.5 h-3.5 mr-1.5" />
                          {t('settings.account.loginBtn')}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Local Storage Metrics (LGPD / RGPD) */}
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-700/50">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                        <Database className="w-4 h-4 text-emerald-500" />
                        {t('settings.data.title')}
                      </h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {t('settings.data.subtitle')}
                      </p>
                    </div>
                  </div>

                  {/* Metrics grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-4">
                    <div className="p-3 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/70 dark:border-neutral-700/70 text-center">
                      <Heart className="w-4 h-4 text-red-500 mx-auto mb-1" />
                      <p className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                        {dataStats.favoritesCount}
                      </p>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                        {t('settings.data.stats.favorites')}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/70 dark:border-neutral-700/70 text-center">
                      <ThumbsUp className="w-4 h-4 text-orange-500 mx-auto mb-1" />
                      <p className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                        {dataStats.likesCount}
                      </p>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                        {t('settings.data.stats.likes')}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/70 dark:border-neutral-700/70 text-center">
                      <Trophy className="w-4 h-4 text-amber-500 mx-auto mb-1" />
                      <p className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                        {dataStats.votesCount}
                      </p>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                        {t('settings.data.stats.votes')}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/70 dark:border-neutral-700/70 text-center">
                      <ImageIcon className="w-4 h-4 text-indigo-500 mx-auto mb-1" />
                      <p className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                        {dataStats.stickersCount}
                      </p>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                        {t('settings.data.stats.stickers')}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/70 dark:border-neutral-700/70 text-center col-span-2 sm:col-span-1">
                      <Swords className="w-4 h-4 text-purple-500 mx-auto mb-1" />
                      <p className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                        {dataStats.battleJokesCount}
                      </p>
                      <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                        {t('settings.data.stats.battleJokes')}
                      </p>
                    </div>
                  </div>

                  {/* Actions: Export / Import / Clear */}
                  <div className="space-y-2 pt-2 border-t border-neutral-200/60 dark:border-neutral-700/60">
                    {/* Export */}
                    <div className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700/60">
                      <div>
                        <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                          {t('settings.data.export')}
                        </p>
                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                          {t('settings.data.exportDesc')}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={onExportData}
                        className="text-xs rounded-xl h-8 px-3 shrink-0"
                      >
                        <Download className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                        {t('settings.data.exportBtn')}
                      </Button>
                    </div>

                    {/* Import */}
                    <div className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700/60">
                      <div>
                        <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                          {t('settings.data.import')}
                        </p>
                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                          {t('settings.data.importDesc')}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-xs rounded-xl h-8 px-3 shrink-0"
                      >
                        <Upload className="w-3.5 h-3.5 mr-1 text-sky-500" />
                        {t('settings.data.importBtn')}
                      </Button>
                    </div>

                    {/* Clear Data Options */}
                    <div className="pt-2">
                      <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                        {t('settings.data.clearOptions.title')}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => requestClear('favorites')}
                          className="text-[11px] h-8 rounded-xl justify-start px-2.5 text-neutral-600 dark:text-neutral-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 border border-neutral-200/50 dark:border-neutral-700/50"
                        >
                          <Trash2 className="w-3 h-3 mr-1.5 text-neutral-400" />
                          {t('settings.data.clearOptions.favorites')}
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => requestClear('votes')}
                          className="text-[11px] h-8 rounded-xl justify-start px-2.5 text-neutral-600 dark:text-neutral-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 border border-neutral-200/50 dark:border-neutral-700/50"
                        >
                          <Trash2 className="w-3 h-3 mr-1.5 text-neutral-400" />
                          {t('settings.data.clearOptions.votes')}
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => requestClear('stickers')}
                          className="text-[11px] h-8 rounded-xl justify-start px-2.5 text-neutral-600 dark:text-neutral-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 border border-neutral-200/50 dark:border-neutral-700/50"
                        >
                          <Trash2 className="w-3 h-3 mr-1.5 text-neutral-400" />
                          {t('settings.data.clearOptions.stickers')}
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => requestClear('all')}
                          className="text-[11px] h-8 rounded-xl justify-start px-2.5 text-red-600 hover:bg-red-100/70 dark:text-red-400 dark:hover:bg-red-950/40 border border-red-200 dark:border-red-900/50 font-semibold"
                        >
                          <AlertTriangle className="w-3 h-3 mr-1.5 text-red-500" />
                          {t('settings.data.clearOptions.all')}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: TERMOS & SOBRE */}
            {activeTab === 'terms' && (
              <div className="space-y-4">
                {/* 100% Client First */}
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-700/50 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <ShieldCheck className="w-5 h-5" />
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      {t('settings.terms.clientFirstTitle')}
                    </h4>
                  </div>
                  <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {t('settings.terms.clientFirstDesc')}
                  </p>
                </div>

                {/* Zero Invasive Ads */}
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-700/50 space-y-2">
                  <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400">
                    <Lock className="w-5 h-5" />
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      {t('settings.terms.noAdsTitle')}
                    </h4>
                  </div>
                  <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {t('settings.terms.noAdsDesc')}
                  </p>
                </div>

                {/* LGPD & GDPR Compliance */}
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-700/50 space-y-2">
                  <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                    <Database className="w-5 h-5" />
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      {t('settings.terms.lgpdTitle')}
                    </h4>
                  </div>
                  <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {t('settings.terms.lgpdDesc')}
                  </p>
                </div>

                {/* Content Responsibility */}
                <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-700/50 space-y-2">
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                    <Info className="w-5 h-5" />
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      {t('settings.terms.contentTitle')}
                    </h4>
                  </div>
                  <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {t('settings.terms.contentDesc')}
                  </p>
                </div>

                {/* Version and Footer info */}
                <div className="text-center pt-3 pb-1">
                  <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                    {t('settings.terms.appInfo')}
                  </p>
                  <p className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-0.5">
                    {t('settings.terms.madeWith')}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-3.5 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 flex justify-end shrink-0">
            <Button
              onClick={onClose}
              className="rounded-xl px-5 text-xs font-semibold bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
            >
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog for Data Deletion */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="rounded-2xl border-red-200 dark:border-red-900">
          <AlertDialogHeader>
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center text-red-600 dark:text-red-400 mb-2">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <AlertDialogTitle className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              {t('settings.data.confirmTitle')}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-neutral-600 dark:text-neutral-400">
              {t('settings.data.confirmDesc')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">{t('settings.data.cancelBtn')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmClear}
              className="rounded-xl bg-red-600 hover:bg-red-700 text-white"
            >
              {t('settings.data.confirmBtn')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
