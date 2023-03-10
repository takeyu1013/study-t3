import type { NextPage } from "next";
import Link from "next/link";

const Microposts: NextPage = () => {
  return (
    <>
      <h1>Microposts</h1>
      <table>
        <thead>
          <tr>
            <th>Content</th>
            <th>User</th>
          </tr>
        </thead>
      </table>
      <Link href="microposts/new">New Micropost</Link>
    </>
  );
};

export default Microposts;
