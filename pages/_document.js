import { Html, Head, Main, NextScript } from "next/document";

export default function Document(props) {
  return (
    <Html lang={props.locale || "en"}>
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = async (ctx) => {
  const initialProps = await ctx.defaultGetInitialProps(ctx);
  const locale = ctx.locale || "en";
  
  return {
    ...initialProps,
    locale,
  };
}
