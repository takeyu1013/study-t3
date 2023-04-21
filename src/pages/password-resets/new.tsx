import { zodResolver } from "@hookform/resolvers/zod";
import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { api } from "../../utils/api";

const schema = z.object({ email: z.string().email() });

const New: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });
  const {
    passwordReset: {
      create: { useMutation },
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
        Forgot password
      </h1>
      <div className="flex justify-center">
        <form
          className="max-w-[555px] grow"
          onSubmit={handleSubmit(({ email }) => {
            console.log(email);
            mutate({ email });
          })}
        >
          <div className="pb-[5px]">
            <label className="color-[#333333] h-5 text-[14px] font-bold leading-5">
              Email
            </label>
          </div>
          <div className="pb-[15px]">
            <input
              className="w-full rounded border border-[#cccccc] py-[6px] px-3 text-[14px]"
              type="email"
              {...register("email")}
            />
            {errors.email?.message && <p>{errors.email.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full rounded border border-[#2e6da4] bg-[#337ab7] py-[6px] px-3 text-[14px] text-white hover:bg-[#286090]"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default New;
