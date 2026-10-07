import { useState, useEffect, useMemo } from 'react';
import { Sticker, defaultStickers } from '../data/defaultStickers';
import { StickerPreviewModal } from './StickerPreviewModal';
import { StickerCreator } from './StickerCreator';
import { copyStickerToClipboard } from '../utils/stickerUtils';
import {
  Search,
  Star,
  Clock,
  Plus,
  Trash2,
  Copy,
  Sparkles,
  Smile,
  Flame,
  Laugh,
  Check,
  Share2,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

interface StickersTabProps {
  stickers: Sticker[]; // User custom stickers
  onDeleteSticker: (id: string) => void;
  onStickerCreated: (sticker: Sticker) => void;
  onReactToCurrentJoke?: (sticker: Sticker) => void;
}

type CategoryTab = 'all' | 'favorites' | 'recent' | 'memes' | 'reactions' | 'viral' | 'custom';

export function StickersTab({
  stickers,
  onDeleteSticker,
  onStickerCreated,
  onReactToCurrentJoke,
}: StickersTabProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<CategoryTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recents, setRecents] = useState<string[]>([]);
  const [selectedSticker, setSelectedSticker] = useState<Sticker | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Load favorites & recents from localStorage
  useEffect(() => {
    const storedFavs = localStorage.getItem('favoriteStickerIds');
    const storedRecents = localStorage.getItem('recentStickerIds');
    if (storedFavs) {
      try {
        setFavorites(JSON.parse(storedFavs));
      } catch {
        /* empty */
      }
    } else {
      // Default initial favorites: Flork & Risada KKK
      setFavorites(['sticker-flork-olhando', 'sticker-risada-kkk', 'sticker-capivara-estilosa']);
    }

    if (storedRecents) {
      try {
        setRecents(JSON.parse(storedRecents));
      } catch {
        /* empty */
      }
    }
  }, []);

  const handleToggleFavorite = (stickerId: string) => {
    let newFavs: string[];
    if (favorites.includes(stickerId)) {
      newFavs = favorites.filter((id) => id !== stickerId);
      toast.info(t('stickers.tab.removed_fav', 'Removido dos favoritos.'));
    } else {
      newFavs = [...favorites, stickerId];
      toast.success(t('stickers.tab.added_fav', 'Adicionado aos favoritos ⭐'), {
        icon: '⭐',
      });
    }
    setFavorites(newFavs);
    localStorage.setItem('favoriteStickerIds', JSON.stringify(newFavs));
  };

  const markRecent = (stickerId: string) => {
    const updated = [stickerId, ...recents.filter((id) => id !== stickerId)].slice(0, 20);
    setRecents(updated);
    localStorage.setItem('recentStickerIds', JSON.stringify(updated));
  };

  // Combine default preset stickers with user custom stickers
  const allStickers = useMemo(() => {
    return [...stickers, ...defaultStickers];
  }, [stickers]);

  // Filter stickers by active tab and search query
  const filteredStickers = useMemo(() => {
    let list = allStickers;

    if (activeTab === 'favorites') {
      list = list.filter((s) => favorites.includes(s.id));
    } else if (activeTab === 'recent') {
      list = list.filter((s) => recents.includes(s.id));
    } else if (activeTab === 'custom') {
      list = list.filter((s) => s.isCustom || s.category === 'custom');
    } else if (activeTab !== 'all') {
      list = list.filter((s) => s.category === activeTab);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          (s.packName && s.packName.toLowerCase().includes(q)) ||
          s.tags?.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    return list;
  }, [allStickers, activeTab, searchQuery, favorites, recents]);

  const handleStickerClick = (sticker: Sticker) => {
    markRecent(sticker.id);
    setSelectedSticker(sticker);
    setIsPreviewOpen(true);
  };

  const handleQuickCopy = async (e: React.MouseEvent, sticker: Sticker) => {
    e.stopPropagation();
    markRecent(sticker.id);
    const res = await copyStickerToClipboard(sticker.image);
    if (res === 'copied_image') {
      setCopiedId(sticker.id);
      toast.success(t('stickers.modal.copied_toast', 'Figurinha copiada! (Ctrl+V)'), {
        icon: '✨',
      });
      setTimeout(() => setCopiedId(null), 2000);
    } else {
      setSelectedSticker(sticker);
      setIsPreviewOpen(true);
    }
  };

  const tabsConfig = [
    { id: 'all', label: t('stickers.tabs.all', 'Todos'), icon: Sparkles, count: allStickers.length },
    { id: 'favorites', label: t('stickers.tabs.favorites', 'Favoritos'), icon: Star, count: favorites.length },
    { id: 'recent', label: t('stickers.tabs.recent', 'Recentes'), icon: Clock, count: recents.length },
    { id: 'memes', label: t('stickers.tabs.memes', 'Memes'), icon: Laugh, count: allStickers.filter((s) => s.category === 'memes').length },
    { id: 'reactions', label: t('stickers.tabs.reactions', 'Reações'), icon: Smile, count: allStickers.filter((s) => s.category === 'reactions').length },
    { id: 'viral', label: t('stickers.tabs.viral', 'Virais'), icon: Flame, count: allStickers.filter((s) => s.category === 'viral').length },
    { id: 'custom', label: t('stickers.tabs.custom', 'Minhas Figurinhas'), icon: Plus, count: stickers.length },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner (Humor Digital Sticker Hub) */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-rose-500 to-purple-600 rounded-[2rem] p-6 md:p-8 text-white shadow-xl shadow-orange-950/15">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/25 backdrop-blur-md text-xs font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Humor Digital • Sticker Studio
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">
              {t('stickers.title', 'Figurinhas & Memes')}
            </h2>
            <p className="text-xs md:text-sm text-white/90 mt-1 max-w-md">
              {t('stickers.hub_sub', 'Toca em qualquer figurinha para copiar ou partilhar com amigos!')}
            </p>
          </div>

          <button
            onClick={() => setIsCreatorOpen(!isCreatorOpen)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-neutral-900 font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4 text-orange-600" />
            {isCreatorOpen ? t('stickers.close_creator', 'Fechar Criador') : t('stickers.open_creator', 'Criar Figurinha')}
          </button>
        </div>

        {/* Decorative background shapes */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-purple-400/20 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Creator Studio Drawer (collapsible) */}
      {isCreatorOpen && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-300">
          <StickerCreator
            onStickerCreated={(newSticker) => {
              onStickerCreated(newSticker);
              setIsCreatorOpen(false);
              setActiveTab('custom');
            }}
            onCancel={() => setIsCreatorOpen(false)}
          />
        </div>
      )}

      {/* Main Sticker Tray Container */}
      <div className="bg-white/85 dark:bg-neutral-900/85 backdrop-blur-xl rounded-[2rem] border border-white/60 dark:border-neutral-700/50 p-6 shadow-md transition-all">
        {/* Search Input Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('stickers.search_placeholder', 'Pesquisar por risada, meme, capivara, flork, reação...')}
            className="w-full pl-11 pr-10 py-3 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50/70 dark:bg-neutral-800/70 text-neutral-900 dark:text-neutral-100 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
            >
              ✕
            </button>
          )}
        </div>

        {/* Horizontal Category / Pack Nav Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none no-scrollbar">
          {tabsConfig.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as CategoryTab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-md shadow-orange-500/25 scale-[1.02]'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-neutral-500 dark:text-neutral-400'}`} />
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      isActive
                        ? 'bg-white/25 text-white'
                        : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Sticker Grid */}
        {filteredStickers.length === 0 ? (
          <div className="text-center py-16 bg-neutral-50 dark:bg-neutral-800/40 rounded-2xl border border-neutral-200/60 dark:border-neutral-800 my-4">
            <Smile className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto mb-3" />
            <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              {searchQuery
                ? t('stickers.empty_search', 'Nenhuma figurinha encontrada para esta busca.')
                : activeTab === 'favorites'
                ? t('stickers.empty_favorites', 'Você ainda não tem figurinhas favoritas. Marque com a estrelinha ⭐!')
                : activeTab === 'custom'
                ? t('stickers.empty_custom', 'Nenhuma figurinha criada ainda. Clique em "Criar Figurinha" acima!')
                : t('stickers.empty_general', 'Nenhuma figurinha disponível.')}
            </p>
            {activeTab === 'custom' && (
              <button
                onClick={() => setIsCreatorOpen(true)}
                className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs inline-flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Criar Primeira Figurinha
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredStickers.map((sticker) => {
              const isFav = favorites.includes(sticker.id);
              const isCopied = copiedId === sticker.id;

              return (
                <div
                  key={sticker.id}
                  onClick={() => handleStickerClick(sticker)}
                  className="group relative bg-neutral-100/60 dark:bg-neutral-800/50 hover:bg-orange-50/60 dark:hover:bg-orange-950/20 p-4 rounded-3xl border border-neutral-200/60 dark:border-neutral-800 hover:border-orange-400 dark:hover:border-orange-500/60 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col items-center justify-between cursor-pointer aspect-square"
                >
                  {/* Top badges bar */}
                  <div className="w-full flex items-center justify-between z-10">
                    {/* Favorite star */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleFavorite(sticker.id);
                      }}
                      className={`p-1.5 rounded-full backdrop-blur-md transition-all ${
                        isFav
                          ? 'bg-amber-100/90 text-amber-500 dark:bg-amber-950/80'
                          : 'opacity-0 group-hover:opacity-100 bg-white/80 dark:bg-neutral-800/80 text-neutral-400 hover:text-amber-500'
                      }`}
                      title={isFav ? 'Remover dos favoritos' : 'Favoritar figurinha'}
                    >
                      <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-amber-400' : ''}`} />
                    </button>

                    {/* Quick action buttons (Copy / Delete) */}
                    <div className="flex items-center gap-1">
                      {sticker.isCustom && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteSticker(sticker.id);
                            toast.info('Figurinha apagada.');
                          }}
                          className="p-1.5 rounded-full bg-red-100/80 dark:bg-red-950/80 text-red-600 dark:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-200"
                          title="Apagar figurinha"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        onClick={(e) => handleQuickCopy(e, sticker)}
                        className={`p-1.5 rounded-full backdrop-blur-md transition-all ${
                          isCopied
                            ? 'bg-orange-500 text-white opacity-100'
                            : 'opacity-0 group-hover:opacity-100 bg-white/80 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-300 hover:bg-orange-100 hover:text-orange-700'
                        }`}
                        title="Copiar figurinha"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Sticker Graphic Container with Die-Cut Peel Effect */}
                  <div className="relative w-full flex-1 flex items-center justify-center p-2 group-hover:scale-110 group-hover:rotate-1 transition-transform duration-300">
                    <img
                      src={sticker.image}
                      alt={sticker.name}
                      className="max-h-full max-w-full object-contain filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.14)]"
                    />
                  </div>

                  {/* Sticker Label Name */}
                  <div className="w-full text-center mt-1 z-10">
                    <span className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300 truncate block px-1 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      {sticker.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Action Modal */}
      <StickerPreviewModal
        sticker={selectedSticker}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        isFavorite={selectedSticker ? favorites.includes(selectedSticker.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onDelete={onDeleteSticker}
        onReactToCurrentJoke={onReactToCurrentJoke}
      />
    </div>
  );
}
