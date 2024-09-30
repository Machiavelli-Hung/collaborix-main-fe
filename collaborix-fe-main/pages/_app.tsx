// import '../styles/globals.css';
// import type { AppProps } from 'next/app';
// import withTheme from '../theme';

// export default function App({ Component, pageProps }: AppProps) {
//   return withTheme(<Component {...pageProps} />);
// }

"use client";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "../context/Provider";
import { SocketProvider } from "../context/SocketProvider"; // CONTEXT SOCKET
import Layout from "../components/Public/Layout/index";
import { NextUIProvider } from "@nextui-org/react";
import StyledComponentsRegistry from "../lib/registry";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import theme from "../theme/themeConfig";
import { ConfigProvider } from "antd";
const noAuthRequired = ["/login"];
export default function App({ Component, pageProps, router }: AppProps) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
 // const isPublicRoute = noAuthRequired.includes(router.pathname);
  return (
    <>
      {isClient && (
        <UserProvider>
          <SocketProvider>
            <StyledComponentsRegistry>
              <ConfigProvider theme={theme}>
                <NextUIProvider>
                  {/* <Layout> */}
                  <Toaster position="top-right" reverseOrder={false} />
                  <Component {...pageProps} />
                  {/* </Layout> */}
                </NextUIProvider>
              </ConfigProvider>
            </StyledComponentsRegistry>
          </SocketProvider>
        </UserProvider>
      )}
    </>
  );
}
