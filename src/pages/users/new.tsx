import { type NextPage } from "next";
import Link from "next/link";
import { useState } from "react";

import { api } from "../../utils/api";

const New: NextPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const {
    user: {
      createUser: { useMutation },
    },
  } = api;
  const { mutate, isLoading, error } = useMutation({
    onSuccess: () => {
      setName("");
      setEmail("");
      setPassword("");
      setPasswordConfirmation("");
    },
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="pb-4 text-4xl font-bold">New User</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          mutate({ name, email, password, passwordConfirmation });
        }}
      >
        <div className="pb-4">
          <label className="block">Name</label>
          <input
            className="border"
            value={name}
            onChange={({ currentTarget: { value } }) => {
              setName(value);
            }}
          />
        </div>
        <div className="pb-4">
          <label className="block">Email</label>
          <input
            className="border"
            value={email}
            onChange={({ currentTarget: { value } }) => {
              setEmail(value);
            }}
          />
        </div>
        <div className="pb-4">
          <label className="block">Password</label>
          <input
            type="password"
            className="border"
            value={password}
            onChange={({ currentTarget: { value } }) => {
              setPassword(value);
            }}
          />
        </div>
        <div className="pb-4">
          <label className="block">Password Confirmation</label>
          <input
            type="password"
            className="border"
            value={passwordConfirmation}
            onChange={({ currentTarget: { value } }) => {
              setPasswordConfirmation(value);
            }}
          />
        </div>
        <div className="pb-4">
          <button className="rounded border px-2" type="submit">
            Create User
          </button>
        </div>
      </form>
      <Link href="/users" className="underline">
        Back
      </Link>
      <div>{error && error.message}</div>
    </div>
  );
};

export default New;
