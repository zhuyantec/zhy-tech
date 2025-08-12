import React from 'react';
// import Image from 'next/image'; // Removed unused import
import CircularVisual from './CircularVisual'; // Import the new component
import { useTranslation } from 'next-i18next'; // Import useTranslation
import Link from './Link'; // Import custom Link

const AboutUs = () => {
  const { t } = useTranslation('home'); // Use 'home' namespace
  const { t: tCommon } = useTranslation('common'); // For common button text

  return (
    <div className="py-16 md:py-24 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left Column - Visuals using Reusable Component */}
        <div className="relative flex justify-center items-center min-h-[400px] md:min-h-[500px]">
          
          {/* Render the four visuals using the CircularVisual component */}
          <CircularVisual 
            src="/images/about-shape-1.webp"
            alt={t('aboutSection.visuals.shape1Alt', { defaultValue: '抽象形状 1'})}
            size="lg" 
            positionClasses="top-10 left-10 -translate-x-1/4 -translate-y-1/4"
            isShape={true}
          />
          <CircularVisual 
            src="/images/about-shape-2.webp"
            alt={t('aboutSection.visuals.shape2Alt', { defaultValue: '抽象形状 2'})}
            size="md"
            positionClasses="bottom-10 right-10 translate-x-1/4 translate-y-1/4"
            isShape={true}
          />
          <CircularVisual 
            src="/images/person-1.webp"
            alt={t('aboutSection.visuals.customer1Alt', { defaultValue: '满意的客户 1'})}
            size="sm"
            positionClasses="top-5 left-1/2 -translate-x-1/2 -translate-y-1/4"
          />
          <CircularVisual 
            src="/images/person-1.webp"
            alt={t('aboutSection.visuals.customer2Alt', { defaultValue: '满意的客户 2'})}
            size="xs"
            positionClasses="bottom-5 right-1/3 translate-x-1/2 translate-y-1/4"
          />

           {/* Stats Card */}
           <div className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-[var(--primary)] text-white p-6 md:p-8 rounded-2xl shadow-xl text-center w-48 md:w-56 z-10">
                <p className="text-4xl md:text-5xl lg:text-6xl font-semibold font-[Inter]">150+</p>
                <p className="text-lg md:text-xl text-gray-200 font-light font-[Inter] mt-2">{t('aboutSection.statsCard.label', { defaultValue: '满意客户'})}</p>
           </div>
        </div>

        {/* Right Column - Text Content */}
        <div className="max-w-lg">
          <p className="text-lg md:text-xl font-semibold text-[var(--primary)] tracking-[.05em] font-[Poppins] mb-4">
            {t('aboutSection.subtitle', { defaultValue: '关于我们'})}
          </p>
          <h2 className="text-4xl md:text-5xl font-medium text-black font-[Poppins] leading-tight mb-6">
            {t('aboutSection.title1', { defaultValue: '众多客户满意'})}<br />
            {t('aboutSection.title2', { defaultValue: '服务至上'})}
          </h2>
          <p className="text-base md:text-lg text-[var(--accent-gray)] font-[Asap] leading-relaxed mb-8">
            {t('aboutSection.description', { defaultValue: '这是一段关于公司的介绍性文字。您可以详细说明公司的历史、使命和价值观。'})}
          </p>
          <Link href="/about" className="bg-[var(--primary)] text-white text-base md:text-lg font-medium font-[Inter] py-3 px-8 rounded-full hover:bg-[var(--primary-hover)] transition-colors duration-300 shadow-lg no-underline">
               {tCommon('learnMore', { defaultValue: '了解更多'})}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs; 