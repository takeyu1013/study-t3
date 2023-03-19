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
      <Suspense fallback={<div>Loading...</div>}>
        <Users />
      </Suspense>
    </>
  );
};

export default UsersPage;
