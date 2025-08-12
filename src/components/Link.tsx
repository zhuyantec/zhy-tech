import React, { ReactNode } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { useRouter } from 'next/router';
import i18nextConfig from '../../next-i18next.config.js'; // Import config

interface CustomLinkProps extends Omit<NextLinkProps, 'href' | 'locale' | 'legacyBehavior'> {
  children: ReactNode;
  href: NextLinkProps['href'];
  skipLocaleHandling?: boolean;
  className?: string;
  locale?: string;
}

const CustomLink: React.FC<CustomLinkProps> = ({
  children,
  skipLocaleHandling,
  className,
  href: passedHref,
  locale: passedLocale,
  ...rest
}) => {
  const router = useRouter();
  const currentLocale = router.query.locale || i18nextConfig.i18n.defaultLocale;

  let finalHref = passedHref;
  const isExternal = typeof finalHref === 'string' && finalHref.startsWith('http');

  if (
    !skipLocaleHandling &&
    !isExternal &&
    typeof finalHref === 'string'
  ) {
    const targetLocale = passedLocale || currentLocale;
    if (targetLocale) {
        const pathSegments = finalHref.split('/');
        const potentialLocale = pathSegments[1];

        if (i18nextConfig.i18n.locales.includes(potentialLocale)) {
           // Already has locale prefix
        } else {
           finalHref = finalHref === '/' ? `/${targetLocale}` : `/${targetLocale}${finalHref}`;
        }
    }
  }

  return (
    <NextLink {...rest} href={finalHref} locale={passedLocale} className={className}>
        {children}
    </NextLink>
  );
}

export default CustomLink; 