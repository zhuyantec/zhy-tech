import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic';

import { Geist, Geist_Mono } from "next/font/google";
// import Image from "next/image"; // Removed unused import
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import Projects from "@/components/Projects";
import AboutUs from "@/components/AboutUs";
import Testimonials from "@/components/Testimonials";
import AboutUsVariant from "@/components/AboutUsVariant";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const namespacesRequired = ['common', 'navbar', 'footer', 'home'];

const Home: NextPage = () => {
  // t might not be used directly, but loading the namespace is necessary for components
  const { t } = useTranslation('common'); // eslint-disable-line @typescript-eslint/no-unused-vars 
  
  return (
    <div className={`${geistSans.className} ${geistMono.className} font-[family-name:var(--font-geist-sans)]`}>
      <Hero />
      <Partners />
      <Projects />
      <AboutUs />
      <AboutUsVariant />
      <Testimonials />
    </div>
  );
}

const getStaticProps = makeStaticProps(namespacesRequired);

export { getStaticPaths, getStaticProps };

export default Home;
