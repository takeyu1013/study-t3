import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { api } from "../../utils/api";

const schema = z.object({ email: z.string().email() });

const New = () => {
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
    <form
      onSubmit={handleSubmit(({ email }) => {
        console.log(email);
        mutate({ email });
      })}
    >
      <label>Email</label>
      <input type="email" {...register("email")} />
      {errors.email?.message && <p>{errors.email.message}</p>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default New;
