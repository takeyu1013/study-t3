import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";

import { api } from "../utils/api";

export const Numbers: NextPage = () => {
  const [number, setNumber] = useState<number>();
  api.number.randomNumber.useSubscription(undefined, {
    onData(number) {
      setNumber(number);
    },
  });

  return (
    <div>
      Here&apos;s a random number from a sub: {number} <br />
      <Link href="/">Index</Link>
    </div>
  );
};

export default Numbers;
