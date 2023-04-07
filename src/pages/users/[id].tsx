import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";
import { Suspense } from "react";
import type { FallbackProps } from "react-error-boundary";
import { ErrorBoundary } from "react-error-boundary";

import { api } from "../../utils/api";

const UserData: FC<{ userId: string }> = ({ userId }) => {
  const {
    user: {
      getOneUser: { useSuspenseQuery },
    },
  } = api;
  const [{ name, image }] = useSuspenseQuery(
    { userId },
    {
      onError: ({ message }) => {
        console.log(message);
      },
    }
  );

  return (
    <div className="flex gap-[10px] pt-[20px] pb-[10px]">
      {image && <Image alt="avatar" src={image} width={80} height={80} />}
      <h1 className="text-[19.6px] tracking-[-1px] text-[#333333]">{name}</h1>
    </div>
  );
};

const User = () => {
  const {
    query: { id },
    isReady,
  } = useRouter();

  if (typeof id !== "string" || !isReady) {
    return <p>Loading...</p>;
  }

  return <UserData userId={id} />;
};

const Fallback: FC<FallbackProps> = ({ error: { message } }) => {
  return <p>{message}</p>;
};

const Show: NextPage = () => {
  return (
    <main className="flex gap-[30px]">
      <aside className="max-w-[360px] grow">
        <ErrorBoundary FallbackComponent={Fallback}>
          <Suspense fallback={<div>Loading user data...</div>}>
            <User />
          </Suspense>
        </ErrorBoundary>
      </aside>
      <div className="grow">
        <h3 className="pt-5 pb-[10px] text-[24px] font-medium">
          Microposts (50)
        </h3>
        <ol>
          {[...Array<undefined>(50)].map((_, index) => {
            return (
              <li
                key={index}
                className="flex items-center gap-[10px] border-t-[1px] border-[#e8e8e8] py-[10px]"
              >
                <Image
                  src={
                    "https://secure.gravatar.com/avatar/bebfcf57d6d8277d806a9ef3385c078d?s=50"
                  }
                  alt="avatar"
                  width={50}
                  height={50}
                  className="h-full"
                />
                <div className="leading-none">
                  <Link
                    href="/users/clf5aigzy0000ubx5mk8cywov"
                    className="text-[14px] leading-5 text-[#337ab7] hover:text-[#23527c] hover:underline"
                  >
                    Yuto Takeuchi
                  </Link>
                  <p className="text-[14px] leading-5">
                    Similique eos consequatur nesciunt reiciendis.
                  </p>
                  <span className="text-[14px] leading-5 text-[#777777]">
                    Posted 3 minites ago.{" "}
                  </span>
                  <button className="text-[14px] leading-5 text-[#337ab7] hover:text-[#23527c] hover:underline">
                    delete
                  </button>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </main>
  );
};

export default Show;
