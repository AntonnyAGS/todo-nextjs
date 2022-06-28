import { Html, Head, Main, NextScript } from "next/document";

function Document() {
  return (
    <Html>
      <Head>
        <meta charSet="utf-8" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat&display=optional"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;
