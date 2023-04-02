import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";
import { Suspense } from "react";

import { api } from "../utils/api";

const Pagination: FC<{ total: number; current: number }> = ({
  total,
  current,
}) => {
  const className = "flex items-center px-3 py-[6px] text-sm";
  const selectable = (isActive: boolean) => {
    return isActive
      ? `${className} bg-[#337ab7] text-white`
      : `${className} text-[#337ab7] border hover:bg-gray-50 `;
  };

  return (
    <nav className="inline-flex -space-x-px py-10" aria-label="Pagination">
      <Link
        href={
          1 < current
            ? { pathname: "/users", query: { page: current - 1 } }
            : { pathname: "/users", query: { page: 1 } }
        }
        className={`${className} rounded-l border text-[#337ab7] hover:bg-gray-50`}
      >
        ← Previous
      </Link>
      {[...Array<undefined>(total)].map((_, index) => {
        const page = index + 1;
        return (
          <Link
            key={index}
            href={{ pathname: "/users", query: { page } }}
            aria-current="page"
            className={selectable(page === current)}
          >
            {page}
          </Link>
        );
      })}
      <Link
        href={
          current < total
            ? { pathname: "/users", query: { page: current + 1 } }
            : { pathname: "/users", query: { page: total } }
        }
        className={`${className} rounded-r-md border text-[#337ab7] hover:bg-gray-50`}
      >
        Next →
      </Link>
    </nav>
  );
};

const Users: FC<{ current?: number }> = ({ current = 1 }) => {
  const {
    user: {
      infiniteUsers: { useSuspenseInfiniteQuery },
    },
  } = api;
  const limit = 10;
  const [{ pages }] = useSuspenseInfiniteQuery(
    { limit },
    { getNextPageParam: ({ nextCursor }) => nextCursor }
  );
  const page = pages[current - 1];
  if (!page) {
    return <p>Not found</p>;
  }
  const { items: users, total } = page;
  const count = ((total / limit) | 0) + 1;

  return (
    <>
      <Pagination total={count} current={current} />
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
      <Pagination total={count} current={current} />
    </>
  );
};

const UsersPage: NextPage = () => {
  const {
    query: { page },
  } = useRouter();
  const number = Number(page);
  const current = Number.isNaN(number) ? 1 : number;

  return (
    <>
      <h1 className="pt-5 pb-[30px] text-center text-[42px] leading-none tracking-[-2px]">
        All users
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Users current={current} />
      </Suspense>
    </>
  );
};

export default UsersPage;
