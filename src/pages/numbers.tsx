import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";

import { api } from "../utils/api";

export const Numbers: NextPage = () => {
  const [num, setNumber] = useState<number>();
  api.number.randomNumber.useSubscription(undefined, {
    onData(n) {
      setNumber(n);
    },
  });

  return (
    <div>
      Here&apos;s a random number from a sub: {num} <br />
      <Link href="/">Index</Link>
    </div>
  );
};

export default Numbers;
