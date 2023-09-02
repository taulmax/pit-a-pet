import "@/styles/reset.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Header from "@/components/Header";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  return (
    <>
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
