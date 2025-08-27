import React from 'react';
import { useTranslation } from 'next-i18next'; // Import useTranslation
import Image from "next/legacy/image";

// Define an interface for partner data if needed, or just use an array of objects
const partners = [
  { name: 'Haier', logoSrc: '/logos/haier.svg', id: '1:76', alt: 'Haier Logo' },
  { name: 'Vighi', logoSrc: '/logos/vighi.svg', id: '1:98', alt: 'Vighi Logo' },
  { name: 'Nobilia', logoSrc: '/logos/nobilia.svg', id: '1:106', alt: 'Nobilia Logo' },
  { name: 'Kulitat', logoSrc: '/logos/kulitat.svg', id: '2:76', alt: 'Kulitat Logo' },
  { name: 'Fisher&Paykel', logoSrc: '/logos/fisher&paykel.svg', id: '2:98', alt: 'Fisher&Paykel Logo' },
  { name: 'Casarte', logoSrc: '/logos/casarte.svg', id: '2:98', alt: 'Casarte Logo' },
  { name: 'Raumplus', logoSrc: '/logos/raumplus.svg', id: '2:98', alt: 'Raumplus Logo' },
  // Add more partners if needed based on the Figma design (it shows 3)
];

const Partners = () => {
  const { t } = useTranslation('home'); // Use 'home' namespace

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto text-center px-4 lg:w-1/2">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-semibold text-[var(--primary)] tracking-[.05em] font-[Poppins] mb-10 md:mb-16">
          {t('partnersSection.title', { defaultValue: '信赖伙伴'})}
        </h2>

        {/* Logos */}
        {/* Adjust grid columns based on the number of logos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 items-center justify-items-center">
          {partners.map((partner) => (
            <div key={partner.id} className="transition duration-300 ease-in-out">
              {/* Using img tag for SVG for better control, could use Image component if needed */}
              <Image 
                width={200}
                height={100}
                src={partner.logoSrc} 
                alt={t(`partnersSection.logoAlt.${partner.name.toLowerCase()}`, { defaultValue: partner.alt })}
                className="h-4 md:h-6 lg:h-9 w-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners; 
