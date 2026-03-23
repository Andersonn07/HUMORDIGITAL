import { useState, useEffect, useCallback } from 'react';
import { JokeCard } from './components/JokeCard';
import { CategoryFilter } from './components/CategoryFilter';
import { FavoritesList } from './components/FavoritesList';
import { CringeRanking } from './components/CringeRanking';
import { MoodPicker, MoodOption, moods } from './components/MoodPicker';
import { MoodBadge } from './components/MoodBadge';
import { JokeCreator, UserJoke } from './components/JokeCreator';
import { JokeBattle } from './components/JokeBattle';
import { AgeGateModal } from './components/AgeGateModal';
import { CensorToggle } from './components/CensorToggle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Laugh, Heart, Trophy, Swords, Moon, Sun, Image as ImageIcon, User, BarChart2 } from 'lucide-react';
import { jokes } from './data/jokes';
import riboLogo from '../assets/4f55b7e853d8fc4351fdb96487e91bfce54b09b5.png';
import { StickerCreator, Sticker } from './components/StickerCreator';
import { StickersTab } from './components/StickersTab';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { MoodDashboard } from './components/MoodDashboard';
import { AuthModal } from './components/AuthModal';

interface VoteData {
  funny: number;
  cringe: number;
}

export interface MoodEntry {
  id: string;
  mood: string;
  intensity: number;
  note?: string;
  timestamp: number;
}

function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

