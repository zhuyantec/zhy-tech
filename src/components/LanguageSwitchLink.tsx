import React from 'react';
// import languageDetector from '../lib/languageDetector'; // Temporarily comment out if still causing issues
import { useRouter } from 'next/router';
import Link from './Link'; // Use the custom Link component
import { useTranslation } from 'next-i18next'; // Import useTranslation
// import i18nextConfig from '../../next-i18next.config.js'; // No longer needed here

interface LanguageSwitchLinkProps {
  locale: string;
  href?: string; // Allow explicitly passing a base href (like '/')
  className?: string;
}

const LanguageSwitchLink: React.FC<LanguageSwitchLinkProps> = ({ locale, className, ...rest }) => {
  const router = useRouter();
  const { t } = useTranslation('common'); // Use common namespace
  const { pathname, query } = router;

  // 1. Determine the base pathname (template without locale)
  let basePathname = pathname;
  // Check if the current router pathname starts with the dynamic segment placeholder
  if (basePathname.startsWith('/[locale]')) {
    basePathname = basePathname.substring('/[locale]'.length) || '/'; // Remove placeholder, default to root
  }
  // Ensure it starts with a slash if it's not just root
  if (basePathname !== '/' && !basePathname.startsWith('/')) {
     basePathname = '/' + basePathname;
  }

  // 2. Prepare the query parameters for the target link
  const newQuery = { ...query };
  delete newQuery.locale; // Remove the old locale from query
  newQuery.locale = locale; // Add the new target locale to query
  
  // 3. Construct the final href object for the Link component
  // Use the determined base pathname template
  const hrefObject = {
      pathname: basePathname === '/' ? '/[locale]' : `/[locale]${basePathname}`, // Ensure pathname starts with /[locale]
      query: newQuery,
  };

  // Use explicit href if provided (e.g., for linking directly to /zh or /en from somewhere else)
  if (rest.href) {
      hrefObject.pathname = `/[locale]${rest.href === '/' ? '' : rest.href}`; // Use explicit path relative to locale
      // Keep existing query params unless they conflict with the explicit href?
      // For simplicity, let's assume explicit href means query params are less relevant here,
      // but we still need the target locale in the query for getStaticProps.
      hrefObject.query = { locale: locale }; 
  }

  // Determine if this link is for the currently active locale
  const isActive = router.query.locale === locale;

  // Get the display name for the locale
  const languageName = t(`language.${locale}`, { defaultValue: locale.toUpperCase() });

  const handleClick = () => {
    // Temporarily disable cache logic if languageDetector causes issues
    /*
    if (languageDetector) { 
      languageDetector.cache(locale);
    }
    */
  };

  return (
    <Link
      href={hrefObject} // Pass the constructed object
      locale={locale} // Pass locale explicitly too (might be redundant but safe)
      onClick={handleClick}
      skipLocaleHandling={true} // Important: Tell our custom Link *not* to add prefix again
      className={className}
      aria-current={isActive ? 'page' : undefined}
    >
      {languageName} 
    </Link>
  );
};

export default LanguageSwitchLink; 