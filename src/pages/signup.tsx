import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

import { api } from "../utils/api";

const Signup: NextPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const {
    user: {
      createUser: { useMutation },
    },
  } = api;

  const { push } = useRouter();
  const { mutate, isLoading } = useMutation({
    onSuccess: async (user) => {
      if (!user) {
        return;
      }
      const { id } = user;
      await push(`/users/${id}`);
    },
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="color-[#333333] pt-[20px] pb-[30px] text-center text-[42px] leading-[42px] tracking-[-2px]">
        Sign up
      </h1>
      <div className="flex justify-center">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            mutate({ name, email, password, passwordConfirmation });
          }}
          className="max-w-[555px] grow"
        >
          {[
            { label: "Name", type: "text", value: name, setValue: setName },
            { label: "Email", type: "email", value: email, setValue: setEmail },
            {
              label: "Password",
              type: "password",
              value: password,
              setValue: setPassword,
            },
            {
              label: "Confirmation",
              type: "password",
              value: passwordConfirmation,
              setValue: setPasswordConfirmation,
            },
          ].map(({ label, type, value, setValue }, index) => {
            return (
              <div key={index}>
                <div className="pb-[5px]">
                  <label
                    htmlFor={label}
                    className="color-[#333333] h-5 text-[14px] font-bold leading-5"
                  >
                    {label}
                  </label>
                </div>
                <div className="pb-[15px]">
                  <input
                    id={label}
                    type={type}
                    value={value}
                    onChange={({ currentTarget: { value } }) => {
                      setValue(value);
                    }}
                    className="bordor-[#cccccc] w-full rounded border py-[6px] px-3 text-[14px]"
                  />
                </div>
              </div>
            );
          })}
          <button className="w-full rounded border border-[#2e6da4] bg-[#337ab7] py-[6px] px-3 text-[14px] text-white">
            Create my acount
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
