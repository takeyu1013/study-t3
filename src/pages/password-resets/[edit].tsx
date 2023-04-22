import { zodResolver } from "@hookform/resolvers/zod";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { api } from "../../utils/api";

export const schema = z.object({
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i),
  passwordConfirmation: z.string().min(1),
});

const Edit: NextPage = () => {
  const {
    query: { token, email },
  } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });
  const {
    passwordReset: {
      update: { useMutation },
    },
  } = api;
  const { mutate } = useMutation({
    onSuccess: () => {
      reset();
    },
  });

  return (
    <>
      <h1 className="color-[#333333] pt-[20px] pb-[30px] text-center text-[42px] leading-[42px] tracking-[-2px]">
        Reset password
      </h1>
      <div className="flex justify-center">
        <form
          className="max-w-[555px] grow"
          onSubmit={handleSubmit((data) => {
            if (typeof token !== "string" || typeof email !== "string") {
              return;
            }
            mutate({ email, token, ...data });
          })}
        >
          <div className="pb-[5px]">
            <label className="color-[#333333] h-5 text-[14px] font-bold leading-5">
              Password
            </label>
          </div>
          <div className="pb-[15px]">
            <input
              className="w-full rounded border border-[#cccccc] py-[6px] px-3 text-[14px]"
              {...register("password")}
              type="password"
            />
          </div>
          {errors.password?.message && <p>{errors.password.message}</p>}
          <div className="pb-[5px]">
            <label className="color-[#333333] h-5 text-[14px] font-bold leading-5">
              Confirmation
            </label>
          </div>
          <div className="pb-[15px]">
            <input
              className="w-full rounded border border-[#cccccc] py-[6px] px-3 text-[14px]"
              {...register("passwordConfirmation")}
              type="password"
            />

            {errors.passwordConfirmation?.message && (
              <p>{errors.passwordConfirmation.message}</p>
            )}
          </div>
          <button
            className="w-full rounded border border-[#2e6da4] bg-[#337ab7] py-[6px] px-3 text-[14px] text-white hover:bg-[#286090]"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Edit;
