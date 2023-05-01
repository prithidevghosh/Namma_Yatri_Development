import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
    body {
      background-image: url('/assets/background.gif');
    }
  `,
          }}
        />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
