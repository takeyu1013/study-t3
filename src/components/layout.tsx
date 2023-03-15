import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import type { FC, ReactNode } from "react";
import { useState } from "react";

import Title from "./title";

const Anchor: FC<{ children: ReactNode; href: string }> = ({
  children,
  href,
}) => (
  <a
    href={href}
    className="text-[#555555] hover:text-[#222222] hover:underline"
  >
    {children}
  </a>
);

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const { data: session } = useSession();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <Title />
      <header className="flex justify-center border-b border-[#090909] bg-neutral-800 px-[130px] ">
        <nav className="flex max-w-[1140px] grow items-center justify-between">
          <Link
            href="/"
            className="text-[23.8px] font-bold uppercase tracking-[-1px] text-white"
          >
            sample app
          </Link>
          <ul className="flex gap-[30px] py-[15px]">
            {["Home", "Help"].map((text, index) => (
              <li key={index} className="h-5">
                <Link
                  href="#"
                  className="text-sm text-[#9d9d9d] hover:text-white"
                >
                  {text}
                </Link>
              </li>
            ))}
            <li className="h-5">
              {session ? (
                <div className="relative inline-block text-left">
                  <button
                    type="button"
                    onClick={() => {
                      setIsExpanded((isExpanded) => !isExpanded);
                    }}
                    className="text-sm text-[#9d9d9d] hover:text-white"
                    id="menu-button"
                    aria-expanded={isExpanded}
                    aria-haspopup
                  >
                    Account
                  </button>
                  <div
                    className={`absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
                      isExpanded ? "" : "hidden"
                    }`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex={-1}
                  >
                    <div className="py-1" role="none">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex={-1}
                        id="menu-item-0"
                      >
                        Profile
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex={-1}
                        id="menu-item-1"
                      >
                        Settings
                      </a>
                      <button
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700"
                        role="menuitem"
                        tabIndex={-1}
                        id="menu-item-3"
                        onClick={async () => {
                          await signOut();
                        }}
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="text-sm text-[#9d9d9d] hover:text-white"
                >
                  Log in
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </header>
      <div className="flex justify-center px-[130px]">
        <div className="max-w-[1140px] grow">
          <main className="pt-[9px]">{children}</main>
          <footer className="pt-[45px]">
            <div className="flex justify-between border-t border-[#eaeaea] pt-[5px]">
              <small className="text-[#777777]">
                The{" "}
                <Anchor href="https://railstutorial.jp/">
                  Ruby on Rails Tutorial
                </Anchor>{" "}
                by{" "}
                <Anchor href="https://www.michaelhartl.com/">
                  Michael Hartl
                </Anchor>
              </small>
              <nav>
                <ul className="flex gap-[15px]">
                  {["About", "Contact", "News"].map((text, index) => (
                    <li key={index} className="h-5">
                      <Link
                        href="#"
                        className="text-sm text-[#555555] hover:text-[#222222] hover:underline"
                      >
                        {text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Layout;
