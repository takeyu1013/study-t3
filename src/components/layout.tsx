import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import type { FC, ReactNode } from "react";
import { Fragment } from "react";

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
            {(
              [
                ["Home", "/"],
                ["Help", "/help"],
                ["Users", "/users"],
              ] as const
            ).map(([text, path], index) => (
              <li key={index} className="h-5">
                <Link
                  href={path}
                  className="text-sm text-[#9d9d9d] hover:text-white"
                >
                  {text}
                </Link>
              </li>
            ))}
            <li className="h-5">
              {session ? (
                <Menu as="div" className="relative inline-block text-left">
                  <div className="group">
                    <Menu.Button className="inline-flex text-sm text-[#9d9d9d] group-hover:text-white">
                      Account
                      <svg
                        className="-mr-1 h-5 w-5 text-[#9d9d9d] group-hover:text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Menu.Button>
                  </div>

                  <div className="pt-[12px]">
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 w-40 origin-top-right divide-y divide-[#e5e5e5] rounded-b-sm bg-white py-[5px] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="pb-[9px]">
                          <Menu.Item>
                            <a
                              href={`/users/${session?.user.id}`}
                              className="block px-5 py-[3px] text-sm text-[#333333] hover:bg-[#f5f5f5]"
                            >
                              Profile
                            </a>
                          </Menu.Item>
                          <Menu.Item>
                            <a
                              href={`/users/${session?.user.id}/edit`}
                              className="block px-5 py-[3px] text-sm text-[#333333] hover:bg-[#f5f5f5]"
                            >
                              Settings
                            </a>
                          </Menu.Item>
                        </div>
                        <div className="pt-[9px]">
                          <Menu.Item>
                            <button
                              className="block w-full py-[3px] px-5 pt-[3px] text-left text-sm text-[#333333] hover:bg-[#f5f5f5]"
                              onClick={async () => {
                                await signOut();
                              }}
                            >
                              Log out
                            </button>
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </div>
                </Menu>
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
