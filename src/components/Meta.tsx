import Head from 'next/head';
import { useRouter } from 'next/router';
import i18nextConfig from '../../next-i18next.config.js';
import { COMPANY_NAME } from '@/lib/companyConfig';

interface MetaProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  noindex?: boolean;
}

const Meta: React.FC<MetaProps> = ({
  title,
  description,
  keywords,
  ogImage = '/images/og-image.jpg',  // 默认的社交分享图片
  noindex = false,
}) => {
  const router = useRouter();
  const locale = router.locale || i18nextConfig.i18n.defaultLocale;
  const domain = 'https://example.com'; // 替换为实际域名
  const currentPath = router.asPath;
  const url = `${domain}${currentPath}`;

  // 为每个语言版本生成备用链接
  const alternateLinks = i18nextConfig.i18n.locales.map(lang => ({
    hrefLang: lang,
    href: `${domain}${lang === i18nextConfig.i18n.defaultLocale ? '' : `/${lang}`}${currentPath}`,
  }));

  const defaultTitle = `${COMPANY_NAME} - 创新技术解决方案`;
  const defaultDescription = '我们提供创新的技术解决方案，帮助企业实现数字化转型。';
  const defaultKeywords = '技术,解决方案,创新,数字化转型';

  return (
    <Head>
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      
      {/* 规范链接 */}
      <link rel="canonical" href={url} />
      
      {/* 语言备用链接 */}
      {alternateLinks.map(({ hrefLang, href }) => (
        <link
          key={hrefLang}
          rel="alternate"
          hrefLang={hrefLang}
          href={href}
        />
      ))}
      
      {/* 禁止索引标记（如果需要） */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Open Graph 标签 */}
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${domain}${ogImage}`} />
      <meta property="og:locale" content={locale} />
      
      {/* Twitter 卡片 */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={`${domain}${ogImage}`} />
      
      {/* 其他必要的 meta 标签 */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      
      {/* PWA 相关标签（如果需要） */}
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#ffffff" />
      
      {/* 网站图标 */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </Head>
  );
};

export default Meta; 