import { type NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { api } from "../../utils/api";

const New: NextPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <main className="p-8">
      <h1 className="pb-4 text-4xl font-bold">New User</h1>
      <form>
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
          <button
            className="rounded border px-2"
            onClick={({ preventDefault }) => {
              preventDefault();
              console.log(
                api.user.createUser
                  .useMutation({
                    onSuccess: async () => {
                      setName("");
                      setEmail("");
                      await api.useContext().user.getUsers.invalidate();
                    },
                  })
                  .mutate({ name, email })
              );
            }}
          >
            Create User
          </button>
        </div>
      </form>
      <Link href="/users" className="underline">
        Back
      </Link>
    </main>
  );
};

export default New;
