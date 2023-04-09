import type { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

const Micropost: FC<Pick<User, "id" | "name" | "image">> = ({
  id,
  name,
  image,
}) => (
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
  </>
);

export default Micropost;
