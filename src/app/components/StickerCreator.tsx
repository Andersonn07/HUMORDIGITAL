import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from './ui/button';
import { Upload, X, Check, Sparkles, Type, Smile, Scissors, RefreshCw, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Sticker } from '../data/defaultStickers';
import { toast } from 'sonner';

interface StickerCreatorProps {
  onStickerCreated: (sticker: Sticker) => void;
  onCancel?: () => void;
}

type ShapeType = 'rounded' | 'circle' | 'square';
type TextStyleType = 'suave' | 'escura' | 'meme' | 'neon';
type TextPosType = 'bottom' | 'top' | 'center';

const QUICK_ACCESSORIES = ['🕶️', '👑', '🔥', '🤡', '❤️', '🧢', '✨', '💀'];

export function StickerCreator({ onStickerCreated, onCancel }: StickerCreatorProps) {
  const { t } = useTranslation();
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [stickerName, setStickerName] = useState('');
  const [shape, setShape] = useState<ShapeType>('rounded');
  const [borderWidth, setBorderWidth] = useState<number>(8); // Die-cut white border
  const [text, setText] = useState('');
  const [textStyle, setTextStyle] = useState<TextStyleType>('suave');
  const [textPosition, setTextPosition] = useState<TextPosType>('bottom');
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Quick sample templates if user has no image ready
  const sampleAvatars = [
    { label: '🐱 Gatinho', url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&auto=format&fit=crop&q=80' },
    { label: '🐶 Doguinho', url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&auto=format&fit=crop&q=80' },
    { label: '🦫 Capivara', url: 'https://images.unsplash.com/photo-1563281577-a7be47e20db9?w=400&auto=format&fit=crop&q=80' },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError(t('stickers.errors.invalid_image', 'Por favor, selecione uma imagem válida.'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setSourceImage(event.target?.result as string);
      if (!stickerName) {
        setStickerName(file.name.replace(/\.[^/.]+$/, '').slice(0, 20));
      }
    };
    reader.readAsDataURL(file);
  };

  // Render sticker on canvas with all WhatsApp/TikTok effects
  const renderCanvas = useCallback(() => {
    if (!sourceImage) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      const size = 480;
      canvas.width = size;
      canvas.height = size;
      ctx.clearRect(0, 0, size, size);

      const padding = borderWidth + 16;
      const contentSize = size - padding * 2;
      const x = padding;
      const y = padding;

      // 1. Draw shape clipping mask with white die-cut stroke
      ctx.save();

      // Define path for chosen shape
      ctx.beginPath();
      if (shape === 'circle') {
        ctx.arc(size / 2, size / 2, contentSize / 2, 0, Math.PI * 2);
      } else if (shape === 'rounded') {
        const radius = 36;
        ctx.roundRect(x, y, contentSize, contentSize, radius);
      } else {
        // square
        ctx.rect(x, y, contentSize, contentSize);
      }
      ctx.closePath();

      // Draw white sticker die-cut outer glow / border
      if (borderWidth > 0) {
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.22)';
        ctx.shadowBlur = 12;
        ctx.shadowOffsetY = 6;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = borderWidth * 2;
        ctx.stroke();
        ctx.restore();
      }

      // Clip image to shape
      ctx.clip();

      // Draw image inside (cover aspect ratio)
      const scale = Math.max(contentSize / img.width, contentSize / img.height);
      const imgW = img.width * scale;
      const imgH = img.height * scale;
      const imgX = x + (contentSize - imgW) / 2;
      const imgY = y + (contentSize - imgH) / 2;
      ctx.drawImage(img, imgX, imgY, imgW, imgH);

      ctx.restore();

      // 2. Add Selected Accessory Emoji (e.g. 🕶️ or 👑)
      if (selectedEmoji) {
        ctx.save();
        ctx.font = '68px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0,0,0,0.3)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 4;
        // Place accessory at top right or upper center
        ctx.fillText(selectedEmoji, size * 0.76, size * 0.28);
        ctx.restore();
      }

      // 3. Render Text Overlay (Balão Suave, Legenda Escura, Meme, Neon styles)
      if (text.trim()) {
        const txt = text.trim();
        ctx.save();

        let textY = size - 56;
        if (textPosition === 'top') textY = 64;
        if (textPosition === 'center') textY = size / 2;

        if (textStyle === 'suave') {
          // Balão Suave: white pill with Humor Digital orange bold text
          ctx.font = 'bold 24px system-ui, -apple-system, sans-serif';
          const metrics = ctx.measureText(txt);
          const bgW = Math.min(metrics.width + 36, size - 40);
          const bgH = 46;
          const bgX = (size - bgW) / 2;
          const bgY = textY - bgH / 2;

          ctx.shadowColor = 'rgba(0,0,0,0.2)';
          ctx.shadowBlur = 8;
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.roundRect(bgX, bgY, bgW, bgH, 14);
          ctx.fill();

          ctx.fillStyle = '#ea580c'; // Humor Digital orange
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(txt, size / 2, textY);
        } else if (textStyle === 'escura') {
          // Legenda Escura: translucent dark badge with rounded corners and crisp white text
          ctx.font = 'bold 22px system-ui, sans-serif';
          const metrics = ctx.measureText(txt);
          const bgW = Math.min(metrics.width + 32, size - 40);
          const bgH = 44;
          const bgX = (size - bgW) / 2;
          const bgY = textY - bgH / 2;

          ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
          ctx.beginPath();
          ctx.roundRect(bgX, bgY, bgW, bgH, 10);
          ctx.fill();

          ctx.strokeStyle = '#f97316';
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(txt, size / 2, textY);
        } else if (textStyle === 'meme') {
          // Classic Meme style: Impact font, all caps, thick black stroke
          ctx.font = '900 32px Impact, system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.lineJoin = 'round';
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 7;
          ctx.strokeText(txt.toUpperCase(), size / 2, textY);
          ctx.fillStyle = '#ffffff';
          ctx.fillText(txt.toUpperCase(), size / 2, textY);
        } else if (textStyle === 'neon') {
          // Neon glow style
          ctx.font = '900 26px system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.shadowColor = '#25f4ee';
          ctx.shadowBlur = 12;
          ctx.fillStyle = '#ffffff';
          ctx.fillText(txt, size / 2, textY);
          ctx.fillStyle = '#fe2c55';
          ctx.fillText(txt, size / 2, textY);
        }

        ctx.restore();
      }

      setPreviewDataUrl(canvas.toDataURL('image/webp', 0.9));
    };

    img.src = sourceImage;
  }, [sourceImage, shape, borderWidth, text, textStyle, textPosition, selectedEmoji]);

  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  const handleCreate = () => {
    if (!previewDataUrl) return;

    const newSticker: Sticker = {
      id: `custom-${Date.now()}-${crypto.randomUUID().slice(0, 6)}`,
      name: stickerName.trim() || t('stickers.creator.default_name', 'Minha Figurinha'),
      image: previewDataUrl,
      category: 'custom',
      packName: t('stickers.tab.custom', 'Minhas Figurinhas'),
      tags: ['custom', 'usuario', ...(text ? text.toLowerCase().split(' ') : [])],
      createdAt: Date.now(),
      isCustom: true,
    };

    onStickerCreated(newSticker);
    toast.success(t('stickers.creator.success_toast', 'Figurinha criada com sucesso no seu pacote!'), {
      icon: '🎉',
    });

    // Reset creator state
    setSourceImage(null);
    setStickerName('');
    setText('');
    setSelectedEmoji(null);
    setPreviewDataUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (onCancel) onCancel();
  };

  const clearSelection = () => {
    setSourceImage(null);
    setStickerName('');
    setText('');
    setSelectedEmoji(null);
    setPreviewDataUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-2xl rounded-[2rem] border border-white/60 dark:border-neutral-700/50 p-6 md:p-8 shadow-xl transition-all">
      {/* Hidden offscreen canvas for rendering */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-500 to-rose-600 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              {t('stickers.creator.title', 'Sticker Studio')}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {t('stickers.creator.subtitle', 'Cria figurinhas personalizadas com corte, contorno e legendas meme')}
            </p>
          </div>
        </div>

        {onCancel && (
          <Button variant="ghost" size="icon" onClick={onCancel} className="rounded-xl">
            <X className="w-5 h-5 text-neutral-400" />
          </Button>
        )}
      </div>

      {!sourceImage ? (
        /* Upload Area */
        <div className="space-y-6">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-orange-300 dark:border-orange-700/50 rounded-3xl p-10 text-center cursor-pointer hover:border-orange-500 hover:bg-orange-50/50 dark:hover:bg-orange-950/20 transition-all duration-300 group"
          >
            <div className="w-16 h-16 rounded-2xl bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8" />
            </div>
            <p className="text-base font-bold text-neutral-800 dark:text-neutral-100 mb-1">
              {t('stickers.creator.upload_prompt', 'Toque aqui para escolher uma imagem')}
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto">
              {t('stickers.creator.upload_sub', 'Seleciona uma foto da tua galeria ou ficheiros (PNG, JPG, WebP)')}
            </p>
          </div>

          {/* Quick sample avatars */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3 text-center">
              Ou teste com um modelo rápido:
            </p>
            <div className="flex justify-center gap-3">
              {sampleAvatars.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSourceImage(sample.url);
                    setStickerName(sample.label.split(' ')[1] || 'Sticker');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-neutral-100 dark:bg-neutral-800 hover:bg-orange-100 dark:hover:bg-orange-950/50 hover:text-orange-700 dark:hover:text-orange-400 text-neutral-700 dark:text-neutral-300 transition-all shadow-sm border border-neutral-200/60 dark:border-neutral-700/60"
                >
                  {sample.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Studio Editor Controls */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Live Preview Column */}
          <div className="space-y-4">
            <div className="relative bg-gradient-to-b from-neutral-100 to-neutral-200/60 dark:from-neutral-950 dark:to-neutral-900 rounded-3xl p-6 border border-neutral-200/70 dark:border-neutral-800 flex flex-col items-center justify-center min-h-[300px] shadow-inner">
              <button
                onClick={clearSelection}
                className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-neutral-800 text-neutral-500 hover:text-red-500 rounded-full shadow-md hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                title={t('stickers.creator.remove_title', 'Trocar foto')}
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              {/* Chat Bubble Preview Wrapper */}
              <div className="relative bg-[#dcf8c6] dark:bg-[#005c4b] p-3 rounded-2xl rounded-tr-sm shadow-lg max-w-[220px] border border-[#c3e8a7] dark:border-[#025042]">
                <div className="w-44 h-44 flex items-center justify-center mx-auto">
                  {previewDataUrl ? (
                    <img
                      src={previewDataUrl}
                      alt="Preview"
                      className="max-h-full max-w-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.18)]"
                    />
                  ) : (
                    <div className="w-12 h-12 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                  )}
                </div>
                <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-neutral-500 dark:text-emerald-200/80 font-semibold select-none">
                  <span>14:20</span>
                  <span className="text-[#34b7f1]">✓✓</span>
                </div>
              </div>

              <span className="mt-4 text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                Prévia da Figurinha
              </span>
            </div>

            {/* Sticker Name Input */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5">
                {t('stickers.creator.name_label', 'Nome da Figurinha')}
              </label>
              <input
                type="text"
                value={stickerName}
                onChange={(e) => setStickerName(e.target.value)}
                placeholder={t('stickers.creator.name_placeholder', 'Ex: Minha Reação')}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Tools & Customization Column */}
          <div className="space-y-5">
            {/* 1. Shape Selection */}
            <div>
              <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <Scissors className="w-3.5 h-3.5 text-orange-500" />
                {t('stickers.creator.shape', 'Formato de Corte')}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'rounded', label: 'Arredondado' },
                  { id: 'circle', label: 'Círculo' },
                  { id: 'square', label: 'Quadrado' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setShape(item.id as ShapeType)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      shape === item.id
                        ? 'bg-gradient-to-r from-orange-500 to-rose-600 text-white border-transparent shadow-sm'
                        : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Border Outline (Sticker effect) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  {t('stickers.creator.outline', 'Borda de Figurinha')}
                </label>
                <span className="text-xs font-semibold text-orange-600 dark:text-orange-400">
                  {borderWidth === 0 ? 'Sem borda' : `${borderWidth}px`}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { width: 0, label: 'Nenhuma' },
                  { width: 4, label: 'Fina' },
                  { width: 8, label: 'Média' },
                  { width: 14, label: 'Grossa' },
                ].map((item) => (
                  <button
                    key={item.width}
                    onClick={() => setBorderWidth(item.width)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                      borderWidth === item.width
                        ? 'bg-gradient-to-r from-orange-500 to-rose-600 text-white border-transparent shadow-sm'
                        : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Text Overlay */}
            <div>
              <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <Type className="w-3.5 h-3.5 text-blue-500" />
                {t('stickers.creator.text_overlay', 'Legenda / Frase Meme')}
              </label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={t('stickers.creator.text_placeholder', 'Ex: Calma vida / E tá errado? / Amei')}
                maxLength={30}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-all mb-2.5"
              />

              {text.trim() && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-neutral-500">Estilo:</span>
                    <div className="flex gap-1.5 flex-1">
                      {[
                        { id: 'suave', label: 'Balão Suave' },
                        { id: 'escura', label: 'Legenda Escura' },
                        { id: 'meme', label: 'Meme Clássico' },
                        { id: 'neon', label: 'Neon' },
                      ].map((s) => (
                        <button
                          key={s.id}
                          onClick={() => setTextStyle(s.id as TextStyleType)}
                          className={`flex-1 py-1 px-2 rounded-lg text-[10px] font-bold border transition-all ${
                            textStyle === s.id
                              ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                              : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-neutral-500">Posição:</span>
                    <div className="flex gap-1.5 flex-1">
                      {[
                        { id: 'top', label: 'Topo' },
                        { id: 'center', label: 'Centro' },
                        { id: 'bottom', label: 'Rodapé' },
                      ].map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setTextPosition(p.id as TextPosType)}
                          className={`flex-1 py-1 px-2 rounded-lg text-[10px] font-bold border transition-all ${
                            textPosition === p.id
                              ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                              : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Accessories Emojis */}
            <div>
              <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <Smile className="w-3.5 h-3.5 text-rose-500" />
                {t('stickers.creator.accessories', 'Acessórios & Emojis')}
              </label>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setSelectedEmoji(null)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                    selectedEmoji === null
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  Nenhum
                </button>
                {QUICK_ACCESSORIES.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setSelectedEmoji(selectedEmoji === emoji ? null : emoji)}
                    className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center border transition-transform hover:scale-110 ${
                      selectedEmoji === emoji
                        ? 'bg-amber-100 border-amber-500 dark:bg-amber-950/50 scale-110 shadow-sm'
                        : 'bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Create Button */}
            <Button
              onClick={handleCreate}
              className="w-full h-12 bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white rounded-xl font-bold shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 mt-4 text-sm"
            >
              <Check className="w-5 h-5" />
              {t('stickers.creator.submit', 'Guardar Figurinha')}
            </Button>
          </div>
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}
