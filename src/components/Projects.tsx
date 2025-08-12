import React from "react";
import { useTranslation } from 'next-i18next';
import Link from './Link';

const Projects = () => {
  const { t } = useTranslation('home');
  const { t: tCommon } = useTranslation('common');

  return (
    <div className="py-16 md:py-24 px-4">
      <div className="container mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center max-w-3xl mb-12 md:mb-16">
          <p className="text-lg md:text-xl font-semibold text-[var(--primary)] tracking-[.05em] font-[Poppins] mb-4">
            {t('projectsSection.subtitle', { defaultValue: '项目案例'})}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--secondary)] font-[Poppins] mb-6">
             {t('projectsSection.title', { defaultValue: '我们的成功项目'})}
          </h2>
          <p className="text-base md:text-lg text-[var(--accent-gray)] font-[Asap] leading-relaxed">
            {t('projectsSection.description', { defaultValue: '这是一段描述性文字，用于介绍项目案例部分。您可以替换为实际内容。'})}
          </p>
        </div>

        {/* Project Cards Grid - Modified for stacked right column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 md:mb-16 w-full">
          {/* Project Card 1 (Left Column) */}
          <div className="bg-[var(--bg-gray)] rounded-[33px] overflow-hidden relative min-h-[400px] md:min-h-[500px] flex flex-col justify-end p-6 md:p-8 text-white">
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center" 
              style={{ backgroundImage: "url('/images/project-bg-1.webp')" }}
              role="img" 
              aria-label={t('projectsSection.card1.alt', { defaultValue: '项目一背景'})}
            ></div>
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 z-10"></div>
            {/* Card Content */}
            <div className="relative z-20 flex flex-col md:flex-row items-end md:items-center justify-between gap-4">
              <div className="max-w-xs">
                <h3 className="text-2xl md:text-3xl font-bold font-[Poppins] mb-2">
                   {t('projectsSection.card1.title', { defaultValue: '项目一标题'})}
                </h3>
                <p className="text-sm md:text-base text-[var(--accent-gray-light)] font-[Asap] leading-relaxed">
                   {t('projectsSection.card1.description', { defaultValue: '项目一的简短描述，突出其特点和成果。'})}
                </p>
              </div>
               <Link href="/projects/1" className="border border-white text-white text-sm md:text-base font-medium font-[Inter] py-2 px-5 rounded-full whitespace-nowrap hover:bg-white hover:text-black transition-colors duration-300 shadow-lg no-underline">
                   {tCommon('viewDetails', { defaultValue: '查看详情'})}
               </Link>
            </div>
          </div>

          {/* Right Column - Vertically Stacked Cards */}
          <div className="flex flex-col gap-8">
            {/* Project Card 2 (Top card in the right column) */}
            <Link href="/projects/2" className="block no-underline">
                <div className="bg-[var(--bg-gray)] rounded-[33px] overflow-hidden relative min-h-[400px] md:min-h-[234px] flex flex-col justify-end p-6 md:p-8 text-white group hover:shadow-xl transition-shadow duration-300">
                 <div 
                   className="absolute inset-0 z-0 bg-cover bg-center"
                   style={{ backgroundImage: "url('/images/project-bg-1.webp')" }}
                   role="img"
                   aria-label={t('projectsSection.card2.backgroundAlt', { defaultValue: '项目二背景'})}
                 ></div>
                 
                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"></div>
                 <div className="relative z-20 flex flex-col items-start">
                   <h3 className="text-xl md:text-2xl font-bold font-[Poppins] mb-1">
                      {t('projectsSection.card2.title', { defaultValue: '项目二标题'})}
                   </h3>
                   <p className="text-xs md:text-sm text-[var(--accent-gray-light)] font-[Asap] leading-relaxed max-w-md">
                      {t('projectsSection.card2.description', { defaultValue: '项目二的简短描述。'})}
                   </p>
                 </div>
                </div>
            </Link>

            {/* Project Card 3 (Bottom card in the right column) */}
            <Link href="/projects/3" className="block no-underline">
               <div className="bg-[var(--bg-gray)] rounded-[33px] overflow-hidden relative min-h-[400px] md:min-h-[234px] flex flex-col justify-end p-6 md:p-8 text-white group hover:shadow-xl transition-shadow duration-300">
                 <div 
                   className="absolute inset-0 z-0 bg-cover bg-center"
                   style={{ backgroundImage: "url('/images/project-bg-1.webp')" }}
                   role="img"
                   aria-label={t('projectsSection.card3.backgroundAlt', { defaultValue: '项目三背景'})}
                 ></div>
                
                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"></div>
                 <div className="relative z-20 flex flex-col items-start">
                   <h3 className="text-xl md:text-2xl font-bold font-[Poppins] mb-1">
                      {t('projectsSection.card3.title', { defaultValue: '项目三标题'})}
                   </h3>
                   <p className="text-xs md:text-sm text-[var(--accent-gray-light)] font-[Asap] leading-relaxed max-w-md">
                      {t('projectsSection.card3.description', { defaultValue: '项目三的简短描述。'})}
                   </p>
                 </div>
               </div>
             </Link>
          </div>
        </div>

        {/* Main Button */} 
        <Link href="/projects" className="bg-[var(--primary)] text-white text-lg md:text-xl font-medium font-[Inter] py-4 px-10 rounded-full hover:bg-[var(--primary-hover)] transition-colors duration-300 shadow-lg no-underline">
             {t('projectsSection.mainButton', { defaultValue: '浏览所有项目'})}
        </Link>
      </div>
    </div>
  );
};

export default Projects;
