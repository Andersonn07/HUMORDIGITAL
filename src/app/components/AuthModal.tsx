import { useState, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../lib/firebase';
import { LogIn, UserPlus, X, Mail, Lock } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Simplified error messages mapping
  const getErrorMessage = (code: string) => {
    switch(code) {
      case 'auth/invalid-email': return t('auth.errors.invalidEmail');
      case 'auth/user-not-found': return t('auth.errors.userNotFound');
      case 'auth/wrong-password': return t('auth.errors.wrongPassword');
      case 'auth/email-already-in-use': return t('auth.errors.emailInUse');
      case 'auth/weak-password': return t('auth.errors.weakPassword');
      case 'auth/invalid-api-key': 
      case 'auth/configuration-not-found':
        return t('auth.errorConfig');
      default: return t('auth.errors.default');
    }
  };

  const handleEmailAuth = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (activeTab === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      onClose(); // Automatically close on success
    } catch (err: any) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      onClose();
    } catch (err: any) {
      // User closed popup or other error
      setError(getErrorMessage(err.code) || t('auth.errors.googleFailed'));
    } finally {
      setLoading(false);
    }
  };

  // UI Reset on close/tab change
  const handleTabChange = (val: string) => {
    setActiveTab(val);
    setError('');
    setEmail('');
    setPassword('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden p-0 gap-0">
        
        {/* Decorative Header Background */}
        <div className="h-32 bg-gradient-to-br from-orange-400 to-rose-500 w-full relative">
           <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
        </div>

        <div className="px-6 py-8 relative -mt-6 bg-white dark:bg-neutral-900 rounded-t-3xl">
          <DialogHeader className="mb-6 text-center">
            <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-rose-600 dark:from-orange-400 dark:to-rose-400">
              {activeTab === 'login' ? t('auth.welcomeBack') : t('auth.register')}
            </DialogTitle>
            <DialogDescription className="text-neutral-500 dark:text-neutral-400">
              {activeTab === 'login' 
                ? t('auth.loginSubtitle') 
                : t('auth.registerSubtitle')}
            </DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-neutral-100 dark:bg-neutral-800 rounded-xl p-1">
              <TabsTrigger value="login" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-700 data-[state=active]:shadow-sm">
                <LogIn className="w-4 h-4 mr-2" /> {t('auth.signIn')}
              </TabsTrigger>
              <TabsTrigger value="register" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-700 data-[state=active]:shadow-sm">
                <UserPlus className="w-4 h-4 mr-2" /> {t('auth.signUp')}
              </TabsTrigger>
            </TabsList>

            <form onSubmit={handleEmailAuth} className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-800 text-center">
                  {error}
                </div>
              )}              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-neutral-400" />
                <input
                  type="email"
                  required
                  placeholder={t('auth.email')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-neutral-50 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-neutral-400" />
                <input
                  type="password"
                  required
                  placeholder={t('auth.password')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-neutral-50 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-semibold rounded-xl shadow-md transition-all duration-200 disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  activeTab === 'login' ? t('auth.signIn') : t('auth.signUp')
                )}
              </button>
            </form>

            <div className="mt-6 flex items-center justify-center gap-4">
              <div className="h-[1px] flex-1 bg-neutral-200 dark:bg-neutral-700"></div>
              <span className="text-xs text-neutral-400 font-medium uppercase">{t('auth.orContinueWith')}</span>
              <div className="h-[1px] flex-1 bg-neutral-200 dark:bg-neutral-700"></div>
            </div>

            <button
              onClick={handleGoogleLogin}
              type="button"
              className="mt-6 w-full py-3 px-4 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 text-neutral-700 dark:text-neutral-200 font-medium rounded-xl shadow-sm transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              {t('auth.google')}
            </button>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
