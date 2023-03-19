import { zodResolver } from "@hookform/resolvers/zod";
import type { NextPage } from "next";
import Image from "next/image";
import type { Session } from "next-auth";
import { useSession } from "next-auth/react";
import type { FC, HTMLInputTypeAttribute } from "react";
import { Suspense } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { api } from "../../../utils/api";

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i),
  confirmation: z
    .string()
    .min(8)
    .regex(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i),
});

const Profile: FC<{ session: Session }> = ({
  session: {
    user: { id: userId },
  },
}) => {
  const {
    user: {
      getOneUser: { useSuspenseQuery },
      editUser: { useMutation },
    },
  } = api;
  const [{ name, email, image }] = useSuspenseQuery({ userId });
  const { mutate } = useMutation();
  const { register, handleSubmit } = useForm<z.infer<typeof schema>>({
    defaultValues: {
      name: name ?? "",
      email: email ?? "",
    },
    resolver: zodResolver(schema),
  });
  const Label: FC<{ children: string }> = ({ children }) => {
    return (
      <label className="inline-block h-5 pb-[5px] text-sm font-bold">
        {children}
      </label>
    );
  };
  const Input: FC<{
    type?: HTMLInputTypeAttribute;
    register: UseFormRegisterReturn;
  }> = ({ type = "text", register }) => {
    return (
      <div className="pb-[15px]">
        <input
          className="block w-full rounded border border-[#cccccc] px-3 py-[6px] text-sm"
          type={type}
          {...register}
        />
      </div>
    );
  };

  return (
    <div className="flex justify-center">
      <div className="max-w-[555px] grow">
        <form
          className="pb-[15px]"
          onSubmit={handleSubmit(({ name, email, password, confirmation }) => {
            mutate({
              id: userId,
              name,
              email,
              password,
              passwordConfirmation: confirmation,
            });
          })}
        >
          <Label>Name</Label>
          <Input register={register("name")} />
          <Label>Email</Label>
          <Input register={register("email")} />
          <Label>Password</Label>
          <Input register={register("password")} type="password" />
          <Label>Confirmation</Label>
          <Input register={register("confirmation")} type="password" />
          <button
            type="submit"
            className="w-full rounded border border-[#2e6da4] bg-[#337ab7] px-3 py-[6px] text-sm text-white hover:border-[#286090] hover:bg-[#204d74]"
          >
            Save changes
          </button>
        </form>
        <div className="flex gap-[10px]">
          <Image
            alt="avater"
            src={
              image ||
              "https://secure.gravatar.com/avatar/3671055c9063cfc5f08b7741c8de4802?s=80"
            }
            width={80}
            height={80}
          />
          <a
            href="https://gravatar.com/emails"
            target="_blank"
            className="text-sm text-[#337ab7] hover:text-[#23527c] hover:underline"
          >
            change
          </a>
        </div>
      </div>
    </div>
  );
};

const Edit: NextPage = () => {
  const { data: session } = useSession();
  if (!session) {
    return <p>Loading...</p>;
  }

  return (
    <Suspense fallback={<p>Loading Profile...</p>}>
      <h1 className="pb-[30px] pt-5 text-center text-[42px] leading-none tracking-[-2px]">
        Update your profile
      </h1>
      <Profile session={session} />
    </Suspense>
  );
};

export default Edit;
