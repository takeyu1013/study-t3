import { zodResolver } from "@hookform/resolvers/zod";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { getSession, signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i),
});

const Login: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });
  const { push, query, isReady } = useRouter();

  return (
    <>
      {isLoading || !isReady ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1 className="color-[#333333] pt-[20px] pb-[30px] text-center text-[42px] leading-[42px] tracking-[-2px]">
            Log in
          </h1>
          <div className="flex justify-center">
            <div className="max-w-[555px] grow">
              <form
                onSubmit={handleSubmit(async ({ email, password }) => {
                  setIsLoading(true);
                  const { callbackUrl } = query;
                  if (typeof callbackUrl === "string") {
                    await signIn("credentials", {
                      email,
                      password,
                      callbackUrl,
                    });
                  } else {
                    await signIn("credentials", {
                      email,
                      password,
                      redirect: false,
                    });
                  }
                  const session = await getSession();
                  if (!session) {
                    setIsLoading(false);
                    return;
                  }
                  const {
                    user: { id },
                  } = session;
                  await push(`/users/${id}`);
                })}
              >
                <div>
                  <div className="pb-[5px]">
                    <label className="color-[#333333] h-5 text-[14px] font-bold leading-5">
                      Email
                    </label>
                  </div>
                  <div className="pb-[15px]">
                    <input
                      className="w-full rounded border border-[#cccccc] py-[6px] px-3 text-[14px]"
                      {...register("email")}
                    />
                    {errors.email?.message && <p>{errors.email?.message}</p>}
                  </div>
                  <div className="pb-[5px]">
                    <label className="color-[#333333] h-5 text-[14px] font-bold leading-5">
                      Password
                    </label>{" "}
                    <Link
                      className="text-[14px] text-[#337ab7] hover:text-[#23527c] hover:underline"
                      href="/password-resets/new"
                    >
                      (forgot password)
                    </Link>
                  </div>
                  <div className="pb-[15px]">
                    <input
                      type="password"
                      className="w-full rounded border border-[#cccccc] py-[6px] px-3 text-[14px]"
                      {...register("password")}
                    />
                    {errors.password?.message && (
                      <p>{errors.password?.message}</p>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full rounded border border-[#2e6da4] bg-[#337ab7] py-[6px] px-3 text-[14px] text-white hover:bg-[#286090]"
                >
                  Log in
                </button>
              </form>
              <p>
                New user?{" "}
                <Link
                  className="text-[#337ab7] hover:text-[#23527c] hover:underline"
                  href="/signup"
                >
                  Sign up now!
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
