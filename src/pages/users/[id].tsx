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
  const [{ name, email, image }] = useSuspenseQuery(
    { userId },
    {
      onError: ({ message }) => {
        console.log(message);
      },
    }
  );

  return (
    <div>
      <div>{name}</div>
      <div>{email}</div>
      {image && <Image alt="avatar" src={image} width={100} height={100} />}
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
