import React from 'react';
// import Link from 'next/link'; // Use custom Link instead
import Link from '@/components/Link'; // Import custom Link
import Image from "next/legacy/image"; // For SVG icons
import CTASection from './CTASection'; // Import the CTA component
import { useTranslation } from 'next-i18next'; // Import useTranslation
import { COMPANY_NAME } from '../lib/companyConfig';

const Footer = () => {
  const { t } = useTranslation('footer'); // Use 'footer' namespace

  return (
    <footer className="pt-24 md:pt-32 pb-8 px-4">
      <div className="container mx-auto">
        {/* CTA Section - Positioned above the main footer content */}
        <div className="mb-16 md:mb-24">
            <CTASection />
        </div>

        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Brand and Description */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl md:text-3xl font-extrabold font-[Poppins] text-black mb-4">
              {COMPANY_NAME}
            </h3>
            <p className="text-[var(--accent-gray)] font-[Poppins] text-base leading-relaxed mb-4">
              {t('description', { defaultValue: '这是一段公司简介或页脚描述文字。您可以介绍公司的主要业务或愿景。'})}
            </p>
            {/* Social Icons - Assuming these links don't need translation keys, but alt text does */}
            <div className="flex space-x-4 items-center">
              <a href="#"><Image src="/icons/facebook.svg" alt={t('social.facebook', { defaultValue: 'Facebook'})} width={24} height={24} className="opacity-70 hover:opacity-100"/></a>
              <a href="#"><Image src="/icons/twitter.svg" alt={t('social.twitter', { defaultValue: 'Twitter'})} width={24} height={24} className="opacity-70 hover:opacity-100"/></a>
              <a href="#"><Image src="/icons/instagram.svg" alt={t('social.instagram', { defaultValue: 'Instagram'})} width={24} height={24} className="opacity-70 hover:opacity-100"/></a>
              <a href="#"><Image src="/icons/youtube.svg" alt={t('social.youtube', { defaultValue: 'YouTube'})} width={24} height={24} className="opacity-70 hover:opacity-100"/></a>
              <a href="#"><Image src="/icons/linkedin.svg" alt={t('social.linkedin', { defaultValue: 'LinkedIn'})} width={22} height={22} className="opacity-70 hover:opacity-100"/></a>
            </div>
          </div>

          {/* Column 2: Quick Links (Example) */}
           <div className="lg:col-span-1">
             <h4 className="text-lg font-bold font-[Poppins] text-black mb-4">
               {t('links.quickLinksTitle', { defaultValue: '快速链接'})}
             </h4>
             <ul className="space-y-2">
               <li><Link href="/">{t('links.home', { defaultValue: '首页'})}</Link></li> {/* Changed from # */} 
               <li><Link href="/partners">{t('links.partners', { defaultValue: '合作伙伴'})}</Link></li>
               <li><Link href="/projects">{t('links.projects', { defaultValue: '项目案例'})}</Link></li>
               <li><Link href="/about">{t('links.about', { defaultValue: '关于我们'})}</Link></li> {/* Changed from # */} 
               <li><Link href="/contact">{t('links.contact', { defaultValue: '联系我们'})}</Link></li> {/* Changed from # */} 
             </ul>
           </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-lg font-bold font-[Poppins] text-black mb-4">
              {t('contact.title', { defaultValue: '联系方式'})}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                 <Image src="/icons/phone.svg" alt={t('contact.phoneAlt', { defaultValue: '电话'})} width={16} height={16} className="mt-1"/>
                <span className="text-[var(--accent-gray)] font-[Asap] ml-2">{t('contact.phoneNumber', { defaultValue: '+86 138 1234 5678'})}</span>
              </li>
              <li className="flex items-center space-x-2">
                 <Image src="/icons/email.svg" alt={t('contact.emailAlt', { defaultValue: '邮箱'})} width={16} height={16} className="mt-1"/>
                <span className="text-[var(--accent-gray)] font-[Asap] ml-2">{t('contact.emailAddress', { defaultValue: `info@${COMPANY_NAME.toLowerCase()}.com`})}</span>
              </li>
              <li className="flex items-center space-x-2">
                 <Image src="/icons/location.svg" alt={t('contact.addressAlt', { defaultValue: '地址'})} width={16} height={16} className="mt-1"/>
                <span className="text-[var(--accent-gray)] font-[Asap] leading-relaxed ml-2">
                  {t('contact.address', { defaultValue: '示例地址, 某某区, 某某市'})}
                </span>
              </li>
            </ul>
          </div>

           {/* Column 4: Placeholder or Newsletter? */}
           {/* Add content if needed */}

        </div>

        {/* Copyright */}
        <div className="text-center text-[var(--accent-gray)] text-sm font-[Plus Jakarta Sans] pt-8 border-t border-gray-300">
           {t('copyright', { defaultValue: `© {{year}} ${COMPANY_NAME}. 版权所有`, year: new Date().getFullYear(), companyName: COMPANY_NAME })}
        </div>
      </div>
    </footer>
  );
};

export default Footer; 