import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import TopHeader from "@/components/TopHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";
import Meta from "@/components/Meta";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import languageDetector from "../lib/languageDetector";
import i18nextConfig from "../../next-i18next.config.js";

function App({ Component, pageProps }: AppProps) {
  const { isNewsEnabled = false } = pageProps;
  const router = useRouter();
  const [isLanguageSet, setIsLanguageSet] = useState(false);
  
  useEffect(() => {
    // Only execute on the client side
    if (typeof window === "undefined" || !router.isReady) return;

    const detectedLng =
      languageDetector?.detect() || i18nextConfig.i18n.defaultLocale;
    const currentPath = router.asPath;

    // Check if the current path starts with the configured language code
    const pathStartsWithLocale = i18nextConfig.i18n.locales.some(
      (locale) =>
        currentPath.startsWith(`/${locale}/`) || currentPath === `/${locale}`
    );

    // Language redirection is only performed when the path does not start with any configured language code
    if (!pathStartsWithLocale && currentPath !== "/404") {
      const newPath =
        "/" + detectedLng + (currentPath === "/" ? "" : currentPath);
      // @ts-expect-error Type definition issue with next-language-detector
      languageDetector?.cache(detectedLng);
      router.replace(newPath, undefined, { shallow: true }).finally(() => {
        console.log("language set");
        setIsLanguageSet(true);
      });
    } else {
      setIsLanguageSet(true);
    }
  }, [router]);

  useEffect(() => {
    console.log("isLanguageSet", isLanguageSet);
  }, [isLanguageSet]);

  return isLanguageSet ? (
    <>
      <Head>
        <title>Tech Company Website Template</title>
        <meta
          name="description"
          content="A Tech Company Website Template with Next.js, Tailwind CSS, and Plasmic CMS."
        />
      </Head>
      <TopHeader />
      <Navbar isNewsEnabled={isNewsEnabled} />
      <Meta />
      <main className="bg-white">
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  ) : null;
}

export default appWithTranslation(App);
