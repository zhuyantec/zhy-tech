import React from 'react';
// import Image from 'next/image'; // Unused
import { GetStaticPaths, GetStaticProps, NextPage, GetStaticPropsContext } from 'next'; // Import types
import { useTranslation } from 'next-i18next'; // Import useTranslation
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'; // Import directly
import i18nextConfig from '../../../next-i18next.config.js'; // Import config for defaultLocale
import fs from 'fs'; // Import fs for reading files
import path from 'path'; // Import path for constructing paths
import Image from "next/legacy/image";
// Define Partner Data structure
interface PartnerData {
  id: string;
  name: string;
  logoSrc: string;
  alt: string;
  description: string;
}

// Define page props
interface PartnersPageProps {
  partnersData: PartnerData[];
  // Translation props are implicitly added by serverSideTranslations
}

// Define namespaces required for this page (mainly for title/description)
const namespacesRequired = ['common', 'navbar', 'footer', 'partners'];

const PartnersPage: NextPage<PartnersPageProps> = ({ partnersData }) => {
  const { t } = useTranslation('partners'); // Use 'partners' namespace for page title/desc

  return (
    <div className="bg-white py-16 md:py-24 px-4">
      <div className="container mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--secondary)] font-[Poppins] mb-4">
             {t('pageTitle', { defaultValue: '我们的合作伙伴'})}
          </h1>
          <p className="text-lg md:text-xl text-[var(--accent-gray)] font-[Asap] max-w-3xl mx-auto">
             {t('pageDescription', { defaultValue: '我们与行业领导者紧密合作，共同为客户创造卓越价值。'})}
          </p>
        </div>

        {/* Partners Grid/List - Use partnersData from props */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {partnersData.map((partner) => (
            <div key={partner.id} className="border border-gray-200 rounded-lg p-6 text-center flex flex-col items-center hover:shadow-md transition-shadow duration-300">
              <div className="mb-4 h-16 flex items-center justify-center">
                 <Image
                    width={200}
                    height={100}
                   src={partner.logoSrc}
                   alt={partner.alt} // Alt text comes from the loaded JSON data
                   className="max-h-12 w-auto"
                 />
              </div>
               <h3 className="text-xl font-semibold text-black mb-2">{partner.name}</h3> {/* Assuming name doesn't need translation here */} 
              <p className="text-sm text-gray-600 flex-grow">
                 {partner.description} {/* Description comes from the loaded JSON data */}
              </p>
            </div>
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

// Fetch translations and partners data
export const getStaticProps: GetStaticProps<PartnersPageProps, { locale: string }> = async (context: GetStaticPropsContext<{ locale: string }>) => {
    const locale = context.params?.locale || i18nextConfig.i18n.defaultLocale;
    let partnersData: PartnerData[] = [];

    try {
      // Construct the path to the JSON file
      const filePath = path.join(process.cwd(), 'public', 'locales', locale, 'partnersData.json');
      // Read the file content
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      // Parse the JSON data
      partnersData = JSON.parse(fileContent);
    } catch (error) {
      console.error(`Error reading or parsing partnersData.json for locale ${locale}:`, error);
      // Optionally return an error prop or empty array
    }

    // Fetch translations using serverSideTranslations
    const translations = await serverSideTranslations(locale, namespacesRequired);

    return {
      props: {
        isNewsEnabled: !!(process.env.PLASMIC_CMS_ID && process.env.PLASMIC_CMS_ID !== 'ignore'),
        ...translations,
        partnersData, // Add partnersData to props
      },
    };
};

export default PartnersPage; 