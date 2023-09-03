import "@/styles/reset.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Header from "@/components/Header";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  return (
    <>
      <Head>
        <title>Pit a pet</title>
        <link rel="icon" href="/img/logo.png" />
      </Head>
      <Header />
      {pathname === "/" ? (
        <Component {...pageProps} />
      ) : (
        <div className="app_wrapper">
          <Component {...pageProps} />
        </div>
      )}
    </>
  );
}
