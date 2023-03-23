import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { Suspense } from "react";

import { api } from "../utils/api";

const Users: FC = () => {
  const {
    user: {
      getUsers: { useSuspenseQuery },
    },
  } = api;
  const [users] = useSuspenseQuery();

  return (
    <ul className="pl-10">
      {users.map(({ id, name, image }) => {
        return (
          <li key={id} className="flex gap-[10px] border-b py-[10px]">
            <Image
              alt="avater"
              src={
                image ||
                "https://secure.gravatar.com/avatar/3671055c9063cfc5f08b7741c8de4802?s=50"
              }
              width={50}
              height={50}
            />
            <Link
              href={`/users/${id}`}
              className="text-sm text-[#337ab7] hover:text-[#23527c] hover:underline"
            >
              {name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

const UsersPage: NextPage = () => {
  return (
    <>
      <h1 className="pt-5 pb-[30px] text-center text-[42px] leading-none tracking-[-2px]">
        All users
      </h1>
      <nav className="inline-flex -space-x-px py-10" aria-label="Pagination">
        <Link
          href="#"
          className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >
          ← Previous
        </Link>
        {[...Array<undefined>(10)].map((_, index) => {
          const page = index + 1;
          return (
            <Link
              key={index}
              href={{ pathname: "/users", query: { page } }}
              aria-current="page"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              {page}
            </Link>
          );
        })}
        {/* <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
          ...
        </span> */}
        <Link
          href="#"
          className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
        >
          Next →
        </Link>
      </nav>
      <Suspense fallback={<div>Loading...</div>}>
        <Users />
      </Suspense>
    </>
  );
};

export default UsersPage;
