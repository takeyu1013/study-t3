import { zodResolver } from "@hookform/resolvers/zod";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i),
  passwordConfirmation: z.string().min(1),
});

const Edit: NextPage = () => {
  const {
    query: { token },
  } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        if (typeof token !== "string") {
          return;
        }
        console.log("token", token);
        console.log("data", data);
      })}
    >
      <label>Password</label>
      <input {...register("password")} type="password" />
      {errors.password?.message && <p>{errors.password.message}</p>}
      <label>Confirmation</label>
      <input {...register("passwordConfirmation")} type="password" />
      {errors.passwordConfirmation?.message && (
        <p>{errors.passwordConfirmation.message}</p>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Edit;
