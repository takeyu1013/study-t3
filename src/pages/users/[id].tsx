import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import type { FC } from "react";
import { Suspense } from "react";
import type { FallbackProps } from "react-error-boundary";
import { ErrorBoundary } from "react-error-boundary";

import Microposts from "../../components/microposts";
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
    <div className="flex gap-[30px]">
      <aside className="max-w-[360px] grow">
        <div className="flex gap-[10px] pt-[20px] pb-[10px]">
          {image && <Image alt="avatar" src={image} width={80} height={80} />}
          <h1 className="text-[19.6px] tracking-[-1px] text-[#333333]">
            {name}
          </h1>
        </div>
      </aside>
      <div className="grow">
        <h3 className="pt-5 pb-[10px] text-[24px] font-medium">
          Microposts (50)
        </h3>
        <Microposts userId={userId} name={name} image={image} />
      </div>
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
    <ErrorBoundary FallbackComponent={Fallback}>
      <Suspense fallback={<div>Loading user data...</div>}>
        <User />
      </Suspense>
    </ErrorBoundary>
  );
};

export default Show;
