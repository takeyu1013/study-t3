import type { User } from "@prisma/client";
import type { FC } from "react";

import { api } from "../utils/api";
import Micropost from "./micropost";

const Microposts: FC<{
  userId: User["id"];
  name: User["name"];
  image: User["image"];
}> = ({ userId, name, image }) => {
  const {
    micropost: {
      infiniteMicroposts: { useSuspenseInfiniteQuery },
    },
  } = api;
  const [{ pages }] = useSuspenseInfiniteQuery({ userId });
  const page = pages[0];
  if (!page) {
    return <p>No posts</p>;
  }

  return (
    <ol>
      {page.items.map(({ userId, content, createdAt }, index) => {
        return (
          <li
            key={index}
            className="flex items-center gap-[10px] border-t-[1px] border-[#e8e8e8] py-[10px]"
          >
            <Micropost
              id={userId}
              name={name}
              image={image}
              content={content}
              createdAt={createdAt}
            />
          </li>
        );
      })}
    </ol>
  );
};

export default Microposts;