export default function App() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [currentJokeIndex, setCurrentJokeIndex] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [likedJokes, setLikedJokes] = useState<Set<string>>(new Set());
  const [votes, setVotes] = useState<Record<string, VoteData>>({});
  const [userVotes, setUserVotes] = useState<Record<string, 'funny' | 'cringe'>>({});
  const [todayMood, setTodayMood] = useState<MoodOption | null>(null);
  const [moodPickerOpen, setMoodPickerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('piadas');
  const [userJokes, setUserJokes] = useState<UserJoke[]>([]);
  const [battleVotes, setBattleVotes] = useState<Record<string, 'fire' | 'trash'>>({});
  const [darkMode, setDarkMode] = useState(false);
  const [censorMode, setCensorMode] = useState(true);
  const [ageGateOpen, setAgeGateOpen] = useState(false);
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    // Firebase Auth Listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const storedFavorites = localStorage.getItem('favoriteJokes');
    const storedLikes = localStorage.getItem('likedJokes');
    const storedVotes = localStorage.getItem('jokeVotes');
    const storedUserVotes = localStorage.getItem('jokeUserVotes');
    const storedMoodKey = localStorage.getItem('moodDayKey');
    const storedMoodId = localStorage.getItem('moodTodayId');
    const storedUserJokes = localStorage.getItem('userJokes');
    const storedBattleVotes = localStorage.getItem('battleVotes');
    const storedDarkMode = localStorage.getItem('darkMode');
    const storedCensorMode = localStorage.getItem('censorMode');
    const storedStickers = localStorage.getItem('userStickers');

    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
    if (storedLikes) setLikedJokes(new Set(JSON.parse(storedLikes)));
    if (storedVotes) setVotes(JSON.parse(storedVotes));
    if (storedUserVotes) setUserVotes(JSON.parse(storedUserVotes));
    if (storedUserJokes) setUserJokes(JSON.parse(storedUserJokes));
    if (storedBattleVotes) setBattleVotes(JSON.parse(storedBattleVotes));
    if (storedStickers) setStickers(JSON.parse(storedStickers));

    const isDark = storedDarkMode === 'true';
    if (isDark) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    // censorMode defaults to true unless explicitly set to false
    if (storedCensorMode === 'false') {
      setCensorMode(false);
    }

    // Load today's mood (resets each day)
    const todayKey = getTodayKey();
    if (storedMoodKey === todayKey && storedMoodId) {
      const found = moods.find(m => m.id === storedMoodId);
      if (found) {
        setTodayMood(found);
      } else {
        setTimeout(() => setMoodPickerOpen(true), 600);
      }
    } else {
      setTimeout(() => setMoodPickerOpen(true), 600);
    }

    return () => unsubscribe();
  }, []);

  const handleToggleDarkMode = () => {
    const newDark = !darkMode;
    setDarkMode(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(newDark));
  };

  const handleToggleCensor = () => {
    if (censorMode) {
      // Turning OFF censorship → show age gate
      setAgeGateOpen(true);
    } else {
      // Turning ON censorship → re-enable immediately
      setCensorMode(true);
      localStorage.setItem('censorMode', 'true');
      // If currently on the mature category, switch back to all
      if (selectedCategory === 'censurado') {
        setSelectedCategory('todas');
        setCurrentJokeIndex(0);
      }
    }
  };

  const handleAgeConfirm = () => {
    setAgeGateOpen(false);
    setCensorMode(false);
    localStorage.setItem('censorMode', 'false');
  };

  const handleAgeDeny = () => {
    setAgeGateOpen(false);
    // censorMode stays true
  };

  const filteredJokes = selectedCategory === 'todas'
    ? (censorMode ? jokes.filter(j => !j.mature) : jokes)
    : jokes.filter(joke => joke.category === selectedCategory);

  const currentJoke = filteredJokes[currentJokeIndex];

  const handleNext = () => {
    setCurrentJokeIndex((prev) => (prev + 1) % filteredJokes.length);
  };

  const handlePrevious = () => {
    setCurrentJokeIndex((prev) => (prev - 1 + filteredJokes.length) % filteredJokes.length);
  };

  const handleLike = (jokeId: string) => {
    const newLikes = new Set(likedJokes);
    if (newLikes.has(jokeId)) {
      newLikes.delete(jokeId);
    } else {
      newLikes.add(jokeId);
    }
    setLikedJokes(newLikes);
    localStorage.setItem('likedJokes', JSON.stringify(Array.from(newLikes)));
  };

  const handleFavorite = (jokeId: string) => {
    let newFavorites: string[];
    if (favorites.includes(jokeId)) {
      newFavorites = favorites.filter(id => id !== jokeId);
    } else {
      newFavorites = [...favorites, jokeId];
    }
    setFavorites(newFavorites);
    localStorage.setItem('favoriteJokes', JSON.stringify(newFavorites));
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentJokeIndex(0);
  };

  const handleRandom = () => {
    const randomIndex = Math.floor(Math.random() * filteredJokes.length);
    setCurrentJokeIndex(randomIndex);
  };

  const handleCringeVote = useCallback((jokeId: string, vote: 'funny' | 'cringe') => {
    const previousUserVote = userVotes[jokeId];
    const currentVotes = votes[jokeId] || { funny: 0, cringe: 0 };

    if (previousUserVote === vote) {
      const newVotes = {
        ...votes,
        [jokeId]: {
          funny: currentVotes.funny - (vote === 'funny' ? 1 : 0),
          cringe: currentVotes.cringe - (vote === 'cringe' ? 1 : 0),
        },
      };
      const newUserVotes = { ...userVotes };
      delete newUserVotes[jokeId];
      setVotes(newVotes);
      setUserVotes(newUserVotes);
      localStorage.setItem('jokeVotes', JSON.stringify(newVotes));
      localStorage.setItem('jokeUserVotes', JSON.stringify(newUserVotes));
      return;
    }

    const newVotes = {
      ...votes,
      [jokeId]: {
        funny: currentVotes.funny + (vote === 'funny' ? 1 : 0) - (previousUserVote === 'funny' ? 1 : 0),
        cringe: currentVotes.cringe + (vote === 'cringe' ? 1 : 0) - (previousUserVote === 'cringe' ? 1 : 0),
      },
    };
    const newUserVotes = { ...userVotes, [jokeId]: vote };
    setVotes(newVotes);
    setUserVotes(newUserVotes);
    localStorage.setItem('jokeVotes', JSON.stringify(newVotes));
    localStorage.setItem('jokeUserVotes', JSON.stringify(newUserVotes));
  }, [votes, userVotes]);

  const handleSelectMood = (mood: MoodOption) => {
    setTodayMood(mood);
    const todayKey = getTodayKey();
    localStorage.setItem('moodDayKey', todayKey);
    localStorage.setItem('moodTodayId', mood.id);
  };

  const handleApplyMoodSuggestion = (category: string) => {
    setSelectedCategory(category);
    setCurrentJokeIndex(0);
    setActiveTab('piadas');
    setMoodPickerOpen(false);
  };

  const handleJokeCreated = (joke: UserJoke) => {
    const newUserJokes = [joke, ...userJokes];
    setUserJokes(newUserJokes);
    localStorage.setItem('userJokes', JSON.stringify(newUserJokes));
  };

  const handleBattleVote = (jokeId: string, vote: 'fire' | 'trash') => {
    const previousVote = battleVotes[jokeId];

    // Update user's vote state
    let newBattleVotes = { ...battleVotes };
    if (previousVote === vote) {
      delete newBattleVotes[jokeId];
    } else {
      newBattleVotes[jokeId] = vote;
    }
    setBattleVotes(newBattleVotes);
    localStorage.setItem('battleVotes', JSON.stringify(newBattleVotes));

    // Update joke votes
    const updatedJokes = userJokes.map(joke => {
      if (joke.id !== jokeId) return joke;

      const newVotes = { ...joke.votes };
      
      // Remove previous vote if it exists
      if (previousVote === 'fire') newVotes.fire = Math.max(0, newVotes.fire - 1);
      if (previousVote === 'trash') newVotes.trash = Math.max(0, newVotes.trash - 1);

      // Add new vote if different from previous
      if (previousVote !== vote) {
        if (vote === 'fire') newVotes.fire += 1;
        if (vote === 'trash') newVotes.trash += 1;
      }

      return { ...joke, votes: newVotes };
    });

    setUserJokes(updatedJokes);
    localStorage.setItem('userJokes', JSON.stringify(updatedJokes));
  };

  const handleDeleteJoke = (jokeId: string) => {
    const updatedJokes = userJokes.filter(joke => joke.id !== jokeId);
    setUserJokes(updatedJokes);
    localStorage.setItem('userJokes', JSON.stringify(updatedJokes));

    // Also remove vote for this joke
    const newBattleVotes = { ...battleVotes };
    delete newBattleVotes[jokeId];
    setBattleVotes(newBattleVotes);
    localStorage.setItem('battleVotes', JSON.stringify(newBattleVotes));
  };

  const handleStickerCreated = (sticker: Sticker) => {
    const newStickers = [sticker, ...stickers];
    setStickers(newStickers);
    localStorage.setItem('userStickers', JSON.stringify(newStickers));
  };

  const handleDeleteSticker = (id: string) => {
    const newStickers = stickers.filter(s => s.id !== id);
    setStickers(newStickers);
    localStorage.setItem('userStickers', JSON.stringify(newStickers));
  };

  const favoriteJokes = jokes.filter(joke => favorites.includes(joke.id));
  const totalVotes = Object.values(votes).reduce((acc, v) => acc + v.funny + v.cringe, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-rose-50 to-purple-100 dark:from-neutral-950 dark:via-purple-950/20 dark:to-neutral-950 transition-colors duration-500">
      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
      
      {/* Mood Picker Modal */}
      <MoodPicker
        isOpen={moodPickerOpen}
        currentMood={todayMood}
        onSelectMood={handleSelectMood}
        onApplySuggestion={handleApplyMoodSuggestion}
        onClose={() => setMoodPickerOpen(false)}
      />

      {/* Age Gate Modal */}
      <AgeGateModal
        isOpen={ageGateOpen}
        onConfirm={handleAgeConfirm}
        onDeny={handleAgeDeny}
      />

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <div className="relative overflow-hidden flex flex-col items-center justify-center mb-10 py-12 px-6 bg-white/70 dark:bg-neutral-900/60 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-white/60 dark:border-neutral-700/50 transition-all duration-500 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1">
          {/* Controls row */}
          <div className="self-stretch flex items-center justify-end gap-3 mb-6">
            <LanguageSwitcher />
            <button
               onClick={() => user ? auth.signOut() : setIsAuthModalOpen(true)}
               className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-200"
               title={user ? 'Sair' : 'Entrar'}
            >
               {user && user.photoURL ? (
                 <img src={user.photoURL} alt="User" className="w-5 h-5 rounded-full" />
               ) : (
                 <User className="w-4 h-4" />
               )}
               <span className="text-sm font-medium hidden sm:inline">
                 {user ? t('app.logout') : t('app.login')}
               </span>
            </button>
            <CensorToggle censorMode={censorMode} onToggle={handleToggleCensor} />
            <button
              onClick={handleToggleDarkMode}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-200"
              title={darkMode ? 'Modo Claro' : 'Modo Noturno'}
            >
              {darkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
              <span className="text-sm font-medium hidden sm:inline">
                {darkMode ? t('app.themeLight') : t('app.themeDark')}
              </span>
            </button>
          </div>

          <img
            src={riboLogo}
            alt="RIBO Logo"
            className="h-48 md:h-56 w-auto mb-6 drop-shadow-lg hover:scale-105 transition-transform duration-300 mx-auto"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-3">
            {t('app.title')}
          </h1>
          <p className="text-center text-neutral-600 dark:text-neutral-400 text-base md:text-lg max-w-md leading-relaxed">
            {t('app.subtitle')}
          </p>

          {/* Mood Badge */}
          <div className="mt-6">
            <MoodBadge mood={todayMood} onClick={() => setMoodPickerOpen(true)} />
          </div>
        </div>

        {/* Censor mode banner */}
        {!censorMode && (
          <div className="mb-6 px-5 py-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 flex items-center gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center">
              <span className="text-xl">🔞</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-red-900 dark:text-red-300 mb-0.5">
                {t('censor.active')}
              </p>
              <p className="text-xs text-red-700 dark:text-red-400">
                {t('censor.description')}
              </p>
            </div>
            <button
               onClick={handleToggleCensor}
               className="flex-shrink-0 text-xs font-medium text-red-700 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 transition-colors underline"
             >
               {t('censor.turnOff')}
             </button>
          </div>
        )}

        {/* Mood suggestion banner (if mood selected) */}
        {todayMood && selectedCategory === todayMood.suggestedCategory && todayMood.suggestedCategory !== 'todas' && (
          <div className={`mb-6 px-5 py-4 rounded-2xl ${todayMood.bg} border ${todayMood.border} flex items-center gap-4`}>
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/50 dark:bg-black/20 flex items-center justify-center">
              <span className="text-xl">{todayMood.emoji}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold ${todayMood.text} mb-0.5`}>
                {t('app.moodBanner.mode', { mood: t(`moods.labels.${todayMood.id}`) })}
              </p>
              <p className={`text-xs ${todayMood.text} opacity-80`}>
                {t('app.moodBanner.subtitle')}
              </p>
            </div>
            <button
              onClick={() => handleCategoryChange('todas')}
              className={`flex-shrink-0 text-xs font-medium ${todayMood.text} hover:opacity-100 transition-opacity underline`}
            >
              {t('app.moodBanner.viewAll')}
            </button>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-10 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-xl p-2 rounded-2xl border border-white/40 dark:border-neutral-700/50 shadow-sm">
            <TabsTrigger
              value="piadas"
              className="text-sm font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-800 data-[state=active]:text-orange-600 dark:data-[state=active]:text-orange-500 data-[state=active]:shadow-sm rounded-xl transition-all"
            >
              <Laugh className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">{t('tabs.jokes')}</span>
              <span className="sm:hidden">{t('tabs.jokes')}</span>
            </TabsTrigger>
            <TabsTrigger
              value="favoritos"
              className="text-sm font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-800 data-[state=active]:text-orange-600 dark:data-[state=active]:text-orange-500 data-[state=active]:shadow-sm rounded-xl transition-all"
            >
              <Heart className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">{t('tabs.favorites')}</span>
              <span className="sm:hidden">{t('tabs.favorites')}</span>
              {favorites.length > 0 && (
                <span className="ml-1.5 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400 text-xs px-2 py-0.5 rounded-full font-semibold">
                  {favorites.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="ranking"
              className="text-sm font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-800 data-[state=active]:text-orange-600 dark:data-[state=active]:text-orange-500 data-[state=active]:shadow-sm rounded-xl transition-all"
            >
              <Trophy className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">{t('tabs.ranking')}</span>
              <span className="sm:hidden">{t('tabs.ranking')}</span>
              {totalVotes > 0 && (
                <span className="ml-1.5 bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-400 text-xs px-2 py-0.5 rounded-full font-semibold">
                  {totalVotes}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="batalha"
              className="text-sm font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-800 data-[state=active]:text-orange-600 dark:data-[state=active]:text-orange-500 data-[state=active]:shadow-sm rounded-xl transition-all"
            >
              <Swords className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">{t('tabs.battle')}</span>
              <span className="sm:hidden">{t('tabs.battle')}</span>
              {userJokes.length > 0 && (
                <span className="ml-1.5 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-400 text-xs px-2 py-0.5 rounded-full font-semibold">
                  {userJokes.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="stickers"
              className="text-sm font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-800 data-[state=active]:text-orange-600 dark:data-[state=active]:text-orange-500 data-[state=active]:shadow-sm rounded-xl transition-all"
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">{t('tabs.stickers')}</span>
              <span className="sm:hidden">{t('tabs.stickers')}</span>
              {stickers.length > 0 && (
                <span className="ml-1.5 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 text-xs px-2 py-0.5 rounded-full font-semibold">
                  {stickers.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="dashboard"
              className="text-sm font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-800 data-[state=active]:text-orange-600 dark:data-[state=active]:text-orange-500 data-[state=active]:shadow-sm rounded-xl transition-all"
            >
              <BarChart2 className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">{t('tabs.dashboard')}</span>
              <span className="sm:hidden text-[10px]">{t('tabs.dashboard').substring(0, 4)}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="piadas" className="space-y-6">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              censorMode={censorMode}
            />

            {filteredJokes.length > 0 ? (
              <JokeCard
                joke={currentJoke}
                isLiked={likedJokes.has(currentJoke.id)}
                isFavorite={favorites.includes(currentJoke.id)}
                onLike={handleLike}
                onFavorite={handleFavorite}
                onNext={handleNext}
                onPrevious={handlePrevious}
                onRandom={handleRandom}
                currentIndex={currentJokeIndex}
                totalJokes={filteredJokes.length}
                votes={votes}
                userVotes={userVotes}
                onCringeVote={handleCringeVote}
                censorMode={censorMode}
              />
            ) : (
              <div className="text-center py-16 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800">
                <p className="text-neutral-500 dark:text-neutral-400 text-sm">{t('jokes.emptyCategory')}</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="favoritos">
            <FavoritesList
              jokes={favoriteJokes}
              likedJokes={likedJokes}
              onLike={handleLike}
              onFavorite={handleFavorite}
            />
          </TabsContent>

          <TabsContent value="ranking" className="space-y-6">
            <CringeRanking votes={votes} />
          </TabsContent>

          <TabsContent value="dashboard">
             <MoodDashboard />
          </TabsContent>

          <TabsContent value="batalha" className="space-y-6">
            <JokeCreator onJokeCreated={handleJokeCreated} />
            <JokeBattle
              jokes={userJokes}
              userVotes={battleVotes}
              onVote={handleBattleVote}
              onDeleteJoke={handleDeleteJoke}
            />
          </TabsContent>

          <TabsContent value="stickers" className="space-y-6">
            <StickerCreator onStickerCreated={handleStickerCreated} />
            <StickersTab stickers={stickers} onDeleteSticker={handleDeleteSticker} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}