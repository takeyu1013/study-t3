import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import type { FC } from "react";
import { Suspense } from "react";
import type { FallbackProps } from "react-error-boundary";
import { ErrorBoundary } from "react-error-boundary";

import { api } from "../../utils/api";

const User = () => {
  const {
    user: {
      getOneUser: { useSuspenseQuery },
    },
  } = api;
  const {
    query: { id },
  } = useRouter();
  const userId = typeof id === "string" ? id : "";
  const [{ name, image }] = useSuspenseQuery(
    { userId },
    {
      onError: ({ message }) => {
        console.log(message);
      },
    }
  );

  return (
    <div className="flex gap-[10px] pt-[30px] pb-[10px]">
      {image && <Image alt="avatar" src={image} width={80} height={80} />}
      <h1 className="text-[19.6px] tracking-[-1px] text-[#333333]">{name}</h1>
    </div>
  );
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
