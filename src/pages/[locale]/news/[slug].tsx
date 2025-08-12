import { GetStaticPaths, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Link from '@/components/Link'; // Your custom Link component
import i18nextConfig from '../../../../next-i18next.config.js'; // Adjust path as needed
import { mapLocaleForPlasmic } from '@/lib/localeMap';

// --- Interfaces for Plasmic Data ---
interface NewsArticleData {
    slug: string;
    image?: { url: string; alt: string; };
    date?: string;
    title: string;
    content: string; // Changed from excerpt
}

interface PlasmicCmsArticleRow {
    id: string;
    data: NewsArticleData & { [key: string]: unknown };
}

interface NewsArticle extends NewsArticleData {
    id: string; // Add Plasmic ID
}

interface NewsDetailPageProps {
  article: NewsArticle | null;
}
// --- End Interfaces ---

// --- Page Component (Ensure it uses the fields correctly) ---
const NewsDetailPage: React.FC<NewsDetailPageProps> = ({ article }) => {
  const { t } = useTranslation('news'); // Namespace for CMS content? Or directly render?
  const { t: tCommon } = useTranslation('common');

  if (!article) {
    return <div>{t('articleNotFound', { defaultValue: 'Article Not Found.'})}</div>;
  }

  return (
    <>
      <Head>
        <title>{article.title}</title> {/* Assuming title comes directly */}
        {/* Use first part of content for description, or add a dedicated excerpt field */}
        <meta name="description" content={article.content.substring(0, 150).replace(/<[^>]*>?/g, '') + '...'} />
      </Head>
      <div className="bg-white py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          {/* Back link */}
          <div className="mb-8">
            <Link href="/news" className="text-[var(--primary)] hover:underline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {tCommon('backToNewsList', { defaultValue: 'Back to News List'})}
            </Link>
          </div>

          {/* Article Header */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--secondary)] font-[Poppins] mb-4">
            {article.title}
          </h1>
          {article.date && (
              <p className="text-base text-gray-500 mb-6">
                 {tCommon('publishedOn', { defaultValue: 'Published on'})} {new Date(article.date).toLocaleDateString()}
               </p>
          )}

          {/* Article Content - Render as HTML if content has tags */}
          <article className="prose lg:prose-xl max-w-none text-[var(--accent-gray)] font-[Asap] leading-relaxed"
                   dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
      </div>
    </>
  );
};
// --- End Page Component ---

// --- Data Fetching ---

export const getStaticPaths: GetStaticPaths = async () => {
  // Check if feature is disabled
  if (!process.env.PLASMIC_CMS_ID || process.env.PLASMIC_CMS_ID === 'ignore') {
    console.log('[news/[slug].tsx getStaticPaths] CMS is ignored, returning empty paths.');
    return { paths: [], fallback: false };
  }

  const CMS_ID = process.env.PLASMIC_CMS_ID;
  const CMS_PUBLIC_TOKEN = process.env.PLASMIC_CMS_PUBLIC_TOKEN;
  const CMS_MODEL_ID = 'news'; // Your news model ID

  if (!CMS_ID || !CMS_PUBLIC_TOKEN) {
      console.error('[news/[slug].tsx getStaticPaths] Plasmic CMS environment variables not set.');
      return { paths: [], fallback: false }; // Return empty paths on config error
  }

  let articles: Array<{ data: { slug: string } }> = [];
  try {
      // Fetch all articles, but only the 'slug' field is needed for paths
      // We fetch from the default locale assuming slugs are not localized
      const queryParams = new URLSearchParams({
          q: JSON.stringify({ fields: ['slug'] }) // Only request the slug field
      });
      const apiUrl = `https://data.plasmic.app/api/v1/cms/databases/${CMS_ID}/tables/${CMS_MODEL_ID}/query?${queryParams.toString()}`;

      const response = await fetch(apiUrl, {
          headers: {
              'x-plasmic-api-cms-tokens': `${CMS_ID}:${CMS_PUBLIC_TOKEN}`
          }
      });

      if (!response.ok) {
          throw new Error(`Plasmic CMS API request failed (getStaticPaths) with status ${response.status}: ${await response.text()}`);
      }
      const parsedResponse = await response.json();
      articles = parsedResponse.rows;

  } catch (error) {
      console.error('Error fetching article slugs from Plasmic CMS for getStaticPaths:', error);
      // Return empty paths on fetch error to prevent build failure
      return { paths: [], fallback: false };
  }

  const locales = i18nextConfig.i18n.locales;
  const paths: Array<{ params: { locale: string; slug: string } }> = [];

  // Generate paths for each fetched slug in each locale
  articles.forEach((article) => {
    if (article?.data?.slug) { // Ensure slug exists
      locales.forEach((locale) => {
        paths.push({
          params: { locale: locale, slug: article.data.slug },
        });
      });
    }
  });

  console.log(`[news/[slug].tsx getStaticPaths] Generated ${paths.length} paths.`);

  return {
    paths,
    fallback: false, // Non-generated paths will 404
  };
};

