import React from 'react';
import Image from "next/legacy/image";
import { useTranslation } from 'next-i18next';
import Link from './Link';

const AboutUsVariant = () => {
  const { t } = useTranslation('home');
  const { t: tCommon } = useTranslation('common');

  return (
    <div className="py-16 md:py-24 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left Column - Image */}
        <div className="relative w-full h-80 md:h-[500px] rounded-[35px] overflow-hidden shadow-lg">
           <Image 
             src="/images/about-variant-image.webp" // Placeholder for downloaded image
             alt={t('aboutVariantSection.imageAlt', { defaultValue: '团队合作或办公室场景'})}
             layout="fill"
             objectFit="cover"
           />
        </div>

        {/* Right Column - Text Content */}
        <div className="max-w-lg">
          <p className="text-lg md:text-xl font-semibold text-[var(--primary)] tracking-[.05em] font-[Poppins] mb-4">
            {t('aboutVariantSection.subtitle', { defaultValue: '关于我们'})}
          </p>
          <h2 className="text-4xl md:text-5xl font-medium text-black font-[Poppins] leading-tight mb-6">
            {t('aboutVariantSection.title1', { defaultValue: '您的成功'})}<br />
            {t('aboutVariantSection.title2', { defaultValue: '我们的使命'})}
          </h2>
          <p className="text-base md:text-lg text-[var(--accent-gray)] font-[Asap] leading-relaxed mb-8">
            {t('aboutVariantSection.description', { defaultValue: '这是一段补充的关于我们信息。您可以进一步阐述公司的核心竞争力或服务理念。'})}
          </p>
          <Link href="/about" className="bg-[var(--primary)] text-white text-base md:text-lg font-medium font-[Inter] py-3 px-8 rounded-full hover:bg-[var(--primary-hover)] transition-colors duration-300 shadow-lg no-underline">
             {tCommon('learnMore', { defaultValue: '了解更多'})}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUsVariant; 