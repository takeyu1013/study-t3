import { type NextPage } from "next";
import Link from "next/link";

const New: NextPage = () => {
  return (
    <main className="p-8">
      <h1 className="pb-4 text-4xl font-bold">New User</h1>
      <form>
        <div className="pb-4">
          <label className="block">Name</label>
          <input className="border" />
        </div>
        <div className="pb-4">
          <label className="block">Email</label>
          <input className="border" />
        </div>
        <div className="pb-4">
          <button className="rounded border px-2">Create User</button>
        </div>
      </form>
      <Link href="/users" className="underline">
        Back
      </Link>
    </main>
  );
};

export default New;
