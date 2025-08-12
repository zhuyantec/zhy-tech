import React from 'react';
import { useTranslation } from 'next-i18next';
import Link from './Link'; // Import custom Link
import { COMPANY_NAME } from '../lib/companyConfig';

const CTASection = () => {
  const { t } = useTranslation('footer');

  return (
    <div className="relative bg-[var(--primary)] rounded-[37px] p-8 md:p-12 lg:p-16 text-white overflow-hidden">
       {/* Decorative Background - Placeholder for SVG or CSS effect */}
       {/* Ideally, download the SVG group (1:586) and use it as a background */}
       <div className="absolute inset-0 opacity-10">
            {/* Placeholder for SVG background image */}
            {/* <img src="/icons/cta-bg-lines.svg" className="w-full h-full object-cover" alt="" /> */}
            {/* Or use CSS gradients/patterns */}
       </div>
       
       {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-4xl font-bold font-[Poppins] mb-4">
            {t('cta.title', { defaultValue: `与 ${COMPANY_NAME} 合作`, companyName: COMPANY_NAME })}
          </h2>
          <p className="text-base md:text-lg font-[Asap] leading-relaxed">
            {t('cta.description', { defaultValue: `选择 ${COMPANY_NAME}，选择创新、可靠、现代化的技术伙伴。`, companyName: COMPANY_NAME })}
          </p>
        </div>
        <Link href="/contact" className="bg-white text-[var(--primary-light)] font-bold font-[Inter] text-lg py-3 px-8 rounded-[17px] whitespace-nowrap hover:bg-gray-100 transition-colors duration-300 shadow-md no-underline">
             {t('cta.button', { defaultValue: '开始合作', companyName: COMPANY_NAME })}
        </Link>
      </div>
    </div>
  );
};

export default CTASection; 