export const getStaticProps: GetStaticProps<NewsDetailPageProps> = async ({ params }) => {
    // Check if feature is disabled (using the same env var as getStaticPaths)
  if (!process.env.PLASMIC_CMS_ID || process.env.PLASMIC_CMS_ID === 'ignore') {
    console.log('[news/[slug].tsx getStaticProps] CMS is ignored, returning notFound.');
    return { notFound: true }; // Return 404 if feature disabled
  }

  const locale = params?.locale as string || i18nextConfig.i18n.defaultLocale;
  const slug = params?.slug as string;
  const namespacesRequired = ['common', 'navbar', 'footer', 'news']; // Define namespaces needed

  if (!slug) {
      return { notFound: true };
  }

  // --- Fetch specific article data from Plasmic CMS ---
  const CMS_ID = process.env.PLASMIC_CMS_ID;
  const CMS_PUBLIC_TOKEN = process.env.PLASMIC_CMS_PUBLIC_TOKEN;
  const CMS_MODEL_ID = 'news';

   if (!CMS_ID || !CMS_PUBLIC_TOKEN) {
       console.error('[news/[slug].tsx getStaticProps] Plasmic CMS environment variables not set.');
       return { notFound: true }; // Return 404 if config missing
   }

  let article: NewsArticle | null = null;
  try {
      const queryParams = new URLSearchParams({
          q: JSON.stringify({
              where: { slug: slug }, // Filter by the slug from params
              limit: 1
          }),
          // Fetch the specific locale version
          locale: mapLocaleForPlasmic(locale)
      });
      const apiUrl = `https://data.plasmic.app/api/v1/cms/databases/${CMS_ID}/tables/${CMS_MODEL_ID}/query?${queryParams.toString()}`;

      const response = await fetch(apiUrl, {
          headers: {
              'x-plasmic-api-cms-tokens': `${CMS_ID}:${CMS_PUBLIC_TOKEN}`
          }
      });

      if (!response.ok) {
           throw new Error(`Plasmic CMS API request failed (getStaticProps) with status ${response.status}: ${await response.text()}`);
      }
      const parsedResponse = await response.json();

      if (parsedResponse.rows && parsedResponse.rows.length > 0) {
          const item: PlasmicCmsArticleRow = parsedResponse.rows[0];
          article = {
              id: item.id,
              slug: item.data.slug,
              image: item.data.image,
              date: item.data.date,
              title: item.data.title,
              content: item.data.content // Fetching content here
          };
      } else {
          console.log(`[news/[slug].tsx getStaticProps] Article with slug '${slug}' and locale '${locale}' not found in Plasmic.`);
          return { notFound: true }; // Return 404 if article not found for slug/locale
      }

  } catch (error) {
       console.error(`Error fetching article (slug: ${slug}, locale: ${locale}) from Plasmic CMS:`, error);
       return { notFound: true }; // Return 404 on fetch error
  }
  // --- End Fetch data ---

  return {
    props: {
      isNewsEnabled: !!(process.env.PLASMIC_CMS_ID && process.env.PLASMIC_CMS_ID !== 'ignore'),
      article,
      ...(await serverSideTranslations(locale, namespacesRequired)),
    },
  };
};

// --- End Data Fetching ---

export default NewsDetailPage; 