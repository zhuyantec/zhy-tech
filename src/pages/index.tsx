import { useEffect } from 'react';
import { useRouter } from 'next/router';
import i18nextConfig from '../../next-i18next.config.js';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    router.replace('/' + i18nextConfig.i18n.defaultLocale);
  }, [router]);

  return null;
} 