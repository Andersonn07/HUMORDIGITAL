import { useState } from 'react';
import { Sticker } from '../data/defaultStickers';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { copyStickerToClipboard, downloadSticker, shareSticker } from '../utils/stickerUtils';
import { Copy, Download, Share2, Star, Trash2, Check, Sparkles, MessageSquareHeart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

interface StickerPreviewModalProps {
  sticker: Sticker | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (stickerId: string) => void;
  onDelete?: (stickerId: string) => void;
  onReactToCurrentJoke?: (sticker: Sticker) => void;
}

export function StickerPreviewModal({
  sticker,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onDelete,
  onReactToCurrentJoke,
}: StickerPreviewModalProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [previewStyle, setPreviewStyle] = useState<'bubble' | 'card'>('bubble');

  if (!sticker) return null;

  const handleCopy = async () => {
    const res = await copyStickerToClipboard(sticker.image);
    if (res === 'copied_image') {
      setCopied(true);
      toast.success(t('stickers.modal.copied_toast', 'Figurinha copiada! Já podes colar (Ctrl+V)'), {
        description: t('stickers.modal.copied_sub', 'Imagem pronta na área de transferência.'),
        icon: '✨',
      });
      setTimeout(() => setCopied(false), 2500);
    } else {
      // If direct image clipboard write wasn't supported by browser, trigger download
      downloadSticker(sticker.image, sticker.name);
      toast.info(t('stickers.modal.downloaded_instead', 'Figurinha descarregada em PNG para poderes enviar!'));
    }
  };

  const handleDownload = () => {
    downloadSticker(sticker.image, sticker.name);
    toast.success(t('stickers.modal.download_success', 'Figurinha descarregada com fundo transparente!'));
  };

  const handleShare = () => {
    shareSticker(sticker.image, sticker.name);
  };

  const handleReact = () => {
    if (onReactToCurrentJoke) {
      onReactToCurrentJoke(sticker);
      toast.success(t('stickers.modal.reacted_toast', 'Reação de figurinha enviada para a piada atual!'), {
        icon: '💬',
      });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-white/95 dark:bg-neutral-900/95 backdrop-blur-2xl border-white/60 dark:border-neutral-700/60 rounded-3xl p-6 shadow-2xl">
        <DialogHeader className="text-center pb-2">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-orange-100 text-orange-800 dark:bg-orange-950/60 dark:text-orange-400">
              {sticker.packName || t('stickers.tab.custom')}
            </span>
          </div>
          <DialogTitle className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            {sticker.name}
          </DialogTitle>
          <DialogDescription className="text-xs text-neutral-500 dark:text-neutral-400">
            {t('stickers.modal.subtitle', 'Pronta a copiar e partilhar em qualquer conversa')}
          </DialogDescription>
        </DialogHeader>

        {/* Style Selector Tabs */}
        <div className="flex justify-center gap-2 my-2 bg-neutral-100 dark:bg-neutral-800/80 p-1 rounded-xl">
          <button
            onClick={() => setPreviewStyle('bubble')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
              previewStyle === 'bubble'
                ? 'bg-white dark:bg-neutral-700 text-orange-600 dark:text-orange-400 shadow-sm'
                : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400'
            }`}
          >
            <span>💬</span> Balão de Chat
          </button>
          <button
            onClick={() => setPreviewStyle('card')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
              previewStyle === 'card'
                ? 'bg-white dark:bg-neutral-700 text-rose-500 dark:text-rose-400 shadow-sm'
                : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400'
            }`}
          >
            <span>✨</span> Cartão de Destaque
          </button>
        </div>

        {/* Realistic Chat / Card Preview Area */}
        <div className="my-2 p-5 rounded-2xl flex items-center justify-center min-h-[220px] transition-colors duration-300 relative overflow-hidden bg-gradient-to-b from-neutral-100/70 to-neutral-200/50 dark:from-neutral-950 dark:to-neutral-900 border border-neutral-200/60 dark:border-neutral-800">
          {previewStyle === 'bubble' ? (
            /* Proprietary Humor Digital Chat Bubble Simulation */
            <div className="relative max-w-[240px] bg-white dark:bg-neutral-800 rounded-2xl rounded-tr-sm p-3.5 shadow-lg border border-neutral-200/80 dark:border-neutral-700/80">
              <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-neutral-100 dark:border-neutral-700/60">
                <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 flex items-center gap-1">
                  <span>✨</span> Humor Digital
                </span>
                <span className="text-[10px] text-neutral-400 font-mono">12:42</span>
              </div>
              <div className="w-40 h-40 flex items-center justify-center mx-auto">
                <img
                  src={sticker.image}
                  alt={sticker.name}
                  className="max-w-full max-h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)]"
                />
              </div>
              <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-orange-500 dark:text-orange-400 font-semibold select-none">
                <span>Pronto a colar</span>
                <span>✓</span>
              </div>
            </div>
          ) : (
            /* Humor Digital Card Simulation */
            <div className="relative max-w-[240px] bg-neutral-900/90 text-white rounded-2xl p-4 shadow-xl border border-neutral-700/80 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-orange-500 to-rose-500 flex items-center justify-center text-[10px] font-bold">
                  H
                </div>
                <span className="text-xs font-semibold text-neutral-200">@humordigital</span>
                <span className="text-[10px] text-orange-400 font-mono">Original</span>
              </div>
              <div className="w-36 h-36 flex items-center justify-center mx-auto my-1">
                <img
                  src={sticker.image}
                  alt={sticker.name}
                  className="max-w-full max-h-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-neutral-400 mt-2">
                <span className="flex items-center gap-1 text-rose-400">❤️ 42.8k</span>
                <span className="text-xs text-orange-400 font-medium">Partilhar</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-2 gap-2.5 mt-2">
          {/* Copy to Clipboard (real image) */}
          <Button
            onClick={handleCopy}
            className={`col-span-2 h-12 rounded-xl font-bold text-white shadow-md transition-all flex items-center justify-center gap-2 text-sm ${
              copied
                ? 'bg-neutral-900 dark:bg-white dark:text-neutral-900 shadow-neutral-500/20'
                : 'bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 shadow-orange-500/25'
            }`}
          >
            {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
            {copied ? t('stickers.modal.copied_button', 'Copiado para a Área de Transferência!') : t('stickers.modal.copy_button', 'Copiar Figurinha (Ctrl+V)')}
          </Button>

          {/* Share */}
          <Button
            onClick={handleShare}
            variant="outline"
            className="h-11 rounded-xl font-semibold border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/40 flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4 text-orange-600" />
            {t('stickers.modal.share_sticker', 'Partilhar Figurinha')}
          </Button>

          {/* Download PNG */}
          <Button
            onClick={handleDownload}
            variant="outline"
            className="h-11 rounded-xl font-semibold border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center gap-1.5 text-neutral-700 dark:text-neutral-200"
          >
            <Download className="w-4 h-4" />
            {t('stickers.modal.download_png', 'Baixar PNG')}
          </Button>

          {/* Favorite Toggle */}
          <Button
            onClick={() => onToggleFavorite(sticker.id)}
            variant="ghost"
            className={`h-11 rounded-xl font-semibold flex items-center justify-center gap-1.5 transition-colors ${
              isFavorite
                ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400'
                : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
            }`}
          >
            <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400 text-amber-500' : ''}`} />
            {isFavorite ? t('stickers.modal.favorited', 'Nos Favoritos ⭐') : t('stickers.modal.favorite', 'Favoritar')}
          </Button>

          {/* React to current joke if handler provided */}
          {onReactToCurrentJoke ? (
            <Button
              onClick={handleReact}
              variant="ghost"
              className="h-11 rounded-xl font-semibold text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/30 flex items-center justify-center gap-1.5"
            >
              <MessageSquareHeart className="w-4 h-4" />
              {t('stickers.modal.react_joke', 'Reagir na Piada')}
            </Button>
          ) : sticker.isCustom && onDelete ? (
            <Button
              onClick={() => {
                onDelete(sticker.id);
                onClose();
              }}
              variant="ghost"
              className="h-11 rounded-xl font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center justify-center gap-1.5"
            >
              <Trash2 className="w-4 h-4" />
              {t('stickers.modal.delete', 'Apagar')}
            </Button>
          ) : (
            <div className="flex items-center justify-center text-xs text-neutral-400 gap-1 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Sticker HD</span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
