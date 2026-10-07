/**
 * Utility functions for Humor Digital figurinhas (stickers)
 */

// Convert any image URL (SVG data URI or WebP/PNG base64) to a PNG Blob
export async function imageUriToPngBlob(imageUrl: string): Promise<Blob | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const size = 512; // High resolution for crisp figurinhas
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(null);
          return;
        }

        ctx.clearRect(0, 0, size, size);

        // Calculate aspect ratio preserving fit
        const scale = Math.min(size / img.width, size / img.height);
        const w = img.width * scale;
        const h = img.height * scale;
        const x = (size - w) / 2;
        const y = (size - h) / 2;

        ctx.drawImage(img, x, y, w, h);
        canvas.toBlob((blob) => resolve(blob), 'image/png');
      } catch (e) {
        console.error('Error converting sticker to PNG blob:', e);
        resolve(null);
      }
    };

    img.onerror = () => {
      resolve(null);
    };

    img.src = imageUrl;
  });
}

// Copy real PNG image to system clipboard (works in modern browsers)
export async function copyStickerToClipboard(imageUrl: string): Promise<'copied_image' | 'failed'> {
  try {
    const blob = await imageUriToPngBlob(imageUrl);
    if (!blob) return 'failed';

    if (navigator.clipboard && window.ClipboardItem) {
      await navigator.clipboard.write([
        new ClipboardItem({
          'image/png': blob,
        }),
      ]);
      return 'copied_image';
    }
    return 'failed';
  } catch (err) {
    console.warn('Clipboard write failed:', err);
    return 'failed';
  }
}

// Download sticker as transparent PNG
export async function downloadSticker(imageUrl: string, filename: string = 'sticker') {
  try {
    const blob = await imageUriToPngBlob(imageUrl);
    if (!blob) {
      // Fallback: direct download link
      const a = document.createElement('a');
      a.href = imageUrl;
      a.download = `${filename}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }

    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = `${filename}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
  } catch (err) {
    console.error('Failed to download sticker:', err);
  }
}

// Share sticker via Web Share API (falls back to clipboard copy)
export async function shareSticker(imageUrl: string, stickerName: string) {
  const blob = await imageUriToPngBlob(imageUrl);

  if (blob && navigator.share && navigator.canShare) {
    try {
      const file = new File([blob], `${stickerName.replace(/\s+/g, '_')}.png`, {
        type: 'image/png',
      });
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `Figurinha: ${stickerName}`,
          text: `Olha esta figurinha do Humor Digital! 😂`,
        });
        return;
      }
    } catch {
      // User cancelled — fall through to clipboard copy
    }
  }

  // Fallback: copy the share text to clipboard
  try {
    await navigator.clipboard.writeText(
      `😂 Olha esta figurinha do Humor Digital: "${stickerName}"! Vê em: ${window.location.href}`
    );
  } catch {
    // Clipboard also not available; silently ignore
  }
}
