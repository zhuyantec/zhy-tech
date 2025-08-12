/**
 // Translate next-i18next's locale to the locale required by Plasmic CMS
 // For example: 'zh' => 'default', others remain unchanged
 */
export function mapLocaleForPlasmic(locale: string): string {
  return locale === 'zh' ? 'default' : locale;
} 