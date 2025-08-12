import React from 'react';
import { GetStaticPaths, GetStaticProps, NextPage, GetStaticPropsContext } from 'next';
import Image from "next/legacy/image";
import Link from '@/components/Link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nextConfig from '../../../../next-i18next.config.js';
import fs from 'fs';
import path from 'path';

// Remove hardcoded data
// const detailedProjects = [ ... ];

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
interface ProjectDetailPageProps {
  project: ProjectItem | null; // Pass the loaded project data
  // Translation props added by serverSideTranslations
}

// Namespaces needed for page elements (Not Found, Back button, etc.)
const namespacesRequired = ['common', 'navbar', 'footer', 'projects'];

const ProjectDetailPage: NextPage<ProjectDetailPageProps> = ({ project }) => {
  const { t } = useTranslation('projects'); // For Not Found messages
  const { t: tCommon } = useTranslation('common'); // For Back button

  if (!project) {
    return (
        <div className="container mx-auto py-16 px-4 text-center">
            <h1 className="text-3xl font-bold mb-4">{t('notFound.title', { defaultValue: '项目未找到'})}</h1>
            <p className="text-gray-600 mb-8">{t('notFound.message', { defaultValue: '抱歉，无法加载该项目详情。'})}</p>
            <Link href="/projects" className="text-[var(--primary)] hover:underline">
                 {tCommon('backToList', { defaultValue: '返回项目列表'})}
            </Link>
        </div>
    );
  }

  // Now use project prop directly, as it contains translated data from JSON
  return (
    <div className="bg-white py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Project Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--secondary)] font-[Poppins] mb-6 text-center">
          {project.title}
        </h1>

        {/* Project Image */}
        <div className="relative w-full h-80 md:h-[500px] rounded-lg overflow-hidden shadow-lg mb-8">
           <Image
             src={project.imageUrl}
             alt={project.altText}
             layout="fill"
             objectFit="cover"
             priority
           />
        </div>

        {/* Tags */}
        <div className="mb-6 text-center">
           {project.tags.map((tag, index) => (
             <span key={index} className="inline-block border border-[var(--primary)] text-[var(--primary)] text-sm font-medium mr-2 mb-2 px-3 py-1 rounded-full">
               {tag} {/* Display tag directly from JSON */}
             </span>
           ))}
        </div>

        {/* Project Description */}
        <div className="prose lg:prose-xl max-w-none mx-auto text-gray-700 font-[Asap] leading-relaxed">
          <p>{project.description}</p>
        </div>

        {/* Back to Projects Link */}
         <div className="mt-12 text-center">
            <Link href="/projects" className="inline-block bg-[var(--primary)] text-white font-semibold py-3 px-6 rounded-full hover:bg-[var(--primary-hover)] transition-colors duration-300 shadow-md">
                 &larr; {tCommon('backToList', { defaultValue: '返回项目列表'})}
            </Link>
         </div>
      </div>
    </div>
  );
};

// Read project IDs from one JSON file for path generation
const getAllProjectIds = (): number[] => {
    try {
      const defaultLocale = i18nextConfig.i18n.defaultLocale;
      const filePath = path.join(process.cwd(), 'public', 'locales', defaultLocale, 'projects.json');
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const jsonData = JSON.parse(fileContent);
      return (jsonData.items || []).map((item: ProjectItem) => item.id);
    } catch (error) {
        console.error(`Error reading project IDs from ${i18nextConfig.i18n.defaultLocale} projects.json:`, error);
        return [];
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const locales = i18nextConfig.i18n.locales;
  const projectIds = getAllProjectIds(); // Get IDs from JSON
  const paths: Array<{ params: { locale: string; id: string } }> = [];

  locales.forEach((locale) => {
    projectIds.forEach((id) => { // Iterate over IDs from JSON
      paths.push({
        params: {
          locale,
          id: id.toString(),
       },
      });
    });
  });

  return { paths, fallback: false };
};


export const getStaticProps: GetStaticProps<ProjectDetailPageProps, { locale: string; id: string }> = async (context: GetStaticPropsContext<{ locale: string; id: string }>) => {
    const locale = context.params?.locale || i18nextConfig.i18n.defaultLocale;
    const projectId = context.params?.id;
    let project: ProjectItem | null = null;
    let allTranslations = {};

    try {
      // Read the locale-specific projects data file
      const filePath = path.join(process.cwd(), 'public', 'locales', locale, 'projects.json');
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const jsonData = JSON.parse(fileContent);
      const projectsList: ProjectItem[] = jsonData.items || [];

      // Find the specific project by ID
      project = projectsList.find(p => p.id.toString() === projectId) || null;

      // Fetch translations for common elements
      allTranslations = await serverSideTranslations(locale, namespacesRequired);

    } catch (error) {
      console.error(`Error processing projects/[id].tsx for locale ${locale}, id ${projectId}:`, error);
      // Try to fetch translations anyway for the error message
      allTranslations = await serverSideTranslations(locale, namespacesRequired).catch(() => ({}));
    }

    return {
      props: {
        isNewsEnabled: !!(process.env.PLASMIC_CMS_ID && process.env.PLASMIC_CMS_ID !== 'ignore'),
        ...allTranslations,
        project, // Pass the found project data (or null)
      },
    };
};

export default ProjectDetailPage; 