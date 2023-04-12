import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import type { FC } from "react";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Microposts from "../components/microposts";
import { api } from "../utils/api";

const schema = z.object({
  content: z.string().min(1),
});

const User: FC<{ userId: User["id"] }> = ({ userId }) => {
  const {
    user: {
      getOneUser: { useSuspenseQuery },
    },
  } = api;
  const [{ id, name, image, micropostCount }] = useSuspenseQuery({ userId });

  return (
    <>
      <Image
        src={
          image ||
          "https://secure.gravatar.com/avatar/3671055c9063cfc5f08b7741c8de4802?s=50"
        }
        alt="avatar"
        width={50}
        height={50}
        className="h-full"
      />
      <div className="leading-none">
        <h1 className="pb-[3px] text-[19.6px] font-medium tracking-[-1px]">
          {name}
        </h1>
        <Link
          href={`/users/${id}`}
          className="text-[14px] text-[#337ab7] hover:text-[#23527c] hover:underline"
        >
          view my profile
        </Link>
        <span className="block pb-[3px] text-[14px]">
          {micropostCount} microposts
        </span>
      </div>
    </>
  );
};

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });
  const {
    micropost: {
      createMicropost: { useMutation },
    },
  } = api;
  const {
    user: {
      getOneUser: { invalidate: userInvalidate },
    },
    micropost: {
      infiniteMicroposts: { invalidate: micropostsInvalidate },
    },
  } = api.useContext();
  const { mutate } = useMutation({
    onSuccess: async () => {
      reset();
      await userInvalidate();
      await micropostsInvalidate();
    },
  });

  if (!session && status === "unauthenticated") {
    return (
      <div>
        <div className="rounded-md bg-[#eeeeee] py-12 px-16 text-center">
          <h1 className="pt-5 text-[63px] font-medium leading-none tracking-[-2px] text-[#333333]">
            Welcome to the Sample App
          </h1>
          <h2 className="pt-5 pb-8 leading-none tracking-[-1px] text-neutral-500">
            This is the home page for the{" "}
            <a
              className="text-[#337ab7] hover:text-[#23527c] hover:underline"
              href="https://railstutorial.jp/"
            >
              Ruby on Rails Tutorial{" "}
            </a>
            sample application.
          </h2>
          <Link
            href="/signup"
            className="inline-block rounded-md border border-[#2e6da4] bg-[#337ab7] px-4 py-[10px] text-lg leading-6 text-white hover:border-[#204d74] hover:bg-[#286090]"
          >
            Sign up now!
          </Link>
        </div>
        <div className="pt-[30px]">
          <a href="https://rubyonrails.org/">
            <Image
              alt="Rails logo"
              width={200}
              height={70}
              src="https://cdn.learnenough.com/rails.svg"
              className="inline"
            />
          </a>
        </div>
      </div>
    );
  }
  if (!session) {
    return <p>Loading...</p>;
  }

  const {
    user: { id, name, image },
  } = session;

  return (
    <div className="flex gap-[30px]">
      <aside className="min-w-[360px]">
        <section className="flex gap-[10px] pt-5 pb-[10px]">
          <Suspense>
            <User userId={id} />
          </Suspense>
        </section>
        <section className="grow pt-[30px] pb-[10px]">
          <form
            onSubmit={handleSubmit(({ content }) => {
              console.log(content);
              mutate({ userId: id, content });
            })}
          >
            <div className="pb-[10px]">
              <textarea
                placeholder="Compose new micropost..."
                className="block h-[100px] w-full border border-[#bbbbbb] p-[2px] text-sm text-inherit placeholder:text-[#757575]"
                {...register("content")}
              />
              {errors.content?.message && <p>{errors.content.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full rounded border bg-[#337ab7] px-3 py-[6px] text-sm text-white hover:bg-[#286090]"
            >
              Post
            </button>
            <input type="file" className="block pt-[10px] pb-[15px] text-sm" />
          </form>
        </section>
      </aside>
      <div className="grow">
        <h3 className="pt-5 pb-[10px] text-[24px] font-medium leading-6">
          Micropost Feed
        </h3>
        <Suspense>
          <Microposts
            userId={id}
            name={name || "Anonymous"}
            image={image || null}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
