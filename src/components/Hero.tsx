import React from 'react';
import Image from "next/legacy/image";
import { useTranslation } from 'next-i18next';
import Link from './Link'; // Import custom Link
import { COMPANY_NAME } from '../lib/companyConfig';

const Hero = () => {
  const { t } = useTranslation('home');

  return (
    <div className="relative h-[70vh] md:h-[80vh] lg:h-[90vh] text-white flex items-center justify-center text-center"> 
      {/* Background Image with Gradient Overlay */}
      <Image
        src="/images/hero-background.webp" // Placeholder, will be downloaded
        alt={t('hero.backgroundImageAlt', { defaultValue: 'People in office analyzing finance graphs'})}
        layout="fill"
        objectFit="cover"
        quality={100}
        priority // Load image faster
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent-dark-blue)]/70 to-[var(--accent-blue-light)]/30"></div> 

      {/* Content */}
      <div className="relative z-10 px-4">
        {/* Welcome Text */}
        <p className="text-xl md:text-2xl lg:text-3xl font-semibold tracking-[.05em] font-[Poppins] mb-4">
          {t('hero.welcome', { defaultValue: `欢迎来到 ${COMPANY_NAME}`, companyName: COMPANY_NAME })}
        </p>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight font-[Poppins] tracking-tighter mb-8">
          {t('hero.headline1', { defaultValue: '塑造未来'})}<br />
          {t('hero.headline2', { defaultValue: '创新视野'})}
        </h1>

        {/* More Button - Use Link component */}
        <Link href="/about" className="bg-[var(--primary)] text-white text-lg md:text-xl lg:text-xl font-semibold font-[Poppins] py-3 px-10 rounded-[25px] hover:bg-[var(--primary-hover)] transition-colors duration-300 no-underline">
          {t('hero.button', { defaultValue: '了解更多'})}
        </Link>
      </div>
    </div>
  );
};

export default Hero; 