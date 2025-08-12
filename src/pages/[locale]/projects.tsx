import React from 'react';
import { GetStaticPaths, GetStaticProps, NextPage, GetStaticPropsContext } from 'next';
import Image from "next/legacy/image";
import Link from '@/components/Link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nextConfig from '../../../next-i18next.config.js';
import fs from 'fs';
import path from 'path';

// Define Project Data structure from JSON
interface ProjectItem {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  altText: string;
  tags: string[];
}

// Define page props
interface ProjectsPageProps {
  projectsList: ProjectItem[];
  // Translation props added by serverSideTranslations
}

// Define namespaces required for this page (title, desc, common button)
const namespacesRequired = ['common', 'navbar', 'footer', 'projects'];

const ProjectsPage: NextPage<ProjectsPageProps> = ({ projectsList }) => {
  const { t } = useTranslation('projects'); // For page title/desc
  const { t: tCommon } = useTranslation('common'); // For 'View Details' button

  return (
    <div className="bg-gray-50 py-16 md:py-24 px-4">
      <div className="container mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--secondary)] font-[Poppins] mb-4">
            {t('pageTitle', { defaultValue: '我们的项目案例'})}
          </h1>
          <p className="text-lg md:text-xl text-[var(--accent-gray)] font-[Asap] max-w-3xl mx-auto">
            {t('pageDescription', { defaultValue: '探索我们为各行各业客户打造的创新解决方案和成功实践。'})}
          </p>
        </div>

        {/* Projects Grid - Use projectsList from props */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsList.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`} className="bg-white rounded-[33px] shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300 cursor-pointer no-underline">
              <>
                <div className="relative w-full h-60">
                   <Image
                     src={project.imageUrl}
                     alt={project.altText} // Use directly from JSON
                     layout="fill"
                     objectFit="cover"
                   />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl md:text-2xl font-bold font-[Poppins] mb-3 text-black">
                    {project.title} {/* Use directly from JSON */}
                  </h3>
                  <p className="text-sm text-gray-600 font-[Asap] leading-relaxed mb-4 flex-grow line-clamp-3">
                     {project.description} {/* Use directly from JSON */}
                  </p>
                   <div className="mb-4">
                     {/* Use tags directly from JSON, no need for t() here */}
                     {project.tags.map((tag, index) => (
                       <span key={index} className="inline-block  border border-[var(--primary)] text-[var(--primary)] text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                         {tag}
                       </span>
                     ))}
                   </div>
                   <div className="mt-auto text-sm font-medium text-[var(--primary)] self-start">
                    {tCommon('viewDetails', { defaultValue: '查看详情' })} &rarr;
                  </div>
                </div>
              </>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// Define own getStaticPaths as it depends on locale
export const getStaticPaths: GetStaticPaths = async () => {
  const locales = i18nextConfig.i18n.locales;
  const paths = locales.map((locale) => ({
    params: { locale },
  }));
  return { paths, fallback: false };
};

// Fetch translations and project list data
export const getStaticProps: GetStaticProps<ProjectsPageProps, { locale: string }> = async (context: GetStaticPropsContext<{ locale: string }>) => {
    const locale = context.params?.locale || i18nextConfig.i18n.defaultLocale;
    let projectsList: ProjectItem[] = [];
    let allTranslations = {}; // Initialize translations object

    try {
      // Construct the path to the JSON file that now contains item data
      const filePath = path.join(process.cwd(), 'public', 'locales', locale, 'projects.json');
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const jsonData = JSON.parse(fileContent);
      projectsList = jsonData.items || []; // Extract items array

      // Fetch translations (including the ones from projects.json itself for title/desc)
      allTranslations = await serverSideTranslations(locale, namespacesRequired);

    } catch (error) {
      console.error(`Error reading or parsing projects.json for locale ${locale}:`, error);
      // Still try to fetch translations even if data loading fails?
       allTranslations = await serverSideTranslations(locale, namespacesRequired).catch(() => ({})); 
    }

    return {
      props: {
        isNewsEnabled: !!(process.env.PLASMIC_CMS_ID && process.env.PLASMIC_CMS_ID !== 'ignore'),
        ...allTranslations,
        projectsList, // Add projectsList to props
      },
    };
};

export default ProjectsPage; 