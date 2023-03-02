import Link from "next/link";
import type { FC, ReactNode } from "react";

import Title from "./title";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Title />
      <header>
        <nav>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="#">Help</Link>
            </li>
            <li>
              <Link href="#">Log in</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
