import React from 'react';
import { useTranslation } from 'next-i18next';
import Image from "next/legacy/image";
const TopHeader = () => {
  const { t } = useTranslation('common');

  return (
    <div className="bg-[var(--bg-light-gray)] text-[var(--secondary-light)] text-xs font-medium py-2 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        {/* Left side: Contact Info */}
        <div className="flex flex-wrap items-center space-x-4">
          {/* Schedule */}
          <div className="flex items-center space-x-1 justify-between">
            {/* Schedule Icon */}
            <Image src="/icons/schedule.svg" width={14} height={14} alt={t('topHeader.scheduleAlt', { defaultValue: 'Schedule'})} className="w-4 h-4" />
            <span>{t('topHeader.scheduleText', { defaultValue: '周一至周五 08:00 - 18:00 / 周日 08:00 - 14:00'})}</span>
          </div>
          {/* Phone */}
          <div className="flex items-center space-x-1 justify-between">
            {/* Phone Icon */}
            <Image src="/icons/call.svg" width={14} height={14} alt={t('topHeader.phoneAlt', { defaultValue: 'Call'})} className="w-4 h-4" />
            <span>{t('topHeader.phoneNumber', { defaultValue: '+86 138 1234 5678'})}</span>
          </div>
          {/* Location */}
          <div className="flex items-center space-x-1 justify-between">
            {/* Location Icon */}
             <Image src="/icons/location_on.svg" width={14} height={14} alt={t('topHeader.locationAlt', { defaultValue: 'Location'})} className="w-4 h-4" />
            <span>{t('topHeader.locationText', { defaultValue: '示例地址, 某某区, 某某市'})}</span>
          </div>
        </div>

        {/* Right side: Social Media Icons */}
        <div className="flex items-center justify-between w-20">
            {/* Replace with actual social media icons & add alt text */}
            <Image src="/icons/social-1.svg" width={16} height={16} alt={t('topHeader.socialAlt1', { defaultValue: 'Social Media 1'})} className="w-4 h-4 cursor-pointer" />
            <Image src="/icons/social-2.svg" width={16} height={16} alt={t('topHeader.socialAlt2', { defaultValue: 'Social Media 2'})} className="w-4 h-4 cursor-pointer" />
            <Image src="/icons/social-3.svg" width={16} height={16} alt={t('topHeader.socialAlt3', { defaultValue: 'Social Media 3'})} className="w-4 h-4 cursor-pointer" />
            <Image src="/icons/social-4.svg" width={16} height={16} alt={t('topHeader.socialAlt4', { defaultValue: 'Social Media 4'})} className="w-4 h-4 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default TopHeader; 