import { GetStaticPaths, GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import Link from '@/components/Link'; // 使用你的自定义 Link 组件
import Head from 'next/head';
import i18nextConfig from '../../../next-i18next.config.js'; // Import config for defaultLocale
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'; // Import directly
import { mapLocaleForPlasmic } from '@/lib/localeMap';

// --- Updated Data Interface ---
// Reflects direct content fetching from Plasmic
interface NewsItem {
    id: string; // Plasmic row ID
    slug: string;
    // image: string | { url: string }; // Adjust based on how image is stored in Plasmic
    image?: {
      url: string;
      alt: string;
    }; // Assuming string URL for now, make optional if not always present
    date?: string; // Make optional if not always present
    title: string; // Directly localized title
    content: string; // Directly localized content
}

// Define an interface for the expected structure of a row from Plasmic CMS API response
interface PlasmicCmsRow {
    id: string;
    // Add other potential top-level fields if needed (createdAt, updatedAt, etc.)
    data: {
        slug: string;
        image?: {
          url: string;
          alt: string;
        }; // or a more specific image type if needed
        date?: string;
        title: string;
        content: string;
        // Use unknown instead of any for better type safety
        [key: string]: unknown; // Allow other fields but require type checking
    };
    // You might also want to add other top-level fields if they exist, e.g.:
    // createdAt?: string;
    // updatedAt?: string;
}

// --- Page Component ---
interface NewsPageProps {
    newsItems: NewsItem[]; // Define props interface
}

const NewsPage: React.FC<NewsPageProps> = ({ newsItems }) => { // Receive newsItems as props
  const { t } = useTranslation('news'); // 使用 news 命名空间
  const { t: tCommon } = useTranslation('common'); // 加载 common 翻译

  // Handle case where newsItems might be empty, depending on your data source logic
  if (!newsItems || newsItems.length === 0) {
       return (
         <div className="container mx-auto py-16 text-center">
           <p>{t('noNewsAvailable', { defaultValue: '当前没有新闻。'})}</p>
           {/* Optional: Link back home or somewhere else */}
         </div>
       );
  }

  return (
    <>
      <Head>
        <title>{t('pageTitle', { defaultValue: '新闻中心'})}</title>
        <meta name="description" content={t('metaDescription', { defaultValue: '了解我们的最新动态和公告。'})} />
      </Head>
      <div className="bg-gray-50 py-16 md:py-24 px-4">
        <div className="container mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--secondary)] font-[Poppins] mb-4">
              {t('mainHeading', { defaultValue: '新闻中心'})}
            </h1>
            <p className="text-lg text-[var(--accent-gray)] font-[Asap] leading-relaxed">
              {t('description', { defaultValue: '关注我们的最新进展、公告和行业见解。'})}
            </p>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Use the newsItems prop for mapping */}
            {newsItems.map((item) => (
              <Link key={item.id} href={`/news/${item.slug}`} className="block group no-underline rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white">
                {/* Image Area */}
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400 overflow-hidden">
                   {item.image ? (
                     <div
                       className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                       style={{ backgroundImage: `url(${item.image.url})` }}
                       role="img"
                       aria-label={item.image.alt || item.title}
                     ></div>
                   ) : (
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                     </svg>
                   )}
                </div>
                <div className="p-6">
                  {item.date && <p className="text-sm text-gray-500 mb-2">{new Date(item.date).toLocaleDateString()}</p>}
                  <h3 className="text-xl font-semibold text-[var(--secondary)] font-[Poppins] mb-3 group-hover:text-[var(--primary)] transition-colors duration-300">
                    {/* Render title directly */}
                    {item.title}
                  </h3>
                  <p className="text-base text-[var(--accent-gray)] font-[Asap] mb-4 line-clamp-3">
                     {/* Render content directly */}
                     {item.content.replace(/<[^>]*>?/g, '')}
                  </p>
                  <span className="text-[var(--primary)] font-medium group-hover:underline">
                     {tCommon('readMore', { defaultValue: '阅读更多'})} &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
// --- End Page Component ---


// --- Data Fetching ---
export const getStaticPaths: GetStaticPaths = async () => {
  // If news is disabled via env var, don't generate paths
  if (!process.env.PLASMIC_CMS_ID || process.env.PLASMIC_CMS_ID === 'ignore') {
    console.log('[news.tsx getStaticPaths] CMS_URL is ignore, returning empty paths.');
    return { paths: [], fallback: false };
  }
  // If using Plasmic, paths should ideally be generated based on actual slugs fetched from Plasmic
  // However, for the LISTING page itself (/en/news, /zh/news), we just need the locales.
  // The actual check if data exists for a locale could happen in getStaticProps.
  const locales = i18nextConfig.i18n.locales;
  const paths = locales.map((locale) => ({
    params: { locale },
  }));
  return { paths, fallback: false };
};

// Modify getStaticProps for Plasmic CMS API
export const getStaticProps: GetStaticProps<NewsPageProps> = async ({ params }) => {
  const locale = params?.locale as string || i18nextConfig.i18n.defaultLocale;
  const namespacesRequired = ['common', 'navbar', 'footer', 'news']; // Define namespaces needed

  // Check if news feature is disabled
  if (!process.env.PLASMIC_CMS_ID || process.env.PLASMIC_CMS_ID === 'ignore') {
       console.log('[news.tsx getStaticProps] CMS_URL is ignore, returning empty news list.');
       return {
           props: {
               newsItems: [],
               ...(await serverSideTranslations(locale, namespacesRequired)),
           },
       };
   }

  // --- Fetch data from Plasmic CMS ---
  const CMS_ID = process.env.PLASMIC_CMS_ID;
  const CMS_PUBLIC_TOKEN = process.env.PLASMIC_CMS_PUBLIC_TOKEN;
  // !!! IMPORTANT: Replace 'YOUR_NEWS_MODEL_ID' with the actual unique identifier of your News model in Plasmic CMS
  const CMS_MODEL_ID = 'news'; // <--- REPLACE THIS

  if (!CMS_ID || !CMS_PUBLIC_TOKEN || CMS_MODEL_ID !== 'news') {
      console.error('Plasmic CMS environment variables (PLASMIC_CMS_ID, PLASMIC_CMS_PUBLIC_TOKEN) or CMS_MODEL_ID are not set.');
      // Return empty array to avoid build errors, but log the issue.
      return {
          props: {
              newsItems: [],
              ...(await serverSideTranslations(locale, namespacesRequired)),
          },
      };
  }

  let newsItems: NewsItem[] = [];
  try {
      const apiUrl = new URL(`https://data.plasmic.app/api/v1/cms/databases/${CMS_ID}/tables/${CMS_MODEL_ID}/query`);
      // Add locale parameter to fetch localized fields
      apiUrl.searchParams.set('locale', mapLocaleForPlasmic(locale));
     
      const response = await fetch(apiUrl.toString(), {
          headers: {
              'x-plasmic-api-cms-tokens': `${CMS_ID}:${CMS_PUBLIC_TOKEN}`
          }
      });

      if (!response.ok) {
          throw new Error(`Plasmic CMS API request failed with status ${response.status}: ${await response.text()}`);
      }
      // console.log('response', await response.json());
      const parsedResponse = await response.json();
      // Map the response rows using the specific type
      // Adjust 'item.data.fieldName' based on your actual Plasmic model field names
      newsItems = parsedResponse.rows.map((item: PlasmicCmsRow) => ({ // Use PlasmicCmsRow type here
          id: item.id, // Use the Plasmic Row ID
          slug: item.data.slug, // Assuming a 'slug' field
          image: item.data.image, // Assuming simple URL string for now
          date: item.data.date, // Assuming a 'date' field (string)
          title: item.data.title, // Assuming a 'title' field (localized)
          content: item.data.content // Assuming an 'content' field (localized)
      }));
      console.log('newsItems', parsedResponse);


  } catch (error) {
      console.error('Error fetching news items from Plasmic CMS:', error);
      // Return empty array on error to allow the page to build
      newsItems = [];
  }
  // --- End Fetch data ---

  return {
    props: {
      isNewsEnabled: !!(process.env.PLASMIC_CMS_ID && process.env.PLASMIC_CMS_ID !== 'ignore'),
      newsItems, // Pass the fetched data
      ...(await serverSideTranslations(locale, namespacesRequired)),
    },
    // Optional: Add revalidation if your news updates frequently
    // revalidate: 60 // Rebuild page every 60 seconds
  };
};
// --- End Data Fetching ---

export default NewsPage; 
