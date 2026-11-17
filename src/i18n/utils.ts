export type SupportedLanguage = 'pt' | 'en' | 'es';

/**
 * Normaliza qualquer código de idioma (ex.: 'pt-PT', 'pt-BR', 'en-US', 'es-ES')
 * para uma das 3 línguas suportadas: 'pt', 'en', ou 'es'.
 */
export function getAppLanguage(lng?: string): SupportedLanguage {
  if (!lng) return 'pt';
  const prefix = lng.toLowerCase().split('-')[0].split('_')[0];
  if (prefix === 'en') return 'en';
  if (prefix === 'es') return 'es';
  return 'pt';
}
