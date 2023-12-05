import "@/styles/reset.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/components/Header";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { GlobalStateProvider } from "@/context/GlobalStateContext";

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const [queryClient] = useState(() => new QueryClient());

  return (
    <GlobalStateProvider>
      <QueryClientProvider client={queryClient}>
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
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          transition={Slide}
          theme="colored"
        />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </GlobalStateProvider>
  );
}
