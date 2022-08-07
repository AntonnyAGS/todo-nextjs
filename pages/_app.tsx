import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { NotificationProvider } from "../contexts/notification.context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotificationProvider>
      <Component {...pageProps} />
    </NotificationProvider>
  );
}

export default MyApp;
