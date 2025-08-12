import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

import i18nextConfig from '../../next-i18next.config.js';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const currentLocale = this.props.__NEXT_DATA__.query.locale || i18nextConfig.i18n.defaultLocale;
  return (
    <Html lang={currentLocale as string}>
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
}

export default MyDocument;
