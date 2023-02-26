import type { NextPage } from "next";
import Link from "next/link";
import { api } from "../utils/api";

const UserIndexPage: NextPage = () => {
  const { data } = api.user.getUsers.useQuery();

  if (!data) {
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
              <th className="pb-1" colSpan={3}></th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ name, email }, index) => {
              return (
                <tr key={index}>
                  <td className="py-1 pr-2">{name}</td>
                  <td className="py-1 pr-2">{email}</td>
                  <td className="py-1 pr-2">
                    <Link href="#">Edit</Link>
                  </td>
                  <td className="py-1 pr-2">
                    <Link href="#">Destroy</Link>
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
    </main>
  );
};

export default UserIndexPage;
