import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ReactNotifications />
      <ThemeProvider
        attribute="class"
        enableSystem={false}
        defaultTheme="light"
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
