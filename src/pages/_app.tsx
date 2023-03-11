import "../styles/globals.css";

import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { getSession, SessionProvider } from "next-auth/react";
import { Suspense } from "react";

import Layout from "../components/layout";
import { api } from "../utils/api";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

MyApp.getInitialProps = async ({ ctx }) => {
  return {
    session: await getSession(ctx),
  };
};

export default api.withTRPC(MyApp);
