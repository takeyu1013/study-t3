import type { NextPage } from "next";
import Link from "next/link";
import { api } from "../utils/api";

const UserIndexPage: NextPage = () => {
  const {
    user: {
      getUsers: { useSuspenseQuery },
      deleteUser: { useMutation },
    },
  } = api;
  const [users] = useSuspenseQuery();
  const {
    user: {
      getUsers: { invalidate },
    },
  } = api.useContext();
  const { mutate, isLoading, error } = useMutation({
    onSuccess: async () => {
      await invalidate();
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="p-8">
      <h1 className="pb-4 text-4xl font-bold">Users</h1>
      <div className="pb-4">
        <table>
          <thead>
            <tr>
              <th className="pb-1">Name</th>
              <th className="pb-1">Email</th>
              <th className="pb-1" colSpan={3} />
            </tr>
          </thead>
          <tbody>
            {users.map(({ id, name, email }) => {
              return (
                <tr key={id}>
                  <td className="py-1 pr-2">{name}</td>
                  <td className="py-1 pr-2">{email}</td>
                  <td className="py-1 pr-2">
                    <Link href="#">Edit</Link>
                  </td>
                  <td className="py-1 pr-2">
                    <button
                      onClick={() => {
                        mutate({ id });
                      }}
                    >
                      Destroy
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Link href="/users/new" className="underline">
        New User
      </Link>
      <div>{error && error.message}</div>
    </main>
  );
};

export default UserIndexPage;
