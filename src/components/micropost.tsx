import type { User } from "@prisma/client";
import { Micropost } from "@prisma/client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

dayjs.extend(relativeTime);

const Micropost: FC<
  Pick<User, "id" | "name" | "image"> & Pick<Micropost, "content" | "createdAt">
> = ({ id, name, image, content, createdAt }) => (
  <>
    <Image
      src={
        image ||
        "https://secure.gravatar.com/avatar/bebfcf57d6d8277d806a9ef3385c078d?s=50"
      }
      alt="avatar"
      width={50}
      height={50}
      className="h-full"
    />
    <div className="leading-none">
      <Link
        href={`/users/${id}`}
        className="text-[14px] leading-5 text-[#337ab7] hover:text-[#23527c] hover:underline"
      >
        {name}
      </Link>
      <p className="text-[14px] leading-5">{content}</p>
      <span className="text-[14px] leading-5 text-[#777777]">
        {`${dayjs(createdAt).fromNow()} `}
      </span>
      <button className="text-[14px] leading-5 text-[#337ab7] hover:text-[#23527c] hover:underline">
        delete
      </button>
    </div>
  </>
);

export default Micropost;
