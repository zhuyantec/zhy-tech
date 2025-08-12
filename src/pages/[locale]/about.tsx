import Image from "next/legacy/image";
import { GetStaticProps, NextPage, GetStaticPropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nextConfig from '../../../next-i18next.config.js';
import fs from 'fs';
import path from 'path';
import { getStaticPaths } from '../../lib/getStatic.js';
import { COMPANY_NAME } from '../../lib/companyConfig';
// Remove hardcoded data
// const teamMembers = [ ... ];

// Define Team Member Data structure from JSON
interface TeamMember {
  id: number;
  name: string;
  title: string;
  imageUrl: string;
  bio: string;
}

// Define page props
interface AboutPageProps {
  teamMembers: TeamMember[];
  // Translation props added by serverSideTranslations
}

// Define namespaces required for page content (title, desc, sections)
const namespacesRequired = ['common', 'navbar', 'footer', 'about'];

const AboutPage: NextPage<AboutPageProps> = ({ teamMembers }) => {
  const { t } = useTranslation('about'); // Use 'about' namespace for page content

  return (
    <>
      {/* Page Header */}
      <div className="bg-white py-16 md:py-24 px-4">
        <div className="container mx-auto text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--secondary)] font-[Poppins] mb-4">
                {t('pageTitle', { defaultValue: `关于 ${COMPANY_NAME}`, companyName: COMPANY_NAME })}
            </h1>
            <p className="text-lg md:text-xl text-[var(--accent-gray)] font-[Asap] max-w-3xl mx-auto">
                {t('pageDescription', { defaultValue: '了解我们的故事、使命、价值观以及驱动我们前进的团队。'})}
            </p>
        </div>
      </div>

      {/* Section 1: Team Mission */}
      <div className="bg-gray-50 py-16 md:py-24 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
           {/* Image */}
           <div className="relative w-full h-80 md:h-[400px] rounded-lg overflow-hidden shadow-lg order-1 md:order-2">
             <Image
               src="/images/about-variant-image.webp"
               alt={t('missionSection.imageAlt', { defaultValue: '团队使命视觉图'})}
               layout="fill"
               objectFit="cover"
             />
           </div>
           {/* Text */}
           <div className="max-w-lg order-2 md:order-1">
             <p className="text-lg md:text-xl font-semibold text-[var(--primary)] tracking-[.05em] font-[Poppins] mb-4">
               {t('missionSection.subtitle', { defaultValue: '团队使命'})}
             </p>
             <h2 className="text-3xl md:text-4xl font-medium text-black font-[Poppins] leading-tight mb-6">
               {t('missionSection.titleLine1', { defaultValue: '以技术驱动创新'})}<br />
               {t('missionSection.titleLine2', { defaultValue: '赋能客户成功'})}
             </h2>
             <p className="text-base md:text-lg text-gray-700 font-[Asap] leading-relaxed mb-8">
                {t('missionSection.description', { defaultValue: '我们的使命是通过前沿的技术解决方案和卓越的客户服务，帮助客户应对挑战、抓住机遇，并在数字化时代取得持续成功。我们坚信协作与创新的力量。'})}
             </p>
           </div>
        </div>
      </div>

       {/* Section 2: Company History */}
       <div className="bg-white py-16 md:py-24 px-4">
         <div className="container mx-auto max-w-4xl text-center">
            <p className="text-lg md:text-xl font-semibold text-[var(--primary)] tracking-[.05em] font-[Poppins] mb-4">
                {t('historySection.subtitle', { defaultValue: '公司历史'})}
             </p>
            <h2 className="text-3xl md:text-4xl font-medium text-black font-[Poppins] leading-tight mb-8">
                {t('historySection.title', { defaultValue: '我们的发展历程'})}
             </h2>
            <div className="prose lg:prose-lg max-w-none mx-auto text-gray-700 font-[Asap] leading-relaxed text-left md:text-center">
                <p>
                    {t('historySection.paragraph1', { defaultValue: `${COMPANY_NAME} 成立于 [创立年份]，最初专注于 [早期业务领域]。凭借对技术的热情和对客户需求的深刻理解，我们逐步扩展业务范围，在 [关键里程碑1，例如进入新市场或发布重要产品] 取得了显著进展。`, components: { span: <span /> } , companyName: COMPANY_NAME })}
                </p>
                <p>
                     {t('historySection.paragraph2', { defaultValue: '多年来，我们始终坚持 [公司核心价值观，例如：创新、诚信、合作] 的原则，不断积累技术实力，优化服务流程。在 [关键里程碑2，例如获得重要认证或完成重大项目] 后，公司进入了新的发展阶段。如今，我们已成为 [当前市场定位或行业描述] 领域值得信赖的合作伙伴。', components: { span: <span /> } })}
                </p>
                {/* 可以添加更多段落或时间线 */}
            </div>
         </div>
       </div>

      {/* Section 3: Team Introduction - Use teamMembers from props */}
      <div className="bg-gray-100 py-16 md:py-24 px-4">
        <div className="container mx-auto">
            <div className="text-center mb-12 md:mb-16">
                <p className="text-lg md:text-xl font-semibold text-[var(--primary)] tracking-[.05em] font-[Poppins] mb-4">
                    {t('teamSection.subtitle', { defaultValue: '团队介绍'})}
                </p>
                <h2 className="text-3xl md:text-4xl font-medium text-black font-[Poppins] leading-tight mb-4">
                     {t('teamSection.title', { defaultValue: '认识我们的核心团队'})}
                </h2>
                 <p className="text-base md:text-lg text-[var(--accent-gray)] font-[Asap] max-w-2xl mx-auto">
                     {t('teamSection.description', { defaultValue: '我们的团队汇聚了经验丰富的专业人士，共同致力于为客户创造价值。'})}
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member) => (
                    <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden text-center p-6">
                        <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gray-200">
                           <Image
                               src={member.imageUrl}
                               alt={t('teamSection.memberAlt', { name: member.name, defaultValue: `${member.name} 的头像`})} // Still use t() for alt text generation
                               layout="fill"
                               objectFit="cover"
                           />
                        </div>
                        <h3 className="text-xl font-semibold text-black font-[Poppins] mb-1">{member.name}</h3> {/* Use name from loaded JSON */} 
                        <p className="text-sm text-[var(--primary)] font-medium mb-2">{member.title}</p> {/* Use title from loaded JSON */} 
                        <p className="text-xs text-gray-600 font-[Asap]">{member.bio}</p> {/* Use bio from loaded JSON */} 
                    </div>
                ))}
            </div>
        </div>
      </div>
    </>
  );
};



// Fetch translations and team data
const getStaticProps: GetStaticProps<AboutPageProps, { locale: string }> = async (context: GetStaticPropsContext<{ locale: string }>) => {
    const locale = context.params?.locale || i18nextConfig.i18n.defaultLocale;
    let teamMembers: TeamMember[] = [];
    let allTranslations = {};

    try {
      // Read team data
      const filePath = path.join(process.cwd(), 'public', 'locales', locale, 'aboutData.json');
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const jsonData = JSON.parse(fileContent);
      teamMembers = jsonData.teamMembers || [];

      // Fetch translations for page sections
      allTranslations = await serverSideTranslations(locale, namespacesRequired);

    } catch (error) {
      console.error(`Error reading or parsing aboutData.json for locale ${locale}:`, error);
      allTranslations = await serverSideTranslations(locale, namespacesRequired).catch(() => ({}));
    }

    return {
      props: {
        isNewsEnabled: !!(process.env.PLASMIC_CMS_ID && process.env.PLASMIC_CMS_ID !== 'ignore'),
        ...allTranslations,
        teamMembers,
      },
    };
};
export  { getStaticPaths, getStaticProps };
export default AboutPage; 