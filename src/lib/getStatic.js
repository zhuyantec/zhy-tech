import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nextConfig from '../../next-i18next.config.js'; // Adjusted path relative to lib/

export const getI18nPaths = () =>
  i18nextConfig.i18n.locales.map((lng) => ({
    params: {
      locale: lng
    }
  }));

export const getStaticPaths = () => ({
  fallback: false,
  paths: getI18nPaths()
});

export async function getI18nProps(ctx, ns = ['common']) {
  const locale = ctx?.params?.locale;
  // Ensure locale is valid, falling back to default if necessary
  const validLocale = i18nextConfig.i18n.locales.includes(locale) ? locale : i18nextConfig.i18n.defaultLocale;
  let props = {
    isNewsEnabled: !!(process.env.PLASMIC_CMS_ID && process.env.PLASMIC_CMS_ID !== 'ignore')  ,
    ...(await serverSideTranslations(validLocale, ns))
  };
  return props;
}

export function makeStaticProps(ns = {}) {
  return async function getStaticProps(ctx) {
    return {
      props: await getI18nProps(ctx, ns)
    };
  };
} 