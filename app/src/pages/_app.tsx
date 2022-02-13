import { createTheme, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { AppProps } from "next/app";
import { Web3Provider } from "../components/Web3Provider";
import "../styles/globals.css";

const lightTheme = createTheme({ type: "light", theme: {} });
const darkTheme = createTheme({ type: "dark", theme: {} });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider>
      <NextThemesProvider
        defaultTheme="system"
        attribute="class"
        value={{
          light: lightTheme.className,
          dark: darkTheme.className,
        }}
      >
        <NextUIProvider>
          <Component {...pageProps} />
        </NextUIProvider>
      </NextThemesProvider>
    </Web3Provider>
  );
}

export default MyApp;
