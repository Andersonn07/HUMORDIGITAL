import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Upload, X, ImageIcon, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export interface Sticker {
  id: string;
  name: string;
  image: string; // base64
  createdAt: number;
}

interface StickerCreatorProps {
  onStickerCreated: (sticker: Sticker) => void;
}

const MAX_DIMENSION = 400;

export function StickerCreator({ onStickerCreated }: StickerCreatorProps) {
  const { t } = useTranslation();
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError(t('stickers.errors.invalid_image'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Compress the image using canvas
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_DIMENSION) {
            height = Math.round((height * MAX_DIMENSION) / width);
            width = MAX_DIMENSION;
          }
        } else {
          if (height > MAX_DIMENSION) {
            width = Math.round((width * MAX_DIMENSION) / height);
            height = MAX_DIMENSION;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/webp', 0.8);
          setPreview(dataUrl);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleCreate = () => {
    if (!preview) return;

    const newSticker: Sticker = {
      id: crypto.randomUUID(),
      name: name.trim() || t('stickers.creator.default_name'),
      image: preview,
      createdAt: Date.now(),
    };

    onStickerCreated(newSticker);
    setPreview(null);
    setName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const clearSelection = () => {
    setPreview(null);
    setName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl rounded-[2rem] border border-white/60 dark:border-neutral-700/50 p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
      <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-4 flex items-center gap-2">
        <ImageIcon className="w-5 h-5 text-orange-500" />
        {t('stickers.creator.title')}
      </h3>

      {!preview ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl p-8 text-center cursor-pointer hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/20 transition-all"
        >
          <Upload className="w-10 h-10 text-neutral-400 dark:text-neutral-500 mx-auto mb-3" />
          <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
            {t('stickers.creator.upload_prompt')}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
            {t('stickers.creator.upload_sub')}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative inline-block mx-auto w-full text-center">
            <img
              src={preview}
              alt="Preview"
              className="max-h-48 rounded-lg mx-auto shadow-md border border-neutral-200 dark:border-neutral-800"
            />
            <button
              onClick={clearSelection}
              className="absolute -top-3 -right-3 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 p-1.5 rounded-full hover:bg-red-200 dark:hover:bg-red-800 transition-colors shadow-sm"
              title={t('stickers.creator.remove_title')}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
              {t('stickers.creator.name_label')}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('stickers.creator.name_placeholder')}
              className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
            />
          </div>

          <Button onClick={handleCreate} className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-xl py-6 font-semibold flex items-center justify-center gap-2">
            <Check className="w-5 h-5" />
            {t('stickers.creator.submit')}
          </Button>
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
