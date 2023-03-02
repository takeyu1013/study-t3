import Head from "next/head";
import { useRouter } from "next/router";
import type { FC } from "react";

const Title: FC = () => {
  const base = "Ruby on Rails Tutorial Sample App";
  const { pathname } = useRouter();
  const string = pathname.split("/")[1] || "";
  const title = string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

  return (
    <Head>
      <title>{!!title ? `${base} | ${title}` : base}</title>
    </Head>
  );
};

export default Title;
