import React, { useState, useEffect, useRef } from 'react'; // Import hooks
import Link from '@/components/Link'; // Use custom Link
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import LanguageSwitchLink from './LanguageSwitchLink'; // Import language switcher
import i18nextConfig from '../../next-i18next.config.js'; // Import config for locales list
import { COMPANY_NAME } from '../lib/companyConfig';

interface NavbarProps {
    isNewsEnabled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isNewsEnabled }) => {
  const router = useRouter();
  const { t } = useTranslation('navbar');
  const { t: tCommon } = useTranslation('common');
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // <-- 1. Add state for mobile menu
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const currentLocale = router.query.locale || i18nextConfig.i18n.defaultLocale;
  const locales = i18nextConfig.i18n.locales;

  // Define base links (same as before)
  const baseNavLinks = [
      { name: t('home'), href: '/' },
      { name: t('partners'), href: '/partners' },
      { name: t('projects'), href: '/projects' },
      { name: t('about'), href: '/about' },
      { name: t('contact'), href: '/contact' },
  ];

  const navLinks = isNewsEnabled
      ? [
          ...baseNavLinks.slice(0, 2),
          { name: t('news'), href: '/news' },
          ...baseNavLinks.slice(2)
        ]
      : baseNavLinks;

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [langDropdownRef]);

  // Function to close mobile menu (useful when a link is clicked)
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
      <nav className="bg-white text-black shadow-md py-4 px-4 md:px-8 lg:px-16 relative z-20"> {/* Ensure Navbar has higher z-index */}
          <div className="container mx-auto flex justify-between items-center">
            {/* Logo */}
            <div className="text-3xl font-extrabold font-[Poppins]">
              <Link href="/" className="text-[var(--primary)]">{COMPANY_NAME}</Link>
            </div>

            {/* Desktop Menu & Language Switcher */}
            <div className="hidden md:flex items-center">
                {/* Desktop Navigation Links */}
                <ul className="flex space-x-6 items-center mr-6">
                {navLinks.map((link) => {
                    const isActive = router.pathname.split('/').slice(2).join('/') === link.href.substring(1) || (router.pathname === '/[locale]' && link.href === '/');
                    return (
                    <li key={link.href}>
                        <Link href={link.href} className={`text-lg font-[Poppins] transition-colors ${isActive
                            ? 'font-semibold text-[var(--primary)]'
                            : 'font-normal text-black hover:text-gray-600'
                        }`}>
                        {link.name}
                        </Link>
                    </li>
                    );
                })}
                </ul>

                {/* Desktop Language Switcher Dropdown */}
                <div className="relative" ref={langDropdownRef}>
                    <button
                        onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                        className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                    >
                        {tCommon(`language.${currentLocale}`, { defaultValue: (currentLocale as string).toUpperCase() })}
                        <svg className="ml-2 -mr-1 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                    {isLangDropdownOpen && (
                        <div className="origin-top-right absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg focus:outline-none py-1">
                            {locales.map((locale) => {
                                if (locale === currentLocale) return null;
                                return (
                                    <LanguageSwitchLink
                                        key={locale}
                                        locale={locale}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
               {/* 2. Add onClick to toggle mobile menu state */}
               <button
                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                 className="text-black focus:outline-none"
                 aria-label="Toggle menu" // Add accessibility label
                 aria-expanded={isMobileMenuOpen} // Indicate state for screen readers
                >
                 {/* Optionally change icon based on state */}
                 {isMobileMenuOpen ? (
                      (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>) // Close icon
                 ) : (
                      (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>) // Hamburger icon
                 )}
               </button>
            </div>
          </div>
          {/* 3. Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden py-4 px-4"> {/* Position below navbar */}
              <ul className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block text-lg font-[Poppins] text-black hover:text-[var(--primary)] text-center"
                      onClick={closeMobileMenu} // Close menu when link is clicked
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
                 {/* Mobile Language Switcher */}
                 <li className="pt-4 mt-4 border-t border-gray-200">
                    <p className="text-center text-sm text-gray-500 mb-2">{tCommon('languageSwitchLabel', {defaultValue: 'Switch Language'})}:</p>
                    <div className="flex justify-center space-x-4">
                       {locales.map((locale) => {
                            const isActive = locale === currentLocale;
                            return (
                                <LanguageSwitchLink
                                    key={locale}
                                    locale={locale}
                                    className={`px-3 py-1 rounded text-sm ${isActive ? 'font-semibold text-[var(--primary)] bg-gray-100' : 'text-gray-700 hover:bg-gray-50'}`}
                                />
                            );
                        })}
                    </div>
                 </li>
              </ul>
            </div>
          )}
      </nav>
  );
};

export default Navbar; 