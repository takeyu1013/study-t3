import { zodResolver } from "@hookform/resolvers/zod";
import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const Edit: NextPage = () => {
  const { register, handleSubmit } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  return (
    <div>
      <h1 className="pt-[30px] pb-5 text-center text-[42px] leading-none tracking-[-2px]">
        Update your profile
      </h1>
      <div className="flex justify-center">
        <form
          className="max-w-[555px] grow"
          onSubmit={handleSubmit((form) => {
            console.log(form);
          })}
        >
          <label>Name</label>
          <input className="block" {...register("name")} />
          <label>Email</label>
          <input className="block" {...register("email")} />
          <label>Password</label>
          <input className="block" {...register("password")} type="password" />
          <label>Confirmation</label>
          <input
            className="block"
            {...register("confirmation")}
            type="password"
          />
          <button type="submit">Save changes</button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
