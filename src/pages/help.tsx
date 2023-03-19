import type { NextPage } from "next";
import type { FC, ReactNode } from "react";

const Link: FC<{ children: ReactNode; href: string }> = ({
  children,
  href,
}) => {
  return (
    <a
      className="text-[#337ab7] hover:text-[#23527c] hover:underline"
      href={href}
    >
      {children}
    </a>
  );
};

const Help: NextPage = () => {
  return (
    <>
      <h1 className="pt-5 pb-[30px] text-center text-[42px] leading-none tracking-[-2px]">
        Help
      </h1>
      <p className="text-[15.4px]">
        Get help on the Ruby on Rails Tutorial at the{" "}
        <Link href="https://railstutorial.jp/help">
          Rails Tutorial help page
        </Link>
        . To get help on this sample app, see the{" "}
        <Link href="https://railstutorial.jp/#ebook">
          <em>Ruby on Rails Tutorial</em> book
        </Link>
        .
      </p>
    </>
  );
};

export default Help;
